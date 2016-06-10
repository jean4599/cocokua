// ui
$(function() {
    $( "#draggable" ).draggable({
  		opacity: 0.35
	});
  });

//Pubnub
var phoneNumber = userFBID;
var phone = window.phone = PHONE({
        number        : phoneNumber,
        publish_key   : 'pub-c-9295f055-f256-4e51-9317-ba3b363a0769',
        subscribe_key : 'sub-c-7577b584-ba0a-11e5-8365-02ee2ddab7fe',
        ssl           : true,
        media         : { audio : true, video : $("input[name='webcam-on']").is(":checked") },
    });
phone.ready(function(){
    $("#video-btn").on('click',function(){
		makeCall();
	});
});
function makeCall(){
	setLocalVideo();

	//members is defined in memberlist.js
    var sessions = [];
    	for (i=0;i<members.length;i++){
    		if(members[i]!=userFBID)
    			sessions.push(phone.dial(members[i]));
    	}
		sessions.forEach(function(friend){
		    friend.connected(function(session){ /* call connected */ });
		    friend.ended(function(session){     /* call ended     */ });
		});
}
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Receiver for Calls
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
phone.receive(function(session){
    session.connected(connected);
    session.ended(ended);
});
function connected(session) {
	var newId = 'video-display-'+session.number;
	var container = document.getElementById('videoChat');
	var videoChat = document.getElementById('draggable');
	var id = '#'+newId;
	if($(cln).find(id)!=null){

		var cln = videoChat.cloneNode(true);
		cln.style.display="block";
		$( cln ).draggable({
	  		opacity: 0.35
		});
		container.appendChild(cln); 
		
		$(cln).find('#video-display').attr('id',newId);
		$(cln).find('#hangup').attr('id','hangup-'+session.number);
		$(cln).find('#facetime').attr('id','facetime-'+session.number);

		PUBNUB.bind( 'mousedown,touchstart', PUBNUB.$('hangup-'+session.number), function() {
	        session.hangup();
	    } );
	    PUBNUB.bind( 'mousedown,touchstart', PUBNUB.$('facetime-'+session.number), function() {
	  	     phone.dial(session.number);

	    } );

		console.log(newId);
		var video_out = PUBNUB.$(newId);
		video_out.innerHTML = '';
	    video_out.appendChild(session.video);
	}
 	setLocalVideo();
    console.log("Hi!");
}
function ended(session){
	console.log('Bye '+session.number);
	var ele = '#video-display-'+session.number;
	$(ele).html('<span class="glyphicon glyphicon-facetime-video"></span>') ;
	$(ele).find('#close').show();
	$(ele).find('#close').click(function(){
		$(ele).parent().remove();
	});
}
function setLocalVideo(){
	//show my video
	var container = document.getElementById('draggable-me');
	var videoDisplay = document.getElementById('video-display-me');
	if(container.style.display=='none'){
		container.style.display="block";
		$( videoDisplay ).draggable({
	  		opacity: 0.35
		});
		videoDisplay.innerHTML = '';
		$(videoDisplay).append(phone.video);	
	}
}
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Video Session Ended
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
function set_icon(ele,icon) {
    $(ele).innerHTML = '<span class="glyphicon glyphicon-' +
        icon + '"></span>';
}
