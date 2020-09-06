import React, { useState, useEffect } from 'react';
import RSSParser from 'rss-parser';
import moment from 'moment-timezone';

export const GetEpisode = (props) => {
	const [feed, setFeed] = useState({ items: [] });

	useEffect(() => {
		const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
		let parser = new RSSParser();
		parser.parseURL(
			`https://feeds.captivate.fm/fewdaily/feed.xml`,
			function (err, feed) {
				if (err) throw err;
				setFeed(feed);
			}
		);
	}, []);

	return (
		<>
			{feed.items.map(
				(item, i) =>
					moment(item.isoDate)
						.tz('America/New_York')
						._i.split('T')[0] == props.date && (
						<div
							className='border-t border-solid border-gray mt-10 md:mt-16 py-10 print:hidden'
							key={i}
						>
							<h3 className='mt-0 mb-6 leading-none'>
								Listen to the episode!
							</h3>

							<div
								style={{
									width: '100%',
									height: '170px',
									marginBottom: '20px',
									borderRadius: '10px',
									overflow: 'hidden',
								}}
							>
								<iframe
									style={{ width: '100%', height: '170px' }}
									frameBorder='no'
									allow='autoplay'
									scrolling='no'
									seamless
									src={
										'https://player.captivate.fm/episode/' +
										item.guid
									}
								></iframe>
							</div>
						</div>
					)
			)}
			{console.log(feed)}
		</>
	);
};
