import MainLayout from 'layouts/MainLayout'
import { getCurrentDay } from 'lib/helpers'
import { getAllPosts } from 'lib/api'
import PostList from 'components/PostList'
import MetaHead from 'components/MetaHead'
import Sponsor from 'components/Sponsor'

export default function Home({ allPosts }) {

    return (
        <MainLayout day={getCurrentDay()}>
            <MetaHead/>
            <Sponsor/>
            {allPosts.length > 0 && <PostList posts={allPosts}/>}
        </MainLayout>
    )
}

export async function getStaticProps() {
    const allPosts = getAllPosts([
        'title',
        'slug',
        'excerpt',
        'content',
        'tags',
    ])
  
    return {
      props: { allPosts },
    }
  }