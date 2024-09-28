import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Users = () => {
  return (
    <>
      <a
        href="#"
        className="flex items-center text-left gap-3 p-2 rounded-md hover:bg-muted/50"
      >
        <Avatar className="w-10 h-10 border">
          <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
          <AvatarFallback>HV</AvatarFallback>
        </Avatar>
        <div className="flex-1 truncate">
          <p className="text-sm font-medium">Hrvoje Vincek</p>
          <p className="text-xs text-muted-foreground">Online</p>
        </div>
      </a>
    </>
  );
};

export default Users;
