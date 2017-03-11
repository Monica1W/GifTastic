//vairables
var animals = ["Dog", "Cat", "Bear", "Lion"];

$(document).on("click", ".gif", function(event) {
	//if data-state = still

		 //set src to data-animate
		// set data-state to animate
	// else 
		// set src to data-still
		// set data-state to still



		if ($(this).attr("data-state") == "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
   
});

// Function for displaying animal buttons
function renderButtons() {

	// Deleting the animal buttons prior to adding new animal buttons
	// (this is necessary otherwise we will have repeat buttons)
	$("#animals-view").empty();

	// Looping through the array of animals
	for (var i = 0; i < animals.length; i++) {

		// Then dynamicaly generating buttons for each animal in the array.
		// This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
		var a = $("<button>");
		// Adding a class to grab data 
		a.addClass("animal");
		// Adding a data-attribute with a value of the animal at index i
		a.attr("data-name", animals[i]);
		// Providing the button's text with a value of the animal at index i
		a.text(animals[i]);
		a.click(function() {


		//grabbing the info from the buttons
		var animal = $(this).data("name");
		//giphy api query 

		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

		//ajax call to get the data from giphy
		$.ajax({
				url: queryURL,
				method: "GET"
			})
			.done(function(response) {
				var results = response.data;

				//looping through the results 
				for (var i = 0; i < results.length; i++) {


					var animalDiv = $("<div>").attr({
					"class":"animalDiv1"
					});

					var p = $("<p>").text("Rating: " + results[i].rating);
					animalDiv.append(p);
					var animalGifAnimated=response.data[i].images.fixed_height.url;
					var animalGifStill=response.data[i].images.downsized_still.url;
					var animalImage = $("<img>").attr({
						"src": animalGifAnimated,
						"data-still": animalGifStill,
						"data-animate": animalGifAnimated,
						"data-state": "still",
						"class":"gif",
						"id":"animalImage",
					});

					animalImage.attr('src', results[i].images.downsized_still.url);


					animalDiv.append(animalImage);
				
					$("#gifs-appear-here").prepend(animalDiv);

				}

			});


		$("#animalImage").on("click", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
       $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

		});
		// Adding the button to the HTML
		$("#animals-view").append(a);
	}

}

// This function handles events where one button is clicked
$("#add-animal").on("click", function(event) {
	// event.preventDefault() prevents the form from trying to submit itself.
	// We're using a form so that the user can hit enter instead of clicking the button if they want
	event.preventDefault();

	// This line will grab the text from the input box
	var animal = $("#animal-input").val().trim();
	// The movie from the textbox is then added to our array
	animals.push(animal);

	// calling renderButtons which handles the processing of our animal array
	renderButtons();
});

// Calling the renderButtons function at least once to display the initial list of animal
renderButtons();