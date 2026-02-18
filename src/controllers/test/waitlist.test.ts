import { expect, test, describe } from "bun:test";
import { fetchAllWaitlistEntries } from "../waitlist";
import { db, waitlistSeedData } from "@/db/test/db.mock";
import { logger } from "@/lib/test/logger.mock";

describe("waitlist controller", () => {
  test("should return a list of waitlist entries", async () => {
    const result = await fetchAllWaitlistEntries({
      db: db,
      log: logger,
    });

    expect(result).toMatchObject(waitlistSeedData);
  });
});
