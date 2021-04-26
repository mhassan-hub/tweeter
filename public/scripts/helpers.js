/*----------------- Client-side JS -----------------*/

/*------------ Prevent script injection ------------*/
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

/*------------------ Create tweet ------------------*/
const createTweetElement = function(tweetObj) {
  const userName = tweetObj.user.name;
  const avatar = tweetObj.user.avatars;
  const handle = tweetObj.user.handle;
  const text = tweetObj.content.text;
  const safeHTML = escape(text);
  const time = timeago.format(tweetObj.created_at);
  
  const tweet = $(`
  <article>
    <header>
      <div class="user">
        <img class="avatar" src= "${avatar}"></img> 
        <p class="user-name">${userName}</p>
      </div>
      <i class="avatar-handle">${handle}</i>
    </header>
    <p class="twitter-display">${safeHTML}</p>
    <footer>
      <time class="time">${time}</time>
      <div>
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer> 
  </article>
  `);
  return tweet;
};

/*-------- Loop  through database to render tweets --------*/
const renderTweets = function(tweets) {

  for (const tweet of tweets) {
    $('.tweet-display').prepend(createTweetElement(tweet));
  }

  timeago.render(document.querySelectorAll('.timeago'));
};

/*--------------- Render tweets using AJAX ---------------*/
const loadTweets = function() {
  
  $.ajax('/tweets', {dataType: "json", method: "GET"})
    .then(function(data) {
      renderTweets(data);
    });
};
/*------------- Render new tweet using AJAX -------------*/
const getNewTweets = function() {

  $.ajax('/tweets', {dataType: "json", method: "GET"})
    .then(function(data) {
      renderTweets([data[data.length - 1]]);
    });
};

/*-------- Show button when after scrolling 400 --------*/
const toTopOfPage = function() {
  $(window).on("scroll", function() {

    if ($(window).scrollTop() >= 400) {
      $("#top-page").show();
  
      $("#top-page").on("click", function() {
        $(window).scrollTop(0);
      });
    } else {
      $("#top-page").hide();
    }
  });
};

