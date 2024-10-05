import { PlusIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import MainRoom from "./MainRoom";
import { NicknameModal } from "./NicknameModal";
import { createUser } from "@/api/userApi";
import { useEffect, useState } from "react";
import { UsersList } from "./UsersList";

export default function Chat() {
  const [isNicknameModalOpen, setIsNicknameModalOpen] = useState(false);
  const [userId, setUserId] = useState<{ id: string; name: string } | null>(
    null
  );

  useEffect(() => {
    if (!userId) {
      setIsNicknameModalOpen(true);
    }
  }, []);

  const handleNicknameSubmit = async (nickname: string) => {
    try {
      const user = await createUser(nickname);
      setUserId({ id: user.id, name: user.name });
      setIsNicknameModalOpen(false);
    } catch (error) {
      console.error("Error creating user:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };
  return (
    <>
      <NicknameModal
        isOpen={isNicknameModalOpen}
        onSubmit={handleNicknameSubmit}
      />
      <div className="grid grid-cols-4 max-w-[1200px] w-full mx-auto h-[650px] rounded-lg overflow-hidden border">
        <div className="bg-muted/20 col-span-1 p-4 border-r">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Main Room</h2>
            <Button variant="ghost" size="icon" className="rounded-full">
              <PlusIcon className="h-4 w-4" />
              <span className="sr-only">Create new chat</span>
            </Button>
          </div>
          <UsersList />
        </div>

        <MainRoom />
      </div>
    </>
  );
}
