// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0r_3xzUi8Y3TuEzDZzYy96f11WujmyAM",
  authDomain: "my-blogs-d47aa.firebaseapp.com",
  projectId: "my-blogs-d47aa",
  storageBucket: "my-blogs-d47aa.appspot.com",
  messagingSenderId: "406442039824",
  appId: "1:406442039824:web:68182f237f8f2def244895",
  measurementId: "G-VX3B08DX71",
  // databaseURL: "https://my-blogs-d47aa-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const apps = getApps();

let app = apps[0];
if (!apps.length) {
  app = initializeApp(firebaseConfig);
}
// Promise.all(apps.map((app) => deleteApp(app)))
//   .then(() => {
//     console.log("All apps have been deleted");
//   })
//   .catch((error) => {
//     console.error("Error deleting apps:", error);
//   });
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app, "gs://my-blogs-d47aa.appspot.com");

export { db, storage };
