// get users

import userCollection from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
  const user = await userCollection.get();
  let users = [];
  user.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() });
  });
  res.status(200).json({ users });
};
// get users by Id

export const getUserById = async (req, res) => {
  const userId = req.params.id;
  const user = await userCollection.doc(userId).get();
  res.status(200).json({ user: user.data() });
};
// update users

export const updatedUser = async (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  await userCollection.doc(userId).update(updatedUser);
  const user = await userCollection.doc(userId).get();
  res.status(200).json({ messsage: "updated", user: user.data() });
};
// Delet users

export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  await userCollection.doc(userId).delete();
  res.status(200).json({ messsage: "userDeleted" });
};
// get current user
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDoc = await userCollection.doc(userId).get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ id: userDoc.id, ...userDoc.data() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user" });
  }
};
