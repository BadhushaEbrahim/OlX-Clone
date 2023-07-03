import React, { useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  deleteDoc,
  doc,
} from "firebase/firestore";

import "./View.css";
import { PostContext } from "../../Store/Context";
import { FirebaseContext } from "../../Store/Context";
import { Navigate } from "react-router-dom";

function View() {
  const [userDetails, setUserDetails] = useState();
  const { postDetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);
  const db = getFirestore(firebase);
  const navigate=useNavigate()

  useEffect(() => {
    const { userId } = postDetails;
    const q = query(collection(db, "users"), where("id", "==", userId));
    const querySnapshot = getDocs(q);
    querySnapshot.then((snapshot) => {
      snapshot.forEach((doc) => {
        setUserDetails(doc.data());
        console.log(doc.id, " => ", doc.data());
      });
    });
  }, []);

  const handleDeletePost = async () => {
    try {
      const postDocRef = doc(db, "posts", postDetails.postId);
      await deleteDoc(postDocRef);
      navigate('/')
      
    } catch (error) {
      console.log("Error deleting post:", error);
    }
  };

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails && postDetails?.url} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails && postDetails?.price}</p>
          <span>{postDetails && postDetails?.name}</span>
          <p>{postDetails && postDetails?.category}</p>
          <span>{postDetails && postDetails?.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails?.username}</p>
          <p>{userDetails?.phone}</p>
        </div>
        <button onClick={handleDeletePost}>Delete Post</button>
      </div>
    </div>
  );
}

export default View;
