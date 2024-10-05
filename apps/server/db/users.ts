let users: { id: string; name: string }[] = [];

export function addUser(user: { name: string }) {
  const id = crypto.randomUUID();
  const newUser = { id, name: user.name };
  users.push(newUser);
  return newUser;
}

export function getUsers() {
  return users;
}

export function getUser(id: string) {
  return users.find((user) => user.id === id);
}
