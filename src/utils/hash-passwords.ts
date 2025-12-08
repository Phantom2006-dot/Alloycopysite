// [file name]: hash-passwords.ts
// [file content begin]
import bcrypt from "bcryptjs";
import { db } from "./db";
import { users } from "../shared/schema";
import { eq } from "drizzle-orm";

async function hashExistingPasswords() {
  console.log("Hashing existing passwords...");

  const allUsers = await db.select().from(users);

  for (const user of allUsers) {
    // Skip if password is already hashed
    if (user.password.startsWith("$2b$")) {
      console.log(`User ${user.username}: Password already hashed`);
      continue;
    }

    // Hash the plain text password
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // Update the user record
    await db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, user.id));

    console.log(`User ${user.username}: Password hashed successfully`);
  }

  console.log("All passwords have been hashed!");
  process.exit(0);
}

hashExistingPasswords().catch((error) => {
  console.error("Error hashing passwords:", error);
  process.exit(1);
});
// [file content end]
