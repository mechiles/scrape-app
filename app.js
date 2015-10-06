// Require x-ray node package
var Xray = require("x-ray");
var xray = new Xray();

// Connect to MongoDB server, select database and association collection
var mongojs     =   require('mongojs');
var db          =   mongojs('mongodb://localhost:27017/scrape-app', ['scraped-articles']);

// To keep from having duplicate entries, make the mongodb "title" field unique
// db.scraped-articles.createIndex( { "title": 1 }, { unique: true });

// Scrape the URL of choice with the appropriate attributes
xray('https://news.search.yahoo.com/search?p=sports', '.NewsArticle',
	[{
		title: 'h3.title',
		summarybody: '.compText',
		a: 'a@href',
		cite: '.cite',
		css: '@class',
		 details: xray('a@href', {
	       title: 'h1.headline',
	       body: '.body'
	   })
	}]
)

// Set pagination criteria
.paginate('a.next@href')
.limit(1)

// Write to a flat json file if wanted
//.write('yahoonews.json');

// Parse the scraped content and save to MongoDB
(function(err, obj){
if (err) {
    console.error(err);
  }
  //console.log("RESULT:", obj);
  var json = JSON.stringify(obj);
  var jsonResult = JSON.parse(json);
   db.collection("scraped-articles").insert(jsonResult, {
                upsert: true,
                multi: true,
                safe: false
            }, function(err, records) {
    if (err) throw err;
    console.log("records added/updated");
 		})
		db.close(); // Closing the connection
});
