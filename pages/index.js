import MainLayout from 'layouts/MainLayout'
import { day } from 'utils/getDay'
import { getAllPosts } from 'lib/api'
import PostList from 'components/PostList'

export default function Home({ allPosts }) {

    return (
        <MainLayout day={day}>
            {allPosts.length > 0 && <PostList posts={allPosts}/>}
        </MainLayout>
    )
}

export async function getStaticProps() {
    const allPosts = getAllPosts([
        'title',
        'slug',
        'content',
        'tags',
    ])
  
    return {
      props: { allPosts },
    }
  }