import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getProducts } from "@/lib/mock-data"
import { DataList } from "@/components/data-list"
import { Package } from "lucide-react"

export default function DataPage() {
  const products = getProducts()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Data Browser</h1>
        <p className="text-muted-foreground mt-1">View available products and information</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle>
            <Package className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Available to view</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Categories</CardTitle>
            <Package className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(products.map((p) => p.category)).size}</div>
            <p className="text-xs text-muted-foreground mt-1">Distinct categories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Stock</CardTitle>
            <Package className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.reduce((sum, p) => sum + p.stock, 0)}</div>
            <p className="text-xs text-muted-foreground mt-1">Items in inventory</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Catalog</CardTitle>
          <CardDescription>Browse all available products (Read-only view)</CardDescription>
        </CardHeader>
        <CardContent>
          <DataList products={products} />
        </CardContent>
      </Card>
    </div>
  )
}
