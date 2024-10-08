import { useState, useEffect, useCallback } from "react";
import {
  getUsers,
  subscribeToNewUsers,
  createUser,
  getCurrentUser,
} from "../api/userApi";

interface User {
  id: string;
  name: string;
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          const user = await getCurrentUser(parsedUser.id);
          if (user) {
            setCurrentUser(user);
          }
        } catch (error) {
          console.error("Error fetching current user:", error);
          localStorage.removeItem("currentUserId");
        }
      }
    };

    fetchCurrentUser();
    getUsers().then(setUsers);

    const subscription = subscribeToNewUsers((newUser) => {
      setUsers((prevUsers) => [...prevUsers, newUser]);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const verifyUser = useCallback(async (id: string): Promise<boolean> => {
    try {
      const user = await getCurrentUser(id);
      if (user) {
        setCurrentUser(user);
        return true;
      }
    } catch (error) {
      console.error("Error verifying user:", error);
    }
    return false;
  }, []);

  const addUser = useCallback(async (name: string): Promise<User> => {
    const newUser = await createUser(name);
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setCurrentUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    return newUser;
  }, []);

  const getUser = useCallback(
    (id: string): User | undefined => {
      return users.find((user) => user.id === id);
    },
    [users]
  );

  return { users, currentUser, setCurrentUser, addUser, getUser, verifyUser };
}
