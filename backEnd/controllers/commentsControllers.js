import commentsCollection from "../models/commentsModel.js";
import { Timestamp } from "firebase-admin/firestore";

// create comment
export const createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;
    const authorName = req.user.name;

    if (!content?.trim()) {
      return res.status(400).json({ error: "Content is required" });
    }

    const now = Timestamp.fromDate(new Date());
    const newComment = {
      postId,
      userId,
      content: content.trim(),
      createdAt: now,
      updatedAt: now,
      authorName
    };
    
    const ref = await commentsCollection(postId).add(newComment);

    res.status(201).json({ id: ref.id, ...newComment ,authorName});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// list comments
export const listComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const limit = Math.min(Math.max(Number(req.query.limit || 20), 1), 100);

    const snap = await commentsCollection(postId)
      .orderBy("createdAt", "desc")
      .limit(limit)
      .get();

    const comments = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get one comment
export const getComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const doc = await commentsCollection(postId).doc(commentId).get();

    if (!doc.exists) return res.status(404).json({ error: "Comment not found" });

    res.json({ id: doc.id, ...doc.data() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// update comment
export const updateComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    if (!content?.trim()) {
      return res.status(400).json({ error: "Content is required" });
    }

    const ref = commentsCollection(postId).doc(commentId);
    const doc = await ref.get();

    if (!doc.exists) return res.status(404).json({ error: "Comment not found" });

    const commentData = doc.data();
    if (commentData.userId !== userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const updatedData = {
      content: content.trim(),
      updatedAt: Timestamp.fromDate(new Date())
    };

    await ref.update(updatedData);

    res.json({ id: doc.id, ...commentData, ...updatedData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// delete comment
export const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const userId = req.user.id;

    const ref = commentsCollection(postId).doc(commentId);
    const doc = await ref.get();

    if (!doc.exists) return res.status(404).json({ error: "Comment not found" });

    const commentData = doc.data();
    if (commentData.userId !== userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    await ref.delete();

    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
