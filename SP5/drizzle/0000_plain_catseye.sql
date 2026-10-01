CREATE TABLE `cities` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`country` text NOT NULL,
	`admin1` text,
	`latitude` real NOT NULL,
	`longitude` real NOT NULL,
	`sort_order` integer NOT NULL,
	`favorite` integer NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `forecast_cache` (
	`city_id` text PRIMARY KEY NOT NULL,
	`temperature` real NOT NULL,
	`condition` text NOT NULL,
	`weather_code` integer,
	`wind_speed` real,
	`hourly_json` text NOT NULL,
	`daily_json` text,
	`synced_at` text NOT NULL
);
