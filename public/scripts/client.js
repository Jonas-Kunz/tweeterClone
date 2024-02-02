/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json


$(document).ready(function () {
  loadTweets()
    .then((res) => {
      renderTweets(res);
    })
    .catch((err) => {
      console.log(err);
    });

  $("form").on("submit", function (event) {
    event.preventDefault();
    const submitMsg = $(this).serialize();
    const msgLength = $("#tweet-text").val().length;

    if(msgValidationFail(msgLength)) {
      return;
    }

    submitPost(submitMsg)
      .then((response) => {
        loadTweets(response).then((response) => {
          renderTweets(response);
        });
      })
      .then(() => {
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
