import type { CreateWaitlist as Waitlist } from "@waitlist/schema";
import { faker } from "@faker-js/faker";

function createWaitlistEntry(): Waitlist {
  return {
    title: faker.book.title(),
    description: faker.word.words({
      count: {
        max: 15,
        min: 5,
      },
    }),
    email: faker.internet.email(),
    userId: faker.number.int(),
    referralCode: faker.string.alphanumeric(6),
    releaseDate: faker.date.anytime({
      refDate: new Date(),
    }),
    status: "pending",
  };
}

type GeneratedMockData = {
  waitlists: Waitlist[];
};
export const generateMockData = () => {
  const entries = [...Array(10).keys()].map(createWaitlistEntry);

  console.log("Generating Test Mock Data!", [...entries]);
};
