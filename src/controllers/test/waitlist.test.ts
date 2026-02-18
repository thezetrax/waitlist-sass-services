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

    expect(result.length).toBe(waitlistSeedData.length);
    for (const [i, entry] of waitlistSeedData.entries()) {
      const resultEntry = result[i];
      expect(entry.name).toBe(resultEntry.name);
      expect(entry.email).toBe(resultEntry.email);
      expect(entry.referralCode).toBe(resultEntry.referralCode);
    }
  });
});
