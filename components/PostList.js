import Link from 'next/link'
import { theNamedDay, stringToSlug, makeExcerpt, dayTitle, listDate } from 'lib/helpers'

export default function PostList( props ) {
    return (
        <>
        <p className="mt-0 mb-1 text-xs text-right">{props.count} post{ props.count > 1 && 's' }</p>
        <ul className="border-t border-solid border-gray">
            {props.posts.map((post) =>
                <li className={'post-list-item flex flex-col md:flex-row justify-between md:items-center text-xl py-3 border-b border-solid border-gray' + ' ' + theNamedDay(post.slug)} key={post.slug}>
                    <div className="mb-4 md:mr-4 md:mb-0">
                        <p className="mb-0 text-xs font-bold">
                            {listDate(post.slug)}
                        </p>
                        <Link href={'/' + post.slug}><a className="font-black text-2xl">{dayTitle(post.slug)}</a></Link>
                        { theNamedDay(post.slug) !== 'tuesday' ? (
                            <p className="mb-0 text-base">{makeExcerpt(post.content)}</p>
                        ) : (
                            <p className="mb-0 text-base">{post.excerpt}</p>
                        )
                        }
                    </div>
                    {post.tags !== undefined &&
                        <div className="flex flex-wrap md:justify-end md:max-w-xs">
                            {post.tags.map((tag) => 
                                <Link href={'/tags/' + stringToSlug(tag)} key={stringToSlug(tag)}><a className="mr-3 md:ml-3 md:mr-0 text-lg md:text-base">{tag}</a></Link>
                            )}
                        </div>
                    }
                </li>
            )}
        </ul>
        </>
    )
}