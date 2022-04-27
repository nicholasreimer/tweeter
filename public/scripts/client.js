/*
  -Client-side JS logic goes here
  -jQuery is already loaded
  -Reminder: Use (and do all your DOM work in) jQuery's document ready function
  
  -Within the client.js file, we're going to define a function createTweetElement that takes in a 
   tweet object and is responsible for returning a tweet <article> element containing the entire 
   HTML structure of the tweet.
 */

// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function () {
  


const tweetObjArray = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1650922564145
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1651008964145
  }
];

const tweetData = {
  user: {
    name: "Newton",
    avatars: "https://i.imgur.com/73hZDYK.png",
    handle: "@SirIsaac",
  },
  content: {
    text: "If I have seen further it is by standing on the shoulders of giants",
  },
  created_at: 1461116232227,
};

//-----------------------------------------------------------------
function createTweetElement(tweetObj) {
  //create the foundation for a new tweet in the html
  let $newTweet = $(`<article class="tweetcontainer"></article>`);

  //this var is specific to this function only
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
   <div>10 days ago</div>
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
function renderTweets(tweetObjArray) {
for(element of tweetObjArray){
  $(".tweets-container").append(createTweetElement(element));
}
};

renderTweets(tweetObjArray);

});
/*
const $tweet = createTweetElement(tweetData);

// // Test / driver code (temporary)
console.log($tweet); // to see what it looks like

// // to add it to the page so we can make sure it's got all the right elements, classes, etc.
$(document).ready(function () {
  $(".tweets-container").prepend($tweet);
});
*/

//$(()=> {})



