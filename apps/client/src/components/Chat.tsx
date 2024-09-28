import { PlusIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import MainRoom from "./MainRoom";
import User from "./User";

export default function Chat() {
  return (
    <div className="grid grid-cols-4 max-w-[1200px] w-full mx-auto h-[650px] rounded-lg overflow-hidden border">
      <div className="bg-muted/20 col-span-1 p-4 border-r">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Main Room</h2>
          <Button variant="ghost" size="icon" className="rounded-full">
            <PlusIcon className="h-4 w-4" />
            <span className="sr-only">Create new chat</span>
          </Button>
        </div>
        <User />
        <User />
        <User />
        <User />
      </div>

      <MainRoom />
    </div>
  );
}
