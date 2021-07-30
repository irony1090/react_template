importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');
const fbConfig = {
  apiKey: "AIzaSyB0rIZZDP7Ba6ICFo27Nx2ye6CbRF-2HuQ",
  authDomain: "peng-d67b0.firebaseapp.com",
  databaseURL: "https://peng-d67b0.firebaseio.com",
  projectId: "peng-d67b0",
  storageBucket: "peng-d67b0.appspot.com",
  messagingSenderId: "347758805174",
  appId: "1:347758805174:web:494f1515bd832751"
};
firebase.initializeApp(fbConfig);
const messaging = firebase.messaging();

messaging.onMessage((payload) => {
  console.log(payload);
  // console.log(payload.notification.title);
  // console.log(payload.notification.body);

  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
  };

  // self.registration.showNotification(notificationTitle,
  //   notificationOptions);
})

