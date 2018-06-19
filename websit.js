var config = {
  apiKey: "AIzaSyC-hLbY7tuadTg8l6nRQ7YsfWbAFmnFQS0",
  databaseURL: "https://prototype-a5084.firebaseio.com/",
};
firebase.initializeApp(config);
var database = firebase.database();
var itemsRef = database.ref('items');
var selectionsRef = database.ref('selections');
var srchsRef = database.ref('srchs');
var lst = []


var authRef = database.ref('userInfo');
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


$( document ).ready(function() {
  srchsRef.once("value").then(function(snapshot) {
     if (snapshot.exists()){
        srchsRef.once("value", function(items) {
            items.forEach(function(item){
              document.getElementById("srch").value=item.val().ans
              // $( "#srch" ).keyup()
              var e = $.Event( "keyup", { which: 13 } );
              $('#srch').trigger(e);
              srchsRef.remove()
            })})
     }
  });

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
});





$("#srch").keyup(function(event) {
  if ( event.which == 13 ) {
    event.preventDefault();
    $('#results > span').nextAll('div').remove();
    npt = document.getElementById("srch").value;
    $(".ui-menu-item").hide();
    itemsRef.once("value", function(items) {
            items.forEach(function(item){
              if (item.val().engname.toLowerCase().includes(npt.toLowerCase())) {
                if (document.contains(document.getElementById("fdb"))) {document.getElementById("fdb").remove();}
                if (item.val().status == "Halal") {
                  var result = "<div class='item' style='width:873px;height:175px;border-bottom: 2px #cccccc solid;'><div class='image' style='height:160px;'>"+
                "<img style='height: 100%;' src='" + item.val().pic + "'></div>"+
                "<div class='middle aligned content' style='align-items: center;'>"+
                "<a class='header' onclick='clickfunc(this)' style='margin-top: 25px; margin-left:30px; font-size:30px;'>" + item.val().engname + "  " + "<br><br>" + item.val().korname + "</a>"+
                "<div id='circle' class='ui huge right floated label' style='background-color: #99cd32; color: rgba(0,0,0,0.85); font-size:26px;'>Halal</div></div></div>"
                $(result).insertAfter(".fxd");
                }
              }
            })
          });
    itemsRef.once("value", function(items) {
            items.forEach(function(item){
              if (item.val().engname.toLowerCase().includes(npt.toLowerCase())) {
                if (document.contains(document.getElementById("fdb"))) {document.getElementById("fdb").remove();}
                if (item.val().status == "Suspicious") {
                  var result = "<div class='item' style='width:873px;height:175px;border-bottom: 2px #cccccc solid;'><div class='image' style='height:160px;'>"+
                "<img style='height: 100%;' src='" + item.val().pic + "'></div>"+
                "<div class='middle aligned content' style='align-items: center;'>"+
                "<a class='header' onclick='clickfunc(this)' style='margin-top: 25px; margin-left:30px; font-size:30px;'>" + item.val().engname + "  " + "<br><br>" + item.val().korname + "</a>"+
                "<div id='circle' class='ui huge right floated label' style='background-color: rgba(255,224,51,0.85); color: rgba(0,0,0,0.85); font-size:20px;'>Suspicious</div></div></div>"
                // "<a class='ui red circular huge right floated label'>Haram</a>< " #ffe033
                $(result).insertAfter(".fxd");
                }
              }
            })
          });
    itemsRef.once("value", function(items) {
            items.forEach(function(item){
              if (item.val().engname.toLowerCase().includes(npt.toLowerCase())) {
                if (document.contains(document.getElementById("fdb"))) {document.getElementById("fdb").remove();}
                if (item.val().status == "Haram") {
                  var result = "<div class='item' style='width: 873px;height:175px;border-bottom: 2px #cccccc solid;'><div class='image' style='height:160px;'>"+
                "<img style='height: 100%;' src='" + item.val().pic + "'></div>"+
                "<div class='middle aligned content' style='align-items: center;'>"+
                "<a class='header' onclick='clickfunc(this)' style='margin-top: 25px; margin-left:30px; font-size:30px;'>" + item.val().engname + "  " + "<br><br>" + item.val().korname + "</a>"+
                "<div id='circle' class='ui huge right floated label' style='background-color: #ff5233; color: rgba(0,0,0,0.85); font-size:26px;'>Haram</div></div></div>"
                // "<a class='ui red circular huge right floated label'>Haram</a>< "
                $(result).insertAfter(".fxd");
                }
              }
            })
          });
      var result1 = '<div id="fdb" style="font-size:33px; color: rgba(0,0,0,.85);">No results found. Please, use "Can\'t find item?" button above.</div>'
      $(result1).insertAfter(".fxd");
  }
})


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

function clickfunc(obj){
  var obj = {
        ans : $(obj).text().split("  ")[0]
      }
      selectionsRef.push(obj)
      // location.href = "item.html";
        var win = window.open("item.html", '_blank');
        win.focus();
}

function generatelst() {
  itemsRef.once("value", function(items) {
            items.forEach(function(item){
              lst.push(item.val().engname)
            });
          });
}

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


document.getElementById("si").onclick = function(){
  $('.ui.sigin.modal')
  .modal('show')
;
}



$('.ui.sigin.form')
  .form({
    fields: {
     
      susername: {
        identifier: 'susername',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter a Username'
          }
        ]
      },
      spassword: {
        identifier: 'spassword',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter a Password'
        
          }
        ]
      },
        smailadress: {
        identifier: 'smailadress',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your E-Mail Adress'
          }
        ]
      },
      scountry: {
        identifier: 'scountry',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your Country'
        
          }
        ]
      },
       smadhhab: {
        identifier: 'smadhhab',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your Madhhab'
          }
        ]
      },
    }
  });

$('.ui.red.sigin.cancel.basic.button').click(function(){
console.log('click');
$('.ui.sigin.modal.form').modal('hide'); 
}),
                                             
 
$('.ui.green.sigin.submit.basic.button').click(function(){
  console.log('click');
  if( $('.ui.sigin.form').form('is valid')) {
    console.log('valid');
    //save usrinfo in database
    var userObject = {
      usrname: $('input[name="susername"]').val(),
      password: $('input[name="spassword"]').val(),
      email: $('input[name="smailadress"]').val(),
      cntry: $('input[name="scountry"]').val(),
      madh: $('input[name="smadhhab"]').val()
    }
    authRef.push(userObject)
    curUserInfo = userObject
    localStorage.setItem('curUserName',curUserInfo.usrname)
    curUserName = curUserInfo.usrname
    updateUsrState();
    $('.ui.sigin.modal').modal('hide');
  }
});