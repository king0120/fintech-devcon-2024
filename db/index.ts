import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
const sqlite = new Database('./db/sqlite.db');
export const db = drizzle(sqlite);

// Db calls being used in the workshop
/**
 *   Transaction Details
 *     const payer = alias(companies, 'payer')
 *     const payee = alias(companies, 'payee')
 *     // We only want to select the first row
 *     const [data] = await db.select().from(transactions)
 *         .leftJoin(payer, eq(transactions.payeeId, payer.id))
 *         .leftJoin(payee, eq(transactions.payerId, payee.id))
 *         .where(eq(transactions.id, transactionId));
 */