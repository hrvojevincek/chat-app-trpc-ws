import { changeTitle, subscribeToTitleChanges } from "@/api/titleApi";
import { SearchIcon, SendIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMessages } from "@/hooks/useMessages";
import { useThemeToggle } from "@/hooks/useThemeToggle";
import { handleCommand } from "@/util/handleCommand";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Message from "./Message";
import { Input } from "./ui/input";

const MainRoom = () => {
  const toggleTheme = useThemeToggle();
  const [messageInput, setMessageInput] = useState("");
  const { messages, sendNewMessage, removeLastMessageFromAuthor } =
    useMessages();

  useEffect(() => {
    const subscription = subscribeToTitleChanges((newTitle) => {
      document.title = newTitle;
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSubmitSendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    if (messageInput.trim()) {
      try {
        const userString = localStorage.getItem("currentUser");
        if (userString) {
          const user = JSON.parse(userString);

          const { command, messageContent } = handleCommand(
            messageInput.trim()
          );

          if (command) {
            if (command === "think") {
              await sendNewMessage(user.name, messageContent.trim(), true);
            }
            if (command === "oops") {
              const success = await removeLastMessageFromAuthor(user.name);
              if (success) {
                toast.success("Last message removed");
              } else {
                toast.error("No message to remove");
              }
            }
            if (command === "nick") {
              await changeTitle(messageContent.trim());
              toast.success(`Title changed to: ${messageContent.trim()}`);
            }
            if (command === "light") {
              toggleTheme("light");
              setMessageInput("");
              return;
            }
            if (command === "dark") {
              toggleTheme("dark");
              setMessageInput("");
              return;
            }
          } else {
            await sendNewMessage(user.name, messageInput.trim());
          }

          setMessageInput("");
        }
      } catch (error) {
        console.error("Error sending message:", error);
        toast.error("Error sending message");
      }
    }
  };

  return (
    <div className="flex flex-col col-span-3 w-full">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-sm font-medium">Main Room</p>
            <p className="text-xs text-muted-foreground">12 active users</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full">
          <SearchIcon className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="grid p-4 space-y-4">
          {messages.map((msg, index) => (
            <Message
              key={index}
              author={msg.author}
              message={msg.message}
              isItalic={msg.isItalic}
            />
          ))}
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <form
          onSubmit={handleSubmitSendMessage}
          className="flex items-center space-x-2"
        >
          <Input
            id="message"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            autoComplete="off"
          />
          <Button
            type="submit"
            size="icon"
            className="rounded-xl"
            disabled={!messageInput.trim()}
          >
            <SendIcon className="h-4 w-4 " />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default MainRoom;
