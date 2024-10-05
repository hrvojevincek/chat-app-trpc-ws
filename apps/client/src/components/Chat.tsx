import { PlusIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { useUsers } from "@/hooks/useUsers";
import { useEffect, useState } from "react";
import MainRoom from "./MainRoom";
import { NicknameModal } from "./NicknameModal";
import { UsersList } from "./UsersList";

export default function Chat() {
  const [isNicknameModalOpen, setIsNicknameModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addUser, verifyUser, setCurrentUser } = useUsers();

  useEffect(() => {
    const checkUser = async () => {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        const isValid = await verifyUser(parsedUser.id);
        if (isValid) {
          setCurrentUser(parsedUser);
          return;
        }
      }
      setIsNicknameModalOpen(true);
    };
    checkUser();
  }, [verifyUser]);

  const handleNicknameSubmit = async (nickname: string) => {
    setIsLoading(true);
    try {
      const newUser = await addUser(nickname);
      setCurrentUser(newUser);
      setIsNicknameModalOpen(false);
    } catch (error) {
      console.error("Error creating user:", error);
      // Handle error (e.g., show an error message to the user)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NicknameModal
        isOpen={isNicknameModalOpen}
        onSubmit={handleNicknameSubmit}
        isLoading={isLoading}
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
