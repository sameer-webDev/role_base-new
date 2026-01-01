import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getUsers, getProducts } from "@/lib/mock-data"
import { BarChart3, ShoppingBag, Users, Activity } from "lucide-react"

export default function AdminPage() {
  const users = getUsers()
  const products = getProducts()

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      description: `${users.filter((u) => u.status === "active").length} active`,
      icon: Users,
      color: "text-chart-1",
    },
    {
      title: "Total Products",
      value: products.length,
      description: `${products.reduce((sum, p) => sum + p.stock, 0)} in stock`,
      icon: ShoppingBag,
      color: "text-chart-2",
    },
    {
      title: "Revenue (Mock)",
      value: "$48,234",
      description: "+18.2% from last month",
      icon: BarChart3,
      color: "text-chart-3",
    },
    {
      title: "System Health",
      value: "98.5%",
      description: "All systems operational",
      icon: Activity,
      color: "text-chart-4",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-balance">Admin Panel</h1>
        <p className="text-muted-foreground mt-2">Manage users, products, and system settings</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>Latest registered users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.slice(0, 3).map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <div
                    className={`px-2 py-1 rounded text-xs ${user.status === "active" ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"}`}
                  >
                    {user.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Inventory</CardTitle>
            <CardDescription>Current stock levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.slice(0, 3).map((product) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">${product.price}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">{product.stock} units</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
