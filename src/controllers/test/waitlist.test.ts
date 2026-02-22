import { createWaitlist, tables } from "@/db/schema";
import { cleanDB, db, Waitlist, waitlistMockData } from "@/db/test/db.mock";
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
  generateWaitlistReferralCode,
  removeWaitlistEntry,
  updateWaitlistEntry,
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

    test("should update a waitlist entry", async () => {
      const oldWaitlist: Waitlist = {
        name: "Waitlist #1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        email: "test@example.com",
        referralCode: "ref003",
      };
      const newWaitlist: Waitlist = {
        ...oldWaitlist,
        name: "Updated Waitlist Name",
      };

      const created = await createWaitlistEntry(dependencies, oldWaitlist);
      const updated = await updateWaitlistEntry(
        dependencies,
        created.id,
        newWaitlist,
      );

      expect(updated.id).toBe(created.id);
      expect(updated.name).toBe(newWaitlist.name);
    });

    test("should remove a waitlist entry by id", async () => {
      const waitlist: Waitlist = {
        name: "Waitlist #1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        email: "test@example.com",
        referralCode: "ref003",
      };

      const created = await createWaitlistEntry(dependencies, waitlist);
      const removed = await removeWaitlistEntry(dependencies, created.id);
      const returned = await fetchWaitlistEntry(dependencies, created.id);

      expect(removed.deletedId).toBe(created.id);
      expect(returned).toBeUndefined();
    });

    test("should set the waitlist release date", async () => {
      const waitlist: Waitlist = {
        name: "Waitlist #1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        email: "test@example.com",
        referralCode: "ref003",
      };

      const created = await createWaitlistEntry(dependencies, waitlist);

      expect(created.releaseDate).toBeNull();

      const updated = await updateWaitlistEntry(dependencies, created.id, {
        releaseDate: addDays(new Date(), 7),
      });

      expect(updated.id).toBe(created.id);
      expect(updated.name).toBe(waitlist.name);
      expect(updated.description).toBe(waitlist.description);
      expect(updated.email).toBe(waitlist.email);
      expect(updated.referralCode).not.toBeUndefined();
      expect(updated.referralCode).toBe(waitlist.referralCode!);
      expect(updated.releaseDate).toBeDefined();
    });

    test.each<NonNullable<Waitlist["status"]>>(["cancelled", "released"])(
      "should change waitlist status to %p",
      async (status) => {
        const waitlist: Waitlist = {
          name: "Waitlist #1",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          email: "test@example.com",
          referralCode: "ABC123",
          status: "pending",
        };
        const created = await createWaitlistEntry(dependencies, waitlist);

        const updated = await updateWaitlistEntry(dependencies, created.id, {
          status,
        });

        expect(updated.id).toBe(created.id);
        expect(updated.name).toBe(waitlist.name);
        expect(updated.description).toBe(waitlist.description);
        expect(updated.email).toBe(waitlist.email);
        expect(updated.referralCode).not.toBeUndefined();
        expect(updated.referralCode).toBe(waitlist.referralCode!);
        expect(updated.status).toBe(status);
      },
    );

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
    test("should generate a waitlist entry with a unique referral code if not provided", async () => {
      const noOfWaitlist = 500;
      const waitlistList = [...Array(noOfWaitlist).keys()].map(
        (key) =>
          ({
            name: `Waitlist #${key}`,
            email: `waitlist${key}@example.com`,
            releaseDate: new Date(),
            description: `Description #${key}`,
          }) satisfies Waitlist,
      );

      const waitlistFromDB = await Promise.all(
        waitlistList.map((waitlist) =>
          createWaitlistEntry(dependencies, waitlist),
        ),
      );

      waitlistFromDB
        .map((waitlist) => waitlist.referralCode)
        .forEach((code, idx, arr) => {
          const contains = arr
            .filter((_, otherIdx) => otherIdx != idx)
            .some((otherCode) => code == otherCode);
          expect(contains).not.toBeTrue();
        });
    });
    test("should generate a unique referral code", async () => {
      const numberOfCodes = 5000;
      const codes = await Promise.all(
        [...Array(numberOfCodes).keys()].map(() =>
          generateWaitlistReferralCode(),
        ),
      );

      codes.forEach((code, codePos, arr) => {
        const contains = arr
          .filter((_, otherCodePos) => codePos != otherCodePos)
          .some((otherCode) => code == otherCode);
        expect(contains).not.toBeTrue();
      });

      const code = await generateWaitlistReferralCode();

      expect(code).toBeString();
      expect(code).toHaveLength(10);
    });
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
