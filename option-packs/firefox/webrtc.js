 module.exports = [
  // allow testing of webrtc media capture without asking for permission
  [ 'media.navigator.permission.disabled', true ],

  // allow webrtc mediasource streaming (future)
  [ 'media.mediasource.enabled', true ]
];