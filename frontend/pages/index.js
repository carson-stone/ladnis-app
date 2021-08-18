import { useState } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js';
import UserCard from '../components/UserCard';

export const TARGET_BALANCE_TO_PURCHASE = 20000.0;
export const TARGET_CREDIT_TO_PURCHASE = 800;

export function formatDollarAmount(amount) {
	var formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	});
	return formatter.format(amount);
}

export function calculatePurchaseProgress(balance, credit) {
	if (balance > TARGET_BALANCE_TO_PURCHASE) {
		balance = TARGET_BALANCE_TO_PURCHASE;
	}
	if (credit > TARGET_CREDIT_TO_PURCHASE) {
		credit = TARGET_CREDIT_TO_PURCHASE;
	}
	const balanceProgress =
		Number.parseFloat(balance) / TARGET_BALANCE_TO_PURCHASE;
	const creditProgress = credit / TARGET_CREDIT_TO_PURCHASE;
	return (balanceProgress + creditProgress) / 2;
}

export function getFormattedPurchaseProgress(balance, credit) {
	const progress = calculatePurchaseProgress(balance, credit);
	return (progress * 100).toFixed(1) + '%';
}

export function toFullName(first, last) {
	return `${first} ${last}`;
}

export function getPurchaseProgressBar(balance, credit) {
	const progress = calculatePurchaseProgress(balance, credit);
	if (progress < 0.1) {
		return (
			<div className='absolute bottom-0 left-0 rounded-xl bg-green w-[0%] h-1'></div>
		);
	} else if (0.1 <= progress && progress < 0.2) {
		return (
			<div className='absolute bottom-0 left-0 rounded-xl bg-green w-[10%] h-1'></div>
		);
	} else if (0.2 <= progress && progress < 0.3) {
		return (
			<div className='absolute bottom-0 left-0 rounded-xl bg-green w-[20%] h-1'></div>
		);
	} else if (0.3 <= progress && progress < 0.4) {
		return (
			<div className='absolute bottom-0 left-0 rounded-xl bg-green w-[30%] h-1'></div>
		);
	} else if (0.4 <= progress && progress < 0.5) {
		return (
			<div className='absolute bottom-0 left-0 rounded-xl bg-green w-[40%] h-1'></div>
		);
	} else if (0.5 <= progress && progress < 0.6) {
		return (
			<div className='absolute bottom-0 left-0 rounded-xl bg-green w-[50%] h-1'></div>
		);
	} else if (0.6 <= progress && progress < 0.7) {
		return (
			<div className='absolute bottom-0 left-0 rounded-xl bg-green w-[60%] h-1'></div>
		);
	} else if (0.7 <= progress && progress < 0.8) {
		return (
			<div className='absolute bottom-0 left-0 rounded-xl bg-green w-[70%] h-1'></div>
		);
	} else if (0.8 <= progress && progress < 0.9) {
		return (
			<div className='absolute bottom-0 left-0 rounded-xl bg-green w-[80%] h-1'></div>
		);
	} else if (0.9 <= progress && progress < 1.0) {
		return (
			<div className='absolute bottom-0 left-0 rounded-xl bg-green w-[90%] h-1'></div>
		);
	} else if (progress === 1.0) {
		return (
			<div className='absolute bottom-0 left-0 rounded-xl bg-green w-[100%] h-1'></div>
		);
	} else {
		console.error('invalid range');
	}
}

export default function Home({ users }) {
	function updateSearch(e) {
		setSearchTerm(e.target.value);
	}

	// filter users by name and tags based on search
	const [searchTerm, setSearchTerm] = useState('');
	const searchOptions = {
		includeScore: true,
		keys: ['item.name_first', 'item.name_last', 'item.tags'],
	};
	const fuse = new Fuse(users, searchOptions);
	const filteredUsers =
		searchTerm !== '' ? fuse.search(searchTerm).map(({ item }) => item) : users;

	return (
		<div className='flex flex-col items-center justify-center min-h-screen pt-20 pb-12'>
			<h1 className='text-4xl font-bold text-purple mb-8'>Landis Accounts</h1>

			<input
				className='max-w-[500px] w-2/3 outline-none placeholder-gray-text text-gray-text bg-transparent bg-gray-input rounded-md py-3.5 px-7.5 mb-12'
				placeholder='search by tag or name'
				onChange={updateSearch}
				value={searchTerm}
			/>

			<div className='space-y-12 pb-12'>
				{filteredUsers.map(
					({
						item: {
							id,
							name_first,
							name_last,
							balance,
							credit,
							email,
							phone,
							picture,
							comments,
							employer,
							address,
							tags,
							created,
						},
					}) => {
						const fullName = toFullName(name_first, name_last);
						const formattedBalance = formatDollarAmount(balance);
						const purchaseProgress = getFormattedPurchaseProgress(
							balance,
							credit
						);
						const progressBar = getPurchaseProgressBar(balance, credit);
						const details = { address, employer, tags, created };

						return (
							<UserCard
								key={id}
								credit={credit}
								phone={phone}
								email={email}
								picture={picture}
								comments={comments}
								details={details}
								name={fullName}
								balance={formattedBalance}
								purchaseProgress={purchaseProgress}
								progressBar={progressBar}
							/>
						);
					}
				)}
			</div>
		</div>
	);
}

export async function getServerSideProps() {
	try {
		const { data: users } = await axios.get(`${process.env.API_URL}/api/users`);
		const usersArray = users.map((user) => ({ item: user }));
		return { props: { users: usersArray } };
	} catch (e) {
		console.error(e);
	}
	return { props: { users: [] } };
}
