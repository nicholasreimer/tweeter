//Client-Side JS Logic:

$(document).ready(function () {
  //--------------------------------------------------------------------------------------------------
  //ESCAPE FUNCTION: used for eliminating Cross site scripting weaknesses

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //-----------------------------------------------------------------
  //CREATE TWEET ELEMENT:
  function createTweetElement(tweetObj) {
    //create the foundation for a new tweet in the html
    let $newTweet = $(`<article class="tweetcontainer"></article>`);

    const htmlContent = `<header class="tweetheader">
  <img src="${tweetObj.user.avatars}" />
  <div>${tweetObj.user.name}</div>
  <div>${tweetObj.user.handle}</div>
</header>
<article class="tweet">${escape(tweetObj.content.text)}</article>
<span></span>
<footer class="tweetfooter">
  <div>${timeago.format(tweetObj.created_at)}</div>
  <div>
    <i class="fa-solid fa-flag"></i>
    <i class="fa-solid fa-retweet"></i>
    <i class="fa-regular fa-heart"></i>
  </div>
</footer>`;

    let tweetElement = $newTweet.append(htmlContent);

    return tweetElement;
  }

  //---------------------------------------------------------------
  //RENDER TWEETS:
  function renderTweets(tweetObjArray) {
    for (element of tweetObjArray) {
      $(".tweets-container").prepend(createTweetElement(element));
    }
  }

  //-----------------------------------------------------------------
  //LOAD TWEETS: responsible for fetching tweets from the /tweets page

  function loadTweets() {
    $.ajax({
      type: "GET",
      url: "http://localhost:8080/tweets/",
    }).then((response) => {
      $(".tweets-container").empty();
      renderTweets(response);
    });
    //use jQuery to make a request to /tweets and receive the array of tweets as JSON.
  }
  loadTweets();

  //----------------------------------------------------------------------
  //FORM EVENT HANDLER and AJAX POST REQUEST

  $("#create-tweet-form").submit(function (event) {
    event.preventDefault();

    //Serialize the form data and send it to the server as a query string.
    const $inputs = $("#tweet-text").serialize();

    if ($(".error").is(":visible")) {
      $(".error").slideUp();
    }

    if ($inputs.replace("text=", "").length > 140) {
      $(".error").slideDown();
      return;
    }

    if (!$inputs.replace("text=", "")) {
      $(".error").slideDown();
      return;
    }

    $.ajax({
      type: "POST",
      url: "http://localhost:8080/tweets/",
      data: $inputs,
    }).then(() => {
      loadTweets();
      $("#tweet-text").val("");
      $(".counter").text(140);
    });
  });
});
