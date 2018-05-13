var config = {
  apiKey: "AIzaSyC-hLbY7tuadTg8l6nRQ7YsfWbAFmnFQS0",
  databaseURL: "https://prototype-a5084.firebaseio.com/",
};
firebase.initializeApp(config);
var database = firebase.database();
var itemsRef = database.ref('items');
var selectionsRef = database.ref('selections');
var table = document.getElementById("table")
var name = ""

$( document ).ready(function() {
	getname()
	fillpage()
})

function getname() {
	selectionsRef.once("value", function(selections) {
	            selections.forEach(function(selection){
	              name = selection.val().ans
                selectionsRef.remove()
	            });
	          });
}

function fillpage() {
	itemsRef.once("value", function(items) {
            items.forEach(function(item){
              if (name == item.val().engname) {
              	var ingrs = item.val().ingredients
              	document.getElementById("imgid").src=item.val().pic
              	document.getElementById("engname").innerText = item.val().engname
              	document.getElementById("korname").innerText = item.val().korname
              	for (var ingrnum in ingrs) { 
                  if (ingrs[ingrnum].state != "0"){
                		var row = table.insertRow(1);
          					var cell1 = row.insertCell(0);
          					var cell2 = row.insertCell(1);
          					cell1.innerHTML = ingrs[ingrnum].engingr
          					cell2.innerHTML = ingrs[ingrnum].koringr
                  }
              	}
                for (var ingrnum in ingrs) { 
                  if (ingrs[ingrnum].state == "0"){
                  var row = table.insertRow(1);
                  var cell1 = row.insertCell(0);
                  var cell2 = row.insertCell(1);
                  cell1.innerHTML = ingrs[ingrnum].engingr
                  cell2.innerHTML = ingrs[ingrnum].koringr
                  row.style.color = "#ff5233"
                  } 
                }
              	if (item.val().status == "Haram") {
              		document.getElementById("circle").style.backgroundColor = "#ff5233"
              		document.getElementById("circle").innerText = "Haram"
              	} else if (item.val().status == "Suspicious") {
                  document.getElementById("circle").style.backgroundColor = "rgba(255,224,51,0.85)"
                  document.getElementById("circle").innerText = "Suspicious"
                } else {
                  document.getElementById("circle").style.backgroundColor = "#99cd32"
                  document.getElementById("circle").innerText = "Halal"
                }
              }
            })
          });
}