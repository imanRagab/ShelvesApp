importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

var config = {
  apiKey: "AIzaSyCZkxlA2tCOEf9_8b-u98x9eGViHzIyWqI",
  authDomain: "shelves-53a9b.firebaseapp.com",
  databaseURL: "https://shelves-53a9b.firebaseio.com",
  projectId: "shelves-53a9b",
  storageBucket: "shelves-53a9b.appspot.com",
  messagingSenderId: "738318781916"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();


messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  var notificationTitle = 'Background Message Title';
  var notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});