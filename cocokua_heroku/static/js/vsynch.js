// Initialize VideoSync
var sync = new VideoSync("RoomName", "UserName");

// Your standard YouTube embed code.
var player = new YT.player('player', {
videoId: 'A9HV5O8Un6k', // The Video ID
events: {
// Bind these 2 methods.
'onReady': sync.onPlayerReady,
'onStateChange': sync.onPlayerStateChange
}
});