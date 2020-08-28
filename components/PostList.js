import Link from 'next/link'
import { theNamedDay, stringToSlug, makeExcerpt, dayTitle, listDate, getCurrentDay } from 'lib/helpers'
import { sponsors } from 'lib/sponsors'

function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array.slice(0,1);
}

export default function PostList( props ) {
    
    if ( props.featured !== undefined ) {
        var featuredPosts = props.posts.slice(0,props.featured)
        var posts = props.posts.slice(props.featured)
    } else {
        var posts = props.posts
    }

    return (
        <>
        <p className="mt-0 mb-1 text-xs text-right">{props.count} post{ props.count > 1 && 's' }</p>
        <ul id="postList" className="border-t border-solid border-gray">
            { props.featured !== undefined && featuredPosts.map((post) =>
                <li className={'flex flex-col items-center featured post-list-item text-center text-xl py-8 border-b border-solid border-gray' + ' ' + theNamedDay(post.slug)} key={post.slug}>
                    <p className="mb-0 text-base font-bold">
                        {listDate(post.slug)}
                    </p>
                    <Link href={'/' + post.slug}><a className="font-black text-4xl">{dayTitle(post.slug)}</a></Link>
                    <p className="my-4 text-xl max-w-3xl mx-auto">
                        { theNamedDay(post.slug) !== 'tuesday' ? makeExcerpt(post.content) : post.excerpt }
                    </p>
                    {post.tags !== undefined &&
                        <div className="flex flex-wrap justify-center">
                            {post.tags.map((tag) => 
                                <Link href={'/tags/' + stringToSlug(tag)} key={stringToSlug(tag)}><a className="mr-3 md:ml-3 md:mr-0 text-lg md:text-base">{tag}</a></Link>
                            )}
                        </div>
                    }
                </li>
            )}
            {posts.map((post, i) =>
                ( typeof sponsors != "undefined" && sponsors != null && sponsors.length != null
                && sponsors.length > 0 && (i + 1) % 7 === 0) ? (
                    <>
                    {shuffleArray(sponsors).map((sponsor, i) => 
                        <li className={'post-list-item flex flex-col md:flex-row justify-between md:items-center text-xl py-3 border-b border-solid border-gray' + ' ' + getCurrentDay()} key={i}>
                            <div className="mb-4 md:mr-4 md:mb-0">
                                <p className="mb-0 text-xs font-bold">Sponsored</p>
                                <a className="font-black text-2xl" href="https://spencercreative.co" target="_blank">
                                    {sponsor.name}
                                </a>
                                <p className="mb-0 text-base">
                                {sponsor.message}
                                </p>
                            </div>
                        </li>
                    )}
                    <li className={'post-list-item flex flex-col md:flex-row justify-between md:items-center text-xl py-3 border-b border-solid border-gray' + ' ' + theNamedDay(post.slug)} key={post.slug}>
                        <div className="mb-4 md:mr-4 md:mb-0">
                            <p className="mb-0 text-xs font-bold">
                                {listDate(post.slug)}
                            </p>
                            <Link href={'/' + post.slug}><a className="font-black text-2xl">{dayTitle(post.slug)}</a></Link>
                            <p className="mb-0 text-base">
                                { theNamedDay(post.slug) !== 'tuesday' ? makeExcerpt(post.content) : post.excerpt }
                            </p>
                        </div>
                        {post.tags !== undefined &&
                            <div className="flex flex-wrap md:justify-end md:max-w-xs">
                                {post.tags.map((tag) => 
                                    <Link href={'/tags/' + stringToSlug(tag)} key={stringToSlug(tag)}><a className="mr-3 md:ml-3 md:mr-0 text-lg md:text-base">{tag}</a></Link>
                                )}
                            </div>
                        }
                    </li>
                    </>
                ) : (
                    <li className={'post-list-item flex flex-col md:flex-row justify-between md:items-center text-xl py-3 border-b border-solid border-gray' + ' ' + theNamedDay(post.slug)} key={post.slug}>
                        <div className="mb-4 md:mr-4 md:mb-0">
                            <p className="mb-0 text-xs font-bold">
                                {listDate(post.slug)}
                            </p>
                            <Link href={'/' + post.slug}><a className="font-black text-2xl">{dayTitle(post.slug)}</a></Link>
                            <p className="mb-0 text-base">
                                { theNamedDay(post.slug) !== 'tuesday' ? makeExcerpt(post.content) : post.excerpt }
                            </p>
                        </div>
                        {post.tags !== undefined &&
                            <div className="flex flex-wrap md:justify-end md:max-w-xs">
                                {post.tags.map((tag) => 
                                    <Link href={'/tags/' + stringToSlug(tag)} key={stringToSlug(tag)}><a className="mr-3 md:ml-3 md:mr-0 text-lg md:text-base">{tag}</a></Link>
                                )}
                            </div>
                        }
                    </li>
                )
            )}
        </ul>
        </>
    )
}