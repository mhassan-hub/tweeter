$(document).ready(function() {
  
  loadTweets();
  toTopOfPage();

  $("#tweet-form").on("submit", function(event) {
    
    event.preventDefault();

    const serialData = $(this).serialize();

    const tweetText = $('#tweet-text').val();
    $(".error-max").hide();
    $(".error-empty").hide();

    if (tweetText.length > 140) {
      $(".error-max").slideDown("slow", function() {
        $(".error-max").show();
      });

      return;
    }

    if (tweetText.length === 0) {
      $(".error-empty").slideDown("slow", function() {
        $(".error-empty").show();
      });

      return;
    }

    $.post("/tweets", serialData)
      .then(() => {
        getNewTweets();
      });
    $('#tweet-text').val('');
    $('.counter').text(140);
  });
});