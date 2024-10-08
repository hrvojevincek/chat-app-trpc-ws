import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useUsers } from "@/hooks/useUsers";
import { UsersList } from "./UsersList";

const Sidebar = () => {
  const { currentUser } = useUsers();

  return (
    <div className="bg-muted/20 p-4 border-r w-1/4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Chat</h2>
        <Button variant="ghost" size="icon" className="rounded-full">
          <PlusIcon className="h-4 w-4" />
          <span className="sr-only">Create new chat</span>
        </Button>
      </div>
      <UsersList currentUser={currentUser} />
    </div>
  );
};

export default Sidebar;
