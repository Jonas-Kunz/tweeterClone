/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  // load tweets
  loadTweets()
    .then((res) => {
      // then render tweets
      renderTweets(res);
    })
    .catch((err) => {
      console.log(err);
    });

  // handles form submission
  // basically takes text from form and serializes it
  // text is also put through validatationFail and if it does not throw an error
  // the text is passed to submitMsg
  $("form").on("submit", function (event) {
    event.preventDefault();
    const submitMsg = $(this).serialize();
    const msgLength = $("#tweet-text").val().length;

    if (msgValidationFail(msgLength)) {
      return;
    }
    // here in submit message the text gets sent to the server
    // a random user and id is genereated by our starter code
    // the response is then fed into this chain that calls load tweets to get the tweetsArr
      // to feed into renderTweets
    submitPost(submitMsg)
      .then((response) => {
        loadTweets(response)
          .then((response) => {
            renderTweets(response);
          });
      })
      .then(() => {
        // this here just handles reseting the form and the counter after entry
        $("#tweet-text").val("");
        const formFind = $(this).closest("form");
        const countTarget = formFind.find("output");
        countTarget.text("140");
      })
      .catch((err) => {
        console.log(err.status);
      });
  });
});
