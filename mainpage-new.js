var config = {
apiKey: "AIzaSyC-hLbY7tuadTg8l6nRQ7YsfWbAFmnFQS0",
databaseURL: "https://prototype-a5084.firebaseio.com",
};

firebase.initializeApp(config);
var database = firebase.database();
var categoryRef = database.ref('categories');
var srchsRef = database.ref('srchs');
var categoryObject = null;
var currentCatItem = null;
var catHistory = [];
var lst = []

$( document ).ready(function() {
    generatelst()
      $('#srch').autocomplete({
        minCharacters : 2,
        source: lst,
        select: function (e, ui) {
          var obj = {
            ans : ui.item.label
          }
          selectionsRef.push(obj)
          location.href = "item.html";
          return false
      }
  })})

function generatelst() {
  itemsRef.once("value", function(items) {
            items.forEach(function(item){
              lst.push(item.val().engname)
            });
          });
}

categoryRef.once('value',function(snapshot) {
  categoryObject = snapshot.val()
  console.log(categoryObject)
  renderCategories(categoryObject)
})

document.getElementById("srch").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      var obj = {
        ans : document.getElementById("srch").value
      }
      srchsRef.push(obj)
      location.href = "webs.html";
  }})


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function renderCategories(Categories) {
  var htmls;
  if(currentCatItem == null) {
    $('#curCategory').html('')
    $('#backButton').css("display","none")
  } else {
    $('#curCategory').html(capitalizeFirstLetter(currentCatItem))
    $('#backButton').css("display","block")
  }
  htmls = Object.keys(Categories).map(function (category) {
    if(category == 'pic') {
      return ''
    } else {
    return `
      <div class="column"><div class="catElements" id="${category}"
      style="background: url(${Categories[category]['pic']}) no-repeat;
      background-size: cover;
      background-position: center center;">
        <div class="catName">${capitalizeFirstLetter(category)}</div>
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
      catHistory.push([currentCatItem, categoryObject]);
      currentCatItem = this.id
      categoryObject = categoryObject[this.id]
      console.log(categoryObject)
      renderCategories(categoryObject)

    }
  })

  $('#backButton').click(function(e) {
    console.log("clicked")
    e.preventDefault()
    var temp = catHistory.pop()
    console.log(temp)
    currentCatItem = temp[0]
    categoryObject = temp[1]
    renderCategories(categoryObject)
    //pop one from history
  })
}

