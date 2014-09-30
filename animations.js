$(document).ready(function() {
	// Initially hide the submit and character count buttons
	$(".button#tweet-submit").hide();
	$("#char-count").hide();
	
	// Add a listener to wait for a click on the text area where tweets are composed
	$("textarea.tweet-compose").on("click", function() {
		$(this).css("height", "5em");
		$(".button#tweet-submit").show();
		$("#char-count").show();
	});
	
	
	$(".avatar").tooltip("show");
	
	// Implement functionality for text area and buttons dealing with tweet
	// Could access which key was pressed if needed
	$("textarea.tweet-compose").keyup(function(event) { 
		var textInput = $(this).val(); // Gets value of input area
		var textCount = 140 - textInput.length; // How many characters remaining
		
		$("#char-count").text(textCount); // Updates the character count
		
		if (textCount > 10) { // Make sure color is black and submit is enabled
			$("#char-count").css("color", "black");
			$(".button#tweet-submit").prop("disabled", false);
		} 
		else if (textCount <= 10) { // Color is red; submit is still enabled
			$("#char-count").css("color", "red");
			$(".button#tweet-submit").prop("disabled", false);
			if (textCount <= 0) { // Submit is disabled
				$(".button#tweet-submit").prop("disabled", true);
			}
		}
	});
	
	// Display a new tweet when button is clicked
	$(".button#tweet-submit").on("click", function() {
		var el = $(".tweet:first").clone(); 
		
		var curDate = new Date();
		var curSeconds = curDate.getTime() / 1000;

		el.find(".avatar").prop("src", "img/alagoon.jpg");
		el.find(".fullname").html("Wesley");
		el.find(".username").html("@wesley");
		el.find(".tweet-text").html($(".tweet-compose").val());	
		
		el.find(".time").attr("data-livestamp", curSeconds);
		
		$("#stream").prepend(el);
		
		
		/* This is the wrong way to do it 
		var myTweet = $("textarea.tweet-compose").val();
	
		$("#stream").prepend("<div class='tweet'><div class='content'><img class='avatar' src='img/alagoon.jpg' /><strong class='fullname'>Wesley</strong><span class='username'>@wesley</span><p class='tweet-text'></p><div class='tweet-actions'><ul><li><span class='icon action-reply'></span> Reply</li><li><span class='icon action-retweet'></span> Retweet</li><li><span class='icon action-favorite'></span> Favorite</li><li><span class='icon action-more'></span> More</li></ul></div></div></div>");
		
		$("p.tweet-text").first().text(myTweet); */
		
		$("textarea.tweet-compose").css("height", "2.5em");
		$("textarea.tweet-compose").val("");
		$(".button#tweet-submit").hide();
		$("#char-count").hide();
	});
	
	// .show({duration: value in milliseconds});
	// The "transition: all ease 500ms" is CSS you can put on an element for animation
	$("#stream").mouseleave('.tweet', function() {
		$(this).find(".stats").css("display", "none");
		$(this).find(".reply").css("display", "none");
	});
	
	$("#stream").on("click", '.tweet', function() {
		$(this).find(".stats").show({duration:500});//.css("display", "block");
		$(this).find(".reply").show({duration:500});//.css("display", "block");
	});
	
});