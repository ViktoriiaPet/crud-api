-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;

    