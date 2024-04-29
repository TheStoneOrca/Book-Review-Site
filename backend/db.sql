CREATE TABLE users(
    userid SERIAL PRIMARY KEY,
    username TEXT,
    password TEXT
);

CREATE TABLE reviews(
    reviewid SERAIL PRIMARY KEY,
    reviewmaker INT REFERENCES users(userid),
    reviewon TEXT,
    reviewlikes INT,
    reviewdislikes INT
);