var config = {
apiKey: "AIzaSyC-hLbY7tuadTg8l6nRQ7YsfWbAFmnFQS0",
databaseURL: "https://prototype-a5084.firebaseio.com",
};

firebase.initializeApp(config);
var database = firebase.database();
var categoryRef = database.ref('categories');
var categoryObject = null;
var CurrentCatItem = null;

categoryRef.once('value',function(snapshot) {
  categoryObject = snapshot.val()
  console.log(categoryObject)
  renderCategories(categoryObject)
})
function renderCategories(Categories) {
  var htmls;
  htmls = Object.keys(Categories).map(function (category) {
    if(category == 'pic') {
      return ''
    } else {
      console.log(Categories[category]['pic'])
    return `
      <div class="column"><div class="catElements" id="${category}"
      style="background: url(${Categories[category]['pic']}) no-repeat;
      background-size: cover;
      background-position: center center;">
        <div class="catName">${category}</div>
      </div></div>        
     `
    }
  })
  $('#catMenuItemGrid').html(htmls)
  $('.catElements').click(function(e){
    e.preventDefault()
    console.log("clicked")
    console.log(categoryObject[this.id]['key'])
    if(categoryObject[this.id]['key'] != null) {
      console.log("not an object.");
    } else {
      categoryObject = categoryObject[this.id]
      console.log(categoryObject)
      renderCategories(categoryObject)

    }
  })
}

