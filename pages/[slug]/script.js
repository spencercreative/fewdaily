import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import MetaHead from 'components/MetaHead';
import ErrorPage from 'next/error';
import PageLayout from 'layouts/PageLayout';
import { getPostBySlug, getAllPosts } from 'lib/api';
import markdownToHtml from 'lib/markdownToHtml';
import {
	theNamedDay,
	makeExcerptString,
	dayTitle,
	theDateString,
	transcriptText,
	headingList,
} from 'lib/helpers';
import { FiCopy } from 'react-icons/fi';
import hljs from 'highlight.js/lib/core'

hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
hljs.registerLanguage('css', require('highlight.js/lib/languages/css'))
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'))

export default function Post({ post }) {
	const router = useRouter();

	if (!router.isFallback && !post?.slug) {
		return <ErrorPage statusCode={404} />;
	}

	function CopyToClipboard(containerid) {
		if (document.selection) {
			var range = document.body.createTextRange();
			range.moveToElementText(document.getElementById(containerid));
			range.select().createTextRange();
			document.execCommand('copy');
		} else if (window.getSelection) {
			var range = document.createRange();
			range.selectNode(document.getElementById(containerid));
			window.getSelection().addRange(range);
			document.execCommand('copy');
		}
	}

  useEffect(() => {
    hljs.initHighlighting();
  }, []);

	return (
		<>
			{router.isFallback ? (
				<div>Loading...</div>
			) : (
				<PageLayout day={theNamedDay([post.slug])}>
					<article className='max-w-4xl mx-auto'>
						<MetaHead
							title={
								'Audio Script for ' + theDateString(post.slug)
							}
							description={
								post.excerpt !== undefined
									? post.excerpt
									: makeExcerptString(post.content)
							}
							day={theNamedDay([post.slug])}
						/>

						<header>
							<p className='mb-0 font-bold text-sm'>
								<Link href={'/' + post.slug}>
									<a>{theDateString(post.slug)}</a>
								</Link>
							</p>
							<h1 className='my-0 uppercase'>Audio Script</h1>
						</header>

						<div className='mt-10 md:mt-16' id='audio-script'>
							{post.excerpt === undefined ? (
								<>
									<p>
										Today is{' '}
										<span>{theDateString(post.slug)}</span>,
										and for this{' '}
										<span>{dayTitle(post.slug)}</span>{' '}
										episode we're covering:
									</p>
									<ul className='list-disc pl-6 mb-8'>
										{headingList(post.content).map(
											(heading, index) => (
												<li key={index}>{heading}</li>
											)
										)}
									</ul>
								</>
							) : (
								<p>
									Today is{' '}
									<span>{theDateString(post.slug)}</span>, and
									for this <span>{dayTitle(post.slug)}</span>{' '}
									episode we're covering {post.excerpt}
								</p>
							)}
							<p>Let's dive in!</p>
							{post.excerpt !== undefined && <p>----</p>}
							<div
								dangerouslySetInnerHTML={{
									__html: transcriptText(
										post.renderedContent
									),
								}}
							/>
							<p>----</p>
							<p>
								Want to know more? Head to{' '}
								<a href='https://fewdaily.com'>fewdaily.com</a>{' '}
								for more of today’s topics and other front-end
								web content! If you liked what you heard be sure
								to rate, review, and subscribe on your platform
								of choice. That's all for today, tune in
								tomorrow!
							</p>
						</div>

						<div className='border-t border-solid border-gray py-4 print:hidden text-2xl md:text-xl'>
							<button
								onClick={() => CopyToClipboard('audio-script')}
								title='copy'
							>
								<FiCopy />
							</button>
						</div>
					</article>
				</PageLayout>
			)}
		</>
	);
}

export async function getStaticPaths() {
	const posts = getAllPosts(['slug']);

	return {
		paths: posts.map((post) => {
			return {
				params: {
					slug: post.slug,
				},
			};
		}),
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const post = getPostBySlug(params.slug, ['slug', 'content', 'excerpt']);
	const renderedContent = markdownToHtml(post.content || '');

	return {
		props: {
			post: {
				...post,
				renderedContent,
			},
		},
	};
}
