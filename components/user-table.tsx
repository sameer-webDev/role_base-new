"use client"

import type { User } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { deleteUserAction } from "@/app/actions/user-actions"
import { useRouter } from "next/navigation"
import { useState, useMemo } from "react"
import { SearchInput } from "@/components/search-input"
import { Pagination } from "@/components/pagination"
import { usePagination } from "@/hooks/use-pagination"
import { useDebounce } from "@/hooks/use-debounce"

interface UserTableProps {
  users: User[]
}

export function UserTable({ users }: UserTableProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const debouncedSearch = useDebounce(searchQuery, 300)

  const filteredUsers = useMemo(() => {
    if (!debouncedSearch) return users

    const query = debouncedSearch.toLowerCase()
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query),
    )
  }, [users, debouncedSearch])

  const { currentPage, totalPages, paginatedItems, goToPage, canGoNext, canGoPrevious } = usePagination({
    items: filteredUsers,
    itemsPerPage: 5,
  })

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      await deleteUserAction(id)
      router.refresh()
    }
  }

  return (
    <div className="space-y-4">
      <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search by name, email, or role..." />

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-border">
            <tr>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Email</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Role</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedItems.map((user) => (
              <tr key={user.id} className="hover:bg-muted/50 transition-colors">
                <td className="py-3 px-4 text-sm font-medium">{user.name}</td>
                <td className="py-3 px-4 text-sm text-muted-foreground">{user.email}</td>
                <td className="py-3 px-4">
                  <Badge variant={user.role === "admin" ? "default" : "secondary"}>{user.role}</Badge>
                </td>
                <td className="py-3 px-4">
                  <Badge variant={user.status === "active" ? "default" : "outline"}>{user.status}</Badge>
                </td>
                <td className="py-3 px-4">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/users/${user.id}/edit`}>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(user.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {paginatedItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {searchQuery ? "No users found matching your search" : "No users available"}
            </p>
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
        canGoNext={canGoNext}
        canGoPrevious={canGoPrevious}
      />
    </div>
  )
}
