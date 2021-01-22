const withMDX = require('@next/mdx')({
	extension: /\.mdx?$/,
});

module.exports = withMDX({
	pageExtensions: ['js', 'jsx', 'md', 'mdx'],
	target: 'serverless',
	webpack: (config, { isServer }) => {
		if (isServer) {
			require('./lib/rss');
		}

		return config;
  },
});
