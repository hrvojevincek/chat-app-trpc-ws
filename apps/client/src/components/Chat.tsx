import { useUsers } from "@/hooks/useUsers";
import { useEffect, useState } from "react";
import MainRoom from "./MainRoom";
import { NicknameModal } from "./NicknameModal";
import Sidebar from "./Sidebar";

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
      <div className="flex rounded-lg overflow-hidden border h-full">
        <Sidebar />

        <MainRoom />
      </div>
    </>
  );
}
