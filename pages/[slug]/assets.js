import { useRouter } from 'next/router';
import RenderAsImage from 'react-render-as-image';
import MetaHead from 'components/MetaHead';
import Link from 'next/link';
import ErrorPage from 'next/error';
import PageLayout from 'layouts/PageLayout';
import { getPostBySlug, getAllPosts } from 'lib/api';
import markdownToHtml from 'lib/markdownToHtml';
import {
	theNamedDay,
	splitSections,
	makeExcerpt,
	dayTitle,
	theDateString,
	zipImages,
	makeExcerptString
} from 'lib/helpers';

function SocialImage(props) {
	const cornerStyles =
		'absolute py-8 px-10 text-3xs whitespace-no-wrap font-black';

	return (
		<div
			style={{ maxWidth: props.width }}
			className='asset-container inline-block text-left'
		>
			<RenderAsImage>
				<div
					className={
						'flex flex-col relative text-slate bg-' +
						theNamedDay([props.post.slug])
					}
					style={{ width: props.width, height: props.height }}
				>
					<div className='flex' style={{ height: '5%' }}>
						<div className='bg-monday flex-1'></div>
						<div className='bg-tuesday flex-1'></div>
						<div className='bg-wednesday flex-1'></div>
						<div className='bg-thursday flex-1'></div>
						<div className='bg-friday flex-1'></div>
						<div className='bg-saturday flex-1'></div>
						<div className='bg-sunday flex-1'></div>
					</div>
					<div className='flex-1 h-full w-full flex flex-col items-center justify-center p-10 relative'>
						<div className='absolute top-0 left-0 w-full px-10'>
							<div className='flex justify-between border-b border-solid border-slate py-3'>
								{props.data !== undefined ? (
									<span className='text-3xl py-4 whitespace-no-wrap'>
										Front-End Web Daily
									</span>
								) : (
									<span className='text-3xs'>
										Front-End Web Daily
									</span>
								)}

								{props.data !== undefined ? (
									<span className='text-3xl py-4 font-black whitespace-no-wrap'>
										{theDateString(props.post.slug)}
									</span>
								) : (
									<span className='text-3xs font-black'>
										{theDateString(props.post.slug)}
									</span>
								)}
							</div>
						</div>
						<div
							className={
								'asset-content ' + props.className !== undefined
									? props.className
									: undefined
							}
						>
							{props.children}
						</div>
						<div className='absolute bottom-0 left-0 w-full px-10'>
							<div className='flex justify-center border-t border-solid border-slate py-3'>
								{props.data !== undefined ? (
									<span className='text-3xl py-4 whitespace-no-wrap'>
										fewdaily.com
									</span>
								) : (
									<span className='text-3xs'>
										fewdaily.com
									</span>
								)}
							</div>
						</div>
					</div>
				</div>
			</RenderAsImage>
		</div>
	);
}

export default function Assets({ post }) {
	const router = useRouter();

	if (!router.isFallback && !post?.slug) {
		return <ErrorPage statusCode={404} />;
	}

	return (
		<>
			{router.isFallback ? (
				<div>Loading...</div>
			) : (
				<PageLayout day={theNamedDay([post.slug])}>
					<article id='assets' className='max-w-4xl mx-auto'>
						<MetaHead
							title={'Assets for ' + theDateString(post.slug)}
							description={
								post.excerpt !== undefined
									? post.excerpt
									: makeExcerpt(post.content)
							}
							day={theNamedDay([post.slug])}
						/>

						<header>
							<p className='mb-0 font-bold text-sm'>
								<Link href={'/' + post.slug}>
									<a>{theDateString(post.slug)}</a>
								</Link>
							</p>
							<h1 className='my-0 uppercase'>Assets</h1>
						</header>

						<section>
							<h3 className='text-center'>Square</h3>

							<div className='text-center' id='square-assets'>
								<SocialImage
									post={post}
									width='500px'
									height='500px'
									className='justify-center items-center flex flex-col text-center'
								>
									<span className='uppercase bg-slate py-1 px-2 text-white text-sm font-black whitespace-no-wrap'>
										{dayTitle(post.slug)}
									</span>
									<h3 className='text-2xxl mt-4 mb-0 leading-tight'>
										{post.excerpt !== undefined
											? post.excerpt
											: makeExcerptString(post.content)}
									</h3>
								</SocialImage>

								{post.excerpt === undefined &&
									splitSections(post.renderedContent).map(
										(element, index) => (
											<SocialImage
												post={post}
												width='500px'
												height='500px'
												key={index}
											>
												<div
													className='asset-content text-sm'
													dangerouslySetInnerHTML={{
														__html: element
													}}
												/>
											</SocialImage>
										)
									)}

								<SocialImage
									post={post}
									width='500px'
									height='500px'
								>
									<div className='h-full flex items-center justify-center text-center'>
										<h3 className='m-0 uppercase text-4xl leading-none'>
											{post.excerpt !== undefined
												? 'View post on our website'
												: 'Check Back Tomorrow'}
										</h3>
									</div>
								</SocialImage>
							</div>

							<div className='flex justify-center my-8'>
								<button
									onClick={() =>
										zipImages(
											'square-assets',
											post.slug + '_square'
										)
									}
								>
									Download Square Files
								</button>
							</div>
						</section>

						<hr />

						<section>
							<h3 className='text-center'>Tall</h3>

							<div className='text-center' id='tall-assets'>
								<SocialImage
									post={post}
									width='360px'
									height='640px'
									className='justify-center items-center flex flex-col text-center'
								>
									<span className='uppercase bg-slate py-1 px-2 text-white text-sm font-black whitespace-no-wrap'>
										{dayTitle(post.slug)}
									</span>
									<h3 className='text-2xl mt-4 mb-0 leading-tight'>
										{post.excerpt !== undefined
											? post.excerpt
											: makeExcerptString(post.content)}
									</h3>
								</SocialImage>

								{post.excerpt === undefined &&
									splitSections(post.renderedContent).map(
										(element, index) => (
											<SocialImage
												post={post}
												width='360px'
												height='640px'
												key={index}
											>
												<div
													className='asset-content text-sm'
													dangerouslySetInnerHTML={{
														__html: element
													}}
												/>
											</SocialImage>
										)
									)}

								<SocialImage
									post={post}
									width='360px'
									height='640px'
								>
									<div className='h-full flex items-center justify-center text-center'>
										<h3 className='m-0 uppercase text-3xl leading-none'>
											{post.excerpt !== undefined
												? 'View post on our website'
												: 'Check Back Tomorrow'}
										</h3>
									</div>
								</SocialImage>
							</div>

							<div className='flex justify-center my-8'>
								<button
									onClick={() =>
										zipImages(
											'tall-assets',
											post.slug + '_tall'
										)
									}
								>
									Download Tall Files
								</button>
							</div>
						</section>

						<hr />

						<section>
							<h3 className='text-center'>Wide</h3>

							<div className='text-center' id='wide-assets'>
								<SocialImage
									post={post}
									width='640px'
									height='360px'
									className='justify-center items-center flex flex-col text-center'
								>
									<span className='uppercase bg-slate py-1 px-2 text-white text-sm font-black whitespace-no-wrap'>
										{dayTitle(post.slug)}
									</span>
									<h3 className='text-2xxl mt-4 mb-0 leading-tight'>
										{post.excerpt !== undefined
											? post.excerpt
											: makeExcerptString(post.content)}
									</h3>
								</SocialImage>

								{post.excerpt === undefined &&
									splitSections(post.renderedContent).map(
										(element, index) => (
											<SocialImage
												className='flex'
												post={post}
												width='640px'
												height='360px'
												key={index}
											>
												<div
													className='asset-content text-sm'
													dangerouslySetInnerHTML={{
														__html: element
													}}
												/>
											</SocialImage>
										)
									)}

								<SocialImage
									post={post}
									width='640px'
									height='360px'
								>
									<div className='h-full flex items-center justify-center text-center'>
										<h3 className='m-0 uppercase text-4xl leading-none'>
											{post.excerpt !== undefined
												? 'View post on our website'
												: 'Check Back Tomorrow'}
										</h3>
									</div>
								</SocialImage>
							</div>

							<div className='flex justify-center my-8'>
								<button
									onClick={() =>
										zipImages(
											'wide-assets',
											post.slug + '_wide'
										)
									}
								>
									Download Wide Files
								</button>
							</div>
						</section>

						<hr />

						<section>
							<h3 className='text-center'>Other</h3>

							<div className='text-center' id='other-assets'>
								<SocialImage
									post={post}
									width='1400px'
									height='1400px'
									className='justify-center items-center flex flex-col text-center px-10'
									data='lg'
								>
									<div className='uppercase bg-slate py-1 px-2 inline-block text-white text-4xl font-black whitespace-no-wrap max-w-full'>
										{dayTitle(post.slug)}
									</div>
									<h3 className='text-7xl mt-4 mb-0 leading-tight'>
										{post.excerpt !== undefined
											? post.excerpt
											: makeExcerptString(post.content)}
									</h3>
								</SocialImage>
							</div>

							<div className='flex justify-center my-8'>
								<button
									onClick={() =>
										zipImages(
											'other-assets',
											post.slug + '_other'
										)
									}
								>
									Download Other Files
								</button>
							</div>
						</section>
					</article>
				</PageLayout>
			)}
		</>
	);
}

export async function getStaticPaths() {
	const posts = getAllPosts(['slug']);

	return {
		paths: posts.map(post => {
			return {
				params: {
					slug: post.slug
				}
			};
		}),
		fallback: false
	};
}

export async function getStaticProps({ params }) {
	const post = getPostBySlug(params.slug, [
		'title',
		'slug',
		'podcast',
		'content',
		'tags',
		'excerpt'
	]);
	const renderedContent = await markdownToHtml(post.content || '');

	return {
		props: {
			post: {
				...post,
				renderedContent
			}
		}
	};
}
