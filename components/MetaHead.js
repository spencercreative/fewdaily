import React from 'react';
import Head from 'next/head';

function HeadMetadata(props) {
	if (props.title !== undefined) {
		var metaTitle = props.title + ' | Front-End Web Daily';
	} else {
		var metaTitle =
			'Front-End Web Daily | News, tips and more delivered daily';
	}

	if (typeof window !== 'undefined') {
		var url = window.location.href;
	} else {
		var url = null;
	}

	const hostname = 'https://fewdaily.com';

	if (props.description !== undefined) {
		var description = props.description;
	} else {
		var description =
			'Front-end news, tips, and more delivered daily across the web.';
	}

	return (
		<Head>
			<title>{metaTitle}</title>
			<meta name='title' content={metaTitle} />
			<meta property='og:title' content={metaTitle} />
			<meta name='twitter:title' content={metaTitle} />

			{description !== undefined && (
				<>
					<meta name='description' content={description} />
					<meta property='og:description' content={description} />
					<meta name='twitter:description' content={description} />
				</>
			)}

			<meta property='og:url' content={url} />
			<meta name='twitter:url' content={url} />

			{props.day !== undefined ? (
				<>
					<meta
						property='og:image'
						content={
							hostname + '/social-cards/' + props.day + '.png'
						}
					/>
					<meta
						property='og:image:secure_url'
						content={
							hostname + '/social-cards/' + props.day + '.png'
						}
					/>
					<meta
						name='twitter:image'
						content={
							hostname + '/social-cards/' + props.day + '.png'
						}
					/>
					<link
						rel='apple-touch-icon'
						sizes='180x180'
						href={
							'/favicons/' + props.day + '/apple-touch-icon.png'
						}
					/>
					<link
						rel='icon'
						type='image/png'
						sizes='32x32'
						href={'/favicons/' + props.day + '/favicon-32x32.png'}
					/>
					<link
						rel='icon'
						type='image/png'
						sizes='16x16'
						href={'/favicons/' + props.day + '/favicon-16x16.png'}
					/>
					<link
						rel='manifest'
						href={'/favicons/' + props.day + '/site.webmanifest'}
					/>
				</>
			) : (
				<>
					<meta
						property='og:image'
						content={hostname + '/social-cards/monday.png'}
					/>
					<meta
						property='og:image:secure_url'
						content={hostname + '/social-cards/monday.png'}
					/>
					<meta
						name='twitter:image'
						content={hostname + '/social-cards/monday.png'}
					/>
					<link
						rel='apple-touch-icon'
						sizes='180x180'
						href={'/favicons/monday/apple-touch-icon.png'}
					/>
					<link
						rel='icon'
						type='image/png'
						sizes='32x32'
						href={'/favicons/monday/favicon-32x32.png'}
					/>
					<link
						rel='icon'
						type='image/png'
						sizes='16x16'
						href={'/favicons/monday/favicon-16x16.png'}
					/>
					<link
						rel='manifest'
						href={'/favicons/monday/site.webmanifest'}
					/>
				</>
			)}

			{props.type !== undefined ? (
				<meta property='og:type' content={props.type} />
			) : (
				<meta property='og:type' content='website' />
			)}

			<meta property='og:locale' content='en_US' />
			<meta property='og:image:type' content='image/png' />
			<meta property='og:image:width' content='1920' />
			<meta property='og:image:height' content='1080' />
			<meta
				property='og:image:alt'
				content='Calendar on computer logo for Front-End Web Daily'
			/>
			<meta
				name='twitter:image:alt'
				content='Calendar on computer logo for Front-End Web Daily'
			/>
			<meta name='twitter:creator' content='@fewdaily' />
			<meta name='twitter:site' content='@fewdaily' />
			<meta name='twitter:card' content='summary_large_image' />

			{props.children}
		</Head>
	);
}

export default HeadMetadata;
