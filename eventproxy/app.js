var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');
// https://github.com/JacksonTian/eventproxy
var eventproxy = require('eventproxy');

var cnodeUrl = 'https://cnodejs.org/';

superagent.get(cnodeUrl)
  .end(function (err, res) {
    if (err) {
      return console.error(err);
    }

    var topicUrls = [];
    var $ = cheerio.load(res.text);

    $('#topic_list .cell').each(function (idx, element) {
      var $element = $(element);
      var href = $element.find('.topic_title').attr('href');
      topicUrls.push(
        url.resolve(cnodeUrl, href)
      );
    });

    console.log('topicUrls:');
    console.log(topicUrls);

    var ep = new eventproxy();
    var event = 'fetch_tipic_info';

    console.log('fetch topicUrls:');

    ep.after(event, topicUrls.length, function (topics) {
      topicInfos = topics.map(function (topicPair) {
        var topicUrl = topicPair[0];
        var topicHtml = topicPair[1];
        var $ = cheerio.load(topicHtml);

        var title = $('.topic_full_title').text().trim();
        var author = $('.changes>span:nth-child(2)>a').text().trim();
        var authorUrl = cnodeUrl + $('.changes>span:nth-child(2)>a').attr('href');
        var commentContent = $('.reply_content').eq(0).text().trim();
        var commentAuthor = $('.user_info .dark').eq(0).text().trim();

        return ({
          title: title,
          url: topicUrl,
          author: author,
          author_url: authorUrl,
          first_comment: {
            content: commentContent,
            author: commentAuthor,
          },
        });
      });

      console.log('topics:');
      console.log(topicInfos);
    });

    topicUrls.forEach(function (topicUrl) {
      superagent.get(topicUrl)
        .end(function (err, res) {
          console.log('fetch ' + topicUrl + ' successful');
          ep.emit(event, [topicUrl, res.text]);
        });
    });
  });
