import { SignIn, SignedIn, SignedOut } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <>
      <SignedIn>
        {/* Redirect authenticated users to their dashboard */}
        {redirect("/dashboard")}
      </SignedIn>
      <SignedOut>
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">Welcome</CardTitle>
              <CardDescription>Sign in to access your dashboard</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <SignIn routing="hash" />
            </CardContent>
          </Card>
        </div>
      </SignedOut>
    </>
  )
}
