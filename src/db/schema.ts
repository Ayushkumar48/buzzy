import { date, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  firstname: varchar({ length: 255 }).notNull(),
  lastname: varchar({ length: 255 }).notNull(),
  username: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
});

export const tasksTable = pgTable("tasks", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: text().notNull(),
  name: text().notNull(),
  description: text(),
  date: date("date").notNull(),
  time: varchar({ length: 255 }).notNull(),
  priority: integer("priority").notNull(),
  saveTo: text().notNull(),
});

export const projectsTable = pgTable("projects", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: text().notNull(),
  name: text().notNull(),
  colorName: text().notNull(),
  color: varchar({ length: 255 }).notNull(),
});
