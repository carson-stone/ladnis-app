import fs from 'fs';
import readline from 'readline';
import { Prisma, PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	try {
		const rl = readline.createInterface({
			input: fs.createReadStream(__dirname + '/accounts.jsonl'),
			output: process.stdout,
			terminal: false,
		});
		rl.on('line', async (line) => {
			const user: User = JSON.parse(line);
			const created = new Date(user.created);
			const balance = new Prisma.Decimal(user.balance);
			await prisma.user.create({ data: { ...user, balance, created } });
		});
		rl.on('close', async () => {
			await prisma.$disconnect();
		});
	} catch (e) {
		console.error('error', e);
		await prisma.$disconnect();
	}
}

(async () => {
	await main();
})();
