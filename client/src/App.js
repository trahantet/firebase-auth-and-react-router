import logo from "./logo.svg";
import { useState, useEffect } from "react";
import {
  Switch,
  BrowserRouter,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import "./App.css";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

if (firebase.apps.length === 0) {
  firebase.initializeApp({
    apiKey: "AIzaSyDhQ-6hfNgNaF7THvqLsCaLRCvGDp3TCgg",
    authDomain: "test-780c3.firebaseapp.com",
    projectId: "test-780c3",
    storageBucket: "test-780c3.appspot.com",
    messagingSenderId: "905033494455",
    appId: "1:905033494455:web:643bc63c96500607edc232",
    measurementId: "G-QDNE3BP41B",
  });
}

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory()

  async function login(evt) {
    evt.preventDefault();

    const userObj = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        console.log(err.message);
      });

    setUser(userObj); //if no user is logged in.. will set to null.. no guard clauses needed

    // history.push("/dashboard");
  }

  function emailChangeHandler(evt) {
    setEmail(evt.target.value);
  }

  function passwordChangeHandler(evt) {
    setPassword(evt.target.value);
  }

  return (
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => {
            return (
              <Home
                login={login}
                emailChangeHandler={emailChangeHandler}
                passwordChangeHandler={passwordChangeHandler}
                email={email}
                password={password}
              />
            );
          }}
        />

        <Route
          path="/dashboard"
          render={(props) => {
            return <Dashboard user={user} />;
          }}
        />
      </Switch>
  );
}

function Home(props) {
  return (
    <div>
      <h2>Please sign in</h2>
      <form onSubmit={props.login}>
        <input
          type="email"
          onChange={props.emailChangeHandler}
          value={props.email}
        />
        <input
          type="password"
          onChange={props.passwordChangeHandler}
          value={props.password}
        />
        <input type="submit" />
      </form>
    </div>
  ) : (
    <Redirect to="/dashboard" />
}

function Dashboard(props) {
  return props.user ? <h1>Welcome back!</h1> : <Redirect to="/" />;
}

export default App;
