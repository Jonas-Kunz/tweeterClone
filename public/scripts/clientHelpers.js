// empties tweet container
// loops through the tweetsArr from the mock database
// then prepends the tweets to the tweet-container
const renderTweets = function (tweetsArr) {

  const $tweetContainer = $(".tweet-container");

  $tweetContainer.empty();

  $.each(tweetsArr, function (index, tweetObj) {
    $tweetContainer.prepend(createTweetElement(tweetObj));
  });

};
// helper to creat the header of the tweet article
const createTweetHeader = function (tweet) {
  const { name, handle, avatars } = tweet.user;
  //takes in data from response from server from renderTweets
  // definitions for each html element

  const $header = $("<header>");
  const $div = $("<div>");
  const $profile = $("<img>");
  const $name = $("<h4>");
  const $handle = $("<h4>");

  // using .text() to escape spooky scripts
  $name.text(name);
  $handle.text(handle);

  // adding needed classes and atrributes
  $handle.addClass("tag");
  $profile.addClass("profile-pic");
  $profile.attr("src", avatars);
  $profile.attr("alt", "profile picture");

  // appending created elements to header
  $div.append($profile);
  $div.append($name);
  $header.append($div);
  $header.append($handle);

  return $header;
};

// this function works the same as above
const createTweetContent = function (tweet) {

  const $div = $("<div>");
  const $contentP = $("<p>");

  $div.addClass("content");

  $contentP.text(tweet.content.text);

  $div.append($contentP);

  return $div;
};

// this function works the same as above
const createTweetFooter = function (tweet) {
  const time = timeago.format(tweet.created_at);

  const $footer = $("<footer>");
  const $timeP = $("<p>");
  const $iconDiv = $("<div>");
  const $flagIcon = $("<i>");
  const $retweetIcon = $("<i>");
  const $likeIcon = $("<i>");

  $flagIcon.addClass("fa-solid fa-flag");
  $retweetIcon.addClass("fa-solid fa-retweet");
  $likeIcon.addClass("fa-solid fa-heart");

  $iconDiv.append($flagIcon);
  $iconDiv.append($retweetIcon);
  $iconDiv.append($likeIcon);

  $timeP.text(time);

  $footer.append($timeP);
  $footer.append($iconDiv);

  return $footer;
};

// calls the other create helper functions and stitches em together
const createTweetElement = function (tweet) {
  const $tweet = $("<article>");
  const $header = createTweetHeader(tweet);
  const $contentDiv = createTweetContent(tweet);
  const $footer = createTweetFooter(tweet);

  $tweet.append($header);
  $tweet.append($contentDiv);
  $tweet.append($footer);

  return $tweet;
};

// starts loading tweets by making a get request to /tweets
const loadTweets = function () {
  return $.get("/tweets");
};

// submits tweets by making a post to .tweets
const submitPost = function (submitMsg) {
  return $.post("/tweets", submitMsg);
};

// if message is less than 1 or greater than 140 returns the appropriate warning text
const msgValidationFail = function (msgLength) {

  if (msgLength < 1 || msgLength > 140) {
    // adds class to .error-box so i can do a transition
    $(".error-box").addClass("show");
    let warningText = "";
    if (msgLength < 1) {
      warningText = "❗❗❗ Please Enter A Message ❗❗❗ ";
    } else if (msgLength > 140) {
      warningText =
        "❗❗❗ Please Enter A Message Shorter Than 140 Characters ❗❗❗ ";
    }
    return $(".warning").text(`${warningText}`);
  } else {
    // removes class.
    $(".error-box").removeClass("show");
  }
}