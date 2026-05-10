import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

const statements = [
  `DO $$ BEGIN CREATE TYPE "public"."content_status" AS ENUM('draft', 'published', 'scheduled', 'archived'); EXCEPTION WHEN duplicate_object THEN null; END $$`,
  `DO $$ BEGIN CREATE TYPE "public"."event_status" AS ENUM('upcoming', 'ongoing', 'past'); EXCEPTION WHEN duplicate_object THEN null; END $$`,
  `DO $$ BEGIN CREATE TYPE "public"."media_type" AS ENUM('book', 'film', 'tv'); EXCEPTION WHEN duplicate_object THEN null; END $$`,
  `DO $$ BEGIN CREATE TYPE "public"."product_status" AS ENUM('draft', 'published', 'archived'); EXCEPTION WHEN duplicate_object THEN null; END $$`,
  `DO $$ BEGIN CREATE TYPE "public"."user_role" AS ENUM('super_admin', 'editor', 'author', 'contributor'); EXCEPTION WHEN duplicate_object THEN null; END $$`,
  `CREATE TABLE IF NOT EXISTS "users" ("id" serial PRIMARY KEY NOT NULL,"username" varchar(100) NOT NULL,"email" varchar(255) NOT NULL,"password" text NOT NULL,"name" varchar(255) NOT NULL,"role" "user_role" DEFAULT 'contributor' NOT NULL,"bio" text,"profile_image" text,"social_links" text,"is_active" boolean DEFAULT true NOT NULL,"created_at" timestamp DEFAULT now() NOT NULL,"updated_at" timestamp DEFAULT now() NOT NULL,CONSTRAINT "users_username_unique" UNIQUE("username"),CONSTRAINT "users_email_unique" UNIQUE("email"))`,
  `CREATE TABLE IF NOT EXISTS "categories" ("id" serial PRIMARY KEY NOT NULL,"name" varchar(100) NOT NULL,"slug" varchar(100) NOT NULL,"description" text,"created_at" timestamp DEFAULT now() NOT NULL,CONSTRAINT "categories_name_unique" UNIQUE("name"),CONSTRAINT "categories_slug_unique" UNIQUE("slug"))`,
  `CREATE TABLE IF NOT EXISTS "tags" ("id" serial PRIMARY KEY NOT NULL,"name" varchar(100) NOT NULL,"slug" varchar(100) NOT NULL,"created_at" timestamp DEFAULT now() NOT NULL,CONSTRAINT "tags_name_unique" UNIQUE("name"),CONSTRAINT "tags_slug_unique" UNIQUE("slug"))`,
  `CREATE TABLE IF NOT EXISTS "articles" ("id" serial PRIMARY KEY NOT NULL,"title" varchar(500) NOT NULL,"slug" varchar(500) NOT NULL,"excerpt" text,"content" text NOT NULL,"featured_image" text,"featured_image_alt" varchar(255),"author_id" integer NOT NULL,"category_id" integer,"status" "content_status" DEFAULT 'draft' NOT NULL,"is_featured" boolean DEFAULT false NOT NULL,"is_sticky" boolean DEFAULT false NOT NULL,"meta_title" varchar(255),"meta_description" text,"og_image" text,"reading_time" integer,"view_count" integer DEFAULT 0 NOT NULL,"published_at" timestamp,"scheduled_for" timestamp,"created_at" timestamp DEFAULT now() NOT NULL,"updated_at" timestamp DEFAULT now() NOT NULL,CONSTRAINT "articles_slug_unique" UNIQUE("slug"))`,
  `CREATE TABLE IF NOT EXISTS "article_tags" ("id" serial PRIMARY KEY NOT NULL,"article_id" integer NOT NULL,"tag_id" integer NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS "media_items" ("id" serial PRIMARY KEY NOT NULL,"title" varchar(500) NOT NULL,"slug" varchar(500) NOT NULL,"description" text,"type" "media_type" NOT NULL,"cover_image" text,"release_date" timestamp,"genre" varchar(255),"cast_info" text,"author_info" text,"external_links" text,"trailer_url" text,"gallery_images" text,"is_featured" boolean DEFAULT false NOT NULL,"status" "content_status" DEFAULT 'draft' NOT NULL,"created_at" timestamp DEFAULT now() NOT NULL,"updated_at" timestamp DEFAULT now() NOT NULL,CONSTRAINT "media_items_slug_unique" UNIQUE("slug"))`,
  `CREATE TABLE IF NOT EXISTS "team_members" ("id" serial PRIMARY KEY NOT NULL,"name" varchar(255) NOT NULL,"role" varchar(255) NOT NULL,"department" varchar(100),"bio" text,"profile_photo" text,"social_links" text,"sort_order" integer DEFAULT 0 NOT NULL,"is_active" boolean DEFAULT true NOT NULL,"created_at" timestamp DEFAULT now() NOT NULL,"updated_at" timestamp DEFAULT now() NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS "events" ("id" serial PRIMARY KEY NOT NULL,"title" varchar(500) NOT NULL,"slug" varchar(500) NOT NULL,"description" text,"event_date" timestamp NOT NULL,"end_date" timestamp,"location" text,"is_virtual" boolean DEFAULT false NOT NULL,"virtual_link" text,"featured_image" text,"registration_link" text,"event_type" varchar(100),"status" "event_status" DEFAULT 'upcoming' NOT NULL,"created_at" timestamp DEFAULT now() NOT NULL,"updated_at" timestamp DEFAULT now() NOT NULL,CONSTRAINT "events_slug_unique" UNIQUE("slug"))`,
  `CREATE TABLE IF NOT EXISTS "uploads" ("id" serial PRIMARY KEY NOT NULL,"filename" varchar(500) NOT NULL,"original_name" varchar(500) NOT NULL,"mime_type" varchar(100) NOT NULL,"size" integer NOT NULL,"path" text NOT NULL,"thumbnail_path" text,"alt" varchar(255),"folder" varchar(255),"uploaded_by" integer,"created_at" timestamp DEFAULT now() NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS "settings" ("id" serial PRIMARY KEY NOT NULL,"key" varchar(100) NOT NULL,"value" text,"updated_at" timestamp DEFAULT now() NOT NULL,CONSTRAINT "settings_key_unique" UNIQUE("key"))`,
  `CREATE TABLE IF NOT EXISTS "product_categories" ("id" serial PRIMARY KEY NOT NULL,"name" varchar(100) NOT NULL,"slug" varchar(100) NOT NULL,"description" text,"image" text,"sort_order" integer DEFAULT 0 NOT NULL,"is_active" boolean DEFAULT true NOT NULL,"created_at" timestamp DEFAULT now() NOT NULL,"updated_at" timestamp DEFAULT now() NOT NULL,CONSTRAINT "product_categories_name_unique" UNIQUE("name"),CONSTRAINT "product_categories_slug_unique" UNIQUE("slug"))`,
  `CREATE TABLE IF NOT EXISTS "products" ("id" serial PRIMARY KEY NOT NULL,"title" varchar(500) NOT NULL,"slug" varchar(500) NOT NULL,"description" text,"short_description" text,"price" bigint NOT NULL,"compare_at_price" bigint,"sku" varchar(100),"category_id" integer,"images" text,"featured_image" text,"stock" integer DEFAULT 0 NOT NULL,"is_in_stock" boolean DEFAULT true NOT NULL,"is_featured" boolean DEFAULT false NOT NULL,"status" "product_status" DEFAULT 'draft' NOT NULL,"meta_title" varchar(255),"meta_description" text,"created_at" timestamp DEFAULT now() NOT NULL,"updated_at" timestamp DEFAULT now() NOT NULL,CONSTRAINT "products_slug_unique" UNIQUE("slug"))`,
  `DO $$ BEGIN ALTER TABLE "article_tags" ADD CONSTRAINT "article_tags_article_id_articles_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$`,
  `DO $$ BEGIN ALTER TABLE "article_tags" ADD CONSTRAINT "article_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$`,
  `DO $$ BEGIN ALTER TABLE "articles" ADD CONSTRAINT "articles_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$`,
  `DO $$ BEGIN ALTER TABLE "articles" ADD CONSTRAINT "articles_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$`,
  `DO $$ BEGIN ALTER TABLE "products" ADD CONSTRAINT "products_category_id_product_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."product_categories"("id") ON DELETE no action ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$`,
  `DO $$ BEGIN ALTER TABLE "uploads" ADD CONSTRAINT "uploads_uploaded_by_users_id_fk" FOREIGN KEY ("uploaded_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$`,
  `INSERT INTO users (username, email, password, name, role) VALUES ('admin', 'admin@bauhaus.ng', '$2b$10$rOzEq6Wm7V.dVCvKM3N8p.A8Y2wq5xJZ7LKrFUPVaK0oUqpuKQEiK', 'Admin User', 'super_admin') ON CONFLICT (username) DO NOTHING`,
];

async function main() {
  console.log("Applying schema to Neon database...");
  let success = 0;
  let failed = 0;

  for (const stmt of statements) {
    try {
      await sql.query(stmt);
      success++;
    } catch (err: any) {
      console.error(`❌ Failed: ${stmt.slice(0, 80)}...`);
      console.error(`   Reason: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n✅ Done: ${success} succeeded, ${failed} failed`);
}

main().catch(console.error);
