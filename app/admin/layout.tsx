import type React from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { ProtectedRoute } from "@/components/protected-route"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardLayout>
      <ProtectedRoute requiredRole="admin">{children}</ProtectedRoute>
    </DashboardLayout>
  )
}
