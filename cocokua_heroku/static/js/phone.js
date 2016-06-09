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
	//show my video
	var container = document.getElementById('draggable-me');
	var videoDisplay = document.getElementById('video-display-me');
	container.style.display="block";
	$( videoDisplay ).draggable({
  		opacity: 0.35
	});
	videoDisplay.innerHTML = '';
	$(videoDisplay).append(phone.video);

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
	$(cln).children('#facetime-off').attr('id','facetime-off-'+session.number);
	$(cln).children('#hangup').attr('id','hangup-'+session.number);

	console.log(newId);
	var video_out = PUBNUB.$(newId);
	video_out.innerHTML = '';
    video_out.appendChild(session.video);

// Bind btn action
    PUBNUB.bind( 'mousedown,touchstart', PUBNUB.$('hangup-'+session.number), function() {
        session.hangup();
        set_icon(video_out,'facetime-video');
    } );
     PUBNUB.bind( 'mousedown,touchstart', PUBNUB.$('facetime-off-'+session.number), function() {
        phone.media={video:false,audio:true}
        set_icon(video_out,'facetime-video');
    } );
    console.log("Hi!");
}
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Video Session Ended
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
function set_icon(ele,icon) {
    $(ele).innerHTML = '<span class="glyphicon glyphicon-' +
        icon + '"></span>';
}
