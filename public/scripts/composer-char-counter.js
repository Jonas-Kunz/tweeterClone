
// counter for characters
$(document).ready(function () {
  //  event handler for the textarea
  $("#tweet-text").on("input", function (e) {
    // update the character counter
    console.log(e);
    const remainingChars = 140 - $(this).val().length;
    // basic tree traversal to find the counter
    const formFind = $(this).closest("form");
    const countTarget = formFind.find("output");
    countTarget.text(remainingChars);

    if (remainingChars < 0) {
      countTarget.css("color", "red")
    } else {
      countTarget.css("color", "")
    }

  });

});
