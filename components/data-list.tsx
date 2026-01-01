"use client"

import type { Product } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SearchInput } from "@/components/search-input"
import { Pagination } from "@/components/pagination"
import { usePagination } from "@/hooks/use-pagination"
import { useDebounce } from "@/hooks/use-debounce"

interface DataListProps {
  products: Product[]
}

export function DataList({ products }: DataListProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const debouncedSearch = useDebounce(searchQuery, 300)

  const filteredProducts = useMemo(() => {
    if (!debouncedSearch) return products

    const query = debouncedSearch.toLowerCase()
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query),
    )
  }, [products, debouncedSearch])

  const { currentPage, totalPages, paginatedItems, goToPage, canGoNext, canGoPrevious } = usePagination({
    items: filteredProducts,
    itemsPerPage: 5,
  })

  return (
    <div className="space-y-4">
      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search products by name, description, or category..."
      />

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-border">
            <tr>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Product</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Category</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Price</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Stock</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedItems.map((product) => (
              <tr key={product.id} className="hover:bg-muted/50 transition-colors">
                <td className="py-3 px-4">
                  <div>
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{product.description}</p>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <Badge variant="secondary">{product.category}</Badge>
                </td>
                <td className="py-3 px-4 text-sm font-medium">${product.price.toFixed(2)}</td>
                <td className="py-3 px-4">
                  <Badge variant={product.stock > 20 ? "default" : product.stock > 0 ? "outline" : "destructive"}>
                    {product.stock} units
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  <div className="flex justify-end">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => setSelectedProduct(product)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{product.name}</DialogTitle>
                          <DialogDescription>Product details and information</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Description</p>
                            <p className="text-sm mt-1">{product.description}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Price</p>
                              <p className="text-sm font-bold mt-1">${product.price.toFixed(2)}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Stock</p>
                              <p className="text-sm font-bold mt-1">{product.stock} units</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Category</p>
                              <p className="text-sm mt-1">{product.category}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Created</p>
                              <p className="text-sm mt-1">{new Date(product.createdAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {paginatedItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {searchQuery ? "No products found matching your search" : "No products available"}
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
