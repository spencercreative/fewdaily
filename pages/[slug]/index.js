import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import ErrorPage from 'next/error'
import MainLayout from 'layouts/MainLayout'
import Sponsor from 'components/Sponsor'
import { getPostBySlug, getAllPosts } from 'lib/api'
import markdownToHtml from 'lib/markdownToHtml'
import { theNamedDay, stringToSlug, splitSections, makeExcerpt } from 'lib/helpers'
import { FiFacebook, FiLinkedin, FiTwitter, FiMail, FiLink, FiCopy, FiMic } from 'react-icons/fi'

const SocialShare = (props) => (
    <li className="mr-2">
        <a href={props.link} className="inline-block" title={props.title}>
            <span>{props.icon}</span>
            <span className="sr-only">{props.title}</span>
        </a>
    </li>
)

const AssetsLink = (props) => (
    <>
    {props.internal !== true ? (
        <li className="ml-2">
            <a href={props.link} className="inline-block" title={props.title} onClick={props.onClick}>
                <span>{props.icon}</span>
                <span className="sr-only">{props.title}</span>
            </a>
        </li>
    ) : (
        <li className="ml-2">
            <Link href={props.link}>
                <a className="inline-block" title={props.title} onClick={props.onClick}>
                    <span>{props.icon}</span>
                    <span className="sr-only">{props.title}</span>
                </a>
            </Link>
        </li>
    )}
    </>
)

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
                                {post.title} | {post.slug} | Front-End Web Daily
                            </title>
                            <meta name="description" content={makeExcerpt(post.content)} />
                        </Head>
                        
                        <header>
                            <p className="mb-0 font-bold text-lg">{post.slug}</p>
                            <h1 className="my-0 uppercase">{post.title}</h1>
                            {post.tags !== undefined &&
                                <p>
                                    {post.tags.map((tag) => 
                                        <Link href={'/tags/' + stringToSlug(tag)} key={stringToSlug(tag)}><a className="mr-3 inline-block text-sm">{tag}</a></Link>
                                    )}
                                </p>
                            }
                        </header>

                        <Sponsor day={theNamedDay([post.slug])}/>

                        <div className="mt-16" dangerouslySetInnerHTML={{__html: post.renderedContent}} />

                        <footer className="border-t border-solid border-gray py-4 flex justify-between">
                            <div>
                                <p className="mb-1 text-xs">Share</p>
                                <ul className="flex flex-wrap">
                                    <SocialShare title="Facebook" icon={<FiFacebook/>} link={'#'} />
                                    <SocialShare title="Twitter" icon={<FiTwitter/>} link={'#'} />
                                    <SocialShare title="LinkedIn" icon={<FiLinkedin/>} link={'#'} />
                                    <SocialShare title="Email" icon={<FiMail/>} link={'#'} />
                                    <SocialShare title="Link to Post" icon={<FiLink/>} link={'#'} />
                                </ul>
                            </div>
                            <div>
                                <p className="mb-1 text-xs text-right">Assets</p>
                                <ul className="flex flex-wrap">
                                    <AssetsLink title="Social Assets" icon={<FiCopy/>} link={'/' + post.slug + '/assets'} internal={true} />
                                    <AssetsLink title="Audio Script" icon={<FiMic/>} link={'#'} />
                                </ul>
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
        'podcast',
        'content',
        'tags',
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