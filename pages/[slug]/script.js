import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import ErrorPage from 'next/error'
import MainLayout from 'layouts/MainLayout'
import { getPostBySlug, getAllPosts } from 'lib/api'
import markdownToHtml from 'lib/markdownToHtml'
import { theNamedDay, makeExcerpt, dayTitle, theDateString, transcriptText } from 'lib/helpers'

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
                    <article className="max-w-4xl mx-auto">
                        <Head>
                            <title>
                                Audio Script for {theDateString(post.slug)} | Front-End Web Daily
                            </title>
                            <meta name="description" content={makeExcerpt(post.content)} />
                        </Head>
                        
                        <header>
                            <p className="mb-0 font-bold text-sm"><Link href={'/' + post.slug}><a>{theDateString(post.slug)}</a></Link></p>
                            <h1 className="my-0 uppercase">Audio Script</h1>
                        </header>

                        <div className="mt-16">
                            <p>Today is <span>{theDateString(post.slug)}</span> and for this <span>{dayTitle(post.slug)}</span> episode we're covering <span className="lowercase">{makeExcerpt(post.content)}</span>. Let's dive in!</p>
                            <div dangerouslySetInnerHTML={{__html: transcriptText(post.renderedContent)}} />
                            <p>----</p>
                            <p>Want to know more? Head to <a href="https://fewdaily.com">fewdaily.com</a> for more of today’s topics and other front-end web content! That's all for today, tune in tomorrow!</p>
                        </div>

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
        'slug',
        'content',
    ])
    const renderedContent = await markdownToHtml(post.content || '')

    return {
        props: {
        post: {
            ...post,
            renderedContent,
        },
        },
    }
}