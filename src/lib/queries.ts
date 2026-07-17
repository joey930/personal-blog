export const allPostsQuery = `*[_type == "post"] | order(published_at desc) {
  _id, title_en, title_ko, slug, category, cover_image, author_note, published_at
}`

export const featuredPostQuery = `*[_type == "post"] | order(published_at desc)[0] {
  _id, title_en, title_ko, slug, category, cover_image, body_en, body_ko, author_note, published_at
}`

export const postsByCategoryQuery = `*[_type == "post" && category == $category] | order(published_at desc) {
  _id, title_en, title_ko, slug, category, cover_image, author_note, published_at
}`

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id, title_en, title_ko, slug, category, cover_image, body_en, body_ko, author_note, published_at
}`

export const aboutQuery = `*[_type == "about"][0] { bio_en, bio_ko, photo }`

export const searchQuery = `*[_type == "post" && (
  title_en match $q || title_ko match $q
)] | order(published_at desc) {
  _id, title_en, title_ko, slug, category, cover_image, published_at
}`
