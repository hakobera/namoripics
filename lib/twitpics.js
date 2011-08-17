var TwitPic = require('twitpic').TwitPic
  , async = require('async')
  , cache = require('./cache')
;

function urlFor(image, size) {
  return "http://twitpic.com/show/" + size + "/" + image.shortId;
}

var uid = '_namori_';

function loadTimeline(uid, fn) {
  console.log('Get from twitpic');
  TwitPic.query('users/show', { username: uid, page: 1 }, function(u) {
    if (u && u.images) {
      var pageCount = Math.floor(u.photo_count / 20);
      if (u.photo_count % 20 !== 0) {
        pageCount += 1;
      }

      var pages = [];
      for (var pi = 1; pi <= pageCount; ++pi) {
        pages.push(pi);
      }

      var images = [];
      async.forEachSeries(pages, function(page, cb) {
        console.log('Load start page' + page);
        TwitPic.query('users/show', { username: uid, page: page }, function(user) {
          console.log('Load success page' + page);
          if (user && user.images) {
            var length = user.images.length,
                i, img, image;

            for(i=0; i < length; i++) {
              img = user.images[i];
              image = {};
              image.id = img.id;
              image.shortId = img.short_id;
              image.message = img.message;
              image.thumbnailUrl = urlFor(image, 'thumb');
              image.imageUrl = urlFor(image, 'large');
              image.timestamp = img.timestamp;
              images.push(image);
            }

            cb(null, images);
          } else {
            cb(new Error('Can not load page ' + page));
          }
        });
      },
      function(err) {
        if (err) {
          console.log(err);
          fn && fn([]);
          return;
        }
        cache.set(uid, images, 60 * 3);
        fn && fn(images);
      });
    }
  });
}

var show = function(fn) {
  cache.get(uid, function(err, data) {
    if (data) {
      console.log('Load from cache');
      fn && fn(data);
    } else {
      loadTimeline(uid, fn);
    }
  });
};

exports.show = show;