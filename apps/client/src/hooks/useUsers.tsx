import { useState, useEffect, useCallback } from "react";
import { getUsers, subscribeToNewUsers, createUser } from "../api/userApi";

interface User {
  id: string;
  name: string;
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Fetch initial users
    getUsers().then(setUsers);

    // Subscribe to new users
    const subscription = subscribeToNewUsers((newUser) => {
      setUsers((prevUsers) => [...prevUsers, newUser]);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const addUser = useCallback(async (name: string): Promise<User> => {
    const newUser = await createUser(name);
    setUsers((prevUsers) => [...prevUsers, newUser]);
    return newUser;
  }, []);

  const getUser = useCallback(
    (id: string): User | undefined => {
      return users.find((user) => user.id === id);
    },
    [users]
  );

  return { users, addUser, getUser };
}
