$(document).ready(function() {
  
  loadTweets();
  // toTopOfPage button
  toTopOfPage();

  $("#tweet-form").on("submit", function(event) {
    
    event.preventDefault();

    const serialData = $(this).serialize();

    const tweetText = $('#tweet-text').val();
    // error messages are hidden by default
    // maximum character error
    $(".error-max").hide();
    
    // empty array  error
    $(".error-empty").hide();

    // Tweet validation
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
    
    // Resetting textbox and character counter
    $('#tweet-text').val('');
    $('.counter').text(140);
  });
});