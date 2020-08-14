import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import MainLayout from 'layouts/main'
import Sponsor from 'components/Sponsor'
import Head from 'next/head'
import { getPostBySlug, getAllPosts } from 'lib/api'
import markdownToHtml from 'lib/markdownToHtml'

export default function Post({post}) {
    const router = useRouter()

    if (!router.isFallback && !post?.slug) {
        return <ErrorPage statusCode={404} />
    }

    return (
        <>
            {router.isFallback ? (
                <div>Loading...</div>
            ) : (
                <MainLayout day={post.day}>
                    <article>
                        <Head>
                            <title>
                                {post.title} {post.slug} | Front-End Web Daily
                            </title>
                        </Head>
                        <p className="mb-0 font-bold text-lg">{post.slug}</p>
                        <h1 className="leading-tight uppercase">{post.title}</h1>
                        <div className="mt-20" dangerouslySetInnerHTML={{__html: post.content}} />
                    </article>
                    <Sponsor day={post.day}/>
                </MainLayout>
            )}
        </>
    )
}

export async function getStaticPaths() {
    const posts = getAllPosts(['slug'])

    return {
        paths: posts.map((post) => {
            return {
                params: {
                    slug: post.slug,
                },
            }
        }),
        fallback: false,
    }
}
  
export async function getStaticProps({ params }) {
    const post = getPostBySlug(params.slug, [
        'title',
        'slug',
        'day',
        'content',
        'tags',
    ])
    const content = await markdownToHtml(post.content || '')

    return {
        props: {
        post: {
            ...post,
            content,
        },
        },
    }
}