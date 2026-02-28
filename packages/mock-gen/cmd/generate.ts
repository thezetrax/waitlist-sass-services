import type {
  CreateWaitlist as Waitlist,
  WaitlistAnnouncement,
  WaitlistSignup,
  User,
} from "@qeberodev/schema";
import { faker as f } from "@faker-js/faker";

function createWaitlistEntry(): Waitlist {
  return {
    title: f.book.title(),
    description: f.word.words({
      count: {
        max: 15,
        min: 5,
      },
    }),
    email: f.internet.email(),
    userId: f.number.int({
      min: 4,
      max: 400,
    }),
    referralCode: f.string.alphanumeric(6),
    releaseDate: f.date.anytime({
      refDate: new Date(),
    }),
    status: "pending",
  };
}

function createWaitlistAnnouncementEntry(): WaitlistAnnouncement {
  return {
    id: f.number.int({
      min: 4,
      max: 100,
    }),
    content: f.lorem.paragraph(),
    created_at: f.date.anytime({
      refDate: new Date(),
    }),
    published: true,
    title: f.lorem.words({
      max: 5,
      min: 2,
    }),
    user_id: f.number.int({
      min: 4,
      max: 400,
    }),
    waitlist_id: f.number.int({
      min: 4,
      max: 400,
    }),
  };
}

function createWaitlistSignEntry(): WaitlistSignup {
  return {
    id: f.number.int({
      min: 4,
      max: 100,
    }),
    joined_at: f.date.anytime({
      refDate: new Date(),
    }),
    referral_code: f.string.alphanumeric(6),
    referred_by: f.number.int({
      min: 4,
      max: 400,
    }),
    status: "invited",
    waitlist_id: f.number.int({
      min: 4,
      max: 400,
    }),
  };
}

function createUserEntry(): User {
  return {
    id: f.number
      .int({
        min: 4,
        max: 400,
      })
      .toString(),
    email: f.internet.email(),
    name: f.person.fullName(),
    createdAt: f.date.anytime({
      refDate: new Date(),
    }),
  };
}

type GeneratedMockData = {
  users: User[];
  waitlists: Waitlist[];
  waitlistSigns: WaitlistSignup[];
  waitlistAnnouncements: WaitlistAnnouncement[];
};
export const generateMockData = (): GeneratedMockData => {
  const waitlists = [...Array(10).keys()].map(createWaitlistEntry);
  const waitlistAnnouncements = [...Array(20).keys()].map(
    createWaitlistAnnouncementEntry,
  );
  const waitlistSigns = [...Array(30).keys()].map(createWaitlistSignEntry);
  const users = [...Array(400).keys()].map(createUserEntry);

  return {
    users,
    waitlists,
    waitlistSigns,
    waitlistAnnouncements,
  };
};
