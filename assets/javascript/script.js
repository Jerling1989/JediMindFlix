// Variables
var yodaSummary = "";
var summary = "";
var title ="";

// Whent title is submitted
$("#check-movie").on("click", function(event) {
  event.preventDefault();

  $('#default_screen').remove();

  // Clear last message
  $("#netflix").empty();
  $("#yodaSpeak").empty();
  $("#ratingDisplay").empty();


  // This line grabs the input from the textbox
  title = $("#title-input").val().trim();

  // Run netflix API
  var queryURLtitle = "https://netflixroulette.net/api/api.php?title=" + title;

  var key = "bh5PH4M5r6mshqeGupreXyWUwOCzp1gPcqajsnF7sxA3FjgZkO";

  $.ajax({
    url: queryURLtitle,
    crossDomain: true,
    headers: {
    "Accept": "application/json"
    },
    method: "GET"
  }).done(function(response) {
    console.log(response);

  // Storing the title, ratings, poster and summary
  var showTitle = response.show_title;
  var netflixRating = response.rating;
  var posterURL = response.poster;
  summary = response.summary;

  // Creating an element to hold the title and ratings
  var printTitle = $("<h3>").text("Watch " + showTitle + " on Netflix, you can. Hmmm.");
  var printSummary = "<div class=\"row\"><div class=\"col m3\"><img height=\"200px\" src=\"" + posterURL + "\" alt=\"" + title + "\" /></div><div id='plot' class=\"col m9\"><br><br><br><span id=\"printSummary\"></span></div></div>";
  var printRating = "<table id=\"ratings-table\"><thead><tr><th><div id='table_title'>Judge me by my ratings, do you?</div></th></tr></thead><tbody><tr><td><img id='saber' src='assets/images/lightSaberGreen.png'>&nbsp;&nbsp;&nbsp; - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - &nbsp;&nbsp;&nbsp;Netflix rating: " + netflixRating + "</td></tr></tbody></table>";

  // Appending the title and rating. 
  $("#netflix").append(printTitle);
  $("#yodaSpeak").append(printSummary);
  $("#ratingDisplay").append(printRating);

  // Run Yoda Speak API >> Send resulting summary to yoda.
  var queryURLyoda = "https://yoda.p.mashape.com/yoda?sentence=" + summary;

    $.ajax({
      url: queryURLyoda,
      headers: {
      "X-Mashape-Key": key,
      "Accept": "text/plain"
      },
      method: "GET"
    }).done(function(response) {

      console.log(response);

      var yodaSummary = response;

      // Appending the summary
      $("#printSummary").append(yodaSummary);
      
      }).fail(function(){
      yodaSummary = summary;

      // Appending the summary as is
      $("#printSummary").append(yodaSummary);

      });
      // End of yoda ajax call

    // Run www.omdbapi.com API to pull in ratings
    var ratingQueryURL = "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=40e9cece";
    console.log(ratingQueryURL);
    $.ajax({
      url: ratingQueryURL,
      method: "GET"
    }).done(function(response) {
      console.log(response.Ratings);

      // Check length of rating array
      for (i=0;i<response.Ratings.length;i++) {

        // Check to see if one of them is a Netflix rating... Do not use Netflix
        if (response.Ratings[i].Source == "Netflix") {

        console.log("There is already a Netflix rating.");

      } else {

        // Add ratings data into the table
        $("#ratings-table > tbody").append("<tr><td><img id='saber' src='assets/images/lightSaberGreen.png'>&nbsp;&nbsp;&nbsp; - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - &nbsp;&nbsp;&nbsp;" + response.Ratings[i].Source + ": " + response.Ratings[i].Value + "</td><td>");

          }
        }
      });
    // End movie rating loop

    // Clear input field
    title = $("#title-input").val("");
        
    }).fail(function(){

      // Creating an error message
      var printError = $("<h3>").text("Watch this on Netflix, you cannot.");
      var errorImage = "<div id=\"errorImage\"><img src=\"assets/images/fail.gif\" alt=\"Luke Skywalker screams, No!\"/></div><br>";
      printError.append(errorImage);

      // Appending the title
      $("#netflix").append(printError);

      // Clear input field
      title = $("#title-input").val("");

      });
      // End of Netfix Roulette ajax call
  });
  // End of button on function

     