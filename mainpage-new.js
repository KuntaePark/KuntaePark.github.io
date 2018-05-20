var config = {
apiKey: "AIzaSyC-hLbY7tuadTg8l6nRQ7YsfWbAFmnFQS0",
databaseURL: "https://prototype-a5084.firebaseio.com",
};

firebase.initializeApp(config);
var database = firebase.database();
var categoryRef = database.ref('categories');
var itemsRef = database.ref('items');
var srchsRef = database.ref('srchs');
var selectionsRef = database.ref('selections');
var recentChangeRef = database.ref('changes');
var categoryObject = null;
var currentCatItem = null;
var allItemObject = null;
var catHistory = [];
var lst = []

var today = new Date()
var dd = today.getDate()
console.log(dd)
console.log(localStorage.getItem('closeDate'))
if(localStorage.getItem('closeDate') == dd) {
  console.log('here')
  $('#sideBar').css("display","none")
}
generatelst()
console.log(lst)
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
})
  
function generatelst() {
  itemsRef.once("value", function(items) {
            allItemObject = items.val()
            console.log(allItemObject)
            items.forEach(function(item){
              lst.push(item.val().engname)
            });
          });
}

recentChangeRef.once('value',function(snapshot) {
  var htmls;
  htmls = Object.values(snapshot.val()).map(function (itemKey) {
    return `
      <div class="column"><div class="sideBarItem" id="${itemKey}"
      style="background: url(${allItemObject[itemKey]['pic']}) no-repeat;
      background-size: cover;
      background-position: center center;">
        <div class="sideBarItemName">${capitalizeFirstLetter(allItemObject[itemKey]['engname'])}</div>
      </div></div>        
     `
    })
  $("#sideBarList").html(htmls)
})

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
function clickfunc(obj){
  var obj = {
        ans : obj
      }
      selectionsRef.push(obj)
      location.href = "item.html";
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
  // //-----------------------
  // htmls = Object.keys(Categories).map(function (category) {
  //   if(category == 'pic') {
  //     return ''
  //   } else {
  //     var halalMark = ''
  //     var curKeyData = Categories[category]['key']
  //     console.log(curKeyData)
  //     if(curKeyData != null) {
  //       var temp = allItemObject[curKeyData]["status"]
  //       console.log(temp)
  //       if(temp == "Halal") {
  //         halalMark = '<div class="Mark halalMark"><i class="fas fa-check"></i></div>'
  //       }else if(temp == "Suspicious") {
  //         halalMark = '<div class="Mark SuspMark"><i class="fas fa-question"></i></div>'
  //       }else if(temp == "Haram") {
  //         halalMark = '<div class="Mark haramMark"><i class="fas fa-exclamation"></i></div>'
  //       }
  //     }
  //   return `
  //     <div class="column"><div class="catElements" id="${category}"
  //     style="background: url(${Categories[category]['pic']}) no-repeat;
  //     background-size: cover;
  //     background-position: center center;">
  //       <div class="catName">${capitalizeFirstLetter(category)}</div>
  //       ${halalMark}
  //     </div></div>        
  //    `
  //   }
  // })
  //------------------------
  var halals = []
  var susps = []
  var harams = []
  Object.keys(Categories).forEach(function(category) {
    console.log(category)
    if(category == 'pic') {
    return
    } else {
      var halalMark = ''
      var curKeyData = Categories[category]['key']
      console.log(curKeyData)
      if(curKeyData != null) {
        var temp = allItemObject[curKeyData]["status"]
        console.log(temp)
        if(temp == "Halal") {
          halalMark = '<div class="Mark halalMark"><i class="fas fa-check"></i></div>'
          halals.push(`
      <div class="column"><div class="catElements" id="${category}"
      style="background: url(${Categories[category]['pic']}) no-repeat;
      background-size: cover;
      background-position: center center;">
        <div class="catName">${capitalizeFirstLetter(category)}</div>
        ${halalMark}
      </div></div>        
     `)
          return
        }else if(temp == "Suspicious") {
          halalMark = '<div class="Mark SuspMark"><i class="fas fa-question"></i></div>'
          susps.push(`
      <div class="column"><div class="catElements" id="${category}"
      style="background: url(${Categories[category]['pic']}) no-repeat;
      background-size: cover;
      background-position: center center;">
        <div class="catName">${capitalizeFirstLetter(category)}</div>
        ${halalMark}
      </div></div>        
     `)
          return
        }else if(temp == "Haram") {
          halalMark = '<div class="Mark haramMark"><i class="fas fa-exclamation"></i></div>'
          harams.push(`
      <div class="column"><div class="catElements" id="${category}"
      style="background: url(${Categories[category]['pic']}) no-repeat;
      background-size: cover;
      background-position: center center;">
        <div class="catName">${capitalizeFirstLetter(category)}</div>
        ${halalMark}
      </div></div>        
     `)
          return
        }
      } else {
      halals.push(`
      <div class="column"><div class="catElements" id="${category}"
      style="background: url(${Categories[category]['pic']}) no-repeat;
      background-size: cover;
      background-position: center center;">
        <div class="catName">${capitalizeFirstLetter(category)}</div>
        ${halalMark}
      </div></div>        
     `)
      return
      }
    }
  })
  console.log(halals)
  htmls = halals.join('') + susps.join('') + harams.join('')
  console.log(htmls)
  $('#catMenuItemGrid').html(htmls)
  $('.catElements').click(function(e){
    e.preventDefault()
    console.log("clicked")
    console.log(categoryObject[this.id]['key'])
    if(categoryObject[this.id]['key'] != null) {
      console.log("not an object.");
      console.log(this.id)
      clickfunc(this.id)
    } else {
      catHistory.push([currentCatItem, categoryObject]);
      currentCatItem = this.id
      categoryObject = categoryObject[this.id]
      console.log(categoryObject)
      renderCategories(categoryObject)

    }
  })

$('.sideBarItem').click(function(e){
  e.preventDefault()
  console.log("clicked")
  clickfunc(allItemObject[this.id]["engname"])
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

$('#closeButton').click(function(e){
   e.preventDefault()
   $('#sideBar').css("display","none")
   var today = new Date()
   var dd = today.getDate()
   console.log(dd)
   localStorage.setItem('closeDate',dd)
})


document.getElementById("notfound").onclick = function(){
  $('.ui.reqad.modal')
  .modal('show')
;
}

$('.menu .item')
  .tab()
;

$('.coupled.modal')
  .modal({
    allowMultiple: false
  })
;

$('.ui.reqadf.modal')
  .modal('attach events', '.ui.reqad.modal .ui.green.reqad.approve.basic.button')
;