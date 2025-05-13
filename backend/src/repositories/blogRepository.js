import db from "../config/database.js";

export async function createBlogRepo(blog, userId) {
  return new Promise((resolve, reject) => {
    db.run(
      "insert into blogs (country, title, content, user_id) values (?,?,?,?)",
      [blog.country, blog.title, blog.content, userId],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      }
    );
  });
}

export async function getLastInsertedBlogId() {
  return new Promise((resolve, reject) => {
    db.get("select id from blogs ORDER BY id DESC", [], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

export async function getBlogsByUserIdRepo(user_id) {
  return new Promise((resolve, reject) => {
    db.all(
      "select * , blogs.id as id from blogs join users on blogs.user_id = users.id where user_id = ?",
      [user_id],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      }
    );
  });
}

export async function getBlogByIdRepo(id) {
  return new Promise((resolve, reject) => {
    db.get("select * from blogs where id = (?)", [id], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

export async function updateBlogRepo(blog) {
  return new Promise((resolve, reject) => {
    db.run(
      "update blogs SET country = ? , title = ? , content = ? , user_id = ? WHERE id = ?",
      [blog.country, blog.title, blog.content, blog.user_id, blog.id],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      }
    );
  });
}

export async function deleteBlogByIdRepo(id) {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM blogs WHERE id = ?", [id], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

export async function searchBlogPostsRepo(query) {
  return new Promise((resolve, reject) => {
    // TODO : Select every blog posts where the query is LIKE to the country name or username, and need pagination
    db.all(
      "SELECT * from users join blogs on users.id = blogs.user_id where users.name LIKE ? or blogs.country LIKE ? LIMIT ?",
      [`%${query}%`, `%${query}%`, 10],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      }
    );
  });
}
