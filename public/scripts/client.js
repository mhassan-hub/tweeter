/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 // 
 */

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function (tweetObj) {
  const userName = tweetObj.user.name
  const avatar = tweetObj.user.avatars
  const handle = tweetObj.user.handle
  let text = tweetObj.content.text
  const tweetLength = text.length;
  const safeHTML = escape(text)
  const time = Date.now()

  const tweet = $(` <article>
  <header>
  <div><img class="avatar" src= "${avatar}"></img> ${userName}</div>
  <i>${handle}</i>
  </header>
  <p class="twitter-display">${safeHTML}</p>
  <footer>
  <time class="timeago" datetime="${time}"></time>
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
    
    $('.tweet-display').prepend(createTweetElement(tweet));
  }
  timeago.render(document.querySelectorAll('.timeago'));
}

const loadTweets = function () {
  
  $.ajax('/tweets', {dataType: "json", method: "GET"})
  .then(function (data) {
    renderTweets(data);
  })

}

const getNewTweets = function () {
  $.ajax('/tweets', {dataType: "json", method: "GET"})
  .then(function (data) {
    renderTweets([data[data.length - 1]]);
  })
}

$(document).ready(function() {
  
  loadTweets();

  $("#tweet-form").on("submit", function (event) {
    
    event.preventDefault();
    const serialData = $(this).serialize()
    const tweetText = $('#tweet-text')[0].value

    $(".error").hide();

    if (tweetText.length > 140) {
      $( ".error" ).slideDown( "slow", function() {
        $(".error").show();
      });
      return;
    }

    $.post("/tweets", serialData)
    .then (() => {
      getNewTweets();
    })

  })
});