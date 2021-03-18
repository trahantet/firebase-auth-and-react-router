require("dotenv").config();

const admin = require("firebase-admin");
const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

const express = require("express");

// express setup
const app = express();
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true })); // middleware to read form input

// firebase config settings
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API, //for extra security
  authDomain: "test-780c3.firebaseapp.com",
  projectId: "test-780c3",
  storageBucket: "test-780c3.appspot.com",
  messagingSenderId: "905033494455",
  appId: "1:905033494455:web:643bc63c96500607edc232",
  measurementId: "G-QDNE3BP41B",
};

// setup firebase instance and connections
firebase.initializeApp(firebaseConfig);

app.post("/login", async (req, res) => {
  let formSub = req.body;

  const userObj = await firebase
    .auth()
    .signInWithEmailAndPassword(formSub.email, formSub.password)
    .catch((err) => {
      if (err) {
        res.send(err.message);
      } 
    });

    if(userObj){
        res.redirect('/dashboard');  
      }
  console.log(firebase.auth().currentUser);
  
});

app.get("/dashboard", (req, res) => {
    if(firebase.auth().currentUser){
       res.send(`Welcome back${firebase.auth().currentUser.email}`)  
    } else {
        res.redirect('/')
    }
   
});

app.listen(5000, () => {
  console.log("server is running");
});
