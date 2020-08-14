import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import ErrorPage from 'next/error'
import MainLayout from 'layouts/MainLayout'
import Sponsor from 'components/Sponsor'
import { getPostBySlug, getAllPosts } from 'lib/api'
import markdownToHtml from 'lib/markdownToHtml'
import { theNamedDay, stringToSlug, splitSections, makeExcerpt } from 'lib/helpers'
import { FiFacebook, FiInstagram, FiTwitter, FiMail, FiLink, FiCopy, FiMic } from 'react-icons/fi'

const SocialShare = (props) => (
    <li className="mr-2">
        <a href="#" className="inline-block" title={props.title}>
            <span>{props.icon}</span>
            <span className="sr-only">{props.title}</span>
        </a>
    </li>
)

const AssetsLink = (props) => (
    <li className="ml-2">
        <a href="#" className="inline-block" title={props.title} onClick={props.onClick}>
            <span>{props.icon}</span>
            <span className="sr-only">{props.title}</span>
        </a>
    </li>
)

function toggleAssets(e) {
    e.preventDefault()
    var socialAssets = document.getElementById('assets')

    if ( socialAssets.classList.contains('hidden') ) {
        socialAssets.classList.remove('hidden')
        socialAssets.classList.add('flex')
    } else {
        socialAssets.classList.add('hidden')
        socialAssets.classList.remove('flex')
    }
}

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
                                        <Link href={'/tags/' + stringToSlug(tag)} key={stringToSlug(tag)}><a className="mr-3 inline-block">{tag}</a></Link>
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
                                    <SocialShare title="Facebook" icon={<FiFacebook/>} />
                                    <SocialShare title="Instagram" icon={<FiInstagram/>} />
                                    <SocialShare title="Twitter" icon={<FiTwitter/>} />
                                    <SocialShare title="Email" icon={<FiMail/>} />
                                    <SocialShare title="Link to Post" icon={<FiLink/>} />
                                </ul>
                            </div>
                            <div>
                                <p className="mb-1 text-xs text-right">Assets</p>
                                <ul className="flex flex-wrap">
                                    <AssetsLink title="Social Assets" icon={<FiCopy/>} onClick={toggleAssets} />
                                    <AssetsLink title="Audio Script" icon={<FiMic/>} />
                                </ul>
                            </div>
                        </footer>
                    </article>
                    <section id="assets" className="hidden flex-wrap mt-10 gap-10 overflow-x-auto justify-center">
                        
                        <div className={'instagram p-10 flex font-bold text-sm relative' + ' bg-' + theNamedDay([post.slug])} style={{width: '500px', height: '500px'}}>
                            <span className="absolute top-0 left-0 py-8 px-10 text-xs uppercase">Front-End Web Daily</span>
                            <span className="absolute top-0 right-0 py-8 px-10 text-xs uppercase">{post.slug}</span>
                            <div>
                                <h3 className="m-0 uppercase text-5xl my-6">{post.title}</h3>
                                {makeExcerpt(post.content).split(', ').map((element, index) =>
                                    <h4 className="text-xl mt-0 mb-3">{element}</h4>
                                )}
                            </div>
                            <span className="absolute bottom-0 left-0 py-8 px-10 text-xs uppercase">More at fewdaily.com</span>
                            <span className="absolute bottom-0 right-0 py-8 px-10 text-xs uppercase">@fewdaily</span>
                        </div>

                        {splitSections(post.renderedContent).map((element, index) =>
                            <div key={index} className={'instagram p-10 font-bold text-sm relative' + ' bg-' + theNamedDay([post.slug])} style={{width: '500px', height: '500px'}}>
                                <span className="absolute top-0 left-0 py-8 px-10 text-xs uppercase">Front-End Web Daily</span>
                                <span className="absolute top-0 right-0 py-8 px-10 text-xs uppercase">{post.slug}</span>
                                <div dangerouslySetInnerHTML={{__html: element}} />
                                <span className="absolute bottom-0 left-0 py-8 px-10 text-xs uppercase">More at fewdaily.com</span>
                                <span className="absolute bottom-0 right-0 py-8 px-10 text-xs uppercase">@fewdaily</span>
                            </div>
                        )}
                        
                        <div className={'instagram p-10 flex font-bold text-sm relative' + ' bg-' + theNamedDay([post.slug])} style={{width: '500px', height: '500px'}}>
                            <span className="absolute top-0 left-0 py-8 px-10 text-xs uppercase">Front-End Web Daily</span>
                            <span className="absolute top-0 right-0 py-8 px-10 text-xs uppercase">{post.slug}</span>
                            <div className="flex-1 flex items-center">
                                <h3 className="m-0 uppercase text-5xl">Check Back Tomorrow</h3>
                            </div>
                            <span className="absolute bottom-0 left-0 py-8 px-10 text-xs uppercase">More at fewdaily.com</span>
                            <span className="absolute bottom-0 right-0 py-8 px-10 text-xs uppercase">@fewdaily</span>
                        </div>
                    </section>
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