import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { stringToSlug } from 'lib/helpers'

const postsDirectory = join(process.cwd(), '_posts')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items = {}

  //Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPosts(fields = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.slug > post2.slug ? '-1' : '1'))

  if ( process.env.NODE_ENV !== 'development' ) {
    for ( var i = posts.length -1; i >= 0; i-- ) {

      var postDate = new Date(posts[i].slug)
      var today = new Date().setHours(0,0,0,0)

      if ( postDate > today ) {
        posts.splice(i, 1)
      }

    }
  }

  return posts
}


// Tags

export function getAllTags() {
  var tagsList = []

  const posts = getAllPosts([
    'title',
    'slug',
    'excerpt',
    'content',
    'tags',
  ])

  posts.forEach(post => {
    var tags = post.tags

    tags.forEach(tag => {

        var slug = stringToSlug(tag)
        const { length } = tagsList
        const id = length + 1
        const found = tagsList.some(el => el.slug === slug)

        if (!found) tagsList.push({slug: slug, name: tag})
    })
  })

  tagsList.sort(function(a, b) {
    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
    var nameB = b.name.toUpperCase(); // ignore upper and lowercase

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  
    // names must be equal
    return 0;
  });

  return tagsList
}

export function getAllPostsWithTag(passedTag) {
  var posts = getAllPosts([
    'title',
    'slug',
    'excerpt',
    'content',
    'tags',
  ])

  for ( var i = posts.length -1; i >= 0; i-- ) {

    var tags = posts[i].tags

    var slugTags = []

    for ( var x = tags.length -1; x >= 0; x-- ) {
      
      slugTags.push((stringToSlug(tags[x])))
      
    }

    if (slugTags.includes(passedTag) !== true) {
      posts.splice(i, 1)
    }

  }

  return posts
}