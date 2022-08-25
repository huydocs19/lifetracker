CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE CHECK (POSITION('@' in email) > 1),
    is_admin BOOLEAN NOT NULL DEFAULT 'f',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS exercises (
  id             SERIAL PRIMARY KEY,  
  name           TEXT NOT NULL,
  category       TEXT NOT NULL,
  duration       INTEGER NOT NULL,  
  intensity      INTEGER NOT NULL,  
  user_id        INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at     TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS nutritions (
  id             SERIAL PRIMARY KEY,  
  name           TEXT NOT NULL,
  category       TEXT NOT NULL,
  quantity       INTEGER NOT NULL,  
  calories       INTEGER NOT NULL, 
  image_url      TEXT NOT NULL,
  user_id        INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at     TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sleeps (
  id             SERIAL PRIMARY KEY,  
  start_time     TIMESTAMP NOT NULL,
  end_time       TIMESTAMP NOT NULL,  
  user_id        INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at     TIMESTAMP NOT NULL DEFAULT NOW()
);