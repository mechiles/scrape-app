## Web Scrape app using Node [X-Ray](https://github.com/lapwinglabs/x-ray) and MongoDB.

Our test is using Yahoo News! to scrape and import content to a database.

Quick setup:

1. Clone the repo

2. ```cd into scrape-app```

3. ```npm install```

4. ```node app.js```

Bam! Now you'll have Yahoo News scraped and imported into your MongoDB. Enjoy!

To crawl more pages, you can change the `limit()` on `line 29` of `app.js` to your desired setting.

MongoDB is doing an `insert()`. To keep from importing duplicate content, you can set the `title` field to unique by using the following command for MongoDB.

```db.scraped-articles.createIndex( { "title": 1 }, { unique: true });```
