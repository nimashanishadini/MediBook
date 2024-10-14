// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Firestore

const firebaseConfig = {
  apiKey: "AIzaSyDduKPDDE9s3KKpVWH5qtHDxXYNKSv1oHY",
  authDomain: "doctorapp-6cb99.firebaseapp.com",
  projectId: "doctorapp-6cb99",
  storageBucket: "doctorapp-6cb99.appspot.com",
  messagingSenderId: "979784617324",
  appId: "1:979784617324:web:9e4eeaeaecf662163c7749",
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Firestore instance
