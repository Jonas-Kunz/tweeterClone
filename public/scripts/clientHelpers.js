
const renderTweets = function (tweetsArr) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  const $tweetContainer = $(".tweet-container");

  $tweetContainer.empty();

  $.each(tweetsArr, function (index, tweetObj) {
    $tweetContainer.prepend(createTweetElement(tweetObj));
  });

};

const createTweetHeader = function (tweet) {
  const { name, handle, avatars } = tweet.user;
  // <header>
  //   <div>
  //     <img class="profile-pic" src="${avatars}" alt="Profile-pic" />
  //     <h3>${name}</h3>
  //   </div>
  //   <h3 class="tag">${handle}</h3>
  // </header>
  const $header = $("<header>");
  const $div = $("<div>");
  const $profile = $("<img>");
  const $name = $("<h4>");
  const $handle = $("<h4>");

  $name.text(name);

  $handle.text(handle);
  $handle.addClass("tag");

  $profile.addClass("profile-pic");
  $profile.attr("src", avatars);
  $profile.attr("alt", "profile picture");

  $div.append($profile);
  $div.append($name);

  $header.append($div);
  $header.append($handle);

  return $header;
};

const createTweetContent = function (tweet) {
  // <div class="content">
  //   <p>"${tweet.content.text}"</p>
  // </div>
  const $div = $("<div>");
  const $contentP = $("<p>");

  $div.addClass("content");

  $contentP.text(tweet.content.text);

  $div.append($contentP);

  return $div;
};

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

const createTweetElement = function (tweet) {
  // const { name, avatars, handle } = tweet.user;
  // const time = timeago.format(tweet.created_at);
  const $tweet = $("<article>");
  const $header = createTweetHeader(tweet);
  const $contentDiv = createTweetContent(tweet);
  const $footer = createTweetFooter(tweet);

  $tweet.append($header);
  $tweet.append($contentDiv);
  $tweet.append($footer);

  return $tweet;
};

const loadTweets = function () {
  return $.get("/tweets");
};

const submitPost = function (submitMsg) {
  const response = $.post("/tweets", submitMsg);
  return response;
};

const msgValidationFail = function (msgLength) {
  if (msgLength < 1 || msgLength > 140) {
    // $("#tweet-text").addClass("show");
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
    $(".error-box").removeClass("show");
    // $("#tweet-text").removeClass("show");
  }
}