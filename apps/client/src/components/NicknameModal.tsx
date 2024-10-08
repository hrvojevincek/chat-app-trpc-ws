import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUsers } from "@/hooks/useUsers";
import { useState } from "react";

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
  const [error, setError] = useState("");
  const { isNicknameTaken } = useUsers();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (nickname.trim()) {
      if (!/^[a-zA-Z0-9]+$/.test(nickname)) {
        setError("Nickname can only contain letters and numbers");
      } else if (isNicknameTaken(nickname.trim())) {
        setError("Nickname is taken, choose another one!");
      } else {
        setError("");
        onSubmit(nickname.trim());
      }
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickname(value);
    if (value && !/^[a-zA-Z0-9]+$/.test(value)) {
      setError("Nickname can only contain letters and numbers");
    } else {
      setError("");
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set Your Nickname</DialogTitle>
          <DialogDescription>
            Please enter a nickname to use in the chat. Only letters and numbers are allowed.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <Input
              id="nickname"
              value={nickname}
              onChange={handleNicknameChange}
              placeholder="Enter your nickname"
              minLength={3}
              maxLength={12}
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!nickname.trim() || isLoading || !!error}>
              {isLoading ? "Setting Nickname..." : "Set Nickname"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
