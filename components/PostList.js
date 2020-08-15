import Link from 'next/link'
import { theNamedDay, stringToSlug, makeExcerpt, dayTitle } from 'lib/helpers'

export default function PostList({ posts }) {
    return (
        <ul className="border-t border-solid border-gray">
            {posts.map((post) =>
                <li className={'flex flex-col md:flex-row justify-between md:items-center gap-4 text-xl py-3 border-b border-solid border-gray' + ' ' + theNamedDay(post.slug)} key={post.slug}>
                    <div>
                        <p className="mb-0 text-xs font-bold">{post.slug}</p>
                        <Link href={'/' + post.slug}><a className="font-black text-2xl">{dayTitle(post.slug)}</a></Link>
                        { theNamedDay(post.slug) !== 'tuesday' ? (
                            <p className="mb-0 text-base">{makeExcerpt(post.content)}</p>
                        ) : (
                            <p className="mb-0 text-base">{post.excerpt}</p>
                        )
                        }
                    </div>
                    {post.tags !== undefined &&
                        <div className="flex flex-wrap justify-end md:max-w-xs">
                            {post.tags.map((tag) => 
                                <Link href={'/tags/' + stringToSlug(tag)} key={stringToSlug(tag)}><a className="mr-3 text-base">{tag}</a></Link>
                            )}
                        </div>
                    }
                </li>
            )}
        </ul>
    )
}