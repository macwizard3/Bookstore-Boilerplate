// Array position 0 is format of data (empty values)
var prodInfo = { // Object of product arrays
  "books":  [ { // Array of books with basic object information
              "id": 0,
              "title": "",
              "author": "",
              "price": 0,
              "imageUrl": "",
              "sellingPoints": ["","",""]
            } ],
  "music":  [ { // Array of books with basic object information
              "id": 0,
              "title": "",
              "author": "",
              "price": 0,
              "imageUrl": "",
              "sellingPoints": ["","",""]
            } ],
  "audiobooks": [ { // Array of audio books with basic object information
                  "id": 0,
                  "title": "",
                  "author": "",
                  "price": 0,
                  "imageUrl": "",
                  "sellingPoints": ["","",""]
                } ],
};

// Object with paired values for selecting the div# based on product type
var divType = {
  // Type: div ID
  "Book": "#bookList",
  "Music": "#musicList",
  "Audiobook": "#audiobookList"
};

// Saving JSON data via download
// Code adapted from StackOverflow (http://jsfiddle.net/sz76c083/1)
var createJSONDownload = () => {
  var data = "text/json;charset=utf-8,"
    + encodeURIComponent(JSON.stringify(prodInfo));

  var a = document.createElement('a');
  a.href = 'data:' + data;
  a.download = 'products.json'; // Name of file
  a.innerHTML = 'Download compiled JSON file.';

  $('#downloadJSON').empty();
  var container = document.getElementById('downloadJSON');
  container.appendChild(a);
}

// jQuery code for appending product to div based on type selected
var appendToPage = ( prod, type ) => {
  // prod is prodInfo.type address
  // type is the type of product selected from the radio buttons
  var appendStr = "";

  appendStr += '<h3>' + type + ' ' + prod.id + ':</h3>';
  appendStr += '<ul class="bookwrapper">';
  appendStr += '<div class="book-id"><li>ID: ' + prod.id + '</li></div>';
  appendStr += '<div class="book-type"><li>Type: ' + type + '</li></div>';
  appendStr += '<div class="book-name"><li>Title: ' + prod.title + '</li></div>';
  appendStr += '<div class="book-author"><li>Author: ' + prod.author + '</li></div>';
  appendStr += '<div class="book-price"><li>Price: ' + prod.price + '</li></div>';
  appendStr += '<div class="book-picture"><li><img src="' + prod.imageUrl + '" alt="Book Image"></li></div>';
  appendStr += '</ul>';

  // Loop through array to get selling points.
  appendStr += '<div class="book-sellingpoints"><p>Selling Points: </p><ul>';
  prod.sellingPoints.forEach ( function ( sPoint ) {
    appendStr += '<li>' + sPoint + '</li>';
  } );
  appendStr += '</ul></div>';

  // Appends the appendStr to the specific div
  $( divType[type] ).append( appendStr );
}

var parseData = ( dataObj ) => {
  // var data = $( form ).serializeArray(); // Parsing form info to data obj
  var formObject = {}; // Initializing object to push onto prodInfo.type array
  var object = {
    "array": [], // Empty array of length 0, represents prodInfo.type
    "type": "" // Empty string placeholder
  };

  formObject.sellingPoints = []; // Initializing sellingPoints

  dataObj.forEach (( field ) => {
      if( field.name === "sP-1" || field.name === "sP-2" || field.name === "sP-3"){
          formObject.sellingPoints.push( field.value )
      } else if (field.name === "optRadio") {
        // Creating composite address of array based on selected radio button
        switch (field.value) {
          case 'music-radio':       object.array = prodInfo.music;
                                    object.type = "Music";
                                    break;
          case 'book-radio':        object.array = prodInfo.books;
                                    object.type = "Book";
                                    break;
          case 'audiobook-radio':   object.array = prodInfo.audiobooks;
                                    object.type = "Audiobook";
                                    break;
          default:  console.log('ERROR: Invalid type selection for selectProdType().');
        }
      } else {
          formObject[ field.name ] = field.value;
      }
  } );

  // Id matches length due to array having empty dataset for 0 position
  formObject.id = object.array.length;

  object.array.push( formObject ); // Adding book to type specific array

  return object;
};

var pageFiller = () => {
  // Building or rebuilding the product bookList
  // Not efficient for large lists
  // Uses prodInfo to call appendToPage()
  // Remember that position 0 of all three arrays is an empty set

  // Refreshing the product type div's and re-adding the hyperlinks
  $('#bookList').empty();
  $('#audiobookList').empty();
  $('#musicList').empty();

  // Appending the books array
  for (var i=1; i<prodInfo.books.length; i++){
    appendToPage ( prodInfo.books[i], "Book");
  }

  // Appending the audiobooks array
  for (var i=1; i<prodInfo.audiobooks.length; i++){
    appendToPage ( prodInfo.audiobooks[i], "Audiobook");
  }

  // Appending the music array
  for (var i=1; i<prodInfo.music.length; i++){
    appendToPage ( prodInfo.music[i], "Music");
  }
}


// Clicking Submit starts it all off :D
$( "form" ).on( "submit", function ( event ) {
  var data = $( event.target ).serializeArray(); // Parsing form info to data obj

  // Preventing the submit button from submitting the form
  event.preventDefault();

  // Parses the data from the form and pushes to prodInfo.type
  parseData ( data );

  // Build or rebuild list of products based on prodInfo
  pageFiller ();

  // Updating JSON download pageFiller
  createJSONDownload ();

  // Resetting form
  $('form')[0].reset();
});
