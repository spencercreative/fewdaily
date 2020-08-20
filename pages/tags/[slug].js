import { useRouter } from 'next/router'
import MetaHead from 'components/MetaHead'
import PostList from 'components/PostList'
import ListSearch from 'components/ListSearch'
import MainLayout from 'layouts/MainLayout'
import { getAllPostsWithTag, getAllTags } from 'lib/api'
import { getCurrentDay, dayTitle } from 'lib/helpers'

export default function Post({posts, slug}) {
    const router = useRouter()

    if (!router.isFallback && posts.tag == 0) {
        return <ErrorPage statusCode={404} />
    }

    return (
        <>
            {router.isFallback ? (
                <div>Loading...</div>
            ) : (
                <MainLayout day={getCurrentDay()}>
                    <article className="mx-auto">
                        <MetaHead title={'Posts tagged with "' + slug + '"'} description={'All posts tagged with "' + dayTitle(slug) + '"'} day={getCurrentDay()} type="article" />
                        <h1 className="text-3xl text-center mt-0 mb-8 font-bold">Post{posts.length > 1 && 's'} Tagged with "{slug}"</h1>
                        {posts.length > 0 && 
                            <>
                            <ListSearch/>
                            <PostList posts={posts} count={posts.length}/>
                            </>
                        }
                    </article>
                </MainLayout>
            )}
        </>
    )
}

export async function getStaticPaths() {
    const posts = getAllTags()

    return {
        paths: posts.map((tag) => {
            return {
                params: {
                    slug: tag.slug,
                },
            }
        }),
        fallback: false,
    }
}
  
export async function getStaticProps({ params }) {
    const posts = getAllPostsWithTag(params.slug)

    return {
        props: {
            posts,
            slug: params.slug
        },
    }
}