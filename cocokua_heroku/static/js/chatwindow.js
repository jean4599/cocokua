var PUBNUB_chat;
var channelID = 'cocokua'+videoID+roomID;

PUBNUB_chat = PUBNUB.init({
	publish_key: 'pub-c-9295f055-f256-4e51-9317-ba3b363a0769', //'pub-c-3953840e-fd3a-42a5-97df-332d9e6b11f3',
    subscribe_key: 'sub-c-7577b584-ba0a-11e5-8365-02ee2ddab7fe' //'sub-c-52f1f826-2249-11e4-90ee-02ee2ddab7fe'
	//ssl : (('https:' == document.location.protocol) ? true : false)
});

// Subscribe to the channel
PUBNUB_chat.subscribe({
	channel: channelID,
	message: function(m){
		var message = m.text.replace(/\n/gi,"<br>");
		document.getElementById('textbox').innerHTML += '<div class="message">'+ message + '</div>';
		$('#textbox').scrollTop($('#textbox')[0].scrollHeight);// auto scroll down
	}
});

// Publish a simple message to the channel
function send(){
	var userName = $("#userName").html();
	var msg = $("#msgtextarea").val();
	if(msg!=""){
		msg = "<strong>"+ userName +" :</strong> "+ msg;
		PUBNUB_chat.publish({
			channel: channelID,
			message: {"text": msg}
		});
		$("#msgtextarea").val("");
	}	
}

$("#sendbutton").click(function(){
		send();
});

/**
	shift + enter => add new line
	enter => send
**/
$('#msgtextarea').on('keydown', function(event) {
    if (event.keyCode == 13){
        if (!event.shiftKey){
			send();
			return false;
		}
	}
});