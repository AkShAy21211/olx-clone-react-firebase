import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { storage, db } from "../../firebase/config,"
import { collection, addDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { useNavigate } from 'react-router-dom';
import { AuthContext, FirebaseContext } from "../../store/Context";

const Create = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    fuelType: '', // corrected fuleType to fuelType
    kilometer: '',
    gear: '',
    ownerCount: '', // corrected ownerCountL to ownerCount
    location: '', // corrected locationL to location
    description: '', // corrected descreption to description
  });

  const [image, setImage] = useState(null);
  const date = new Date();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: (name === 'Price' || name === 'ownerCount' || name === 'kilometer') ? parseInt(value) : value
    });
  
    console.log(name, ":", value);
  };
  

  const handleSubmit = async () => {
    try {
      console.log(formData);
      const storageRef = ref(storage, `/image/${image.name}`);
      const snapshot = await uploadBytes(storageRef, image);
      const url = await getDownloadURL(storageRef);
      const collectionRef = collection(db, 'products');
      const docRef = await addDoc(collectionRef, {
        ...formData,
        url: url,
        userId: user.uid,
        createdAt: date.toLocaleDateString('en-US')
      });
      navigate('/');
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="centerDiv mt-5">
        <div className="row ">
          <div className="col-md-12 form-box">
            <label htmlFor="name">Name</label>
            <input
              className="input form-control"
              onChange={handleChange}
              type="text"
              value={formData.name}
              id="name"
              name="name"
            />
            <label htmlFor="category">Category</label>
            <input
              className="input form-control"
              type="text"
              value={formData.category}
              onChange={handleChange}
              id="category"
              name="category"
            />
            <label htmlFor="price">Price</label>
            <input
              value={formData.price}
              className="input form-control"
              onChange={handleChange}
              type="number"
              id="price"
              name="price"
            />
              <label htmlFor="fuelType">FuelType</label>
            <input
              value={formData.fuelType}
              className="input form-control"
              onChange={handleChange}
              type="text"
              id="fuelType"
              name="fuelType"
            /> 
            <label htmlFor="Kilometer">Kilometer</label>
            <input
              value={formData.kilometer}
              className="input form-control"
              onChange={handleChange}
              type="number"
              id="kilometer"
              name="kilometer"
            /> 
             <label htmlFor="gear">Gear</label>
            <input
              value={formData.gear}
              className="input form-control"
              onChange={handleChange}
              type="text"
              id="gear"
              name="gear"
            />
              <label htmlFor="ownerCount">OwnerCount</label>
            <input
              value={formData.ownerCount}
              className="input form-control"
              onChange={handleChange}
              type="number"
              id="ownerCount"
              name="ownerCount"
            /> 
             <label htmlFor="location">Location</label>
            <input
              value={formData.location}
              className="input form-control"
              onChange={handleChange}
              type="text"
              id="location"
              name="location"
            />  
            <label htmlFor="description">Descreption</label>
            <textarea
              value={formData.description}
              className="input form-control"
              onChange={handleChange}
              id="description"
              name="description"
            />
            <label htmlFor="image">Image</label>
            <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} id="image" />
            <button type='button' onClick={handleSubmit} className="uploadBtn btn btn-primary">Upload and Submit</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Create;
