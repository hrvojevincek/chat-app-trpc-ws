import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { formatDistanceToNow } from "date-fns";

interface MessageProps {
  author: string;
  message: string;
  isItalic?: boolean;
}

const Message = ({ author, message, isItalic }: MessageProps) => {
  return (
    <div className="flex gap-4">
      <Avatar className="w-10 h-10 border">
        <AvatarImage src="/placeholder-user.jpg" alt={author} />
        <AvatarFallback>{author.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="grid gap-1 items-start text-sm">
        <div className="flex items-center gap-2">
          <div className="font-medium">{author}</div>
          <div className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(), { addSuffix: true })}
          </div>
        </div>
        <div className="text-left">
          <p className={isItalic ? "italic" : ""}>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
