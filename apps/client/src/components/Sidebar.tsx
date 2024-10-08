import { useUsers } from "@/hooks/useUsers";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { UsersList } from "./UsersList";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const Sidebar = () => {
  const { currentUser } = useUsers();

  return (
    <div className="bg-muted/20 p-4 border-r w-1/4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Chat</h2>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="ghost" size="icon" className="rounded-full">
              <InfoCircledIcon className="h-4 w-4" />
              <span className="sr-only">Create new chat</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="rounded-md space-y-1 p-2">
            <p>/nick - set browsers name</p>
            <p>/light - light mode</p>
            <p>/dark - dark mode</p>
            <p>/oops - delete last message</p>
            <p>/think - different style</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <UsersList currentUser={currentUser} />
    </div>
  );
};

export default Sidebar;
