import { changeTitle, subscribeToTitleChanges } from "@/api/titleApi";
import { SearchIcon, SendIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { useMessages } from "@/hooks/useMessages";
import { useThemeToggle } from "@/hooks/useThemeToggle";
import { handleCommand } from "@/util/handleCommand";
import { useRef, useEffect, useState } from "react";
import { toast } from "sonner";
import Message from "./Message";
import { Input } from "./ui/input";

const MainRoom = () => {
  const toggleTheme = useThemeToggle();
  const [messageInput, setMessageInput] = useState("");
  const { messages, sendNewMessage, removeLastMessageFromAuthor } =
    useMessages();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const subscription = subscribeToTitleChanges((newTitle) => {
      document.title = newTitle;
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

          // Replace emoticons with emojis
          const replaceEmoticons = (text: string) => {
            return text.replace(/:\)/g, "😊").replace(/;\)/g, "😉");
          };

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
            const processedMessage = replaceEmoticons(messageInput.trim());
            await sendNewMessage(user.name, processedMessage);
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
    <div className="flex flex-col col-span-3 w-full h-full">
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
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col space-y-4">
          {messages.map((msg, index) => (
            <Message
              key={index}
              author={msg.author}
              message={msg.message}
              isItalic={msg.isItalic}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
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
