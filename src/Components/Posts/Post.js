import React, { useEffect, useContext, useState } from 'react';
import { db } from "../../firebase/config,";
import Heart from '../../assests/Heart';
import './Post.css';
import { collection, getDocs } from 'firebase/firestore';
import { PostContext } from '../../store/PostContext';
import { useNavigate } from 'react-router-dom';

function Posts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const { setPostDetails } = useContext(PostContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const collectionRef = collection(db, 'products');
        const querySnapshot = await getDocs(collectionRef);
        const fetchedPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts: ', error);
      }
    };

    fetchPosts();
  }, []);

  // Function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {posts ? posts.map((post) => (
            <div
              className="card"
              key={post.id}
              onClick={() => {
                setPostDetails(post);
                navigate('view');
              }}
            >
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={post.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {post.price}</p>
                <p className="name">{post.name}</p>
              </div>
              <div className="date">
                <span>{post.createdAt.toLocaleString('en-US')}</span>
              </div>
            </div>
          )) : null}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {shuffleArray(posts).map((post) => (
            <div className="card" key={post.id}>
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={post.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9;{post.price}</p>
                <p className="name">{post.name}</p>
              </div>
              <div className="date">
                <span>{post.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
