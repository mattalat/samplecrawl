// Using https://github.com/sylvinus/node-crawler


var Crawler = require('Crawler'),
url = require('url'), 
$ = require('cheerio');

var pagesHit = 0,
DATA = []; // can store data in local buffer, or Crawler cash, or handoff, etc

var c = new Crawler({
	maxConnections : 1,
    callback : function (error, result, $) {
	   	if(!result.body) return; // disregard odd results

    	var html; // the body of the page

    	// Try to load
	   	try{
	   		html = $.load(result.body);
	   	} catch (e) { 
	   		console.error(e); 
	   		return; // exit this page without spreading
	   	}
	   	pagesHit++;

	   	console.log('Crawled ' + pagesHit + ': ' + result.request.uri.href);

        // Keep crawling
        html('a').each(function(index, a){
        	try {
	        	var queueUrl = $(a).attr('href');
	        	links.push(queueUrl);
	        	c.queue(queueUrl);
	        } catch (e) {
	        	console.error(e);
	        }
        })
    }
});



// Fire it up
var SITE_TO_VISIT = '';
c.queue(SITE_TO_VISIT);
