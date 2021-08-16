import { Router } from 'express';
import { PrismaClient } from '.prisma/client';
import { User } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

router.get('/', async (_, res) => {
	try {
		const users = await prisma.user.findMany();
		res.json(users);
	} catch (e) {
		console.error(e);
		res.status(500).json(null);
	} finally {
		await prisma.$disconnect();
	}
});

router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const user = await prisma.user.findUnique({ where: { id } });
		res.json(user);
	} catch (e) {
		console.error(e);
		res.status(500).json(null);
	} finally {
		await prisma.$disconnect();
	}
});

router.post('/', async (req, res) => {
	try {
		const userInput: User = req.body;
		const user = await prisma.user.create({ data: { ...userInput } });
		res.json(user);
	} catch (e) {
		console.error(e);
		res.status(500).json(null);
	} finally {
		await prisma.$disconnect();
	}
});

router.put('/', async (req, res) => {
	try {
		const userInput: User = req.body;
		const user = await prisma.user.update({
			where: { id: userInput.id },
			data: { ...userInput },
		});
		res.json(user);
	} catch (e) {
		console.error(e);
		res.status(500).json(null);
	} finally {
		await prisma.$disconnect();
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const user = await prisma.user.delete({ where: { id } });
		res.json(user);
	} catch (e) {
		console.error(e);
		res.status(500).json(null);
	} finally {
		await prisma.$disconnect();
	}
});

export default router;
