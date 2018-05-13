var config = {
  apiKey: "AIzaSyC-hLbY7tuadTg8l6nRQ7YsfWbAFmnFQS0",
  databaseURL: "https://prototype-a5084.firebaseio.com/",
};
firebase.initializeApp(config);
var database = firebase.database();
var itemsRef = database.ref('items');
var selectionsRef = database.ref('selections');
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
  })
});

document.getElementById("srch").addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    $('#results > span').nextAll('div').remove();
    npt = document.getElementById("srch").value;
    $(".ui-menu-item").hide();
    itemsRef.once("value", function(items) {
            items.forEach(function(item){
              if (item.val().engname.toLowerCase().includes(npt.toLowerCase())) {
                if (item.val().status == "Halal") {
                  var result = "<div class='item' style='width:873px;'><div class='image'>"+
                "<img src='" + item.val().pic + "'></div>"+
                "<div class='middle aligned content' style='align-items: center;'>"+
                "<a class='header' onclick='clickfunc(this)' style='margin-top: 25px; margin-left:30px; font-size:30px;'>" + item.val().engname + "  " + "<br><br>" + item.val().korname + "</a>"+
                "<div id='circle' class='ui huge right floated label' style='background-color: #99cd32; color: rgba(0,0,0,0.85); font-size:26px;'>Halal</div></div></div>"
                $(result).insertAfter(".fxd");
                console.log("Should appear first")
                }
              }
            })
          });
    itemsRef.once("value", function(items) {
            items.forEach(function(item){
              if (item.val().engname.toLowerCase().includes(npt.toLowerCase())) {
                if (item.val().status == "Suspicious") {
                  var result = "<div class='item' style='width:873px;'><div class='image'>"+
                "<img src='" + item.val().pic + "'></div>"+
                "<div class='middle aligned content' style='align-items: center;'>"+
                "<a class='header' onclick='clickfunc(this)' style='margin-top: 25px; margin-left:30px; font-size:30px;'>" + item.val().engname + "  " + "<br><br>" + item.val().korname + "</a>"+
                "<div id='circle' class='ui huge right floated label' style='background-color: rgba(255,224,51,0.85); color: rgba(0,0,0,0.85); font-size:26px;'>Suspicious</div></div></div>"
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
                  var result = "<div class='item' style='width: 873px;'><div class='image'>"+
                "<img src='" + item.val().pic + "'></div>"+
                "<div class='middle aligned content' style='align-items: center;'>"+
                "<a class='header' onclick='clickfunc(this)' style='margin-top: 25px; margin-left:30px; font-size:30px;'>" + item.val().engname + "  " + "<br><br>" + item.val().korname + "</a>"+
                "<div id='circle' class='ui huge right floated label' style='background-color: #ff5233; color: rgba(0,0,0,0.85); font-size:26px;'>Haram</div></div></div>"
                // "<a class='ui red circular huge right floated label'>Haram</a>< "
                $(result).insertAfter(".fxd");
                console.log("Should appear last")
                }
              }
            })
          });
  }
})

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