
getEvents();
var stoptimes = document.getElementById("stop");
var resettimes = document.getElementById("reset");

// Adding the data to the list
for (var i = 0; i < stoptimes.length; i++) {
	$("ul").append("<li><span><i class='fa fa-trash'></i></span> " + getEvents(Date().getTime(), 'stop') + "</li>");
	
}

// CLick on X to Delete History
$("ul").on("click", "span", function(event){
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	});
	event.stopPropagation();
});
