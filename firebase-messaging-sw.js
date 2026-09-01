importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDqxc6-Alu_EZwa4Z7ezvCsRvoMApZb91M",
  authDomain: "task-managment-1133.firebaseapp.com",
  projectId: "task-managment-1133",
  storageBucket: "task-managment-1133.firebasestorage.app",
  messagingSenderId: "35709307813",
  appId: "1:35709307813:web:c782509d50786701ad764c"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = (payload.notification && payload.notification.title) || "Yeni tapşırıq";
  const body = (payload.notification && payload.notification.body) || "";
  self.registration.showNotification(title, { body, icon: "icon-192.png" });
});
