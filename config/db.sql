CREATE DATABASE bookmarks_db;
USE bookmarks_db;
CREATE TABLE bookmarks(
    id MEDIUMINT NOT NULL AUTO_INCREMENT, 
    URL VARCHAR(255) NOT NULL, 
    title VARCHAR(255) NOT NULL,
    date_added DATETIME NOT NULL,
    PRIMARY KEY (id)
    );
INSERT INTO bookmarks(URL,title, date_added) VALUES ('https://www.youtube.com/','Youtube', NOW());
INSERT INTO bookmarks(URL,title, date_added) VALUES ('https://www.google.com/','Google', NOW());