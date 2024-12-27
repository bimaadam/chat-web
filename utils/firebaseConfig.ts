// utils/firebaseConfig.ts
import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD7fIQG8JDaTF8uOlRkA97eBfFuc1DXU3s",
  authDomain: "web-chat-81227.firebaseapp.com",
  projectId: "web-chat-81227",
  storageBucket: "web-chat-81227.appspot.com",
  messagingSenderId: "458417519791",
  appId: "1:458417519791:web:795220e2f9a3c1c893e85a",
  measurementId: "G-B38QLP9VQK",
};

// Inisialisasi Firebase hanya jika belum ada
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp(); // Ambil aplikasi yang sudah ada
}

// Inisialisasi Analytics hanya di sisi klien
let analytics;
if (typeof window !== "undefined") {
  analytics = isSupported().then(() => getAnalytics(app));
}

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export { analytics }; // Ekspor analytics jika diperlukan