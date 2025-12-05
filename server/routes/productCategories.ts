import { Router, Response } from "express";
import { db } from "../db";
import { productCategories, products } from "../../shared/schema";
import { eq, desc, asc, sql } from "drizzle-orm";
import { authenticateToken, requireRole, AuthRequest } from "../middleware/auth";

const router = Router();

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

router.get("/", async (_req, res: Response) => {
  try {
    const categories = await db.select({
      category: productCategories,
      productCount: sql<number>`(SELECT COUNT(*) FROM products WHERE products.category_id = ${productCategories.id} AND products.status = 'published')`,
    })
      .from(productCategories)
      .where(eq(productCategories.isActive, true))
      .orderBy(asc(productCategories.sortOrder), asc(productCategories.name));

    const formattedCategories = categories.map(c => ({
      ...c.category,
      productCount: Number(c.productCount),
    }));

    res.json(formattedCategories);
  } catch (error) {
    console.error("Get product categories error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/admin/all", authenticateToken, requireRole("super_admin", "editor"), async (_req: AuthRequest, res: Response) => {
  try {
    const categories = await db.select({
      category: productCategories,
      productCount: sql<number>`(SELECT COUNT(*) FROM products WHERE products.category_id = ${productCategories.id})`,
    })
      .from(productCategories)
      .orderBy(asc(productCategories.sortOrder), asc(productCategories.name));

    const formattedCategories = categories.map(c => ({
      ...c.category,
      productCount: Number(c.productCount),
    }));

    res.json(formattedCategories);
  } catch (error) {
    console.error("Get admin product categories error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:slug", async (req, res: Response) => {
  try {
    const { slug } = req.params;
    
    const [category] = await db.select().from(productCategories).where(eq(productCategories.slug, slug));
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    console.error("Get product category error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", authenticateToken, requireRole("super_admin", "editor"), async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, image, sortOrder, isActive } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    let slug = generateSlug(name);
    const [existing] = await db.select().from(productCategories).where(eq(productCategories.slug, slug));
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const [newCategory] = await db.insert(productCategories).values({
      name,
      slug,
      description,
      image,
      sortOrder: sortOrder || 0,
      isActive: isActive !== false,
    }).returning();

    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Create product category error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", authenticateToken, requireRole("super_admin", "editor"), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const categoryId = parseInt(id);

    const [existing] = await db.select().from(productCategories).where(eq(productCategories.id, categoryId));
    if (!existing) {
      return res.status(404).json({ message: "Category not found" });
    }

    const { name, description, image, sortOrder, isActive } = req.body;

    const updates: Record<string, any> = { updatedAt: new Date() };
    
    if (name !== undefined) {
      updates.name = name;
      if (name !== existing.name) {
        let slug = generateSlug(name);
        const [slugExists] = await db.select().from(productCategories).where(eq(productCategories.slug, slug));
        if (slugExists && slugExists.id !== categoryId) {
          slug = `${slug}-${Date.now()}`;
        }
        updates.slug = slug;
      }
    }
    if (description !== undefined) updates.description = description;
    if (image !== undefined) updates.image = image;
    if (sortOrder !== undefined) updates.sortOrder = sortOrder;
    if (isActive !== undefined) updates.isActive = isActive;

    const [updatedCategory] = await db.update(productCategories).set(updates).where(eq(productCategories.id, categoryId)).returning();

    res.json(updatedCategory);
  } catch (error) {
    console.error("Update product category error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", authenticateToken, requireRole("super_admin", "editor"), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const categoryId = parseInt(id);

    const [existing] = await db.select().from(productCategories).where(eq(productCategories.id, categoryId));
    if (!existing) {
      return res.status(404).json({ message: "Category not found" });
    }

    const [hasProducts] = await db.select({ count: sql<number>`count(*)` }).from(products).where(eq(products.categoryId, categoryId));
    if (Number(hasProducts.count) > 0) {
      return res.status(400).json({ message: "Cannot delete category with products. Move or delete products first." });
    }

    await db.delete(productCategories).where(eq(productCategories.id, categoryId));

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Delete product category error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
