import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { FirebaseContext } from '../../Store/Context';
import {  useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [useremail, setUseremail] = useState('');
  const [userphone, setUserphone] = useState('');
  const [userpassword, setUserpassword] = useState('');
  const { firebase } = useContext(FirebaseContext);
  const navigate=useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth()
    const db = getFirestore(firebase)
    let user;
    createUserWithEmailAndPassword(auth, useremail, userpassword)
      .then((results) => {
        user = results.user
        return updateProfile(auth.currentUser, { displayName: username })
      }).then(() => {
        console.log("profile updated sussesfull");
        return addDoc(collection(db, "users"), {
          id: user.uid,
          username: username,
          phone: userphone
        });
      }).then(()=>{
      navigate("/login")})
      .catch((err) => {
        console.log(`Error message: ${err.message}`);
        const errorMessage = err.message;
        const errorCodeRegex = /\(([^)]+)\)/;
        const match = errorCodeRegex.exec(errorMessage);

        if (match && match.length > 1) {
          const errorCode = match[1];
          console.log(`Error code: ${errorCode}`);
          toast.dismiss()
          toast.error(errorCode.slice(5))
        } else {
          console.log("Unable to extract error code from the error message.");
        }

      })
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={useremail}
            onChange={(e) => setUseremail(e.target.value)}
            id="fname"
            name="email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            value={userphone}
            onChange={(e) => setUserphone(e.target.value)}
            type="number"
            id="lname"
            name="phone"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={userpassword}
            onChange={(e) => setUserpassword(e.target.value)}
            id="lname"
            name="password"
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <a href="/login">Login</a>
      </div>
      <Toaster />
    </div>
  );
}
