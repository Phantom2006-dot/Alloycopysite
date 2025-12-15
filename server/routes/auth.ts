import { Router, Request, Response } from "express";
import { db } from "../db";
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
      return res.status(400).json({ 
        success: false,
        message: "Username and password are required" 
      });
    }

    // Get database pool from db.ts
    const { pool } = require('../db');
    
    // Try to find user - using parameterized query correctly
    const queryText = `SELECT id, username, email, name, role, profile_image, is_active FROM users WHERE username = $1 OR email = $1`;
    const queryParams = [username];
    
    console.log("Running query:", queryText);
    console.log("With params:", queryParams);

    const result = await pool.query(queryText, queryParams);
    const user = result.rows[0];
    
    if (!user) {
      console.log("❌ User not found:", username);
      return res.status(401).json({ 
        success: false,
        message: "User not found" 
      });
    }

    console.log("✅ User found:", user.username);
    console.log("⚠️  Bypassing password check for development - accepting any password");

    if (!user.is_active) {
      console.log("❌ Account inactive");
      return res.status(403).json({ 
        success: false,
        message: "Account is deactivated" 
      });
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

  } catch (error: any) {
    console.error("💥 Login error:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error",
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// TEST LOGIN - Creates admin if doesn't exist
router.post("/test-login", async (req: Request, res: Response) => {
  try {
    console.log("🧪 Test login endpoint called");
    
    const { pool } = require('../db');
    
    // First, check if admin exists
    const checkResult = await pool.query(
      "SELECT id, username, email, name, role, profile_image, is_active FROM users WHERE username = 'admin'"
    );
    
    let user;
    
    if (checkResult.rows.length > 0) {
      user = checkResult.rows[0];
      console.log("✅ Admin user found:", user.username);
    } else {
      // Create admin user
      console.log("🛠️ Creating admin user...");
      const createResult = await pool.query(`
        INSERT INTO users (username, email, password, name, role, is_active) 
        VALUES ('admin', 'admin@test.com', 'test123', 'Admin User', 'super_admin', true)
        RETURNING id, username, email, name, role, profile_image, is_active
      `);
      user = createResult.rows[0];
      console.log("✅ Created admin user");
    }

    // Generate token
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
      message: "Test login successful"
    });

  } catch (error: any) {
    console.error("Test login error:", error);
    res.status(500).json({ 
      success: false,
      message: "Test login failed",
      error: error.message
    });
  }
});

// EVEN SIMPLER: Hardcoded login (no database check)
router.post("/simple-login", async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    
    console.log("🚀 Simple login for:", username || 'any user');
    
    // Create a dummy user object
    const dummyUser = {
      id: 1,
      username: username || 'admin',
      email: username ? `${username}@example.com` : 'admin@example.com',
      name: username ? username.charAt(0).toUpperCase() + username.slice(1) : 'Admin User',
      role: 'super_admin',
      profile_image: null,
      is_active: true
    };
    
    // Generate token
    const token = generateToken({
      id: dummyUser.id,
      username: dummyUser.username,
      email: dummyUser.email,
      role: dummyUser.role,
    });
    
    console.log("✅ Generated token for:", dummyUser.username);
    
    res.json({
      success: true,
      token,
      user: {
        id: dummyUser.id,
        username: dummyUser.username,
        email: dummyUser.email,
        name: dummyUser.name,
        role: dummyUser.role,
        profileImage: dummyUser.profile_image,
      },
      message: "Simple login successful - no database check"
    });
    
  } catch (error: any) {
    console.error("Simple login error:", error);
    res.status(500).json({
      success: false,
      message: "Simple login failed",
      error: error.message
    });
  }
});

// CHECK DATABASE CONNECTION
router.get("/check-db", async (_req: Request, res: Response) => {
  try {
    const { pool } = require('../db');
    
    // Test connection
    const result = await pool.query('SELECT NOW() as time, version() as version');
    
    // Check users table
    const usersResult = await pool.query('SELECT COUNT(*) as user_count FROM users');
    
    res.json({
      success: true,
      database: {
        connected: true,
        time: result.rows[0].time,
        version: result.rows[0].version,
        user_count: usersResult.rows[0].user_count
      }
    });
    
  } catch (error: any) {
    console.error("DB check error:", error);
    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message
    });
  }
});

// CREATE DEFAULT USER
router.post("/create-admin", async (_req: Request, res: Response) => {
  try {
    const { pool } = require('../db');
    
    // Check if admin exists
    const check = await pool.query("SELECT id FROM users WHERE username = 'admin'");
    
    if (check.rows.length > 0) {
      return res.json({
        success: true,
        message: "Admin user already exists",
        user_id: check.rows[0].id
      });
    }
    
    // Create admin
    const result = await pool.query(`
      INSERT INTO users (username, email, password, name, role, is_active)
      VALUES ('admin', 'admin@example.com', 'admin123', 'Administrator', 'super_admin', true)
      RETURNING id, username, email, name, role
    `);
    
    res.json({
      success: true,
      message: "Admin user created successfully",
      user: result.rows[0],
      login_credentials: {
        username: 'admin',
        password: 'admin123'
      }
    });
    
  } catch (error: any) {
    console.error("Create admin error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create admin",
      error: error.message
    });
  }
});

// GET ALL USERS (for debugging)
router.get("/users", async (_req: Request, res: Response) => {
  try {
    const { pool } = require('../db');
    
    const result = await pool.query(`
      SELECT id, username, email, name, role, is_active, created_at
      FROM users
      ORDER BY id
    `);
    
    res.json({
      success: true,
      count: result.rows.length,
      users: result.rows
    });
    
  } catch (error: any) {
    console.error("Get users error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get users",
      error: error.message
    });
  }
});

// LOGOUT
router.post("/logout", (_req: Request, res: Response) => {
  res.json({ 
    success: true,
    message: "Logged out successfully" 
  });
});

export default router;
