import { randomSleep } from '../helpers/delay'
import jwt from 'jsonwebtoken'

// ------------------------------------------------------------------------------------------------

type User = {
  id: string;
  email: string;
  password: string;
  fullName: string;
  status: 'active' | 'inactive';
}

type UserInfo = Omit<User, 'password'>

// ------------------------------------------------------------------------------------------------

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'default-access-secret'

const users = new Map<string, User>([
  [
    "1",
    {
      id: "1",
      email: "admin@everythin.com",
      password: "admin",
      fullName: "Admin",
      status: "active",
    }
  ],
  [
    "2",
    {
      id: "2",
      email: "jane.doe@everythin.com",
      password: "password123",
      fullName: "Jane Doe",
      status: "active",
    }
  ],
  [
    "3",
    {
      id: "3",
      email: "john.smith@everythin.com",
      password: "qwerty",
      fullName: "John Smith",
      status: "inactive",
    }
  ],
  [
    "4",
    {
      id: "4",
      email: "alice.wonderland@everythin.com",
      password: "alicepass",
      fullName: "Alice Wonderland",
      status: "inactive",
    }
  ],
  [
    "5",
    {
      id: "5",
      email: "bob.builder@everythin.com",
      password: "canwebuildit",
      fullName: "Bob Builder",
      status: "active",
    }
  ]
])

const getUserInfoById = (id: string): UserInfo => {
  for (const user of users.values()) {
    if (user.id === id) {
      return {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        status: user.status,
      }
    }
  }
  throw new Error('Not found')
}

const generateAccessToken = (user: UserInfo): string => {
  return jwt.sign({ ...user }, JWT_ACCESS_SECRET, { expiresIn: '1d' })
}

// ------------------------------------------------------------------------------------------------

export const getAll = async (): Promise<UserInfo[]> => {
  // Simulate a delay to mimic real-world scenarios
  await randomSleep()

  return Array.from(users.values()).map(user => getUserInfoById(user.id))
}

export const getOneById = async (id: string): Promise<UserInfo> => {
  // Simulate a delay to mimic real-world scenarios
  await randomSleep()

  return getUserInfoById(id)
}

export const isEmailTaken = (email: string): boolean => {
  for (const user of users.values()) {
    if (user.email === email) {
      return true
    }
  }
  return false
}

export const register = async (email: string, password: string, fullName: string) => {
  // Simulate a delay to mimic real-world scenarios
  await randomSleep()

  if (isEmailTaken(email)) {
    throw new Error('Email already exists')
  }

  let id: string;
  do {
    id = crypto.randomUUID()
  } while (users.has(id))

  users.set(id, {
    id,
    email,
    password,
    fullName,
    status: 'active'
  })

  return
}

export const login = async (email: string, password: string) => {
  for (const user of users.values()) {
    if (user.email === email && user.password === password) {
      const userInfo = getUserInfoById(user.id)
      const token = generateAccessToken(userInfo)
      return token
    }
  }
  throw new Error('Invalid email or password')
}

export const verifyToken = async (accessToken: string) => {
  // Simulate a delay to mimic real-world scenarios
  await randomSleep()

  return jwt.verify(accessToken, JWT_ACCESS_SECRET) as UserInfo
}
