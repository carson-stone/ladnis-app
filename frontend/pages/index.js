export default function Home({ users }) {
	const TARGET_BALANCE_TO_PURCHASE = 6000.0;
	const TARGET_CREDIT_TO_PURCHASE = 735;

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
		const balanceProgress =
			Number.parseFloat(balance) / TARGET_BALANCE_TO_PURCHASE;
		const creditProgress = credit / TARGET_CREDIT_TO_PURCHASE;
		return balanceProgress + creditProgress / 2;
	}

	function getFormattedPurchaseProgress(balance, credit) {
		const progress = calculatePurchaseProgress(balance, credit);
		return progress.toFixed(1) + '%';
	}

	function getPurchaseProgressBarWidth(balance, credit) {
		const progress = calculatePurchaseProgress(balance, credit);
		return '66px';
		switch (true) {
			case 0.5 <= progress && progress < 0.6:
				return '1/2';
			case 0.6 <= progress && progress < 0.7:
				return '2/3';
			default:
				return 'full';
		}
	}

	return (
		<div className='flex flex-col items-center justify-center min-h-screen py-2'>
			<h1 className='text-6xl font-bold text-blue'>Landis Accounts</h1>

			{users.map((user) => {
				const fullName = toFullName(user.name_first, user.name_last);
				const formattedBalance = formatDollarAmount(user.balance);
				const purchaseProgress = getFormattedPurchaseProgress(
					user.balance,
					user.credit
				);
				console.log('purchaseProgress', purchaseProgress);
				const purchaseProgressBarWidth = `w-[${purchaseProgress}]`;

				return (
					<div key={user.id} className='shadow-md rounded-lg'>
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
								<a href={`tel:${user.phone}`} className='text-purple underline'>
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
						<div className='flex justify-between px-10 py-12 bg-purple-light'>
							<div className='flex space-x-8 border-r border-gray-light pr-16'>
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
											<div className='absolute bottom-0 left-0 bg-gray w-full h-1'></div>
											<div className='absolute bottom-0 left-0 bg-green w-full h-1'></div>
										</div>
									</div>
								</div>
							</div>
							<div className='flex flex-col justify-between pl-16'>
								<div className='text-white bg-blue rounded-md py-3.5 px-7.5'>
									Comments
								</div>
								<div className='text-blue bg-transparent border-blue border rounded-md py-3.5 px-7.5'>
									Comments
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export async function getServerSideProps() {
	const user = {
		id: 'dd4e471d-18f5-413f-99a8-1cb2f8b2df52',
		balance: '1189.44',
		credit: 683,
		picture: 'https://i.pravatar.cc/476',
		name_first: 'Cheri',
		name_last: 'Rice',
		employer: 'Insurety',
		email: 'cheri.rice@insurety.net',
		phone: 7120744246,
		address: '150 Kossuth Place, Aberdeen, Virginia, 4119',
		comments:
			'Id dolor cillum et qui dolor minim. Duis dolore in enim aliqua pariatur esse laboris dolore amet. Labore mollit velit occaecat officia esse cupidatat. Mollit ipsum exercitation irure mollit duis. Nisi exercitation anim tempor nulla irure. Velit sint esse enim exercitation id excepteur nulla id sunt dolore. Ex occaecat incididunt excepteur consequat ea mollit cupidatat sit enim in do cillum pariatur.',
		created: 'Fri May 25 2018 05:57:45 GMT+0000',
		tags: ['ex', 'amet', 'adipisicing'],
	};
	return { props: { users: [user] } };
}
