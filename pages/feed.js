import { getAllPosts } from 'lib/api'
import { dayTitle, removeFuturePosts } from 'lib/helpers'
import markdownToHtml from 'lib/markdownToHtml'

export default function Feed({ posts }) {
  return (
    <></>
  )
}

const blogPostsRssXml = (blogPosts) => {
  let latestPostDate = '';
  let rssItemsXml = '';
  blogPosts = removeFuturePosts(blogPosts)
  blogPosts.forEach(post => {
    const postDate = post.slug;
    if (!latestPostDate || postDate > latestPostDate) {
      latestPostDate = post.slug;
    }
    rssItemsXml += `
      <item>
        <title>${dayTitle(post.slug)}</title>
        <link>https://fewdaily.com/${post.slug}</link>
        <guid isPermaLink="false">/${post.slug}</guid>
        <dc:creator>Front-End Web Daily</dc:creator>
        <pubDate>${new Date(post.slug + 'T05:00')}</pubDate>
        <content:encoded>${markdownToHtml(post.content)}</content:encoded>
      </item>`;
  });
  return {
    rssItemsXml,
    latestPostDate
  };
};

{/* <description>
        <![CDATA[${post.content}]] >
        </description> */}

const getRssXml = (blogPosts) => {
  const { rssItemsXml, latestPostDate } = blogPostsRssXml(blogPosts);
  return `<?xml version="1.0" ?>
  <rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
    <channel>
        <title>Front-End Web Daily</title>
        <link>https://fewdaily.com</link>
        <description>Curated front-end web news, tips, and more delivered everywhere daily</description>
        <language>en</language>
        <lastBuildDate>${new Date(latestPostDate + 'T05:00')}</lastBuildDate>
        ${rssItemsXml}
    </channel>
  </rss>`;
};

export async function getServerSideProps({ res }) {

  if (!res) {
    return
  }

	const blogPosts = getAllPosts([
		'title',
		'slug',
		'excerpt',
		'content',
		'tags',
	]);

	res.setHeader("Content-Type", "text/xml");
  res.write(getRssXml(blogPosts));
  res.end()
}
