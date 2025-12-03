import bcrypt from "bcryptjs";
import { db } from "./db";
import { users, categories } from "../shared/schema";

async function seed() {
  console.log("Seeding database...");

  const hashedPassword = await bcrypt.hash("admin123", 10);
  
  const existingAdmin = await db.select().from(users).limit(1);
  
  if (existingAdmin.length === 0) {
    await db.insert(users).values({
      username: "admin",
      email: "admin@bauhaus.ng",
      password: hashedPassword,
      name: "Admin User",
      role: "super_admin",
      bio: "Site administrator",
    });
    console.log("Admin user created: username=admin, password=admin123");
  } else {
    console.log("Admin user already exists");
  }

  const existingCategories = await db.select().from(categories).limit(1);
  
  if (existingCategories.length === 0) {
    await db.insert(categories).values([
      { name: "Books", slug: "books", description: "Articles about books and literature" },
      { name: "Films", slug: "films", description: "News and reviews about films" },
      { name: "TV", slug: "tv", description: "Television shows and series" },
      { name: "Publishing", slug: "publishing", description: "Publishing industry news" },
      { name: "Events", slug: "events", description: "Event announcements and coverage" },
      { name: "Tourism", slug: "tourism", description: "Travel and tourism content" },
      { name: "News", slug: "news", description: "General news and updates" },
    ]);
    console.log("Default categories created");
  } else {
    console.log("Categories already exist");
  }

  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
