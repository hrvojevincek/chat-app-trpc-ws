import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Message = () => {
  return (
    <div className="flex gap-4">
      <Avatar className="w-10 h-10 border">
        <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
        <AvatarFallback>AC</AvatarFallback>
      </Avatar>
      <div className="grid gap-1 items-start text-sm">
        <div className="flex items-center gap-2">
          <div className="font-medium">Olivia Davis</div>
          <div className="text-xs text-muted-foreground">2:39pm</div>
        </div>
        <div>
          <p>
            Hey everyone, how's it going? I just wanted to check in and see how
            you're all doing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Message;
