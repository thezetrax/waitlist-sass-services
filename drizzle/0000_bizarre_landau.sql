CREATE TABLE `waitlist` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`referralCode` text NOT NULL,
	`referredBy` text,
	`createdAt` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `waitlist_email_unique` ON `waitlist` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `waitlist_referralCode_unique` ON `waitlist` (`referralCode`);--> statement-breakpoint
CREATE UNIQUE INDEX `email_idx` ON `waitlist` (`email`);