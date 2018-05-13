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
  // if (sessionStorage.getItem("itemname") != null){
  //   document.getElementById("srch").value = sessionStorage.getItem("itemname")
  //   e = jQuery.Event("keypress")
  //   e.which = 13 //choose the one you want
  //   $("#srch").keypress(function(){
  //   }).trigger(e)
  // }
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
                if (item.val().status == "Halal") {
                  var result = "<div class='item' style='width:873px;height:175px;'><div class='image'>"+
                "<img src='" + item.val().pic + "'></div>"+
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
                if (item.val().status == "Suspicious") {
                  var result = "<div class='item' style='width:873px;height:175px;'><div class='image'>"+
                "<img src='" + item.val().pic + "'></div>"+
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
                if (item.val().status == "Haram") {
                  var result = "<div class='item' style='width: 873px;height:175px;'><div class='image'>"+
                "<img src='" + item.val().pic + "'></div>"+
                "<div class='middle aligned content' style='align-items: center;'>"+
                "<a class='header' onclick='clickfunc(this)' style='margin-top: 25px; margin-left:30px; font-size:30px;'>" + item.val().engname + "  " + "<br><br>" + item.val().korname + "</a>"+
                "<div id='circle' class='ui huge right floated label' style='background-color: #ff5233; color: rgba(0,0,0,0.85); font-size:26px;'>Haram</div></div></div>"
                // "<a class='ui red circular huge right floated label'>Haram</a>< "
                $(result).insertAfter(".fxd");
                }
              }
            })
          });
  }
})

// document.getElementById("srch").addEventListener("keyup", function(event) {
//   event.preventDefault();
//   if (event.keyCode === 13) {
//     console.log("Hello")
//     $('#results > span').nextAll('div').remove();
//     npt = document.getElementById("srch").value;
//     $(".ui-menu-item").hide();
//     itemsRef.once("value", function(items) {
//             items.forEach(function(item){
//               if (item.val().engname.toLowerCase().includes(npt.toLowerCase())) {
//                 if (item.val().status == "Halal") {
//                   var result = "<div class='item' style='width:873px;'><div class='image'>"+
//                 "<img src='" + item.val().pic + "'></div>"+
//                 "<div class='middle aligned content' style='align-items: center;'>"+
//                 "<a class='header' onclick='clickfunc(this)' style='margin-top: 25px; margin-left:30px; font-size:30px;'>" + item.val().engname + "  " + "<br><br>" + item.val().korname + "</a>"+
//                 "<div id='circle' class='ui huge right floated label' style='background-color: #99cd32; color: rgba(0,0,0,0.85); font-size:26px;'>Halal</div></div></div>"
//                 $(result).insertAfter(".fxd");
//                 }
//               }
//             })
//           });
//     itemsRef.once("value", function(items) {
//             items.forEach(function(item){
//               if (item.val().engname.toLowerCase().includes(npt.toLowerCase())) {
//                 if (item.val().status == "Suspicious") {
//                   var result = "<div class='item' style='width:873px;'><div class='image'>"+
//                 "<img src='" + item.val().pic + "'></div>"+
//                 "<div class='middle aligned content' style='align-items: center;'>"+
//                 "<a class='header' onclick='clickfunc(this)' style='margin-top: 25px; margin-left:30px; font-size:30px;'>" + item.val().engname + "  " + "<br><br>" + item.val().korname + "</a>"+
//                 "<div id='circle' class='ui huge right floated label' style='background-color: rgba(255,224,51,0.85); color: rgba(0,0,0,0.85); font-size:26px;'>Suspicious</div></div></div>"
//                 // "<a class='ui red circular huge right floated label'>Haram</a>< " #ffe033
//                 $(result).insertAfter(".fxd");
//                 }
//               }
//             })
//           });
//     itemsRef.once("value", function(items) {
//             items.forEach(function(item){
//               if (item.val().engname.toLowerCase().includes(npt.toLowerCase())) {
//                 if (item.val().status == "Haram") {
//                   var result = "<div class='item' style='width: 873px;'><div class='image'>"+
//                 "<img src='" + item.val().pic + "'></div>"+
//                 "<div class='middle aligned content' style='align-items: center;'>"+
//                 "<a class='header' onclick='clickfunc(this)' style='margin-top: 25px; margin-left:30px; font-size:30px;'>" + item.val().engname + "  " + "<br><br>" + item.val().korname + "</a>"+
//                 "<div id='circle' class='ui huge right floated label' style='background-color: #ff5233; color: rgba(0,0,0,0.85); font-size:26px;'>Haram</div></div></div>"
//                 // "<a class='ui red circular huge right floated label'>Haram</a>< "
//                 $(result).insertAfter(".fxd");
//                 }
//               }
//             })
//           });
//   }
// })

function clickfunc(obj){
  var obj = {
        ans : $(obj).text().split("  ")[0]
      }
      selectionsRef.push(obj)
      location.href = "item.html";
}

function generatelst() {
  itemsRef.once("value", function(items) {
            items.forEach(function(item){
              lst.push(item.val().engname)
            });
          });
}