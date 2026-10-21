import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const listings = sqliteTable('listings', {id:text('id').primaryKey(),data:text('data').notNull(),status:text('status').notNull().default('pending'),createdAt:text('created_at').notNull()});
export const posts = sqliteTable('posts', {id:text('id').primaryKey(),data:text('data').notNull(),status:text('status').notNull().default('draft'),createdAt:text('created_at').notNull()});
export const rateLimits = sqliteTable('rate_limits', {key:text('key').primaryKey(),count:integer('count').notNull(),expires:integer('expires').notNull()});
