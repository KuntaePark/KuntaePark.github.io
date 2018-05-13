/*---------------immidiate execution---------------*/
/*
$(function() {
	var SCwidth = 0;
	SCwidth = $('#CMtitle').height()+parseInt($('#CMtitle').css('margin-top'))+parseInt($('#CMtitle').css('margin-bottom'))+$('#CategoryMenu').height();
	$('#SearchCategory').css('height',SCwidth);
});
*/
/*---------------functions---------------*/
function CloseSidebar(){
		document.getElementById("Sidebar").style.display = "none";
}

function refreshCat() {
}

/*---------------events---------------*/
$('#CategoryMenu').mousewheel(function(event, delta) {
	this.scrollLeft -= (delta * 50);
	event.preventDefault();
});

$('.CatItem').click(function() {
	console.log("Category clicked");
});


