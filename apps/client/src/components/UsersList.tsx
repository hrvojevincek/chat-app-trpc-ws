import { useState, useEffect } from "react";
import { getUsers, subscribeToNewUsers } from "@/api/userApi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UsersList() {
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    getUsers().then(setUsers);

    const subscription = subscribeToNewUsers((newUser) => {
      setUsers((prevUsers) => [...prevUsers, newUser]);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div key={user.id} className="flex items-center space-x-4">
          <Avatar className="w-10 h-10 border">
            <AvatarImage src="/placeholder-user.jpg" alt={user.name} />
            <AvatarFallback>
              {user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="text-left">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
        </div>
      ))}
    </div>
  );
}
