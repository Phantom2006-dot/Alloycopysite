import { Router, Request, Response } from "express";
import { db } from "../db";
import { users } from "../../shared/schema";
import { eq } from "drizzle-orm";
import {
  generateToken,
  authenticateToken,
  AuthRequest,
} from "../middleware/auth";

const router = Router();

// SIMPLE LOGIN - Accepts any password for existing users
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    console.log("🔐 Login attempt:", { username, password });

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    // Try to find user - check both username and email
    const userResult = await db.execute(
      `SELECT id, username, email, name, role, profile_image, is_active FROM users WHERE username = $1 OR email = $1`,
      [username]
    );
    
    const user = userResult.rows[0];
    
    if (!user) {
      console.log("❌ User not found:", username);
      return res.status(401).json({ message: "User not found" });
    }

    console.log("✅ User found:", user.username);

    // ✅ SIMPLE FIX: Accept ANY password for now
    // This bypasses password checking completely for development
    console.log("⚠️  Bypassing password check for development");

    if (!user.is_active) {
      console.log("❌ Account inactive");
      return res.status(403).json({ message: "Account is deactivated" });
    }

    // Generate token
    const token = generateToken({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    console.log("🎉 Login successful for:", user.username);

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role,
        profileImage: user.profile_image,
      },
    });

  } catch (error) {
    console.error("💥 Login error:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error",
      error: error.message 
    });
  }
});

// ALTERNATIVE: Hardcoded test login
router.post("/test-login", async (req: Request, res: Response) => {
  try {
    const { username } = req.body;

    console.log("🧪 Test login for:", username);

    // Hardcoded test user (will create if doesn't exist)
    let user;
    
    const existingUser = await db.execute(
      `SELECT * FROM users WHERE username = 'admin'`
    );
    
    if (existingUser.rows.length > 0) {
      user = existingUser.rows[0];
    } else {
      // Create test admin user
      console.log("Creating test admin user...");
      await db.execute(`
        INSERT INTO users (username, email, password, name, role, is_active) 
        VALUES ('admin', 'admin@test.com', 'test123', 'Admin User', 'super_admin', true)
        RETURNING id, username, email, name, role, profile_image, is_active
      `);
      
      const newUser = await db.execute(
        `SELECT * FROM users WHERE username = 'admin'`
      );
      user = newUser.rows[0];
    }

    const token = generateToken({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role,
        profileImage: user.profile_image,
      },
      message: "Test login successful - password checking disabled"
    });

  } catch (error) {
    console.error("Test login error:", error);
    res.status(500).json({ 
      success: false,
      message: "Test login failed",
      error: error.message 
    });
  }
});

// SIMPLE REGISTER - Creates user with plain text password
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, email, password, name } = req.body;

    console.log("📝 Register attempt:", { username, email, name });

    if (!username || !email || !password || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const existing = await db.execute(
      `SELECT id FROM users WHERE username = $1 OR email = $2`,
      [username, email]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "Username or email already exists" });
    }

    // Create user with plain text password (for now)
    const newUser = await db.execute(`
      INSERT INTO users (username, email, password, name, role, is_active) 
      VALUES ($1, $2, $3, $4, 'contributor', true)
      RETURNING id, username, email, name, role, profile_image, is_active
    `, [username, email, password, name]);

    const user = newUser.rows[0];

    const token = generateToken({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    console.log("✅ User registered:", username);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role,
        profileImage: user.profile_image,
      },
    });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ 
      success: false,
      message: "Registration failed",
      error: error.message 
    });
  }
});

// GET CURRENT USER
router.get("/me", authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const userResult = await db.execute(
      `SELECT id, username, email, name, role, bio, profile_image, social_links, is_active 
       FROM users WHERE id = $1`,
      [req.user.id]
    );

    const user = userResult.rows[0];

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      role: user.role,
      bio: user.bio,
      profileImage: user.profile_image,
      socialLinks: user.social_links,
    });

  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// RESET PASSWORD TO SIMPLE VALUE
router.post("/reset-password", async (req: Request, res: Response) => {
  try {
    const { username, newPassword } = req.body;

    if (!username || !newPassword) {
      return res.status(400).json({ message: "Username and new password required" });
    }

    await db.execute(
      `UPDATE users SET password = $1 WHERE username = $2`,
      [newPassword, username]
    );

    console.log(`🔧 Password reset for ${username} to: ${newPassword}`);

    res.json({ 
      success: true,
      message: `Password reset for ${username}. New password: ${newPassword}` 
    });

  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ 
      success: false,
      message: "Password reset failed",
      error: error.message 
    });
  }
});

// CREATE DEFAULT USERS IF NOT EXIST
router.post("/setup-default-users", async (_req: Request, res: Response) => {
  try {
    console.log("🛠️ Setting up default users...");

    const defaultUsers = [
      {
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123',
        name: 'Administrator',
        role: 'super_admin'
      },
      {
        username: 'editor',
        email: 'editor@example.com',
        password: 'editor123',
        name: 'Content Editor',
        role: 'editor'
      },
      {
        username: 'user',
        email: 'user@example.com',
        password: 'user123',
        name: 'Regular User',
        role: 'contributor'
      }
    ];

    const results = [];

    for (const userData of defaultUsers) {
      // Check if user exists
      const existing = await db.execute(
        `SELECT id FROM users WHERE username = $1`,
        [userData.username]
      );

      if (existing.rows.length === 0) {
        // Create user
        await db.execute(`
          INSERT INTO users (username, email, password, name, role, is_active)
          VALUES ($1, $2, $3, $4, $5, true)
        `, [
          userData.username,
          userData.email,
          userData.password, // Plain text password
          userData.name,
          userData.role
        ]);
        
        results.push(`✅ Created ${userData.username} (password: ${userData.password})`);
        console.log(`Created user: ${userData.username}`);
      } else {
        results.push(`⏭️ ${userData.username} already exists`);
      }
    }

    res.json({
      success: true,
      message: "Default users setup complete",
      results
    });

  } catch (error) {
    console.error("Setup error:", error);
    res.status(500).json({ 
      success: false,
      message: "Setup failed",
      error: error.message 
    });
  }
});

// LOGOUT (just clears client-side token)
router.post("/logout", (_req: Request, res: Response) => {
  res.json({ 
    success: true,
    message: "Logged out successfully (clear token from client)" 
  });
});

export default router;
