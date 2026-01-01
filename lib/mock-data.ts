export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "user"
  status: "active" | "inactive"
  createdAt: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  category: string
  createdAt: string
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    status: "active",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    status: "active",
    createdAt: "2024-02-20T14:30:00Z",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "user",
    status: "inactive",
    createdAt: "2024-03-10T09:15:00Z",
  },
  {
    id: "4",
    name: "Alice Williams",
    email: "alice@example.com",
    role: "user",
    status: "active",
    createdAt: "2024-03-15T11:20:00Z",
  },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "admin",
    status: "active",
    createdAt: "2024-04-01T08:45:00Z",
  },
  {
    id: "6",
    name: "Diana Prince",
    email: "diana@example.com",
    role: "user",
    status: "active",
    createdAt: "2024-04-10T13:30:00Z",
  },
  {
    id: "7",
    name: "Ethan Hunt",
    email: "ethan@example.com",
    role: "user",
    status: "inactive",
    createdAt: "2024-05-01T10:15:00Z",
  },
]

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Laptop Pro",
    description: "High-performance laptop for professionals",
    price: 1299.99,
    stock: 15,
    category: "Electronics",
    createdAt: "2024-01-10T08:00:00Z",
  },
  {
    id: "2",
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with precision tracking",
    price: 29.99,
    stock: 50,
    category: "Accessories",
    createdAt: "2024-02-05T12:00:00Z",
  },
  {
    id: "3",
    name: "USB-C Hub",
    description: "Multi-port USB-C hub with HDMI and USB 3.0",
    price: 49.99,
    stock: 30,
    category: "Accessories",
    createdAt: "2024-03-01T16:00:00Z",
  },
  {
    id: "4",
    name: "Mechanical Keyboard",
    description: "RGB backlit mechanical keyboard with blue switches",
    price: 89.99,
    stock: 25,
    category: "Accessories",
    createdAt: "2024-03-15T09:30:00Z",
  },
  {
    id: "5",
    name: "27-inch Monitor",
    description: "4K UHD monitor with HDR support",
    price: 399.99,
    stock: 12,
    category: "Electronics",
    createdAt: "2024-04-01T14:00:00Z",
  },
  {
    id: "6",
    name: "Webcam HD",
    description: "1080p webcam with auto-focus and noise cancellation",
    price: 79.99,
    stock: 20,
    category: "Electronics",
    createdAt: "2024-04-10T11:45:00Z",
  },
  {
    id: "7",
    name: "Desk Lamp",
    description: "LED desk lamp with adjustable brightness",
    price: 34.99,
    stock: 40,
    category: "Office",
    createdAt: "2024-05-01T08:20:00Z",
  },
]

// User CRUD operations
export function getUsers(): User[] {
  return [...mockUsers]
}

export function getUserById(id: string): User | undefined {
  return mockUsers.find((user) => user.id === id)
}

export function createUser(user: Omit<User, "id" | "createdAt">): User {
  const newUser: User = {
    ...user,
    id: String(Date.now()),
    createdAt: new Date().toISOString(),
  }
  mockUsers.push(newUser)
  return newUser
}

export function updateUser(id: string, updates: Partial<Omit<User, "id" | "createdAt">>): User | undefined {
  const index = mockUsers.findIndex((user) => user.id === id)
  if (index === -1) return undefined

  mockUsers[index] = { ...mockUsers[index], ...updates }
  return mockUsers[index]
}

export function deleteUser(id: string): boolean {
  const index = mockUsers.findIndex((user) => user.id === id)
  if (index === -1) return false

  mockUsers.splice(index, 1)
  return true
}

// Product CRUD operations
export function getProducts(): Product[] {
  return [...mockProducts]
}

export function getProductById(id: string): Product | undefined {
  return mockProducts.find((product) => product.id === id)
}

export function createProduct(product: Omit<Product, "id" | "createdAt">): Product {
  const newProduct: Product = {
    ...product,
    id: String(Date.now()),
    createdAt: new Date().toISOString(),
  }
  mockProducts.push(newProduct)
  return newProduct
}

export function updateProduct(id: string, updates: Partial<Omit<Product, "id" | "createdAt">>): Product | undefined {
  const index = mockProducts.findIndex((product) => product.id === id)
  if (index === -1) return undefined

  mockProducts[index] = { ...mockProducts[index], ...updates }
  return mockProducts[index]
}

export function deleteProduct(id: string): boolean {
  const index = mockProducts.findIndex((product) => product.id === id)
  if (index === -1) return false

  mockProducts.splice(index, 1)
  return true
}
