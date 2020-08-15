import { useRouter } from 'next/router'
import RenderAsImage from 'react-render-as-image'
import Head from 'next/head'
import Link from 'next/link'
import ErrorPage from 'next/error'
import MainLayout from 'layouts/MainLayout'
import { getPostBySlug, getAllPosts } from 'lib/api'
import markdownToHtml from 'lib/markdownToHtml'
import { theNamedDay, splitSections, makeExcerpt, dayTitle } from 'lib/helpers'

function SocialImage(props) {
    const cornerStyles = [ 'absolute', 'py-8', 'px-10', 'text-2xs' ]

    return (
        <div style={{maxWidth: props.width}} className="inline-block text-left">
            <RenderAsImage>
                <div className={'instagram p-10 flex font-bold text-sm relative' + ' bg-' + theNamedDay([props.post.slug])} style={{width: props.width, height: props.height}}>
                    <span className={'top-0 left-0 uppercase' + ' ' + cornerStyles.join(' ')}>Front-End Web Daily</span>
                    <span className={'top-0 right-0 uppercase' + ' ' + cornerStyles.join(' ')}>{props.post.slug}</span>
                    <div className={props.className !== undefined && props.className}>
                        {props.children}
                    </div>
                    <span className={'bottom-0 left-0 uppercase' + ' ' + cornerStyles.join(' ')}>More at fewdaily.com</span>
                    <span className={'bottom-0 right-0' + ' ' + cornerStyles.join(' ')}>@fewdaily</span>
                </div>
            </RenderAsImage>
        </div>
    )
}

export default function Assets({post}) {
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
                    <article id="assets">
                        <Head>
                            <title>
                                {post.slug} Assets | Front-End Web Daily
                            </title>
                            <meta name="description" content={makeExcerpt(post.content)} />
                        </Head>

                        <div className="text-center text-sm">
                            <Link href={'/' + post.slug}><a>Back to {post.slug} post</a></Link>
                        </div>
                        
                        <h3 className="text-center">Square</h3>

                        <div className="text-center">
                            <SocialImage post={post} width="500px" height="500px">
                                <h3 className="m-0 uppercase text-4xl my-6">{dayTitle(post.slug)}</h3>
                                {makeExcerpt(post.content).split(', ').map((element, index) =>
                                    <h4 className="text-xl mt-0 mb-3" key={index}>{element}</h4>
                                )}
                            </SocialImage>

                            {splitSections(post.renderedContent).map((element, index) =>
                                <SocialImage post={post} width="500px" height="500px" key={index}>
                                    <div dangerouslySetInnerHTML={{__html: element}} />
                                </SocialImage>
                            )}

                            <SocialImage post={post} width="500px" height="500px">
                                <div className="h-full flex items-center">
                                    <h3 className="m-0 uppercase text-4xl">Check Back Tomorrow</h3>
                                </div>
                            </SocialImage>
                        </div>

                        <div className="flex justify-center my-8">
                            <button>Download Square Files</button>
                        </div>

                        <hr/>
                        
                        <h3 className="text-center">Tall</h3>

                        <div className="text-center">
                            <SocialImage post={post} width="360px" height="640px">
                                <h3 className="m-0 uppercase text-3xl my-6">{dayTitle(post.slug)}</h3>
                                {makeExcerpt(post.content).split(', ').map((element, index) =>
                                    <h4 className="text-base mt-0 mb-3" key={index}>{element}</h4>
                                )}
                            </SocialImage>

                            {splitSections(post.renderedContent).map((element, index) =>
                                <SocialImage post={post} width="360px" height="640px" key={index}>
                                    <div dangerouslySetInnerHTML={{__html: element}} />
                                </SocialImage>
                            )}

                            <SocialImage post={post} width="360px" height="640px">
                                <div className="h-full flex items-center">
                                    <h3 className="m-0 uppercase text-3xl">Check Back Tomorrow</h3>
                                </div>
                            </SocialImage>
                        </div>

                        <div className="flex justify-center my-8">
                            <button>Download Tall Files</button>
                        </div>

                        <hr/>
                        
                        <h3 className="text-center">Wide</h3>

                        <div className="text-center">
                            <SocialImage post={post} width="640px" height="360px" className="flex-1">
                                <div className="h-full flex items-center w-full">
                                    <h3 className="m-0 uppercase text-3xl my-6 w-1/2">{dayTitle(post.slug)}</h3>
                                    <div>
                                        {makeExcerpt(post.content).split(', ').map((element, index) =>
                                            <h4 className="text-base mt-0 mb-3" key={index}>{element}</h4>
                                        )}
                                    </div>
                                </div>
                            </SocialImage>

                            {splitSections(post.renderedContent).map((element, index) =>
                                <SocialImage className="flex" post={post} width="640px" height="360px" key={index}>
                                    <div dangerouslySetInnerHTML={{__html: element}} />
                                </SocialImage>
                            )}

                            <SocialImage post={post} width="640px" height="360px" className="flex-1">
                                <div className="h-full flex items-center w-full">
                                    <h3 className="m-0 uppercase text-3xl w-full">Check Back Tomorrow</h3>
                                </div>
                            </SocialImage>
                        </div>

                        <div className="flex justify-center my-8">
                            <button>Download Wide Files</button>
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