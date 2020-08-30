import Link from 'next/link'
import MainLayout from 'layouts/MainLayout'
import { getCurrentDay } from 'lib/helpers'
import { getAllPosts } from 'lib/api'
import PostList from 'components/PostList'
import ListSearch from 'components/ListSearch'
import MetaHead from 'components/MetaHead'
import Sponsor from 'components/Sponsor'
import { FiArrowRight } from 'react-icons/fi'

const postListMax = 20

export default function Home({ allPosts }) {

    return (
        <MainLayout day={getCurrentDay()}>
            <MetaHead day={getCurrentDay()}/>
            <Sponsor/>
            {allPosts.length > 0 && 
                <>
                <ListSearch/>
                <PostList posts={allPosts.slice(0,postListMax)} count={allPosts.length > postListMax ? postListMax + '+' : allPosts.slice(0,postListMax).length} featured={1}/>
                {allPosts.length > postListMax &&
                <div className="flex justify-center py-4">
                    <Link href="/all"><a className="text-lg flex items-center">View All Posts<FiArrowRight className="ml-1"/></a></Link>
                </div>
                }
                </>
            }
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