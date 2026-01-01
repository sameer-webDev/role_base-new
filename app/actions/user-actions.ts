"use server"

import { revalidatePath } from "next/cache"
import { createUser, deleteUser, updateUser, type User } from "@/lib/mock-data"

export async function createUserAction(data: Omit<User, "id" | "createdAt">) {
  createUser(data)
  revalidatePath("/admin/users")
  return { success: true }
}

export async function updateUserAction(id: string, data: Partial<Omit<User, "id" | "createdAt">>) {
  updateUser(id, data)
  revalidatePath("/admin/users")
  revalidatePath(`/admin/users/${id}`)
  return { success: true }
}

export async function deleteUserAction(id: string) {
  deleteUser(id)
  revalidatePath("/admin/users")
  return { success: true }
}
