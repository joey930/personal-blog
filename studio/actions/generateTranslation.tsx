import { useDocumentOperation } from 'sanity'
import { useState } from 'react'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.SANITY_STUDIO_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true,
})

export function GenerateTranslationAction(props: any) {
  const { patch, commit } = useDocumentOperation(props.id, props.type)
  const [isLoading, setIsLoading] = useState(false)
  const doc = props.draft || props.published

  if (!doc || doc._type !== 'post') return null

  const hasEnglish = doc.title_en && doc.body_en?.length > 0
  const hasKorean = doc.title_ko && doc.body_ko?.length > 0

  // Only show if one language is missing
  const sourceLang = hasEnglish && !hasKorean ? 'en' : hasKorean && !hasEnglish ? 'ko' : null
  if (!sourceLang) return null

  const label = sourceLang === 'en' ? 'Generate Korean Translation' : 'Generate English Translation'
  const targetLang = sourceLang === 'en' ? 'ko' : 'en'

  return {
    label: isLoading ? 'Translating...' : label,
    disabled: isLoading,
    onHandle: async () => {
      setIsLoading(true)
      try {
        const sourceTitle = sourceLang === 'en' ? doc.title_en : doc.title_ko
        const sourceBody = JSON.stringify(sourceLang === 'en' ? doc.body_en : doc.body_ko)

        const response = await client.messages.create({
          model: 'claude-opus-4-7',
          max_tokens: 4096,
          messages: [
            {
              role: 'user',
              content: `Translate this blog post from ${sourceLang === 'en' ? 'English to Korean' : 'Korean to English'}.

Return ONLY valid JSON with exactly two keys: "title" (string) and "body" (Portable Text array, same structure as the input body array).
Do not include any explanation or markdown — just the raw JSON object.

Title: ${sourceTitle}
Body (Portable Text JSON): ${sourceBody}`,
            },
          ],
        })

        const text = response.content[0].type === 'text' ? response.content[0].text : ''
        const jsonMatch = text.match(/\{[\s\S]*\}/)
        if (!jsonMatch) throw new Error('No JSON found in response')
        const parsed = JSON.parse(jsonMatch[0])

        patch.execute([
          { set: { [`title_${targetLang}`]: parsed.title } },
          { set: { [`body_${targetLang}`]: parsed.body } },
        ])
        commit.execute()
      } catch (err) {
        console.error('Translation failed:', err)
      } finally {
        setIsLoading(false)
      }
    },
  }
}
