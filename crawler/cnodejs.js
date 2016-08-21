var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');

var app = express();

app.get('/node/learning/', function (req, res, next) {
  superagent.get('https://cnodejs.org/')
    .end(function (err, sres) {
      if (err) {
        return next(err);
      }

      // res.send(sres);

      var $ = cheerio.load(sres.text);
      var items = [];
      $('#topic_list .cell').each(function (idx, element) {
        var $element = $(element);
        items.push({
          title: $element.find('.topic_title').attr('title'),
          href: $element.find('.topic_title').attr('href'),
          author: $element.find('img').attr('title'),
          avatar: $element.find('img').attr('src')
        });
      });

      res.send(items);
    });
});

app.listen(7777, function () {
  console.log('app is running at port 7777');
});
