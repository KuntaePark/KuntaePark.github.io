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
var authRef = database.ref('userInfo');
var categoryObject = null;
var currentCatItem = null;
var allItemObject = null;
var catHistory = [];
var lst = []

var curUserInfo = null;
var curUserName = localStorage.getItem('curUserName')
var userInfos
authRef.once('value',function(snapshot) {
  userInfos = snapshot.val()
  if(curUserName != null) {
    Object.keys(userInfos).forEach(function(item) {
      if(curUserName == userInfos[item]['usrname']) {
        curUserInfo = userInfos[item]
      }
    })
  }
  updateUsrState()
});


var today = new Date()
var dd = today.getDate()
if(localStorage.getItem('closeDate') == dd) {
  $('#sideBar').css("display","none")
}
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
})
  
function generatelst() {
  itemsRef.once("value", function(items) {
            allItemObject = items.val()
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

function updateUsrState() {
  var htmls;
  if(curUserInfo == null) {
  htmls = `
    Sign in
  `
  $('#loginState').html(htmls)
  } else {
  htmls = `
    <div class="text">
      <img class="ui avatar image" src="https://semantic-ui.com/images/avatar/small/joe.jpg">
      ${curUserName}             
    </div>
    <i class="dropdown icon" style="color: white;"></i>
    <div class="menu">
      <div class="item">profile</div>
      <div class="item" id="logout">logout</div>
    </div>
  `
  $('#loginState').html(htmls)
  $('#logout').on("click",function(e) {
  e.stopPropagation()
  curUserInfo = null
  curUserName = null
  localStorage.removeItem('curUserName')
  updateUsrState()
  })
  }


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
    if(category == 'pic') {
    return
    } else {
      var halalMark = ''
      var curKeyData = Categories[category]['key']
      if(curKeyData != null) {
        var temp = allItemObject[curKeyData]["status"]
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
  htmls = halals.join('') + susps.join('') + harams.join('')
  $('#catMenuItemGrid').html(htmls)
  $('.catElements').click(function(e){
    e.preventDefault()
    if(categoryObject[this.id]['key'] != null) {
      clickfunc(this.id)
    } else {
      catHistory.push([currentCatItem, categoryObject]);
      currentCatItem = this.id
      categoryObject = categoryObject[this.id]
      renderCategories(categoryObject)

    }
  })
$('#loginState').on("click",function() {
if(curUserInfo == null) {
  $('.ui.login.modal')
    .modal('show')
  ;

  $('.ui.login.form')
    .form({
      fields: {
       
        username: {
          identifier: 'username',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter a username'
            }
          ]
        },
        password: {
          identifier: 'password',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter a password'
          
            }
          ]
        },
      }
    });

  $('.ui.red.login.cancel.basic.button').click(function(){
  console.log('click');
  $('.ui.login.modal.form').modal('hide'); 
  });
                                               
   
  $('.ui.green.login.submit.basic.button').click(function(){
    console.log('click');
    if( $('.ui.login.form').form('is valid')) {
      console.log('valid');
      //login validation
      var usrId = $('input[name="username"]').val()
      var usrPswd = $('input[name="password"]').val()
      var existId = false
      var matchPswd = false
      if(userInfos == null) {
        alert("Id does not exist! Try again.")
        return
      }
      Object.keys(userInfos).forEach(function(element) {
        console.log(element)
        if(userInfos[element]["usrname"] == usrId) {
          existId = true
          if(userInfos[element]["password"] == usrPswd) {
            curUserInfo = userInfos[element]
            localStorage.setItem('curUserName',curUserInfo.usrname)
            curUserName = curUserInfo.usrname
            matchPswd = true
            updateUsrState()
            return
          } else {
            return
          }
        }
      })
      if(existId) {
        if(matchPswd) {
          $('.ui.login.modal').modal('hide');
          return          
        } else {
          alert("Wrong password! Try again.")
          return
        }
      } else {
          alert("Id does not exist! Try again.")
          return
      }
    }
  });
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
    currentCatItem = temp[0]
    categoryObject = temp[1]
    renderCategories(categoryObject)
    //pop one from history
  })
}

$('#closeButton2').click(function(e){
  e.preventDefault()
  if($("#sideBarCheck").is(":checked")) {
    var today = new Date()
    var dd = today.getDate()
    console.log(dd)
    localStorage.setItem('closeDate',dd)
  }
  $('#sideBar').css("display","none")
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