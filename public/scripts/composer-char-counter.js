//Composer Charchter Count: responsible for the tweeter character counter.

$(document).ready(function () {
  $("#tweet-text").keyup(function () {
    const charchters = $(this).val();
    const counter = 140 - charchters.length;

    $(".counter").text(counter);

    if (counter < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "black");
    }
  });
});

//NOTE:
// to do the above via a tree traversal method:
// -let $counter = $(this).siblings().children()[index]
// -$counter.innerText = count
