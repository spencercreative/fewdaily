import MainLayout from 'layouts/MainLayout'
import Head from 'next/head'
import { getCurrentDay } from 'lib/helpers'
import { getAllPosts } from 'lib/api'
import PostList from 'components/PostList'
import Sponsor from 'components/Sponsor'

export default function Home({ allPosts }) {

    return (
        <MainLayout day={getCurrentDay()}>
            <Head>
                <title>Front-End Web Daily | News, tips and more delivered daily</title>
            </Head>
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