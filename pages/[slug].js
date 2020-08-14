import { useRouter } from 'next/router'
import Link from 'next/link'
import ErrorPage from 'next/error'
import MainLayout from 'layouts/MainLayout'
import Sponsor from 'components/Sponsor'
import Head from 'next/head'
import { getPostBySlug, getAllPosts } from 'lib/api'
import markdownToHtml from 'lib/markdownToHtml'
import { theNamedDay, stringToSlug, splitSections } from 'lib/helpers'

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
                <MainLayout day={theNamedDay([post.slug])}>
                    <article className="max-w-3xl mx-auto">
                        {console.log(splitSections(post.content))}
                        <Head>
                            <title>
                                {post.title} {post.slug} | Front-End Web Daily
                            </title>
                        </Head>
                        <header>
                            <p className="mb-0 font-bold text-lg">{post.slug}</p>
                            <h1 className="my-0 uppercase">{post.title}</h1>
                            {post.tags !== undefined &&
                                <p>
                                    {post.tags.map((tag) => 
                                        <Link href={'/tags/' + stringToSlug(tag)} key={stringToSlug(tag)}><a className="mr-3 inline-block">{tag}</a></Link>
                                    )}
                                </p>
                            }
                        </header>
                        <Sponsor day={theNamedDay([post.slug])}/>
                        <div className="mt-16" dangerouslySetInnerHTML={{__html: post.content}} />
                        <footer>
                            <div></div>
                            <div>
                                <button></button>
                            </div>
                        </footer>
                    </article>
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