import db from "../config/database.js";

export async function createCountryRecordRepo(body) {
  return new Promise((resolve, reject) => {
    db.run(
      "insert into country_detail (name, capital, currency, language, flag, blog_id) values (?,?,?,?,?,?)",
      [
        body.name,
        body.capital,
        body.currency,
        body.language,
        body.flag,
        body.blog_id,
      ],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      }
    );
  });
}

export async function getCountryRecordRepo(blogId) {
  return new Promise((resolve, reject) => {
    db.get(
      "select * from country_detail where blog_id = (?)",
      [blogId],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      }
    );
  });
}
