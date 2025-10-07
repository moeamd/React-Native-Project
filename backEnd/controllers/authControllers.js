import bcrypt from "bcrypt";
import userCollection from "../models/userModel.js";
import jwt from "jsonwebtoken";
import supabase from "../config/supabase.js";

// Register
export const createNewUser = async (req, res) => {
  try {
    const { name, password, email, age = 0, role = "user" } = req.body;
    const file = req.file;
    let imageUrl = null;

    if (!name || !password || !email) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    const isExist = await userCollection.where("email", "==", email).get();
    if (!isExist.empty) {
      return res
        .status(409)
        .json({ message: "This email is already registered" });
    }

    if (file) {
      const fileName = `users/${Date.now()}_${file.originalname}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(fileName, file.buffer, {
          upsert: true,
          contentType: file.mimetype,
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("images").getPublicUrl(fileName);
      imageUrl = data.publicUrl;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userCollection.add({
      imageUrl,
      name,
      email,
      password: hashedPassword,
      age,
      role,
    });

    return res.status(201).json({
      message: "User created successfully",
      id: newUser.id,
      email,
      name,
      imageUrl,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { password, email } = req.body;

    if (!password || !email) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const snapShoot = await userCollection.where("email", "==", email).get();
    if (snapShoot.empty) {
      return res.status(401).json({ message: "Please sign up first" });
    }

    const userDoc = snapShoot.docs[0];
    const userData = userDoc.data();

    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password not correct" });
    }

    const token = jwt.sign(
      {
        email: userData.email,
        id: userDoc.id,
        role: userData.role,
        name: userData.name,
        userImageUrl: userData.imageUrl,
      },
      process.env.JWT_SECRET || "defaultSecret",
      { expiresIn: "24h" }
    );

    const { password: _, ...safeUser } = userData;

    return res.status(200).json({
      message: "Login successful",
      user: { id: userDoc.id, ...safeUser },
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
