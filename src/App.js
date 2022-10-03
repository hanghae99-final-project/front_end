import React from "react";
import "./App.css";
import Router from "./shared/Router";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA3Jh36p31TW4UTjyNHXhqwxSNqNDZgE1M",
  authDomain: "ranking-planner.firebaseapp.com",
  databaseURL: "https://ranking-planner-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ranking-planner",
  storageBucket: "ranking-planner.appspot.com",
  messagingSenderId: "420276085804",
  appId: "1:420276085804:web:94e6311f2e750dab07dd89"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const isIPhone = device => {
  const arr = [/iPhone/i, /iPad/i, /iPod/i, "macintosh"];
  return arr.filter(iPhone => device.indexOf(iPhone) !== -1).length !== 0;
};

const myDevice = navigator.userAgent.toLowerCase();

if (!isIPhone(myDevice)) {
  const firebaseMessaging = firebaseApp.messaging();
  firebaseMessaging
    .requestPermission()
    .then(() => {
      return firebaseMessaging.getToken(); // 등록 토큰 받기
    })
    .then(token => {
      localStorage.setItem("fcmToken", token);
    })
    .catch(function (error) {
      console.log("FCM Error : ", error);
    });

  firebaseMessaging.onMessage(payload => {
    console.log(payload.notification.title);
    console.log(payload.notification.body);
  });
}

function App() {
  return <Router />;
}

export default App;
