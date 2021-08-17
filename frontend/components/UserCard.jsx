export default function UserCard({
	picture,
	phone,
	name,
	email,
	balance,
	credit,
	purchaseProgress,
	progressBar,
}) {
	console.log('name', name);
	return (
		<div className='min-w-[600px] shadow-md rounded-lg'>
			<div className='flex justify-between items-center space-x-6 bg-white px-10 py-2'>
				<div className='flex items-center space-x-7'>
					<img src={picture} alt={name} className='rounded-full w-20 h-20' />
					<p className='text-xl text-purple font-bold max-w-xs'>{name}</p>
				</div>
				<div className='flex flex-col items-end'>
					<a href={`tel:${phone}`} className='text-purple underline'>
						{phone}
					</a>
					<a href={`mailto:${email}`} className='text-purple underline'>
						{email}
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
						<p className='text-purple'>{balance}</p>
						<p className='text-purple'>{credit}</p>
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
}
