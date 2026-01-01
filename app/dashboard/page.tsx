import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getUserRole } from "@/lib/get-user-role"
import { Activity, TrendingUp, Users, Database } from "lucide-react"

export default async function DashboardPage() {
  const role = await getUserRole()
  const isAdmin = role === "admin"

  const stats = [
    {
      title: "Total Views",
      value: "12,345",
      change: "+12.5%",
      icon: Activity,
      color: "text-chart-1",
    },
    {
      title: "Active Users",
      value: "1,234",
      change: "+8.2%",
      icon: Users,
      color: "text-chart-2",
    },
    {
      title: "Revenue",
      value: "$45,678",
      change: "+23.1%",
      icon: TrendingUp,
      color: "text-chart-3",
      adminOnly: true,
    },
    {
      title: "Data Entries",
      value: "8,901",
      change: "+5.4%",
      icon: Database,
      color: "text-chart-4",
    },
  ]

  const filteredStats = stats.filter((stat) => !stat.adminOnly || isAdmin)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-balance">Welcome to your Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          {isAdmin ? "You have full administrative access to all features." : "View your data and analytics here."}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {filteredStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <Icon className={cn("h-4 w-4", stat.color)} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-accent mt-1">{stat.change} from last month</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest interactions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Activity {i}</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                View Data
              </Button>
              {isAdmin && (
                <>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    Manage Users
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    System Settings
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ")
}
