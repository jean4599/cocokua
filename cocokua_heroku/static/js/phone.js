// ui
$(function() {
    $( "#draggable" ).draggable({
  		opacity: 0.35
	});
  });
$("#video-btn").on('click',function(){
	VideoPhone(cln);
});

//Pubnub
var phoneNumber = userFBID;

function VideoPhone(Element){
    // The phone *number* can by any string value
    var phone = PHONE({
        number        : phoneNumber,
        publish_key   : 'pub-c-9295f055-f256-4e51-9317-ba3b363a0769',
        subscribe_key : 'sub-c-7577b584-ba0a-11e5-8365-02ee2ddab7fe',
        media         : { audio : true, video : true },
        ssl           : true
    });

    // As soon as the phone is ready we can make calls
    phone.ready(function(){
    	//members is defined in memberlist.js
        var sessions = [];
        	for (i=0;i<members.length;i++){
        		sessions.push(phone.dial(members[i]));
        	}
			sessions.forEach(function(friend){
			    friend.connected(function(session){ /* call connected */ });
			    friend.ended(function(session){     /* call ended     */ });
			});

    });
    // When Call Comes In or is to be Connected
    phone.receive(function(session){

        // Display Your Friend's Live Video
        session.connected(function(session){
        	var container = document.getElementById('videoChat');
			var videoChat = document.getElementById('draggable');
			var cln = videoChat.cloneNode(true);
			cln.style.display="block";
			$( cln ).draggable({
		  		opacity: 0.35
			});
			PUBNUB.$(cln).appendChild(session.video);
			container.appendChild(cln); 
        });

    });
}