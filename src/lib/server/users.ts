import { randomSleep } from './delay'

// ------------------------------------------------------------------------------------------------

type User = { id: string; email: string; password: string; fullName: string; };
type UserInfo = Omit<User, 'password'>;

// ------------------------------------------------------------------------------------------------

const users = new Map<string, User>([
  [
    "1",
    {
      id: "1",
      email: "admin@example.com",
      password: "admin",
      fullName: "Admin",
    }
  ]
]);

const getUserInfoById = (id: string): UserInfo | null => {
  for (const user of users.values()) {
    if (user.id === id) {
      return {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      };
    }
  }
  return null;
}

// ------------------------------------------------------------------------------------------------

export const isEmailTaken = (email: string): boolean => {
  console.log(users.values())
  for (const user of users.values()) {
    if (user.email === email) {
      return true;
    }
  }
  return false;
}

export const register = async (email: string, password: string, fullName: string) => {
  // Simulate a delay to mimic real-world scenarios
  await randomSleep();

  if (isEmailTaken(email)) {
    throw new Error('Email already exists');
  }

  let id: string;
  do {
    id = crypto.randomUUID();
  } while (users.has(id));

  users.set(id, {
    id,
    email,
    password,
    fullName
  });

  return getUserInfoById(id)!;
};

export const login = async (email: string, password: string): Promise<UserInfo> => {
  for (const user of users.values()) {
    if (user.email === email && user.password === password) {
      return getUserInfoById(user.id)!;
    }
  }
  throw new Error('Invalid email or password');
}

export const getAllUsers = (): UserInfo[] => {
  const userInfos: UserInfo[] = [];
  for (const user of users.values()) {
    userInfos.push(getUserInfoById(user.id)!);
  }
  return userInfos;
}
