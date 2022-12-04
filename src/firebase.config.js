import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFireStore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDtfKwL6V1_uDSOgKsZgyO8iUf_aaR-XrY',
  authDomain: 'house-marketplace-c9e4e.firebaseapp.com',
  projectId: 'house-marketplace-c9e4e',
  storageBucket: 'house-marketplace-c9e4e.appspot.com',
  messagingSenderId: '531949729100',
  appId: '1:531949729100:web:73c56df2424f1094ef0be9',
  measurementId: 'G-X02ZK84XK7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFireStore();
