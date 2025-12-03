import { Router, Request, Response } from "express";
import { db } from "../db";
import { mediaItems } from "../../shared/schema";
import { eq, desc, and, ilike, sql, SQL } from "drizzle-orm";
import { authenticateToken, requireRole, AuthRequest } from "../middleware/auth";

const router = Router();

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

router.get("/", async (req: Request, res: Response) => {
  try {
    const { page = "1", limit = "12", type, search, featured } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const offset = (pageNum - 1) * limitNum;

    let conditions: SQL<unknown>[] = [eq(mediaItems.status, "published")];
    
    if (type && type !== "all") {
      conditions.push(eq(mediaItems.type, type as any));
    }

    if (featured === "true") {
      conditions.push(eq(mediaItems.isFeatured, true));
    }

    if (search) {
      conditions.push(ilike(mediaItems.title, `%${search}%`));
    }

    const whereClause = and(...conditions);

    const items = await db
      .select()
      .from(mediaItems)
      .where(whereClause)
      .orderBy(desc(mediaItems.releaseDate), desc(mediaItems.createdAt))
      .limit(limitNum)
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(mediaItems)
      .where(whereClause);

    res.json({
      items,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: Number(count),
        pages: Math.ceil(Number(count) / limitNum),
      },
    });
  } catch (error) {
    console.error("Get media items error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/type/:type", async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    const { page = "1", limit = "12" } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const offset = (pageNum - 1) * limitNum;

    if (!["book", "film", "tv"].includes(type)) {
      return res.status(400).json({ message: "Invalid type. Must be book, film, or tv" });
    }

    const items = await db
      .select()
      .from(mediaItems)
      .where(and(eq(mediaItems.type, type as any), eq(mediaItems.status, "published")))
      .orderBy(desc(mediaItems.releaseDate), desc(mediaItems.createdAt))
      .limit(limitNum)
      .offset(offset);

    res.json(items);
  } catch (error) {
    console.error("Get media items by type error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/featured", async (_req: Request, res: Response) => {
  try {
    const items = await db
      .select()
      .from(mediaItems)
      .where(and(eq(mediaItems.isFeatured, true), eq(mediaItems.status, "published")))
      .orderBy(desc(mediaItems.releaseDate))
      .limit(10);

    res.json(items);
  } catch (error) {
    console.error("Get featured media items error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const itemId = parseInt(id);

    const [item] = await db.select().from(mediaItems).where(eq(mediaItems.id, itemId));

    if (!item) {
      return res.status(404).json({ message: "Media item not found" });
    }

    res.json(item);
  } catch (error) {
    console.error("Get media item error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", authenticateToken, requireRole("super_admin", "editor"), async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, type, coverImage, releaseDate, genre, castInfo, authorInfo, externalLinks, trailerUrl, galleryImages, isFeatured, status } = req.body;

    if (!title || !type) {
      return res.status(400).json({ message: "Title and type are required" });
    }

    if (!["book", "film", "tv"].includes(type)) {
      return res.status(400).json({ message: "Invalid type. Must be book, film, or tv" });
    }

    const slug = generateSlug(title);

    const [newItem] = await db.insert(mediaItems).values({
      title,
      slug,
      description,
      type,
      coverImage,
      releaseDate: releaseDate ? new Date(releaseDate) : null,
      genre,
      castInfo,
      authorInfo,
      externalLinks: externalLinks ? JSON.stringify(externalLinks) : null,
      trailerUrl,
      galleryImages: galleryImages ? JSON.stringify(galleryImages) : null,
      isFeatured: isFeatured || false,
      status: status || "draft",
    }).returning();

    res.status(201).json(newItem);
  } catch (error) {
    console.error("Create media item error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", authenticateToken, requireRole("super_admin", "editor"), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const itemId = parseInt(id);
    const { title, description, type, coverImage, releaseDate, genre, castInfo, authorInfo, externalLinks, trailerUrl, galleryImages, isFeatured, status } = req.body;

    const [existingItem] = await db.select().from(mediaItems).where(eq(mediaItems.id, itemId));
    if (!existingItem) {
      return res.status(404).json({ message: "Media item not found" });
    }

    const updates: any = {
      updatedAt: new Date(),
    };

    if (title) {
      updates.title = title;
      updates.slug = generateSlug(title);
    }
    if (description !== undefined) updates.description = description;
    if (type && ["book", "film", "tv"].includes(type)) updates.type = type;
    if (coverImage !== undefined) updates.coverImage = coverImage;
    if (releaseDate !== undefined) updates.releaseDate = releaseDate ? new Date(releaseDate) : null;
    if (genre !== undefined) updates.genre = genre;
    if (castInfo !== undefined) updates.castInfo = castInfo;
    if (authorInfo !== undefined) updates.authorInfo = authorInfo;
    if (externalLinks !== undefined) updates.externalLinks = externalLinks ? JSON.stringify(externalLinks) : null;
    if (trailerUrl !== undefined) updates.trailerUrl = trailerUrl;
    if (galleryImages !== undefined) updates.galleryImages = galleryImages ? JSON.stringify(galleryImages) : null;
    if (isFeatured !== undefined) updates.isFeatured = isFeatured;
    if (status) updates.status = status;

    const [updatedItem] = await db.update(mediaItems).set(updates).where(eq(mediaItems.id, itemId)).returning();

    res.json(updatedItem);
  } catch (error) {
    console.error("Update media item error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", authenticateToken, requireRole("super_admin", "editor"), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const itemId = parseInt(id);

    const [existingItem] = await db.select().from(mediaItems).where(eq(mediaItems.id, itemId));
    if (!existingItem) {
      return res.status(404).json({ message: "Media item not found" });
    }

    await db.delete(mediaItems).where(eq(mediaItems.id, itemId));

    res.json({ message: "Media item deleted successfully" });
  } catch (error) {
    console.error("Delete media item error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/admin/all", authenticateToken, requireRole("super_admin", "editor"), async (req: AuthRequest, res: Response) => {
  try {
    const { page = "1", limit = "12", type, status, search } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const offset = (pageNum - 1) * limitNum;

    let conditions: SQL<unknown>[] = [];
    
    if (type && type !== "all") {
      conditions.push(eq(mediaItems.type, type as any));
    }

    if (status && status !== "all") {
      conditions.push(eq(mediaItems.status, status as any));
    }

    if (search) {
      conditions.push(ilike(mediaItems.title, `%${search}%`));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const items = await db
      .select()
      .from(mediaItems)
      .where(whereClause)
      .orderBy(desc(mediaItems.createdAt))
      .limit(limitNum)
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(mediaItems)
      .where(whereClause);

    res.json({
      items,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: Number(count),
        pages: Math.ceil(Number(count) / limitNum),
      },
    });
  } catch (error) {
    console.error("Get admin media items error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
