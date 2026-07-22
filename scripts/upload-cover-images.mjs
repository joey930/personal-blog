import { createClient } from '@sanity/client'
import { createWriteStream, readFileSync, unlinkSync } from 'fs'
import { get as httpsGet } from 'https'
import { join } from 'path'
import { tmpdir } from 'os'

const client = createClient({
  projectId: 'vbckoho0',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
})

// Post slug → Unsplash photo (carefully chosen for theme)
const covers = [
  {
    slug: 'why-i-pray-before-every-meeting',
    photo: 'photo-1499209974431-9dddcece7f88', // peaceful light through window, contemplative
    desc: 'Light through window — prayer, contemplation',
  },
  {
    slug: 'what-the-sabbath-taught-me-about-productivity',
    photo: 'photo-1470252649378-9c29740c9fa8', // golden sunrise over mountains — rest, Sabbath
    desc: 'Mountain sunrise — rest and stillness',
  },
  {
    slug: 'on-staying-faithful-when-business-is-hard',
    photo: 'photo-1464822759023-fed622ff2c3b', // mountain path through difficulty
    desc: 'Mountain trail — difficult journey, faithfulness',
  },
  {
    slug: 'morning-routines-that-actually-stick',
    photo: 'photo-1495474472287-4d71bcdd2085', // pour-over coffee morning
    desc: 'Pour-over coffee — morning routine',
  },
  {
    slug: 'the-case-for-walking',
    photo: 'photo-1476611317561-60117649dd94', // person walking on path through forest
    desc: 'Walking path through forest',
  },
  {
    slug: 'korean-health-culture-what-west-is-learning',
    photo: 'photo-1498837167922-ddd27525d352', // vibrant Korean market / food spread
    desc: 'Korean food market',
  },
  {
    slug: 'on-starting-over-notes-from-a-founder',
    photo: 'photo-1495195129352-aeb325a55b65', // small plant in soil — new beginning
    desc: 'New seedling — starting over',
  },
  {
    slug: 'the-diaspora-advantage',
    photo: 'photo-1480714378408-67cf0d13bc1b', // city bridge at night, two worlds
    desc: 'City at night — diaspora, between worlds',
  },
  {
    slug: 'conversations-that-go-somewhere',
    photo: 'photo-1521590832167-7bcbfaa6381f', // two people in coffee shop, genuine conversation
    desc: 'Coffee conversation — genuine dialogue',
  },
  {
    slug: 'small-habits-that-compound',
    photo: 'photo-1507525428034-b723cf961d3e', // long empty beach path stretching to horizon
    desc: 'Long path to horizon — compounding over time',
  },
]

async function downloadImage(photoId, dest) {
  const url = `https://images.unsplash.com/${photoId}?w=1200&h=630&fit=crop&q=85`
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest)
    httpsGet(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close()
        httpsGet(res.headers.location, (res2) => {
          res2.pipe(file)
          file.on('finish', () => { file.close(); resolve() })
        }).on('error', reject)
      } else {
        res.pipe(file)
        file.on('finish', () => { file.close(); resolve() })
      }
    }).on('error', (err) => { unlinkSync(dest); reject(err) })
  })
}

async function run() {
  // Fetch all posts to get their IDs
  const posts = await client.fetch(
    `*[_type == "post" && defined(slug.current)]{_id, "slug": slug.current}`
  )
  const postMap = {}
  posts.forEach(p => { postMap[p.slug] = p._id })

  for (const cover of covers) {
    const postId = postMap[cover.slug]
    if (!postId) {
      console.log(`⚠️  Post not found: ${cover.slug}`)
      continue
    }

    const tmpFile = join(tmpdir(), `cover-${cover.slug}.jpg`)
    process.stdout.write(`⬇  Downloading image for "${cover.slug}"...`)

    try {
      await downloadImage(cover.photo, tmpFile)
      process.stdout.write(' ✓\n')
    } catch (err) {
      console.error(` ✗ Download failed: ${err.message}`)
      continue
    }

    process.stdout.write(`⬆  Uploading to Sanity...`)
    try {
      const imageAsset = await client.assets.upload('image', readFileSync(tmpFile), {
        filename: `${cover.slug}.jpg`,
        contentType: 'image/jpeg',
      })

      await client.patch(postId).set({
        cover_image: {
          _type: 'image',
          asset: { _type: 'reference', _ref: imageAsset._id },
          hotspot: { x: 0.5, y: 0.5, height: 1, width: 1 },
        },
      }).commit()

      console.log(` ✓  (asset: ${imageAsset._id})`)
      unlinkSync(tmpFile)
    } catch (err) {
      console.error(` ✗ Upload failed: ${err.message}`)
    }
  }

  console.log('\nAll done.')
}

run().catch(console.error)
