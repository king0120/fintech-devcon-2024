import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import {Doc} from "@/db/types";

export const companies = sqliteTable('companies', {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    address: text('address').notNull(),
    accountNumber: text('accountNumber').notNull(),
    routingNumber: text('routingNumber').notNull(),
    balance: integer('balance').notNull(),
    maskedAccountNumber: text('maskedAccountNumber').notNull(),
    accountName: text('accountName').notNull(),
    type: text('type').notNull(),
});
export type Company = Doc<'companies'>;

export const transactions = sqliteTable('transactions', {
    id: integer('id').primaryKey(),
    payerId: integer('payerId').notNull().references(() => companies.id),
    payeeId: integer('payeeId').notNull().references(() => companies.id),
    description: text('description').notNull(),
    amount: integer('amount').notNull(),
    facilitatorFee: integer('facilitatorFee').notNull(),
    status: text('status').notNull(),
    dateInitiated: text('dateInitiated').notNull(),
    dateCompleted: text('dateCompleted'),
});
export type Transaction = Doc<'transactions'>;