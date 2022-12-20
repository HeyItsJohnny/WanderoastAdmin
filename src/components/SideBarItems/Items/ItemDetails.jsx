import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../Firebase/firebase';
import { getDoc, doc, collection, getDocs, orderBy } from 'firebase/firestore';

const ItemDetails = () => {
  const { itemid } = useParams();
  const [product, setProduct] = useState({});

  const setProductFromURL = async (firebaseProductId) => {
    try {
      const itemRef = doc(db, "items", firebaseProductId);
      const itemSnap = await getDoc(itemRef);
      if (itemSnap.exists()) {
        setProduct(itemSnap.data());
      }
    } catch (err) {
        alert(err);
    }
};

  useEffect(() => {
    setProductFromURL(itemid);
  }, []);

  return (
    <div>ItemDetails: {product.Name} </div>
  )
}



export default ItemDetails