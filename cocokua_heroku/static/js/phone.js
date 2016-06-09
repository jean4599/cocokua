// ui
$(function() {
    $( "#draggable" ).draggable({
  		opacity: 0.35
	});
  });
$("#video-btn").on('click',function(){
	makeCall();
});

//Pubnub
var phoneNumber = userFBID;
var phone = window.phone = PHONE({
        number        : phoneNumber,
        publish_key   : 'pub-c-9295f055-f256-4e51-9317-ba3b363a0769',
        subscribe_key : 'sub-c-7577b584-ba0a-11e5-8365-02ee2ddab7fe',
        ssl           : true
    });
phone.ready(function(){
	var container = document.getElementById('videoChat');
    	//if($(container).children('video-display-me')==null){
    		var newId = 'video-display-me';
        	var container = document.getElementById('videoChat');
			var videoChat = document.getElementById('draggable');
			var cln = videoChat.cloneNode(true);
			cln.style.display="block";
			$( cln ).draggable({
		  		opacity: 0.35
			});
			container.appendChild(cln); 
			$(cln).children('#video-display').attr('id',newId);
			var video_out = $('#'+newId);
			video_out.innerHTML = '';
			video_out.append(phone.video);
    	//}
});
function makeCall(){
	//members is defined in memberlist.js
	phone.dial('954393151310794');
  //   var sessions = [];
  //   	for (i=0;i<members.length;i++){
  //   		sessions.push(phone.dial(members[i]));
  //   	}
		// sessions.forEach(function(friend){
		//     friend.connected(function(session){ /* call connected */ });
		//     friend.ended(function(session){     /* call ended     */ });
		// });
}
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Receiver for Calls
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
phone.receive(function(session){
    session.connected(connected);
});
function connected(session) {
	var newId = 'video-display-'+session.number;
	var container = document.getElementById('videoChat');
	var videoChat = document.getElementById('draggable');
	var cln = videoChat.cloneNode(true);
	cln.style.display="block";
	$( cln ).draggable({
  		opacity: 0.35
	});
	container.appendChild(cln); 
	$(cln).children('#video-display').attr('id',newId);

	console.log(newId);
	var video_out = PUBNUB.$(newId);

    console.log("Hi!");
}
// phone.receive(function(session){

//         // Display Your Friend's Live Video
//         session.connected(function(session){
//         	var newId = 'video-display-'+session.number;
//         	var container = document.getElementById('videoChat');
// 			var videoChat = document.getElementById('draggable');
// 			var cln = videoChat.cloneNode(true);
// 			cln.style.display="block";
// 			$( cln ).draggable({
// 		  		opacity: 0.35
// 			});
// 			container.appendChild(cln); 
// 			$(cln).children('#video-display').attr('id',newId);

// 			console.log(newId);
// 			var video_out = PUBNUB.$(newId);
// 			var video_out = PUBNUB.$('video-display-god');
// 			video_out.innerHTML = '';
//     		video_out.appendChild(session.video);
//         });

// });