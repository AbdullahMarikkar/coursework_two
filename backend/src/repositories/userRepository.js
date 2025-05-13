import db from "../config/database.js";
import createResponse from "../utils/createResponse.js";

export async function createUser(req) {
  return new Promise((resolve, reject) => {
    db.run(
      "insert into users (name, email, password) values (?,?,?)",
      [req.body.name, req.body.email, req.body.password],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(createResponse(true, "Record Inserted"));
      }
    );
  });
}

export async function getByEmail(req) {
  try {
    return new Promise((resolve, reject) => {
      db.get(
        "select * from users where email = (?)",
        [req.body.email],
        (err, rows) => {
          if (err) {
            reject(err);
          }
          resolve(createResponse(true, rows));
        }
      );
    });
  } catch (ex) {
    console.error(ex);
  }
}

export async function getUserByIdRepo(id) {
  try {
    return new Promise((resolve, reject) => {
      db.get(
        "select id,name,email from users where id = (?)",
        [id],
        (err, rows) => {
          if (err) {
            reject(err);
          }
          resolve(createResponse(true, rows));
        }
      );
    });
  } catch (ex) {
    console.error(ex);
  }
}
