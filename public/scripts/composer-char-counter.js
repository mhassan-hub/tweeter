$(document).ready(function() {

  const textArea = $('.new-tweet form textarea');

  // On input update counter by subtracting the character count from 140
  textArea.on('input', function() {
    const charAvailable = 140 - $(this).val().length;

    const tweetCount = $(this).siblings('div').children('.counter');

    // Assigning the charAvailable to the char counter
    tweetCount[0].innerText = charAvailable;

    if (charAvailable < 0) {
      // Adding red color on char counter using classes 
      tweetCount.addClass('error-red');
    } else {
      // Removing red color on char counter using classes 
      tweetCount.removeClass('error-red');
    }
  });

});
