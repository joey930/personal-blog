const categoryFields = `category->{ _id, name_en, name_ko, "slug": slug.current }`

export const allPostsQuery = `*[_type == "post"] | order(published_at desc) {
  _id, title_en, title_ko, slug, ${categoryFields}, cover_image, author_note, published_at
}`

export const featuredPostQuery = `*[_type == "post"] | order(published_at desc)[0] {
  _id, title_en, title_ko, slug, ${categoryFields}, cover_image, body_en, body_ko, author_note, published_at
}`

export const postsByCategorySlugQuery = `*[_type == "post" && category->slug.current == $slug] | order(published_at desc) {
  _id, title_en, title_ko, slug, ${categoryFields}, cover_image, author_note, published_at
}`

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id, title_en, title_ko, slug, ${categoryFields}, cover_image, body_en, body_ko, author_note, published_at
}`

export const aboutQuery = `*[_type == "about"][0] { bio_en, bio_ko, photo }`

export const allCategoriesQuery = `*[_type == "category"] | order(name_en asc) {
  _id, name_en, name_ko, "slug": slug.current
}`

export const searchQuery = `*[_type == "post" && (
  title_en match $q || title_ko match $q
)] | order(published_at desc) {
  _id, title_en, title_ko, slug, ${categoryFields}, cover_image, published_at
}`

// Keep for backwards compatibility
export const postsByCategoryQuery = postsByCategorySlugQuery
