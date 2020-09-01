import Link from 'next/link';
import {
	theNamedDay,
	stringToSlug,
	makeExcerpt,
	dayTitle,
	listDate,
	getCurrentDay,
} from 'lib/helpers';
import { sponsors } from 'lib/sponsors';

function shuffleArray(array) {
	let i = array.length - 1;
	for (; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array.slice(0, 1);
}

function ListItem(props) {
	return (
		<article
			className={
				'w-full flex flex-col md:flex-row justify-between md:items-center post-list-item text-xl py-3 border-b border-solid border-gray' +
				' ' +
				theNamedDay(props.slug)
			}
			key={props.slug}
			itemScope
			itemType='http://schema.org/BlogPosting'
		>
			<header className='mb-4 md:mr-4 md:mb-0'>
				<p
					className='mb-0 text-xs font-bold'
					itemProp='datePublished'
					content={props.slug}
				>
					{listDate(props.slug)}
				</p>
				<h3 className='font-black text-2xl m-0'>
					<Link href={'/' + props.slug}>
						<a
							itemProp='url'
							content={'https://fewdaily.com/' + props.slug}
						>
							<span itemProp='name'>{dayTitle(props.slug)}</span>
						</a>
					</Link>
				</h3>
				<p className='mb-0 text-base' itemProp='about'>
					{props.excerpt}
				</p>
			</header>
			{props.tags !== undefined && (
				<div
					className='flex flex-wrap md:justify-end md:max-w-xs'
					itemProp='keywords'
				>
					{props.tags.map((tag, i) => (
						<Link href={'/tags/' + stringToSlug(tag)} key={i}>
							<a className='mr-3 md:ml-3 md:mr-0 text-lg md:text-base'>
								{tag}
							</a>
						</Link>
					))}
				</div>
			)}
		</article>
	);
}

export default function PostList(props) {
	if (props.featured !== undefined) {
		var featuredPosts = props.posts.slice(0, props.featured);
		var posts = props.posts.slice(props.featured);
	} else {
		var posts = props.posts;
	}

	return (
		<>
			<p className='mt-0 mb-1 text-xs text-right'>
				{props.count} post
				{(props.count > 1 || props.count.toString().includes('+')) &&
					's'}
			</p>
			<div id='postList' className='border-t border-solid border-gray'>
				{props.featured !== undefined &&
					featuredPosts.map((post) => (
						<article
							className={
								'flex flex-col items-center w-full featured post-list-item text-center text-xl py-8 border-b border-solid border-gray' +
								' ' +
								theNamedDay(post.slug)
							}
							itemScope
							itemType='http://schema.org/BlogPosting'
							key={post.slug}
						>
							<header>
								<p
									className='-mb-1 text-base font-bold'
									itemProp='datePublished'
									content={post.slug}
								>
									{listDate(post.slug)}
								</p>
								<h2 className='m-0 font-black text-4xl'>
									<Link href={'/' + post.slug}>
										<a
											itemProp='url'
											content={
												'https://fewdaily.com/' +
												post.slug
											}
										>
											<span itemProp='name'>
												{dayTitle(post.slug)}
											</span>
										</a>
									</Link>
								</h2>
								<p
									className='my-4 text-xl max-w-3xl mx-auto'
									itemProp='about'
								>
									{theNamedDay(post.slug) !== 'tuesday'
										? makeExcerpt(post.content)
										: post.excerpt}
								</p>
							</header>
							{post.tags !== undefined && (
								<div
									className='flex flex-wrap justify-center'
									itemProp='keywords'
								>
									{post.tags.map((tag) => (
										<Link
											href={'/tags/' + stringToSlug(tag)}
											key={stringToSlug(tag)}
										>
											<a className='mr-3 md:ml-3 md:mr-0 text-lg md:text-base'>
												{tag}
											</a>
										</Link>
									))}
								</div>
							)}
						</article>
					))}
				{posts.map((post, i) =>
					typeof sponsors != 'undefined' &&
					sponsors != null &&
					sponsors.length != null &&
					sponsors.length > 0 &&
					(i + 1) % 7 === 0 ? (
						<>
							{shuffleArray(sponsors).map((sponsor, i) => (
								<div
									className={
										'post-list-item flex flex-col md:flex-row justify-between md:items-center text-xl py-3 border-b border-solid border-gray' +
										' ' +
										getCurrentDay()
									}
									key={i}
								>
									<div className='mb-4 md:mr-4 md:mb-0'>
										<p className='mb-0 text-xs font-bold'>
											Sponsored
										</p>
										<a
											className='font-black text-2xl'
											href={sponsor.link}
											target='_blank'
										>
											{sponsor.name}
										</a>
										<p className='mb-0 text-base'>
											{sponsor.message}
										</p>
									</div>
								</div>
							))}
							<ListItem
								slug={post.slug}
								excerpt={
									theNamedDay(post.slug) !== 'tuesday'
										? makeExcerpt(post.content)
										: post.excerpt
								}
								tags={post.tags !== undefined && post.tags}
							/>
						</>
					) : (
						<ListItem
							slug={post.slug}
							excerpt={
								theNamedDay(post.slug) !== 'tuesday'
									? makeExcerpt(post.content)
									: post.excerpt
							}
							tags={post.tags !== undefined && post.tags}
							key={i}
						/>
					)
				)}
			</div>
		</>
	);
}
