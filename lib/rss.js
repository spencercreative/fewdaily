const fs = require('fs');
const globby = require('globby');
const RSS = require('rss');
const frontmatter = require('front-matter');

(async () => {
  const siteUrl = 'https://fewdaily.com';

  // Start with posts
  const posts = await globby(['_posts/*{.mdx,.md}']);

  const rss = new RSS({
    title: 'Front-End Web Daily',
    description: 'Front-end news, tips, and more delivered daily across the web.',
    site_url: siteUrl,
    feed_url: siteUrl + '/feed.xml',
  });

  for (var i = posts.length - 1; i >= 0; i--) {
    const postPath = posts[i].replace(/\.mdx?$/, '').replace(/\_posts\//, '');
    const body = fs.readFileSync(posts[i], 'utf-8');
    const { attributes: post } = frontmatter(body);

    var d = new Date(postPath + 'T12:00');
    var weekday = new Array(7);
    weekday[0] = 'sunday';
    weekday[1] = 'monday';
    weekday[2] = 'tuesday';
    weekday[3] = 'wednesday';
    weekday[4] = 'thursday';
    weekday[5] = 'friday';
    weekday[6] = 'saturday';

    var name = weekday[d.getDay()];

    if (name == 'monday') {
        name = 'Monday Medley'
    } else if (name == 'tuesday') {
        name = 'Tuesday Tips'
    } else if (name == 'wednesday') {
        name = 'Wednesday Wisdom'
    } else if (name == 'thursday') {
        name = 'Thursday Thoughts'
    } else if (name == 'friday') {
        name = 'Friday Facts'
    } else if (name == 'saturday') {
        name = 'Saturday Special'
    } else if (name == 'sunday') {
        name = 'Sunday Switch'
    }

    rss.item({
      title: `${name}`,
      guid: `/${postPath}`,
      url: `${siteUrl}/${postPath}`,
      author: 'Front-End Web Daily',
      date: `${postPath}`,
    });
  };

  const xmlFeed = rss.xml({ indent: true });

  fs.writeFileSync('public/feed.xml', xmlFeed);
})();