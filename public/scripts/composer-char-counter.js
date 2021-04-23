$(document).ready(function() {

  const textArea = $('.new-tweet form textarea');

  textArea.on('input', function() {

    const charAvailable = 140 - $(this).val().length;

    let tweetCount = $(this).siblings('div').children('.counter');

    tweetCount[0].innerText = charAvailable
    if (charAvailable < 0) {
      tweetCount.css('color', 'red')
    } else {
      tweetCount.css('color', 'inherit')
    }
  });

});
