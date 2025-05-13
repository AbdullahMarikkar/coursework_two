import Database from "sqlite3";

const pool = new Database.Database("./travel_tales.db", () => {
  verbose: console.log;
});

pool.run(`CREATE TABLE IF NOT EXISTS users 
  (id INTEGER PRIMARY KEY AUTOINCREMENT, 
  name varchar (255) NOT NULL, 
  email varchar (255) NOT NULL UNIQUE, 
  password varchar (255) NOT NULL);`);

pool.run(`CREATE TABLE IF NOT EXISTS blogs 
  (id INTEGER PRIMARY KEY AUTOINCREMENT, 
  country varchar (255) NOT NULL, 
  title varchar (255) NOT NULL UNIQUE, 
  content MEDIUMTEXT NOT NULL,
  user_id int,
  FOREIGN KEY (user_id) REFERENCES users (id)
  );
`);

pool.run(`CREATE TABLE IF NOT EXISTS follows
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        followed_id INTEGER,
        follower_id INTEGER
    );
`);

pool.run(`CREATE TABLE IF NOT EXISTS comments
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        comment VARCHAR(255) NOT NULL,
        blog_id int,
        FOREIGN KEY (blog_id) REFERENCES blogs (id)
    );`);

pool.run(`CREATE TABLE IF NOT EXISTS likes
  (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        like BOOLEAN NOT NULL,
        post_id INTEGER NOT NULL,
        liker_id INTEGER NOT NULL,
        FOREIGN KEY (liker_id) REFERENCES users (id),
        FOREIGN KEY (post_id) REFERENCES blogs (id)
    );`);

pool.run(`CREATE TABLE IF NOT EXISTS country_detail
  (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255) NOT NULL,
        capital VARCHAR(255) NOT NULL,
        currency VARCHAR(255) NOT NULL,
        language VARCHAR(255) NOT NULL,
        flag VARCHAR(255) NOT NULL,
        blog_id INTEGER NOT NULL,
        FOREIGN KEY (blog_id) REFERENCES blogs (id)
    );`);

export default pool;
