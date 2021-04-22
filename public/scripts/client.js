/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 // $("time.timeago").timeago();
 */

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

const createTweetElement = function (tweetObj) {
  const userName = tweetObj.user.name
  const avatar = tweetObj.user.avatars
  const handle = tweetObj.user.handle
  const text = tweetObj.content.text
 
  const tweet = $(` <article>
  <header>
  <div><img class="avatar" src= "${avatar}"></img> ${userName}</div>
  <i>${handle}</i>
  </header>
  <p class="twitter-display">${text}</p>
  <footer>
  <time class="timeago" datetime="new Date">10 days ago</time>
  <div>
  <i class="fas fa-flag"></i>
  <i class="fas fa-retweet"></i>
  <i class="fas fa-heart"></i>
  </div>
  </footer> 
  </article>`); 
  return tweet;
}

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    $('.tweet-display').append(createTweetElement(tweet));
  }
}

const loadTweets = function () {

  $.ajax('/tweets', {dataType: "json", method: "GET"})
  .then(function (data) {
    // console.log(data);
    renderTweets(data);
  })
}

$(document).ready(function() {
  loadTweets();
  $("#tweet-form").on("submit", function (event) {
    
    event.preventDefault();
    const tweetLength = $("#tweet-form textarea")[0].value.length;
    // console.log( $(this).children('textarea')[0].value);
    console.log(tweetLength);
    if (!tweetLength) {
      alert("Your tweet is either empty or null")
    }

    if ( tweetLength > 140) {
      alert('Your tweet exceeded the maximum allowed characters')
    }

    const serialData = $(this).serialize()
    $.post("/tweets", serialData)

  })
  // timeago.render(document.querySelectorAll('.timeago'));
});