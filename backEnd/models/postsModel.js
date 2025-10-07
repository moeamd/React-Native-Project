
import { db } from "../config/firebase.js";

const postsCollection = db.collection('posts')

export default postsCollection;