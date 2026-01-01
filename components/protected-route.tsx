"use client"

import type React from "react"

import { useUserRole } from "@/hooks/use-user-role"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "admin" | "user"
}

/**
 * Client-side component to protect routes based on user role
 */
export function ProtectedRoute({ children, requiredRole = "user" }: ProtectedRouteProps) {
  const userRole = useUserRole()
  const router = useRouter()

  useEffect(() => {
    if (requiredRole === "admin" && userRole !== "admin") {
      // Redirect non-admin users trying to access admin routes
      router.push("/dashboard")
    }
  }, [userRole, requiredRole, router])

  if (requiredRole === "admin" && userRole !== "admin") {
    return null
  }

  return <>{children}</>
}
