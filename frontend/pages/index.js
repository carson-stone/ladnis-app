import axios from 'axios';
import UserCard from '../components/UserCard';

export default function Home({ users }) {
	const TARGET_BALANCE_TO_PURCHASE = 20000.0;
	const TARGET_CREDIT_TO_PURCHASE = 800;

	function toFullName(first, last) {
		return `${first} ${last}`;
	}

	function formatDollarAmount(amount) {
		var formatter = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		});
		return formatter.format(amount);
	}

	function calculatePurchaseProgress(balance, credit) {
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

	function getFormattedPurchaseProgress(balance, credit) {
		const progress = calculatePurchaseProgress(balance, credit);
		return (progress * 100).toFixed(1) + '%';
	}

	function getPurchaseProgressBar(balance, credit) {
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
			console.error('ooops');
		}
	}

	return (
		<div className='flex flex-col items-center justify-center min-h-screen py-2'>
			<h1 className='text-6xl font-bold text-blue mb-8'>Landis Accounts</h1>

			<div className='space-y-8'>
				{users.map(
					({
						id,
						name_first,
						name_last,
						balance,
						credit,
						email,
						phone,
						picture,
					}) => {
						const fullName = toFullName(name_first, name_last);
						const formattedBalance = formatDollarAmount(balance);
						const purchaseProgress = getFormattedPurchaseProgress(
							balance,
							credit
						);
						const progressBar = getPurchaseProgressBar(balance, credit);

						return (
							<UserCard
								key={id}
								credit={credit}
								phone={phone}
								email={email}
								picture={picture}
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
		return { props: { users } };
	} catch (e) {
		console.error(e);
	}
	return { props: { users: [] } };
}
