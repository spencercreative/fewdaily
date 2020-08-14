import Link from 'next/link'
import { theNamedDay, stringToSlug } from 'lib/helpers'

export default function PostList({ posts }) {
    return (
        <ul className="border-t border-solid border-gray">
            {posts.map((post) =>
                <li className={'flex flex-wrap justify-between items-center gap-10 text-xl py-3 border-b border-solid border-gray' + ' ' + theNamedDay(post.slug)} key={post.slug}>
                    <div>
                        <p className="mb-0 text-xs font-bold">{post.slug}</p>
                        <Link href={'/' + post.slug}><a className="font-bold">{post.title}</a></Link>
                    </div>
                    {post.tags !== undefined &&
                        <div>
                            {post.tags.map((tag) => 
                                <Link href={'/tags/' + stringToSlug(tag)} key={stringToSlug(tag)}><a className="mr-3 inline-block">{tag}</a></Link>
                            )}
                        </div>
                    }
                </li>
            )}
        </ul>
    )
}