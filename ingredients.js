var config = {
apiKey: "AIzaSyC-hLbY7tuadTg8l6nRQ7YsfWbAFmnFQS0",
databaseURL: "https://prototype-a5084.firebaseio.com",
};

firebase.initializeApp(config);
var database = firebase.database();
var itemsRef = database.ref('items');
var allItemObject = null;
var ingrlst = []

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