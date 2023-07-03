
import React, { useContext, useState } from 'react';
import { FirebaseContext } from '../../Store/Context';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Logo from '../../olx-logo.png';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { Toaster,toast } from 'react-hot-toast';

function Login() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const { firebase } = useContext(FirebaseContext);
const navigate = useNavigate();

const handleLogin = (e) => {
e.preventDefault();
const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
console.log('User logged in successfully', userCredential.user);
navigate('/');
}).catch((err) => {
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
<div className="loginParentDiv">
<img width="200px" height="200px" src={Logo} alt="OLX Logo" />
<form onSubmit={handleLogin}>
<label htmlFor="email">Email</label>
<br />
<input
className="input"
type="email"
value={email}
id="email"
onChange={(e) => setEmail(e.target.value)}
name="email"
required
/>
<br />
<label htmlFor="password">Password</label>
<br />
<input
className="input"
type="password"
id="password"
name="password"
value={password}
onChange={(e) => setPassword(e.target.value)}
required
/>
<br />
<br />
<button type="submit">Login</button>
</form>
<a href="/signup">Signup</a>
</div>
<Toaster/>
</div>

);
}

export default Login;