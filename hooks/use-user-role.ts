"use client"

import { useUser } from "@clerk/nextjs"
import type { UserRole } from "@/lib/get-user-role"

/**
 * Client-side hook to get user role from Clerk
 */
export function useUserRole(): UserRole {
  const { user } = useUser()

  if (!user) {
    return "user"
  }

  const role = user.publicMetadata?.role as UserRole | undefined
  return role === "admin" ? "admin" : "user"
}

/**
 * Client-side hook to check if user is admin
 */
export function useIsAdmin(): boolean {
  const role = useUserRole()
  return role === "admin"
}
