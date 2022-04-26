//Composer Charchter Count: responsible for the character counter.

$(document).ready(function () {
  $("#tweet-text").keyup(function () {
    const charchters = $(this).val();
    const counter = charchters.length;

    $(".counter").text(140 - counter);
  });
});

//Using jQuery and an appropriate selector, register an event handler to the textarea element for the form inside of the .new-tweet section.
// use the keyup event and count the number of characters.
