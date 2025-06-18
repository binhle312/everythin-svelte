type User = { id: string; email: string; password: string; name: string; };
type UserInfo = Omit<User, 'password'>;
type RegisterInput = Omit<User, 'id'>;

// ------------------------------------------------------------------------------------------------

const users = new Map<string, User>();

const getUserInfoById = (id: string): UserInfo | null => {
  for (const user of users.values()) {
    if (user.id === id) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    }
  }
  return null;
}

// ------------------------------------------------------------------------------------------------

export const isEmailRegistered = (email: string): boolean => {
  for (const user of users.values()) {
    if (user.email === email) {
      return true;
    }
  }
  return false;
}

export const register = (user: RegisterInput): UserInfo => {
  if (isEmailRegistered(user.email)) {
    throw new Error('Email already exists');
  }

  let id: string;
  do {
    id = crypto.randomUUID();
  } while (users.has(id));

  const newUser: User = { id, ...user };
  users.set(id, newUser);

  return getUserInfoById(id)!;
};

export const login = (email: string, password: string): UserInfo | null => {
  for (const user of users.values()) {
    if (user.email === email && user.password === password) {
      return getUserInfoById(user.id);
    }
  }
  return null;
}

export const getAllUsers = (): UserInfo[] => {
  const userInfos: UserInfo[] = [];
  for (const user of users.values()) {
    userInfos.push(getUserInfoById(user.id)!);
  }
  return userInfos;
}
