import postsCollection from "../models/postsModel.js";
import supabase from "../config/supabase.js";


// import { bucket } from "../config/firebase.js";

// upload image to  ===firebase==== storage and return the URL
// const handleImage = async (file) => {
//   if (!file) return null;

//   const fileName = `posts/${Date.now()}_${file.originalname}`;
//   const fileRef = bucket.file(fileName);

//   await fileRef.save(file.buffer, { contentType: file.mimetype });
//   return `https://storage.googleapis.com/${bucket.name}/${fileName}`;
// };



// get all posts
export const getAllPosts = async (req, res) => {
  try {
    const snapshot = await postsCollection.get();
    const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// create post
export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const authorId = req.user.id;
    const authorName = req.user.name;
    const userImageUrl = req.user.userImageUrl || null;
    const createdAt = new Date().toISOString();
    const file = req.file;
    let imageUrl = null;

    if (file) {
      const fileName = `posts/${Date.now()}_${file.originalname}`;

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

    const newPost = {
      title,
      content,
      authorId,
      authorName,
      imageUrl,
      createdAt,
    };

    if (userImageUrl) {
      newPost.userImageUrl = userImageUrl;
    }

    const docRef = await postsCollection.add(newPost);

    if (userImageUrl) {
      newPost.userImageUrl = userImageUrl;
    }
    res.status(201).json({
      id: docRef.id,
      ...newPost
    });
  } catch (err) {
    console.error("❌ Error in createPost:", err); 
    res.status(500).json({ error: err.message });
  }
};


// update post
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const { id: userId, role = "user" } = req.user;

    const postRef = postsCollection.doc(id);
    const postSnap = await postRef.get();

    if (!postSnap.exists)
      return res.status(404).json({ error: "Post not found" });

    const postData = postSnap.data();

    if (postData.authorId !== userId && role !== "admin") {
      return res.status(403).json({ message: "Not allowed" });
    }
    const updatedData = {};
    if (title) updatedData.title = title;
    if (content) updatedData.content = content;

    await postRef.update(updatedData);

    res.status(200).json({ message: "Post updated", ...updatedData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// delete post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: userId, role = "user" } = req.user;

    const postRef = postsCollection.doc(id);
    const postSnap = await postRef.get();

    if (!postSnap.exists)
      return res.status(404).json({ error: "Post not found" });

    const postData = postSnap.data();

    if (postData.authorId !== userId && role !== "admin") {
      return res.status(403).json({ message: "Not allowed" });
    }

    await postRef.delete();

    res.status(200).json({ message: "Post deleted", postId: id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
