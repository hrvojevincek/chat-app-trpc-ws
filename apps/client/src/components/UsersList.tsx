import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUsers } from "@/hooks/useUsers";

interface UsersListProps {
  currentUser: { id: string; name: string } | null;
}

export function UsersList({ currentUser }: UsersListProps) {
  const { users } = useUsers();

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
            <p
              className={`text-sm ${
                currentUser?.id === user.id ? "font-extrabold" : "font-medium"
              } truncate`}
            >
              {user.name}
            </p>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
        </div>
      ))}
    </div>
  );
}
