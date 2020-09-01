import Link from 'next/link';
import MainLayout from 'layouts/MainLayout';
import { getCurrentDay } from 'lib/helpers';
import { getAllPosts } from 'lib/api';
import PostList from 'components/PostList';
import ListSearch from 'components/ListSearch';
import MetaHead from 'components/MetaHead';
import Sponsor from 'components/Sponsor';
import { FiArrowRight } from 'react-icons/fi';

const title = 'This page connot be found';
const subheading =
	'It appears this page is missing. Please check the link or select a recent post below.';

export default function Error({ allPosts }) {
	return (
		<MainLayout day={getCurrentDay()}>
			<MetaHead
				title={title}
				description={subheading}
				day={getCurrentDay()}
			/>
			<h1 className='mt-0'>{title}</h1>
			<p>{subheading}</p>
			<h3 className='mb-0'>Recent Posts</h3>
			{allPosts.length > 0 && (
				<>
					<PostList
						posts={allPosts.slice(0, 5)}
						count={allPosts.slice(0, 5).length}
					/>
					{allPosts.length > 5 && (
						<div className='flex justify-start py-2'>
							<Link href='/all'>
								<a className='text-sm flex items-center'>
									View All Posts
									<FiArrowRight className='ml-1' />
								</a>
							</Link>
						</div>
					)}
				</>
			)}
		</MainLayout>
	);
}

export async function getStaticProps() {
	const allPosts = getAllPosts([
		'title',
		'slug',
		'excerpt',
		'content',
		'tags',
	]);

	return {
		props: { allPosts },
	};
}
