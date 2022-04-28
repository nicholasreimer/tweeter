//Client-side JS Logic:

$(document).ready(function () {
//--------------------------------------------------------------------------------------------------  

//-----------------------------------------------------------------
//CREATE TWEET ELEMENT:
function createTweetElement(tweetObj) {
  //create the foundation for a new tweet in the html
  let $newTweet = $(`<article class="tweetcontainer"></article>`);

  const htmlContent = `<header class="tweetheader">
  <img src=${tweetObj.user.avatars}>
  <div>${tweetObj.user.name}</div>
  <div>${tweetObj.user.handle}</div>
</header>
  <article class="tweet">
    ${tweetObj.content.text}
   </article>
   <span></span>
  <footer class="tweetfooter">
   <div>${timeago.format(new Date())}</div>
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
for(element of tweetObjArray){
  $(".tweets-container").append(createTweetElement(element));
}
};

//-----------------------------------------------------------------
//LOAD TWEETS: responsible for fetching tweets from the /tweets page

function loadTweets(){

 $.ajax({
  type: "GET",
  url: "http://localhost:8080/tweets/",
})
.then((response) => {
  renderTweets(response);
})
//use jQuery to make a request to /tweets and receive the array of tweets as JSON.
}

loadTweets();

//----------------------------------------------------------------------
//FORM EVENT HANDLER and AJAX POST REQUEST

$( "#create-tweet" ).submit(function( event ) {
  event.preventDefault();
  
  //Serialize the form data and send it to the server as a query string.
  const $inputs = $("#tweet-text").serialize();


//remove the "text=" that is inside of $inputs and check its length to be sure its under 140
if($inputs.replace("text=", "").length > 140) {
  alert("your tweet is too long")
  return;
}

if(!$inputs.replace("text=", "")){
  alert("your submission is non exsistent")
  return;
}

 $.ajax({
  type: "POST",
  url: "http://localhost:8080/tweets/",
  data: $inputs,
})
.then(() => {
console.log("have u made it this far?")
})


});
//after the ajax post, use jquerry to reload the page via load()


//MUST BE BOTTOM!
});






