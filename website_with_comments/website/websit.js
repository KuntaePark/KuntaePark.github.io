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
    npt = document.getElementById("srch").value;
    itemsRef.once("value", function(items) {
            items.forEach(function(item){
              if (item.val().engname.includes(npt)) {
                if (item.val().status == "Haram") {
                  var result = "<div class='item' ><div class='image'>"+
                "<img src='" + item.val().pic + "'></div>"+
                "<div class='middle aligned content' style='align-items: center;'>"+
                "<a class='header' style='margin-top: 35px'>" + item.val().engname + "<br>" + item.val().korname + "</a>"+
                "<div id='circle' class='ui huge right floated label' style='background-color: #ff5233; color: rgba(0,0,0,0.85);'>Haram</div></div></div>"
                // "<a class='ui red circular huge right floated label'>Haram</a>< "
                $(result).insertAfter(".fxd");
                }
              }
            })
          });
    itemsRef.once("value", function(items) {
            items.forEach(function(item){
              if (item.val().engname.includes(npt)) {
                if (item.val().status == "Suspicious") {
                  var result = "<div class='item' ><div class='image'>"+
                "<img src='" + item.val().pic + "'></div>"+
                "<div class='middle aligned content' style='align-items: center;'>"+
                "<a class='header' style='margin-top: 35px'>" + item.val().engname + "<br>" + item.val().korname + "</a>"+
                // "<div><b>Suspicious</b></div>
                "<div id='circle' class='ui huge right floated label' style='background-color: rgba(255,224,51,0.85); color: rgba(0,0,0,0.85);'>Suspicious</div></div></div>"
                // "<a class='ui red circular huge right floated label'>Haram</a>< " #ffe033
                $(result).insertAfter(".fxd");
                }
              }
            })
          });
    itemsRef.once("value", function(items) {
            items.forEach(function(item){
              if (item.val().engname.includes(npt)) {
                if (item.val().status == "Halal") {
                  var result = "<div class='item' ><div class='image'>"+
                "<img src='" + item.val().pic + "'></div>"+
                "<div class='middle aligned content' style='align-items: center;'>"+
                "<a class='header' style='margin-top: 35px'>" + item.val().engname + "<br>" + item.val().korname + "</a>"+
                "<div id='circle' class='ui huge right floated label' style='background-color: #99cd32; color: rgba(0,0,0,0.85);'>Haram</div></div></div>"
                // "<a class='ui red circular huge right floated label'>Haram</a>< "
                $(result).insertAfter(".fxd");
                }
              }
            })
          });
  }
})

function generatelst() {
  itemsRef.once("value", function(items) {
            items.forEach(function(item){
              lst.push(item.val().engname)
            });
          });
}