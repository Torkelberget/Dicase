const Parser = require('rss-parser');
const parser = new Parser();

async function getRSSFeed(req, res) {
    const feed = await parser.parseURL('https://www.di.se/rss');
    
    let items = feed.items

    items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    items = items.slice(0, 10)

    //logging
    items.forEach(item => {
      console.log( '\n\n' + 
        item.title +
        '\n' +
        item.link +
        '\n' +
        item.pubDate)
    });

  res.render('index', { title: feed.title, items });
};

module.exports = getRSSFeed;