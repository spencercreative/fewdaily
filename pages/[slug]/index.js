import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import ErrorPage from 'next/error'
import MainLayout from 'layouts/MainLayout'
import Sponsor from 'components/Sponsor'
import { getPostBySlug, getAllPosts } from 'lib/api'
import { socialShares } from 'lib/socialShares'
import markdownToHtml from 'lib/markdownToHtml'
import { theNamedDay, stringToSlug, makeExcerpt, dayTitle, theDateString } from 'lib/helpers'
import { FiFacebook, FiLinkedin, FiTwitter, FiMail, FiCopy, FiMic, FiPrinter } from 'react-icons/fi'

const SocialShare = (props) => (
    <li className="mr-2">
        <button className="inline-block" title={props.title} onClick={props.onClick}>
            <span>{props.icon}</span>
            <span className="sr-only">{props.title}</span>
        </button>
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

    if (typeof window !== "undefined") {
        var url = window.location.href
        var hostname = window.location.hostname
    } else {
        var url = null
        var hostname = null
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
                                {dayTitle(post.slug)} | {theDateString(post.slug)} | Front-End Web Daily
                            </title>
                            <meta
                                name="description"
                                content={post.excerpt !== undefined ? post.excerpt : makeExcerpt(post.content)} />
                        </Head>
                        
                        <header>
                            <p className="mb-0 font-bold text-sm">{theDateString(post.slug)}</p>
                            <h1 className="my-0 uppercase">{dayTitle(post.slug)}</h1>
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
                                    <SocialShare title="Facebook" icon={<FiFacebook/>} onClick={(socialShares('facebook', router.asPath))} />
                                    <SocialShare title="Twitter" icon={<FiTwitter/>} onClick={socialShares('twitter', router.asPath)} />
                                    <SocialShare title="LinkedIn" icon={<FiLinkedin/>} onClick={socialShares('linkedin', router.asPath)} />
                                    <SocialShare title="Email" icon={<FiMail/>} onClick={'mailto:?body=' + router.asPath} />
                                    <SocialShare title="Link to Post" icon={<FiPrinter/>} onClick={'#'} />
                                </ul>
                            </div>
                            <div>
                                <p className="mb-1 text-xs text-right">Assets</p>
                                <ul className="flex flex-wrap">
                                    {theNamedDay([post.slug]) !== 'tuesday' && <AssetsLink title="Social Assets" icon={<FiCopy/>} link={'/' + post.slug + '/assets'} internal={true} />}
                                    <AssetsLink title="Audio Script" icon={<FiMic/>} link={'/' + post.slug + '/script'} internal={true} />
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
        'excerpt',
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