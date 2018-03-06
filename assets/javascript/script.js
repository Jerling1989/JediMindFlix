// VARIABLES TO CALCULATE HEIGHT OF CONTAINER DIVS
var windowHeight = $(window).height();

// SETTING CONTAINER HEIGHT
$('#main-content').height(windowHeight + 'px');
$('#left-column').height(windowHeight + 'px');


// VARIABLES
var yodaSummary = "";
var summary = "";
var title ="";

// CLICK EVENT FOR WHEN TITLE IS SUBMITTED
$("#check-movie").on("click", function(event) {
  event.preventDefault();

  $('#default_screen').remove();

  // CLEAR LAST MESSAGE
  $("#netflix").empty();
  $("#yodaSpeak").empty();
  $("#ratingDisplay").empty();


  // THIS LINE GRABS THE INPUT FROM THE TEXTBOX
  title = $("#title-input").val().trim();

  // RUN NETFLIX API
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

  // STORING THE TITLE, RATINGS, POSTER AND SUMMARY
  var showTitle = response.show_title;
  var netflixRating = response.rating;
  var posterURL = response.poster;
  summary = response.summary;

  // CREATING AN ELEMENT TO HOLD THE TITLE AND RATINGS
  var printTitle = $("<h3>").text("Watch " + showTitle + " on Netflix, you can. Hmmm.");
  var printSummary = "<div class=\"row\"><div class=\"col m3\"><img height=\"200px\" src=\"" + posterURL + "\" alt=\"" + title + "\" /></div><div id='plot' class=\"col m9\"><br><br><br><span id=\"printSummary\"></span></div></div>";
  var printRating = "<table id=\"ratings-table\"><thead><tr><th><div id='table_title'>Judge me by my ratings, do you?</div></th></tr></thead><tbody><tr><td><img id='saber' src='assets/images/lightSaberGreen.png'>&nbsp;&nbsp;&nbsp; - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - &nbsp;&nbsp;&nbsp;Netflix rating: " + netflixRating + "</td></tr></tbody></table>";

  // APPENDING THE TITLE AND RATING
  $("#netflix").append(printTitle);
  $("#yodaSpeak").append(printSummary);
  $("#ratingDisplay").append(printRating);

  // RUN YODA SPEAK API >> SEND RESULTING SUMMARY TO YODA
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

      // APPEDNING THE SUMMARY
      $("#printSummary").append(yodaSummary);
      
      }).fail(function(){
      yodaSummary = summary;

      // APPENDING THE SUMMARY AS IS
      $("#printSummary").append(yodaSummary);

      });
      // END OF YODA AJAX CALL

    // RUN WWW.OMDBAPI.COM API TO PULL IN RATINGS
    var ratingQueryURL = "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=40e9cece";
    console.log(ratingQueryURL);
    $.ajax({
      url: ratingQueryURL,
      method: "GET"
    }).done(function(response) {
      console.log(response.Ratings);

      // CHECK LENGTH OF RATING ARRAY
      for (i=0;i<response.Ratings.length;i++) {

        // CHECK TO SEE IF ONE OF THEM IS A NETFLIX RATING... DO NOT USE NETFLIX
        if (response.Ratings[i].Source == "Netflix") {

        console.log("There is already a Netflix rating.");

      } else {

        // ADD RATINGS DATA INTO THE TABLE
        $("#ratings-table > tbody").append("<tr><td><img id='saber' src='assets/images/lightSaberGreen.png'>&nbsp;&nbsp;&nbsp; - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - &nbsp;&nbsp;&nbsp;" + response.Ratings[i].Source + ": " + response.Ratings[i].Value + "</td><td>");

          }
        }
      });
    // END MOVIE RATING LOOP

    // CLEAR INPUT FIELD
    title = $("#title-input").val("");
        
    }).fail(function(){

      // CREATING AN ERROR MESSAGE
      var printError = $("<h3>").text("Watch this on Netflix, you cannot.");
      var errorImage = "<div id=\"errorImage\"><img id=\"luke-skywalker\" src=\"assets/images/fail.gif\" alt=\"Luke Skywalker screams, No!\"/></div><br>";
      printError.append(errorImage);

      // APPENDING THE TITLE
      $("#netflix").append(printError);

      // CLEAR INPUT FIELD
      title = $("#title-input").val("");

      });
      // END OF NETFLIX ROULETTE AJAX CALL
  });
  // END OF BUTTON ON FUNCTION

     