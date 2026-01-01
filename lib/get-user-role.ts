import { currentUser } from "@clerk/nextjs/server"

export type UserRole = "admin" | "user"

/**
 * Get the role of the current user from Clerk metadata
 * Returns 'admin' or 'user'
 */
export async function getUserRole(): Promise<UserRole> {
  const user = await currentUser()

  if (!user) {
    return "user"
  }

  // Check if user has admin role in public metadata
  const role = user.publicMetadata?.role as UserRole | undefined
  return role === "admin" ? "admin" : "user"
}

/**
 * Check if the current user is an admin
 */
export async function isAdmin(): Promise<boolean> {
  const role = await getUserRole()
  return role === "admin"
}
