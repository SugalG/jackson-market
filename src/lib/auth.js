import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;

// -------------------------
// JWT Helpers
// -------------------------
export function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

// -------------------------
// USER COOKIE
// -------------------------
export async function setUserCookie(token) {
  const store = cookies();
  store.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}

// -------------------------
// ADMIN COOKIE
// -------------------------
export async function setAdminCookie(token) {
  const store = cookies();
  store.set("admin_token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}

// -------------------------
// GETTERS
// -------------------------
export async function getUser() {
  const store = cookies();
  const token = store.get("token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function getAdmin() {
  const store = cookies();
  const token = store.get("admin_token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

// -------------------------
// 🔥 SINGLE SOURCE OF TRUTH FOR LOGOUT
// -------------------------
export async function clearAllAuthCookies() {
  const store = cookies();

  store.set("token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  store.set("admin_token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}
