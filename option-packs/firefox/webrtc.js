 /**
  #### webrtc

  Make firefox simpler to automate when working with WebRTC.  Specifically:

  - disable the permission dialog for media capture
  - enable the media source flag so we can load files for testing

**/

 module.exports = [
  // allow testing of webrtc media capture without asking for permission
  [ 'media.navigator.permission.disabled', true ],

  // allow webrtc mediasource streaming (future)
  [ 'media.mediasource.enabled', true ]
];
