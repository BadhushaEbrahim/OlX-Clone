import React, { useContext, useEffect, useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext, PostContext } from '../../Store/Context';
import { useNavigate } from 'react-router-dom';
import { async } from '@firebase/util';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

const fetchProducts =async (firebase)=>{
  const db=getFirestore(firebase);
  const productsRef=collection(db,"products");
  try {
    const querySnapshot=await getDocs(productsRef)
    const products=querySnapshot.docs.map((doc)=>({
      id:doc.id,
      ...doc.data(),
    }));
    return products
  } catch (error) {
    console.log("Error fetching products:",error);
    return [];
  }

}


function Posts() {
const {postDetails, setPostDetails}=useContext(PostContext)
const {firebase}=useContext(FirebaseContext)
const[products,setProducts]=useState([]);
const navigate=useNavigate();
useEffect(() => {
const fetchData=async()=>{
  const fetchedProducts=await fetchProducts(firebase)
  setProducts(fetchedProducts)
}
fetchData()
}, [firebase])
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>


        <div className="cards">
          
        {products.map((product)=>{

          return(

          <div key={product.id}
            className="card"
            onClick={()=>{
              setPostDetails(product);
              navigate("/viewpost")
            }}
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>
          );
          })}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
