import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface NicknameModalProps {
  isOpen: boolean;
  onSubmit: (nickname: string) => void;
  isLoading: boolean;
}

export function NicknameModal({
  isOpen,
  onSubmit,
  isLoading,
}: NicknameModalProps) {
  const [nickname, setNickname] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (nickname.trim()) {
      onSubmit(nickname.trim());
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set Your Nickname</DialogTitle>
          <DialogDescription>
            Please enter a nickname to use in the chat.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <Input
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Enter your nickname"
              minLength={3}
              maxLength={12}
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!nickname.trim() || isLoading}>
              {isLoading ? "Setting Nickname..." : "Set Nickname"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
