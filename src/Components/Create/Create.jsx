import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../Store/Context';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { Storage } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

FirebaseContext
const Create = () => {
  const { firebase } = useContext(FirebaseContext)
  const { user } = useContext(AuthContext)
  const [name, setName] = useState(null)
  const [category, setCategory] = useState(null)
  const [price, setPrice] = useState(null)
  const [image, setImage] = useState(null)
  const storage = getStorage(firebase);
  const navigate = useNavigate();

  const handlesubmit = async () => {
    const db = getFirestore()
    const storageRef = ref(storage, `/image/${image.name}`);
    try {
      const snapshot = await uploadBytes(storageRef, image);
      const url = await getDownloadURL(snapshot.ref);

      await addDoc(collection(db, "products"), {
        name,
        category,
        price,
        url,
        userId: user.uid,
        createdAt: new Date().toDateString(),
      });
      console.log("product added successfylly");
      navigate('/')

    } catch (err) {
        console.log(`Error message: ${err.message}`);
        const errorMessage = err.message;
        const errorCodeRegex = /\(([^)]+)\)/;
        const match = errorCodeRegex.exec(errorMessage);

        if (match && match.length > 1) {
          const errorCode = match[1];
          console.log(`Error code: ${errorCode}`);
          toast.dismiss()
          toast.error("you must login first")
        } else {
          console.log("Unable to extract error code from the error message.");
        }

      
    }
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="fname"
            name="Name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            id="fname"
            name="Price" />
          <br />
          <br />
          <img alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ''}></img>
          <br />
          <input onChange={(e) => { setImage(e.target.files[0]) }} type="file" />
          <br />
          <button className="uploadBtn" onClick={handlesubmit}>upload and Submit</button>
        </div>
      </card>
      <Toaster/>
    </Fragment>
  );
};

export default Create;
