import MainLayout from 'layouts/MainLayout';
import { getCurrentDay, removeFuturePosts } from 'lib/helpers';
import { getAllPosts } from 'lib/api';
import PostList from 'components/PostList';
import ListSearch from 'components/ListSearch';
import MetaHead from 'components/MetaHead';
import Sponsor from 'components/Sponsor';

export default function Home({ allPosts }) {

  allPosts = removeFuturePosts(allPosts)

	return (
		<MainLayout day={getCurrentDay()}>
			<MetaHead
				title='All Posts'
				description='The complete archive of posts from Front-End Web Daily.'
				day={getCurrentDay()}
			/>
			<Sponsor />
			{allPosts.length > 0 && (
				<>
					<ListSearch />
					<PostList posts={allPosts} count={allPosts.length} />
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
