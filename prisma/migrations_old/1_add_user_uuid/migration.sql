ALTER TABLE "users"
ADD COLUMN "uuid" TEXT;

UPDATE "users"
SET "uuid" = gen_random_uuid()::text
WHERE "uuid" IS NULL;

ALTER TABLE "users"
ALTER COLUMN "uuid" SET NOT NULL;

CREATE UNIQUE INDEX "users_uuid_key" ON "users"("uuid");