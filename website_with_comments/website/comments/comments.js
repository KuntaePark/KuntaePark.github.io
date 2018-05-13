// Firebase Database setup
// Initialize Firebase
var config = {
apiKey: "AIzaSyC-hLbY7tuadTg8l6nRQ7YsfWbAFmnFQS0",
databaseURL: "https://prototype-a5084.firebaseio.com",
};

firebase.initializeApp(config);
var database = firebase.database();
var loginId = null;
var itemRef = database.ref('items');
var currentItemName = 'Yoplait Plain'; // this should be the item name
var commentsRef = database.ref('comments');
var itemCommentsRef = null;
var itemKey;
// Bind comments to firebase
itemRef.orderByChild("engname").equalTo(currentItemName).once('value',function(snapshot) {
	itemKey = Object.keys(snapshot.val())[0]
	console.log(itemKey)
	itemCommentsRef = commentsRef.child(itemKey)
	itemCommentsRef.on('value', function (snapshot) {
	  console.log("Updated")
	  var commentsObject = snapshot.val()
	  console.log(commentsObject)
	  renderComments(commentsObject)
	})

})


function addMessage(name, message) {
  var messageObject = {
    name: name,
    message: message,
  }
  itemCommentsRef.push(messageObject)
}

function renderComments(comments) {
	var htmls;
	if(comments == null) {
		htmls = null;
	} else {
		htmls = Object.values(comments).map(function (comment) {
	    return `
	      <div>
	      <b>${comment.name}</b> : <i>${comment.message}</i>
	      </div>
	 	`
	  })
	}
  $('.comments').html(htmls)
}

$('#commentForm').submit(function (e) {
  e.preventDefault()
  var name = $('form #name').val()
  var message = $('form #message').val()
  console.log(name, message)
  addMessage(name, message)
  return false
})

$('#message').on("click",function() {
	console.log("clicked")
	if(loginId == null) {
		console.log("not logged in")
		//connect to log in functionality
	}
});