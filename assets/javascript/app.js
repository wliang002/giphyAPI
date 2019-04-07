/*
button-container
form-container
search-form
search
search-btn
image-container
*/

$(document).ready(function () {
    var animals = ["cat", "dog", "bird"];

    // convert array values to buttons and display them 
    function createButtons() {
        $("#button-container").empty();
        for (let i = 0; i < animals.length; i++) {
            var button = $('<button>').text(animals[i]).addClass('animal btn btn-primary');
            $('#button-container').append(button);
        }
    }

    createButtons();


    // get value from the input on click on search button
    // add it to the array of animals and display it
    $("#search-btn").click(function (event) {
        // default behavior to forms, prevent refreshing
        event.preventDefault();
        var valid = $("#search-form")[0].checkValidity();
        if (valid) {
            // normalizeing and formating
            var newAnimal = $('#search').val().trim().toLowerCase();
            // check if animal is in the array;
            if (animals.indexOf(newAnimal) === -1) {
                animals.push(newAnimal);
                var button = $('<button>').text(newAnimal).addClass('animal btn btn-primary');
                $('#button-container').append(button);

                $("#search").val("");
            } else {
                // notify user to add a new animal isn't there
                return;
            }
        } else {
            alert("u must add an input");
        }
    });

    // get the text of the button clicked
    // search for gif of the animal selected using on giff api
    $("#button-container").on("click", ".animal", function () {
        var selectAnimal = $(this).text();
        selectAnimal = selectAnimal.replace(/\s/g, "%");

        var baseUrl = "https://api.giphy.com/v1/gifs/search?q=";
        var apiKey = "&api_key=dc6zaTOxFJmzC";
        // & in between parameters
        var limit = "&limit=10"

        var queryUrl = baseUrl + selectAnimal + limit + apiKey;
        // 
        $.get(queryUrl, function (results) {
            var giffyResult = results.data;
            // loop through the array create a card with an image and a rating
           
            $("#image-contain").empty();
            for(let i = 0; i<giffyResult.length; i++) {
                var card = $("<div>").addClass("card");
                var img = $("<img>").addClass("card-img-top");
                img.attr("src", giffyResult[i].images.original_still.url);
                img.attr("alt",giffyResult[i].title);
                img.data("still",giffyResult[i].images.original_still.url);
                img.data("animate", giffyResult[i].images.original.url)
                var cardBody = $('<div>').addClass('card-body');
                var rating =$('<h4>').text(giffyResult[i].rating).addClass("card-title");
                var title = $('<p>').text(giffyResult[i].title).addClass('card-text');
                $(card).append(img, cardBody, rating,title);
                $("#image-contain").append(card);
            }

                })
            });

            // make image toggle from still to animate on click
            $("#image-container").on("click", ".card-img-top", function(){
                var selectImage = $(this);
                var src = selectImage.attr.data("src");
                var still = selectImage.data("still");
                var animate = selectImage.data("animate");

                // check if image is still or animated
                if(src === still) {
                    selectImage.attr("src", animate);
                } else {
                    selectImage.attr("src", still);
                }
            })
        }); 
        
        
        
        
