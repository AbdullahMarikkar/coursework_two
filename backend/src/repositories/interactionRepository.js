import db from "../config/database.js";

export async function checkFollowStatusRepo(userId, followingId) {
  return new Promise((resolve, reject) => {
    db.get(
      "select * from follows where followed_id = ? and follower_id = ?",
      [followingId, userId],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      }
    );
  });
}

export async function followRepo(userId, followingId) {
  return new Promise((resolve, reject) => {
    db.run(
      "insert into follows (followed_id, follower_id) values (?,?)",
      [followingId, userId],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      }
    );
  });
}

export async function unfollowRepo(userId, followingId) {
  return new Promise((resolve, reject) => {
    db.run(
      "delete from follows where followed_id = ? and follower_id = ?",
      [followingId, userId],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      }
    );
  });
}

export async function getFollowerCountRepo(followedUserId) {
  return new Promise((resolve, reject) => {
    db.get(
      "select count(followed_id) as followerCount from follows where followed_id = ?",
      [followedUserId],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      }
    );
  });
}

export async function getFollowingCountRepo(followerUserId) {
  return new Promise((resolve, reject) => {
    db.get(
      "select count(follower_id) as followingCount from follows where follower_id = ?",
      [followerUserId],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      }
    );
  });
}

export async function getFollowersListRepo(followedUserId) {
  return new Promise((resolve, reject) => {
    db.all(
      "select * from follows join users on follows.follower_id = users.id where followed_id = ?",
      [followedUserId],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      }
    );
  });
}

export async function getFollowingListRepo(followerUserId) {
  return new Promise((resolve, reject) => {
    db.all(
      "select * from follows join users on follows.followed_id = users.id where follower_id = ?",
      [followerUserId],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      }
    );
  });
}

export async function addCommentRepo(comment, blog_id) {
  return new Promise((resolve, reject) => {
    db.run(
      "insert into comments (comment, blog_id) values (?,?)",
      [comment, blog_id],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      }
    );
  });
}

export async function deleteCommentRepo(comment_id) {
  return new Promise((resolve, reject) => {
    db.run("delete from comments where id = ?", [comment_id], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

export async function getCommentsForBlogRepo(blog_id) {
  return new Promise((resolve, reject) => {
    db.all(
      "select * from comments where blog_id = ?",
      [blog_id],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      }
    );
  });
}

export async function getLikeStateRepo(blog_id, user_id) {
  return new Promise((resolve, reject) => {
    db.get(
      "select * from likes where post_id = ? and liker_id = ?",
      [blog_id, user_id],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      }
    );
  });
}

export async function likeInsertForBlogRepo(like, blog_id, user_id) {
  return new Promise((resolve, reject) => {
    db.run(
      "insert into likes (like, post_id, liker_id) values (?,?,?)",
      [like, blog_id, user_id],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      }
    );
  });
}

export async function likeUpdateForBlogRepo(like, likeId) {
  return new Promise((resolve, reject) => {
    db.run(
      "update likes SET like = ? where id = ?",
      [like, likeId],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      }
    );
  });
}

export async function getLikeCountRepo(blog_id) {
  return new Promise((resolve, reject) => {
    db.get(
      "select COUNT(id) as likes from likes where post_id = ? and like = true",
      [blog_id],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      }
    );
  });
}

export async function getDisLikeCountRepo(blog_id) {
  return new Promise((resolve, reject) => {
    db.get(
      "select COUNT(id) as dislikes from likes where post_id = ? and like = false",
      [blog_id],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      }
    );
  });
}

export async function getDashBoardContentRepo(start) {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT blogs.*, users.name, COUNT(likes.id) AS total_likes 
       FROM blogs
       LEFT JOIN users ON blogs.user_id = users.id
       LEFT JOIN likes ON blogs.id = likes.post_id
       GROUP BY blogs.id
       ORDER BY total_likes DESC, blogs.id DESC
       LIMIT 20 OFFSET ?`,
      [start],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      }
    );
  });
}
