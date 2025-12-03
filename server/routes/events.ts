import { Router, Request, Response } from "express";
import { db } from "../db";
import { events } from "../../shared/schema";
import { eq, desc, and, gte, lt, sql, SQL } from "drizzle-orm";
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
    const { page = "1", limit = "12", status } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const offset = (pageNum - 1) * limitNum;

    let conditions: SQL<unknown>[] = [];
    
    if (status && status !== "all") {
      conditions.push(eq(events.status, status as any));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const eventsList = await db
      .select()
      .from(events)
      .where(whereClause)
      .orderBy(desc(events.eventDate))
      .limit(limitNum)
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(events)
      .where(whereClause);

    res.json({
      events: eventsList,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: Number(count),
        pages: Math.ceil(Number(count) / limitNum),
      },
    });
  } catch (error) {
    console.error("Get events error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/upcoming", async (_req: Request, res: Response) => {
  try {
    const now = new Date();
    
    const upcomingEvents = await db
      .select()
      .from(events)
      .where(and(eq(events.status, "upcoming"), gte(events.eventDate, now)))
      .orderBy(events.eventDate)
      .limit(10);

    res.json(upcomingEvents);
  } catch (error) {
    console.error("Get upcoming events error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/past", async (_req: Request, res: Response) => {
  try {
    const now = new Date();
    
    const pastEvents = await db
      .select()
      .from(events)
      .where(lt(events.eventDate, now))
      .orderBy(desc(events.eventDate))
      .limit(10);

    res.json(pastEvents);
  } catch (error) {
    console.error("Get past events error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const [event] = await db.select().from(events).where(eq(events.slug, slug));

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    console.error("Get event error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", authenticateToken, requireRole("super_admin", "editor"), async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, eventDate, endDate, location, isVirtual, virtualLink, featuredImage, registrationLink, eventType, status } = req.body;

    if (!title || !eventDate) {
      return res.status(400).json({ message: "Title and event date are required" });
    }

    const slug = generateSlug(title);

    const [newEvent] = await db.insert(events).values({
      title,
      slug,
      description,
      eventDate: new Date(eventDate),
      endDate: endDate ? new Date(endDate) : null,
      location,
      isVirtual: isVirtual || false,
      virtualLink,
      featuredImage,
      registrationLink,
      eventType,
      status: status || "upcoming",
    }).returning();

    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Create event error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", authenticateToken, requireRole("super_admin", "editor"), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const eventId = parseInt(id);
    const { title, description, eventDate, endDate, location, isVirtual, virtualLink, featuredImage, registrationLink, eventType, status } = req.body;

    const [existingEvent] = await db.select().from(events).where(eq(events.id, eventId));
    if (!existingEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    const updates: any = {
      updatedAt: new Date(),
    };

    if (title) {
      updates.title = title;
      updates.slug = generateSlug(title);
    }
    if (description !== undefined) updates.description = description;
    if (eventDate) updates.eventDate = new Date(eventDate);
    if (endDate !== undefined) updates.endDate = endDate ? new Date(endDate) : null;
    if (location !== undefined) updates.location = location;
    if (isVirtual !== undefined) updates.isVirtual = isVirtual;
    if (virtualLink !== undefined) updates.virtualLink = virtualLink;
    if (featuredImage !== undefined) updates.featuredImage = featuredImage;
    if (registrationLink !== undefined) updates.registrationLink = registrationLink;
    if (eventType !== undefined) updates.eventType = eventType;
    if (status) updates.status = status;

    const [updatedEvent] = await db.update(events).set(updates).where(eq(events.id, eventId)).returning();

    res.json(updatedEvent);
  } catch (error) {
    console.error("Update event error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", authenticateToken, requireRole("super_admin"), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const eventId = parseInt(id);

    const [existingEvent] = await db.select().from(events).where(eq(events.id, eventId));
    if (!existingEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    await db.delete(events).where(eq(events.id, eventId));

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Delete event error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/admin/all", authenticateToken, requireRole("super_admin", "editor"), async (req: AuthRequest, res: Response) => {
  try {
    const eventsList = await db
      .select()
      .from(events)
      .orderBy(desc(events.eventDate));

    res.json(eventsList);
  } catch (error) {
    console.error("Get admin events error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
