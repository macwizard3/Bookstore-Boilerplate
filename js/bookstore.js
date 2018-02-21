var bookInfo = [ // Array of books
  {
    "id": 0,
    "title": "",
    "author": "",
    "price": 0,
    "imageUrl": "",
    "sellingPoints": [
        "","",""
    ]
  } // basic object information for a single book
];

var appendToPage = (book) => {
//     $('#book-id li p').text(book.id);
//     $('#book-name li p').text(book.title);
//     $('#book-author li p').text(book.author);
//     $('#book-price li p').text(book.price);
//     $('#book-picture li img').attr("src", book.imageUrl);
// console.log(book.imageUrl);
//     // loop through array to get selling points.
//     var sellingPtsIndex = 0;
//     while (sellingPtsIndex < book.sellingPoints.length) {
//       $('#book-sellingPoints ul').append('<li>' +
//         book.sellingPoints[sellingPtsIndex] + '</li>');
//       sellingPtsIndex ++;
//     };
// console.log(book); // debug tool

// Copy of HTML code layout for a single book
// <div class="book" id="book1">
//   <h3>Book 1</h3>
//   <ul id="bookwrapper">
//     <div id="book-id"><li>id: <p></p></li></div>
//     <div id="book-name"><li>name: <p></p></li></div>
//     <div id="book-author"><li>author: <p></p></li></div>
//     <div id="book-price"><li>price: <p></p></li></div>
//     <div id="book-picture"><li><img src="http://via.placeholder.com/125x185" alt="Book Image"></li></div>
//   </ul>
//     <p>Selling Points:</p>
//     <div id="book-sellingPoints">
//       <ul>
//
//       </ul>
//     </div>
// </div>
    $("#bookList").append('<a href="#book' + book.id + '">'); // Hyper link jump to a book
    $("#bookList").append('<div class="book" id="book' + book.id + '"></a>');
    $("#bookList").append('<h3>Book ' + book.id + ':</h3>');
    $("#bookList").append('<ul class="bookwrapper">');
    $("#bookList").append('<div class="book-id"><li>ID: ' +
                         book.id + '</li></div>');
    $("#bookList").append('<div class="book-name"><li>Title: ' +
                           book.title + '</li></div>');
    $("#bookList").append('<div class="book-author"><li>Author: ' +
                           book.author + '</li></div>');
    $("#bookList").append('<div class="book-price"><li>Price: ' +
                           book.price + '</li></div>');
    $("#bookList").append('<div class="book-picture"><li><img src="' +
                           book.imageUrl + '" alt="Book Image"></li></div>');
    $("#bookList").append('</ul><p>Selling Points: </p>');
    $("#bookList").append('<div class="book-sellingpoints"><ul>');
      // loop through array to get selling points.
     var sellingPtsIndex = 0;
     while (sellingPtsIndex < book.sellingPoints.length) {
       $("#bookList").append('<li>' +
         book.sellingPoints[sellingPtsIndex] + '</li>');
       sellingPtsIndex ++;
     };
     $("#bookList").append('</ul></div></div>');
     $("#bookList").append('<br>')
}

var appendToJSON = () => {
  // Append to JSON file the current bookInfo object
  var bookJSON = JSON.stringify(bookInfo);

  // localStorage.setItem ( 'bookstore.json', bookJSON );
}

$( "form" ).on( "submit", ( event ) => {
    var data = $( event.target ).serializeArray();
    var formObject = {};

    event.preventDefault();

    formObject.id = bookInfo.length;
    formObject.sellingPoints = [];

    data.forEach( ( field ) => {
        if( field.name === "sP-1" || field.name === "sP-2" || field.name === "sP-3"){
            formObject.sellingPoints.push( field.value )
        }
        else {
            formObject[ field.name ] = field.value;
        }
    } );
    bookInfo.push( formObject ); // Adding book to object array
    appendToPage( formObject ); // Adding book info to the webpage
    appendToJSON( ); // Adding book to JSON file
    $('form')[0].reset(); // Resetting form
});
