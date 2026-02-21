import { createWaitlist, tables } from "@/db/schema";
import { cleanDB, db, waitlistMockData } from "@/db/test/db.mock";
import { logger } from "@/lib/test/logger.mock";
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "bun:test";
import { addDays } from "date-fns";
import {
  Dependencies,
  createWaitlistEntry,
  fetchAllWaitlistEntries,
  fetchWaitlistEntry,
} from "../waitlist";
import { eq } from "drizzle-orm";
import { seedDB } from "@/db/test/db.setup";

describe("waitlist controller", () => {
  let dependencies: Dependencies;
  beforeAll(() => {
    dependencies = {
      db: db,
      log: logger,
    };
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanDB();
  });

  describe("CRUD", () => {
    test("should return a list of waitlist entries", async () => {
      await seedDB(db, waitlistMockData);

      const result = await fetchAllWaitlistEntries({
        db: db,
        log: logger,
      });

      expect(result).toMatchObject(waitlistMockData);
    });

    test("should create a waitlist entry", async () => {
      const newWaitlist: typeof createWaitlist.static = {
        name: "Test Waitlist",
        email: "test@example.com",
        referralCode: "ABC1234",
        releaseDate: addDays(new Date(), 7),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      };
      const result = await createWaitlistEntry(dependencies, newWaitlist);
      const added = db
        .select()
        .from(tables.waitlist)
        .where(eq(tables.waitlist.name, newWaitlist.name))
        .get();

      expect(added).not.toBeUndefined();
      expect(added!).toMatchObject(newWaitlist);
    });

    test("should be able to return details about a waitlist entry by id", async () => {
      const results = await seedDB(db, waitlistMockData);
      const selectedEntryId = results[0].id;
      const waitlistEntry = await fetchWaitlistEntry(
        dependencies,
        selectedEntryId,
      );

      expect(waitlistEntry).not.toBeUndefined();
      expect(waitlistEntry!).toMatchObject(
        expect.objectContaining(waitlistMockData[0]),
      );
    });

    test.todo("should be able to set the waitlist release date", () => {});
    test.todo("should be able to update the waitlist release date", () => {});

    describe("role based", () => {
      test.todo(
        "should be able to list waitlist sign-ups with essential details about attendee",
        () => {},
      );

      test.todo(
        "should be able to list a users waitlist's the user is a member of",
        () => {},
      );
      test.todo("should be able to add a user to a waitlist", () => {});
      test.todo("should be able to remove a user from a waitlist", () => {});
    });
  });

  describe("generating referral code", () => {
    test.todo(
      "should generate a waitlist entry with a unique referral code",
      () => {},
    );
    test.todo(
      "should be able to change the waitlist entry's referral code",
      () => {},
    );
  });

  describe("events", () => {
    test.todo(
      "should be able to send notification to waitlist attendees when release date arrives",
      () => {},
    );
    test.todo(
      "should be able to send notification to waitlist attendees when release date changes",
      () => {},
    );
    test.todo(
      "should be able to send notification about waitlist updates",
      () => {},
    );
  });
});
