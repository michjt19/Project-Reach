import lunr from 'lunr'

export interface Resource {
  name: string
  description: string
  category: string
  url: string
  free: boolean
  national: boolean
}

/** Build a Lunr search index over a resource list. */
export function buildResourceIndex(resources: Resource[]): lunr.Index {
  return lunr(function () {
    this.field('name', { boost: 10 })
    this.field('description')
    this.field('category', { boost: 5 })
    this.ref('name')
    resources.forEach((r) => {
      this.add({ name: r.name, description: r.description, category: r.category })
    })
  })
}
