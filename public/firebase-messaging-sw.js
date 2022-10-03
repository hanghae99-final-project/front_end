// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyA3Jh36p31TW4UTjyNHXhqwxSNqNDZgE1M",
  authDomain: "ranking-planner.firebaseapp.com",
  databaseURL: "https://ranking-planner-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ranking-planner",
  storageBucket: "ranking-planner.appspot.com",
  messagingSenderId: "420276085804",
  appId: "1:420276085804:web:94e6311f2e750dab07dd89"
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// eslint-disable-next-line no-undef
const firebaseMessaging = firebase.messaging();

firebaseMessaging.onBackgroundMessage(firebaseMessaging, payload => {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo192.png"
  };

  // eslint-disable-next-line no-restricted-globals
  return self.registration.showNotification(notificationTitle, notificationOptions);
});
