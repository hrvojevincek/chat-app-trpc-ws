import { SearchIcon, SendIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMessages } from "@/hooks/useMessages";
import { useState } from "react";
import { toast } from "sonner";
import Message from "./Message";
import { Input } from "./ui/input";
import { handleCommand } from "@/util/handleCommand";

const MainRoom = () => {
  const [messageInput, setMessageInput] = useState("");
  const { messages, sendNewMessage, removeLastMessageFromAuthor } =
    useMessages();

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
            // Handle commands light dark think edit oops
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
    <div className="flex flex-col col-span-3">
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
            <Message key={index} {...msg} />
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
