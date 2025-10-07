 import { db } from "../config/firebase.js";


const commentsCollection = (postId) => 
  db.collection("posts").doc(postId).collection("comments");

export default commentsCollection;
