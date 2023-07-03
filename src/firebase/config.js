import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
import { getStorage, } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDhLNXnan791kKUb6MD9z2d4dvgawsKe8w",
  authDomain: "fir-501bd.firebaseapp.com",
  projectId: "fir-501bd",
  storageBucket: "fir-501bd.appspot.com",
  messagingSenderId: "753524001394",
  appId: "1:753524001394:web:24e585a6e6f609a87e10eb",
  measurementId: "G-ZYC3GSJE0X"
};

const app = initializeApp(firebaseConfig);
const Auth=getAuth(app)
const Firestore=getFirestore(app)
const Storage=getStorage(app)

export{app,Auth,Firestore,Storage}