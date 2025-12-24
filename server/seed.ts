import bcrypt from "bcryptjs";
import { db } from "./db";
import { users, categories, productCategories, products } from "../shared/schema";

async function seed() {
  console.log("Seeding database...");

  const hashedPassword = await bcrypt.hash("admin123", 10);
  
  const existingAdmin = await db.select().from(users).limit(1);
  
  if (existingAdmin.length === 0) {
    await db.insert(users).values({
      username: "admin01",
      email: "admin@bauhaus.ng",
      password: hashedPassword,
      name: "Admin User",
      role: "super_admin",
      bio: "Site administrator",
    });
    console.log("Admin user created: username=admin01, password=admin123");
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

  const existingProductCategories = await db.select().from(productCategories).limit(1);
  
  if (existingProductCategories.length === 0) {
    await db.insert(productCategories).values([
      { name: "Books", slug: "books", description: "Published books and literary works", isActive: true },
      { name: "Films", slug: "films", description: "Films and movies", isActive: true },
      { name: "Merchandise", slug: "merchandise", description: "Official merchandise and collectibles", isActive: true },
      { name: "Subscriptions", slug: "subscriptions", description: "Subscription services", isActive: true },
    ]);
    console.log("Product categories created");
  } else {
    console.log("Product categories already exist");
  }

  const existingProducts = await db.select().from(products).limit(1);
  
  if (existingProducts.length === 0) {
    const bookCategory = await db.select().from(productCategories).where(pb => pb.slug === "books");
    const merchCategory = await db.select().from(productCategories).where(pb => pb.slug === "merchandise");
    
    const categoryId = bookCategory[0]?.id || 1;
    const merchCategoryId = merchCategory[0]?.id || 3;

    await db.insert(products).values([
      {
        title: "The Art of African Literature",
        slug: "art-of-african-literature",
        description: "Explore the rich and diverse traditions of African literature, from ancient tales to contemporary works.",
        shortDescription: "A comprehensive guide to African literary traditions",
        price: 2999,
        compareAtPrice: 4499,
        sku: "BOOK-001",
        categoryId: categoryId,
        stock: 50,
        isInStock: true,
        isFeatured: true,
        status: "published",
        metaTitle: "The Art of African Literature - Buy Online",
        metaDescription: "Discover the best of African literature with our comprehensive guide.",
      },
      {
        title: "Cinema of the Continent",
        slug: "cinema-of-the-continent",
        description: "A detailed study of African cinema, its history, evolution, and impact on global film industry.",
        shortDescription: "African cinema history and influence",
        price: 3499,
        compareAtPrice: 5999,
        sku: "BOOK-002",
        categoryId: categoryId,
        stock: 35,
        isInStock: true,
        isFeatured: true,
        status: "published",
        metaTitle: "Cinema of the Continent",
        metaDescription: "Learn about the evolution and impact of African cinema",
      },
      {
        title: "BAUHAUS Branded Tote Bag",
        slug: "bauhaus-tote-bag",
        description: "Premium cotton tote bag with BAUHAUS official logo. Perfect for book lovers and cultural enthusiasts.",
        shortDescription: "Official BAUHAUS merchandise tote bag",
        price: 1499,
        compareAtPrice: 1999,
        sku: "MERCH-001",
        categoryId: merchCategoryId,
        stock: 100,
        isInStock: true,
        isFeatured: true,
        status: "published",
        metaTitle: "BAUHAUS Official Tote Bag",
        metaDescription: "Get your official BAUHAUS merchandise",
      },
      {
        title: "African Voices Anthology",
        slug: "african-voices-anthology",
        description: "A collection of short stories, essays, and poems from emerging African writers.",
        shortDescription: "Contemporary African literary works",
        price: 2199,
        compareAtPrice: 3299,
        sku: "BOOK-003",
        categoryId: categoryId,
        stock: 45,
        isInStock: true,
        isFeatured: false,
        status: "published",
        metaTitle: "African Voices Anthology",
        metaDescription: "Discover emerging African writers and their works",
      },
      {
        title: "Documentaries Collection DVD Set",
        slug: "documentaries-collection-dvd",
        description: "Essential documentaries exploring African culture, history, and society. 5-disc set.",
        shortDescription: "5-disc documentary collection",
        price: 4999,
        compareAtPrice: 7499,
        sku: "FILM-001",
        categoryId: merchCategoryId,
        stock: 25,
        isInStock: true,
        isFeatured: false,
        status: "published",
        metaTitle: "African Documentaries Collection",
        metaDescription: "Premium documentary collection on African culture and history",
      },
    ]);
    console.log("Sample products created");
  } else {
    console.log("Products already exist");
  }

  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
