import { db } from "../config/firebase.js";

const userCollection = db.collection('users')

export default userCollection