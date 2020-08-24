import { useRouter } from 'next/router'
import RenderAsImage from 'react-render-as-image'
import MetaHead from 'components/MetaHead'
import Link from 'next/link'
import ErrorPage from 'next/error'
import PageLayout from 'layouts/PageLayout'
import { getPostBySlug, getAllPosts } from 'lib/api'
import markdownToHtml from 'lib/markdownToHtml'
import { theNamedDay, splitSections, makeExcerpt, dayTitle, theDateString, zipImages } from 'lib/helpers'

function SocialImage(props) {
    const cornerStyles = 'absolute py-8 px-10 text-3xs whitespace-no-wrap font-black'

    return (
        <div style={{maxWidth: props.width}} className="asset-container inline-block text-left">
            <RenderAsImage>
                <div className={'instagram p-10 flex text-sm relative' + ' bg-' + theNamedDay([props.post.slug])} style={{width: props.width, height: props.height}}>
                    <span className={'top-0 left-0 uppercase' + ' ' + cornerStyles}>Front-End Web Daily</span>
                    <span className={'top-0 right-0 uppercase' + ' ' + cornerStyles}>{theDateString(props.post.slug)}</span>
                    <div className={props.className !== undefined ? props.className : undefined}>
                        {props.children}
                    </div>
                    <span className={'bottom-0 left-0 uppercase' + ' ' + cornerStyles}>More at fewdaily.com</span>
                    <span className={'bottom-0 right-0' + ' ' + cornerStyles}>@fewdaily</span>
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
                <PageLayout day={theNamedDay([post.slug])}>
                    <article id="assets" className="max-w-4xl mx-auto">
                        <MetaHead title={'Assets for ' + theDateString(post.slug)} description={post.excerpt !== undefined ? post.excerpt : makeExcerpt(post.content)} day={theNamedDay([post.slug])} />
                        
                        <header>
                            <p className="mb-0 font-bold text-sm"><Link href={'/' + post.slug}><a>{theDateString(post.slug)}</a></Link></p>
                            <h1 className="my-0 uppercase">Assets</h1>
                        </header>

                        <section>
                        
                            <h3 className="text-center">Square</h3>

                            <div className="text-center" id="square-assets">
                                <SocialImage post={post} width="500px" height="500px">
                                    <h3 className="m-0 uppercase text-4xl my-6">{dayTitle(post.slug)}</h3>
                                    { post.excerpt !== undefined ? (
                                        <h4 className="text-xl mt-0 mb-3">{post.excerpt}</h4>
                                    ) : (
                                        makeExcerpt(post.content).split(', ').map((element, index) =>
                                            <h4 className="text-xl mt-0 mb-3" key={index}>{element.trim()}</h4>
                                    ))}
                                </SocialImage>

                                {post.excerpt === undefined && splitSections(post.renderedContent).map((element, index) =>
                                    <SocialImage post={post} width="500px" height="500px" key={index}>
                                        <div dangerouslySetInnerHTML={{__html: element}} />
                                    </SocialImage>
                                )}

                                <SocialImage post={post} width="500px" height="500px">
                                    <div className="h-full flex items-center">
                                        <h3 className="m-0 uppercase text-4xl">
                                            {post.excerpt !== undefined ? 'View post on our website' : 'Check Back Tomorrow'}
                                        </h3>
                                    </div>
                                </SocialImage>
                            </div>

                            <div className="flex justify-center my-8">
                                <button onClick={() => zipImages('square-assets', post.slug + '_square')}>Download Square Files</button>
                            </div>

                        </section>

                        <hr/>

                        <section>
                        
                            <h3 className="text-center">Tall</h3>

                            <div className="text-center" id="tall-assets">
                                <SocialImage post={post} width="360px" height="640px">
                                    <h3 className="m-0 uppercase text-3xl my-6">{dayTitle(post.slug)}</h3>
                                    { post.excerpt !== undefined ? (
                                        <h4 className="text-xl mt-0 mb-3">{post.excerpt}</h4>
                                    ) : (
                                        makeExcerpt(post.content).split(', ').map((element, index) =>
                                            <h4 className="text-xl mt-0 mb-3" key={index}>{element.trim()}</h4>
                                    ))}
                                </SocialImage>

                                {post.excerpt === undefined && splitSections(post.renderedContent).map((element, index) =>
                                    <SocialImage post={post} width="360px" height="640px" key={index}>
                                        <div dangerouslySetInnerHTML={{__html: element}} />
                                    </SocialImage>
                                )}

                                <SocialImage post={post} width="360px" height="640px">
                                    <div className="h-full flex items-center">
                                        <h3 className="m-0 uppercase text-3xl">
                                            {post.excerpt !== undefined ? 'View post on our website' : 'Check Back Tomorrow'}
                                        </h3>
                                    </div>
                                </SocialImage>
                            </div>

                            <div className="flex justify-center my-8">
                                <button onClick={() => zipImages('tall-assets', post.slug + '_tall')}>Download Tall Files</button>
                            </div>

                        </section>

                        <hr/>

                        <section>
                        
                            <h3 className="text-center">Wide</h3>

                            <div className="text-center" id="wide-assets">
                                <SocialImage post={post} width="640px" height="360px" className="flex-1">
                                    <div className="h-full flex items-center w-full">
                                        <h3 className="mr-10 ml-0 uppercase text-3xl my-6 w-1/2 text-right">{dayTitle(post.slug)}</h3>
                                        <div className="w-1/2">
                                            { post.excerpt !== undefined ? (
                                                <h4 className="text-xl mt-0 mb-3">{post.excerpt}</h4>
                                            ) : (
                                                makeExcerpt(post.content).split(', ').map((element, index) =>
                                                    <h4 className="text-xl mt-0 mb-3" key={index}>{element.trim()}</h4>
                                            ))}
                                        </div>
                                    </div>
                                </SocialImage>

                                {post.excerpt === undefined && splitSections(post.renderedContent).map((element, index) =>
                                    <SocialImage className="flex" post={post} width="640px" height="360px" key={index}>
                                        <div dangerouslySetInnerHTML={{__html: element}} />
                                    </SocialImage>
                                )}

                                <SocialImage post={post} width="640px" height="360px" className="flex-1">
                                    <div className="h-full flex items-center w-full">
                                        <h3 className="m-0 uppercase text-3xl w-full text-center">
                                            {post.excerpt !== undefined ? 'View post on our website' : 'Check Back Tomorrow'}
                                        </h3>
                                    </div>
                                </SocialImage>
                            </div>

                            <div className="flex justify-center my-8">
                                <button onClick={() => zipImages('wide-assets', post.slug + '_wide')}>Download Wide Files</button>
                            </div>

                        </section>

                    </article>
                </PageLayout>
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
        'excerpt',
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