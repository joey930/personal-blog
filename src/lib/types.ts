export interface Category {
  _id: string
  name_en: string
  name_ko?: string
  slug: string
}

export interface Post {
  _id: string
  title_en: string
  title_ko?: string
  slug: { current: string }
  category: Category
  cover_image?: any
  author_note?: string
  published_at: string
  body_en?: any[]
  body_ko?: any[]
}
