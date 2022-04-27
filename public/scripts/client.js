//Client-side JS Logic:

$(document).ready(function () {
//--------------------------------------------------------------------------------------------------  
  
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



//-----------------------------------------------------------------

$( "#create-tweet" ).submit(function( event ) {
  event.preventDefault();
  
  //Serialize the form data and send it to the server as a query string.
  const $inputs = $("#tweet-text").serialize();

  console.log("$inputs", $inputs)

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






