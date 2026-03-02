import type { FC } from "react";
import { Button } from "../button";
import { Card } from "../card";

const waitlistId = "waitlist-id";
type WaitlistCardProps = {
  id: string;
};
const WaitlistCard: FC<WaitlistCardProps> = () => {
  const { id } = { id: waitlistId };
  return (
    <Card className="flex flex-col gap-4 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold">Waitlist Name</h2>
      <p className="text-gray-600">Description of the waitlist.</p>
      <div className="flex flex-row gap-2">
        <a href={`/join/${id}`}>
          <Button>Join Waitlist</Button>
        </a>
        <a href={`/waitlist/${id}`}>
          <Button variant="outline">View Details</Button>
        </a>
      </div>
    </Card>
  );
};

export { WaitlistCard };
