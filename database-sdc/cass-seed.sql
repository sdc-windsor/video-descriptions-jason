USE sdc;

COPY users (id, username, user_thumbnail)
FROM '/Users/jason/Documents/Hackreactor/SDC/video-descriptions-jason/data/users.csv'
WITH header=true AND delimiter=',';

COPY descriptions (id, video_id, text, likes, categories)
FROM '/Users/jason/Documents/Hackreactor/SDC/video-descriptions-jason/data/descriptions.csv'
WITH header=true AND delimiter=',';

COPY comments (id, video_id, text, date, user_id)
FROM '/Users/jason/Documents/Hackreactor/SDC/video-descriptions-jason/data/comments.csv'
WITH header=true AND delimiter=',';