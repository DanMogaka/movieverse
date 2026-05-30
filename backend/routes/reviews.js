import express from "express";
import pool from "../config/db.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

const sortOptions = {
  newest: "comments.created_at DESC",
  oldest: "comments.created_at ASC",
  hottest: "comments.like_count DESC, comments.created_at DESC",
};

router.get("/:reviewId/comments", async (req, res) => {
  try {
    const orderBy = sortOptions[req.query.sort] || sortOptions.newest;
    const result = await pool.query(
      `
        SELECT
          comments.id,
          comments.user_id,
          users.username,
          comments.content,
          comments.like_count,
          comments.created_at
        FROM comments
        JOIN users ON users.id = comments.user_id
        WHERE comments.review_id = $1
        ORDER BY ${orderBy}
      `,
      [req.params.reviewId],
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch comments" });
  }
});

router.post("/:reviewId/comments", protect, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content?.trim()) {
      return res.status(400).json({ message: "Comment content is required" });
    }

    const result = await pool.query(
      `
        INSERT INTO comments (user_id, review_id, content)
        VALUES ($1, $2, $3)
        RETURNING id, user_id, content, like_count, created_at
      `,
      [req.user.id, req.params.reviewId, content.trim()],
    );

    res.status(201).json({
      ...result.rows[0],
      username: req.user.username,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create comment" });
  }
});

export default router;
