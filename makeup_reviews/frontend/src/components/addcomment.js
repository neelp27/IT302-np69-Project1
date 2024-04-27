import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MyDataService from "../services/makeupDataService";
import { Link } from "react-router-dom";

function AddComments() {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null); 
  const [reviewText, setReviewText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  useEffect(() => {
    MyDataService.getComments(id)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error("Error fetching comments:", error);
      });
  }, [id]);

  return (
    <div>
      <h2>Comments/Feedback</h2>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
      
      {user ? (
        <Link to={`/np69_makeup/${id}/editcomment`}>Edit Comment</Link>
      ) : (
        <Link to={`/np69_login`}>Login to Add/Edit Comment</Link>
      )}
    </div>
  );
}

export default AddComments;
