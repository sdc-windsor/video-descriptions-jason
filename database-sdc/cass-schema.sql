-- Run this file in the terminal: cqlsh > SOURCE 'absolute-file-path'

DROP KEYSPACE IF EXISTS sdc;
CREATE KEYSPACE sdc WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1'}  AND durable_writes = true;

CREATE TABLE sdc.descriptions
(
  id bigint PRIMARY KEY,
  text text,
  categories text,
  video_id bigint,
  likes bigint
);

CREATE INDEX VideoDescription ON sdc.descriptions (video_id);

CREATE TABLE sdc.comments
(
  id bigint PRIMARY KEY,
  date timestamp,
  text text,
  user_id bigint,
  video_id bigint
);

CREATE INDEX VideoComment ON sdc.comments (video_id);

CREATE TABLE sdc.users
(
  id bigint PRIMARY KEY,
  user_thumbnail text,
  username text
);