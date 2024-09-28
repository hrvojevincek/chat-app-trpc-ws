import { useState } from "react";
import { Button } from "./ui/button";
import { trpc } from "@/client";

const Example = () => {
  const [greeting, setGreeting] = useState<string[] | null>(null);

  const handleFetchGreeting = async () => {
    try {
      const result = await trpc.greeting.query({ name: "World" });
      setGreeting((prev) => [...(prev || []), result]);
    } catch (error) {
      console.error("Error fetching tRPC greeting:", error);
      setGreeting((prev) => [...(prev || []), "Error fetching greeting"]);
    }
  };
  return (
    <div>
      <h1>tRPC Example</h1>
      {greeting ? (
        <ul>
          {greeting.map((greeting, index) => (
            <li key={index}>{greeting}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
      <Button onClick={handleFetchGreeting}>Fetch Greeting</Button>
      {greeting && <p>tRPC Greeting: {greeting}</p>}
    </div>
  );
};

export default Example;
