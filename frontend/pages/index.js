import axios from 'axios';

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
				{users.map((user) => {
					const fullName = toFullName(user.name_first, user.name_last);
					const formattedBalance = formatDollarAmount(user.balance);
					const purchaseProgress = getFormattedPurchaseProgress(
						user.balance,
						user.credit
					);
					const progressBar = getPurchaseProgressBar(user.balance, user.credit);

					return (
						<div key={user.id} className='min-w-[600px] shadow-md rounded-lg'>
							<div className='flex justify-between items-center space-x-6 bg-white px-10 py-2'>
								<div className='flex items-center space-x-7'>
									<img
										src={user.picture}
										alt={fullName}
										className='rounded-full w-20 h-20'
									/>
									<p className='text-xl text-purple font-bold max-w-xs'>
										{fullName}
									</p>
								</div>
								<div className='flex flex-col items-end'>
									<a
										href={`tel:${user.phone}`}
										className='text-purple underline'
									>
										{user.phone}
									</a>
									<a
										href={`mailto:${user.email}`}
										className='text-purple underline'
									>
										{user.email}
									</a>
								</div>
							</div>
							<div className='flex justify-between px-24 py-12 bg-purple-light'>
								<div className='flex space-x-8 border-r border-gray pr-16'>
									<div className='flex flex-col space-y-8'>
										<p className='text-purple font-bold'>Balance</p>
										<p className='text-purple font-bold'>Credit</p>
										<p className='text-purple font-bold'>Purchase Progress</p>
									</div>
									<div className='relative flex flex-col items-end space-y-8'>
										<p className='text-purple'>{formattedBalance}</p>
										<p className='text-purple'>{user.credit}</p>
										<p className='text-purple'>{purchaseProgress}</p>
										<div className='absolute -bottom-2'>
											<div className='relative w-14 h-1'>
												<div className='absolute bottom-0 left-0 rounded-xl bg-gray w-full h-1'></div>
												{progressBar}
											</div>
										</div>
									</div>
								</div>
								<div className='flex flex-col justify-between pl-16'>
									<div className='text-center text-white bg-blue rounded-md py-3.5 px-7.5'>
										Comments
									</div>
									<div className='text-center text-blue bg-transparent border-blue border rounded-md py-3.5 px-7.5'>
										Details
									</div>
								</div>
							</div>
						</div>
					);
				})}
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
