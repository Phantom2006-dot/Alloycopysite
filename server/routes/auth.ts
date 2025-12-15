// auth-simple.ts - Save as a separate file and test
import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";

const router = Router();

// Generate token function
function generateToken(payload: any): string {
  const secret = process.env.JWT_SECRET || "dev-secret-123";
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

// WORKING LOGIN - No database at all
router.post("/login", async (req: Request, res: Response) => {
  try {
    console.log("📨 Received login request");
    console.log("Body:", req.body);
    
    const { username } = req.body;
    
    // Create fake user
    const fakeUser = {
      id: 1,
      username: username || "admin",
      email: `${username || "admin"}@example.com`,
      name: "Test User",
      role: "super_admin"
    };
    
    // Generate token
    const token = generateToken(fakeUser);
    
    console.log("✅ Generated token");
    
    res.json({
      success: true,
      token,
      user: fakeUser,
      message: "Login successful (fake user)"
    });
    
  } catch (error: any) {
    console.error("💥 Error:", error);
    res.status(200).json({  // Return 200 even on error for testing
      success: true,
      token: "fake-token-123",
      user: {
        id: 1,
        username: "admin",
        email: "admin@example.com",
        name: "Admin",
        role: "super_admin"
      },
      message: "Forced success for testing"
    });
  }
});

export default router;
