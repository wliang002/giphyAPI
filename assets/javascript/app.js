/*
button-container
form-container
search-form
search
search-btn
image-container
*/

$(document).ready(function () {
    var topics = ["cat", "dog", "bird","dolphin", "monkey"];

    // convert array values to buttons and display them 
    function createButtons() {
        $("#button-container").empty();
        for (let i = 0; i < topics.length; i++) {
            var button = $('<button>').text(topics[i]).addClass('animal btn btn-info').css('margin-right','16px');
            $('#button-container').append(button);
        }
    }

    createButtons();


    // get value from the input on click on search button
    // add it to the array of topics and display it
    $("#search-btn").click(function (event) {
        // default behavior to forms, prevent refreshing
        event.preventDefault();
        var valid = $("#search-form")[0].checkValidity();
        if (valid) {
            // normalizeing and formating
            var newAnimal = $('#search').val().trim().toLowerCase();
            // check if animal is in the array;
            if (topics.indexOf(newAnimal) === -1) {
                topics.push(newAnimal);
                var button = $('<button>').text(newAnimal).addClass('animal btn btn-info').css('margin-right','16px');
                $('#button-container').append(button);

                $("#search").val("");
            } else {
                // notify user to add a new animal isn't there
                return;
            }
        } else {
            alert("You must add something!");
        }
    });

    // get the text of the button clicked
    // search for gif of the animal selected using on giff api
    $("#button-container").on("click", ".animal", function () {
        var selectAnimal = $(this).text();
        selectAnimal = selectAnimal.replace(/\s/g, "+");
        
        var baseUrl = "https://api.giphy.com/v1/gifs/search?q=";
        var apiKey = "&api_key=VH4o2prOQ0c5tALblUWsNpS5vM4WSi5n";
        // & in between parameters
        var limit = "&limit=10"

        var queryUrl = baseUrl + selectAnimal + apiKey +limit;
        // 
        $.get(queryUrl, function (results) {
            var giffyResult = results.data;
            console.log(giffyResult);
            // loop through the array create a card with an image and a rating
           
            $("#image-container").empty();
            for(let i = 0; i < giffyResult.length; i++) {
                var card = $("<div>").addClass("card");
                var img = $("<img>").addClass("card-img-top");
                img.attr("src", giffyResult[i].images.original_still.url);
                img.attr("alt",giffyResult[i].title);
                img.data("still",giffyResult[i].images.original_still.url);
                img.data("animate", giffyResult[i].images.original.url)
                var cardBody = $('<div>').addClass('card-body');
                var rating =$('<p>').text("rating: "+ giffyResult[i].rating).addClass("card-title");
                var title = $('<p>').text(giffyResult[i].title).addClass('card-text');
                $(card).append(img, cardBody, rating,title);
                $("#image-container").append(card);
            }

                })
            });

            // make image toggle from still to animate on click
            $("#image-container").on("click", ".card-img-top", function(){
                var selectImage = $(this);

                console.log(selectImage);
                var src = selectImage.attr("src");
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
        
        
        
        
