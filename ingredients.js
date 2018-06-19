var config = {
apiKey: "AIzaSyC-hLbY7tuadTg8l6nRQ7YsfWbAFmnFQS0",
databaseURL: "https://prototype-a5084.firebaseio.com",
};

firebase.initializeApp(config);
var database = firebase.database();
var itemsRef = database.ref('items');
var allItemObject = null;
var ingrlst = []


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

function containsObject(obj, list) {
    var i;
    if(list.length == 0) {return false;}
    for (i = 0; i < list.length; i++) {
        if (list[i].koringr.trim() == obj.koringr.trim() && list[i].engingr.trim() == obj.engingr.trim()) {
            return true;
        }
    }

    return false;
}

itemsRef.once("value", function(items) {
  allItemObject = items.val()
  items.forEach(function(item){
    Object.values(item.val().ingredients).forEach(function(ingobj) {
      if(!containsObject(ingobj,ingrlst)) {
        ingrlst.push(ingobj)
      }
    })
  });

  ingrlst.sort(function(a,b) {
    if(a.koringr > b.koringr) {
      return 1
    } else if(a.koringr == b.koringr) {
      return 0
    } else {
      return -1
    }
  })
  console.log(ingrlst)
  for(var i=0;i<ingrlst.length;i++) {
  var isHalal;
  if(ingrlst[i]["state"]) {
    isHalal = "Halal"
  } else {
    isHalal = "Haram"
  }
  $("#myTable tbody").append(`
    <tr class=${isHalal}>
      <td>${ingrlst[i]["koringr"]}</td>
      <td>${ingrlst[i]["engingr"]}</td>
    </tr>
  `)  
}
});



function myFunction() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("srch");
  filter = input.value.toUpperCase();
  console.log(filter)
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
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