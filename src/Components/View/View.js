import React,{useState,useEffect,useContext, Fragment} from 'react';
import { db } from '../../firebase/config,';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { collection, getDocs, where, query } from 'firebase/firestore'; // Import getDocs, where, and query
import { useNavigate } from 'react-router-dom';
function View() {
  const navigate = useNavigate()
  const {postDetails} = useContext(PostContext);
  const [userDetails,setUserDetails] = useState();

  console.log(postDetails);

  useEffect(() => {
    const {userId} = postDetails;
    const fetchUserDetails = async () => {
      try {
        const q = query(collection(db, 'user'), where("id", "==", userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUserDetails(doc.data());

          
        });
      } catch (error) {
        console.error('Error fetching user details: ', error);
      }
    };

    fetchUserDetails();
  }, [postDetails]); // Add postDetails.id to the dependency array


  return (
   
   <Fragment>
    {
      userDetails && postDetails? 
      <div className="viewParentDiv mb-5">
      <div className="imageShowDiv conationer d-flex align-items-center justify-content-center">
  <img
    className=' img-fluid mt-5'
    src={postDetails ? postDetails.url : null}
    alt="post image"
  />
</div>

<div className="product-detail-and-contact-outer container">
  <div className="row">
    <div className="col-md-6">
    <div className="product-details">
  <div className="product-name">
    <h2>{postDetails ? postDetails.name : "Product Name Not Available"}</h2>
    <div className='additional-info'>
      <p>Fuel Type: {postDetails ? postDetails.fuelType : "Not Available"}</p>
      <p>Kilometer: {postDetails ? postDetails.kilometer : "Not Available"}</p>
      <p>Transmission: {postDetails ? postDetails.gear : "Not Available"}</p>
    </div>
  </div>
  <div className='overview'>
    <p>Ownership: {postDetails ? postDetails.ownerCount : "Not Available"}</p>
    <p>Location: {postDetails ? postDetails.location : "Not Available"}</p>
    <p>Post Date: {postDetails ? postDetails.createdAt : "Not Available"}</p>
  </div>
</div>

      <div className='product-description'>
  {postDetails && postDetails.description ? (
    <Fragment>
      <h4>Description:</h4>
      <p>{postDetails.description}</p>
    </Fragment>
  ) : (
    <p>No description available</p>
  )}
</div>

    </div>
    <div className="col-md-6">
  <div className="price-details">
    <h1>&#x20B9; {postDetails ? postDetails.price : 'Price not available'}</h1>
  </div>
  <div className="contactDetails">
    <div className="">
      <h3>{userDetails ? userDetails.username : 'Username not available'}</h3>
      <p>📞 {userDetails ? userDetails.phone : 'Phone not available'}</p>
      <button onClick={()=>navigate(`/chat/${userDetails.id}/${postDetails.id}`)} className='btn btn-secondary bg-white text-dark w-100'>Chat with seller</button>
    </div>
  </div>
</div>

  </div>
</div>

    </div>:null
    }
   </Fragment>
  );
}
export default View;