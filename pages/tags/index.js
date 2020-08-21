import Link from 'next/link'
import MetaHead from 'components/MetaHead'
import MainLayout from 'layouts/MainLayout'
import { getCurrentDay } from 'lib/helpers'
import { getAllTags } from 'lib/api'

export default function Tags(tags) {

    return (
        <>
            <MainLayout day={getCurrentDay()}>
                <article className="mx-auto">
                    <MetaHead title={'Tags'} description={'All Front-End Web Daily tags'} day={getCurrentDay()} />
                    <h1 className="text-center mt-0 mb-8 font-black uppercase">Tags</h1>
                    {console.log(tags.tags)}
                    {tags !== undefined && 
                        <div className="flex flex-wrap gap-4 md:gap-8 items-center justify-center">
                            {tags.tags.map((tag) => (
                                <Link href={'/tags/' + tag.slug}><a className="md:text-2xl font-black">{tag.name}</a></Link>
                            ))}
                        </div>
                    }
                </article>
            </MainLayout>
        </>
    )
}

export async function getStaticProps() {
    const tags = getAllTags()

    return {
        props: {
            tags,
        },
    }
}