import { Router } from 'express';
import { PrismaClient } from '.prisma/client';
import { Decimal } from '@prisma/client/runtime';

const TARGET_BALANCE_TO_PURCHASE = 20000.0;
const TARGET_CREDIT_TO_PURCHASE = 800;

export function calculatePurchaseProgress(balance: number, credit: number) {
	if (balance > TARGET_BALANCE_TO_PURCHASE) {
		balance = TARGET_BALANCE_TO_PURCHASE;
	}
	if (credit > TARGET_CREDIT_TO_PURCHASE) {
		credit = TARGET_CREDIT_TO_PURCHASE;
	}
	const balanceProgress = balance / TARGET_BALANCE_TO_PURCHASE;
	console.log('balanceProgress', balanceProgress);
	const creditProgress = credit / TARGET_CREDIT_TO_PURCHASE;
	return (balanceProgress + creditProgress) / 2;
}

const prisma = new PrismaClient();
const router = Router();

router.get('/', async (_, res) => {
	try {
		const averageBalance = await prisma.user.aggregate({
			_avg: { balance: true },
		});
		const averageCredit = await prisma.user.aggregate({
			_avg: { credit: true },
		});
		const highestBalance = (
			await prisma.user.findMany({
				orderBy: { balance: 'desc' },
				take: 1,
				select: {
					balance: true,
					credit: true,
					id: true,
					name_first: true,
					name_last: true,
				},
			})
		)[0];
		const lowestBalance = (
			await prisma.user.findMany({
				orderBy: { balance: 'asc' },
				take: 1,
				select: {
					balance: true,
					credit: true,
					id: true,
					name_first: true,
					name_last: true,
				},
			})
		)[0];
		const highestCredit = (
			await prisma.user.findMany({
				orderBy: { credit: 'desc' },
				take: 1,
				select: {
					balance: true,
					credit: true,
					id: true,
					name_first: true,
					name_last: true,
				},
			})
		)[0];
		const lowestCredit = (
			await prisma.user.findMany({
				orderBy: { credit: 'asc' },
				take: 1,
				select: {
					balance: true,
					credit: true,
					id: true,
					name_first: true,
					name_last: true,
				},
			})
		)[0];

		const users = await prisma.user.findMany();

		let highestProgressAmount = 0.0;
		let highestProgress = users[0];
		let lowestProgressAmount = 1.0;
		let lowestProgress = users[0];
		const progressPercentageRanges = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

		users.forEach((user) => {
			const progress = calculatePurchaseProgress(
				user.balance.toNumber(),
				user.credit
			);
			if (progress > highestProgressAmount) {
				highestProgressAmount = progress;
				highestProgress = user;
			}
			if (progress < lowestProgressAmount) {
				lowestProgressAmount = progress;
				lowestProgress = user;
			}

			if (progress < 0.1) {
				++progressPercentageRanges[0];
			} else if (0.1 <= progress && progress < 0.2) {
				++progressPercentageRanges[1];
			} else if (0.2 <= progress && progress < 0.3) {
				++progressPercentageRanges[2];
			} else if (0.3 <= progress && progress < 0.4) {
				++progressPercentageRanges[3];
			} else if (0.4 <= progress && progress < 0.5) {
				++progressPercentageRanges[4];
			} else if (0.5 <= progress && progress < 0.6) {
				++progressPercentageRanges[5];
			} else if (0.6 <= progress && progress < 0.7) {
				++progressPercentageRanges[6];
			} else if (0.7 <= progress && progress < 0.8) {
				++progressPercentageRanges[7];
			} else if (0.8 <= progress && progress < 0.9) {
				++progressPercentageRanges[8];
			} else if (0.9 <= progress && progress < 1.0) {
				++progressPercentageRanges[9];
			} else if (progress === 1.0) {
				++progressPercentageRanges[10];
			} else {
				throw new Error('error in analysis');
			}
		});

		res.json({
			progressPercentageRanges,
			highestBalance,
			lowestBalance,
			highestCredit,
			lowestCredit,
			highestProgress,
			lowestProgress,
			averageBalance: averageBalance._avg.balance,
			averageCredit: averageCredit._avg.credit,
		});
	} catch (e) {
		console.error(e);
		res.status(500).json(null);
	} finally {
		await prisma.$disconnect();
	}
});

export default router;
