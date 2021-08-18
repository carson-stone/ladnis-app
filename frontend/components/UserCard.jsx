import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import Button from './Button';

export default function UserCard({
	navigateToUserPage = true,
	id,
	picture,
	phone,
	name,
	email,
	balance,
	credit,
	purchaseProgress,
	progressBar,
	comments,
	details,
}) {
	const router = useRouter();

	function goToUser() {
		router.push(`/users/${id}`);
	}

	function showComments() {
		toggleComments(true);
	}

	function hideComments() {
		toggleComments(false);
	}

	function showDetails() {
		toggleDetails(true);
	}

	function hideDetails() {
		toggleDetails(false);
	}

	const [showingComments, toggleComments] = useState(false);
	const [showingDetails, toggleDetails] = useState(false);
	const { address, employer, tags, created } = details;
	const formattedCreated = new Date(created).toLocaleString();

	return (
		<div className='min-w-[600px] shadow-md rounded-lg'>
			{showingComments && (
				<div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-[480px] min-h-[416px] max-h-[550px] bg-white shadow-md rounded-lg overflow-scroll'>
					<div className='flex flex-col px-12 py-8'>
						<p className='text-xl text-purple font-bold mb-6'>{name}</p>
						<p className='text-purple font-bold mb-3'>Comments</p>
						<p className='flex-1 text-purple mb-12'>{comments}</p>
						<Button text='Close' onClick={hideComments} />
					</div>
				</div>
			)}
			{showingDetails && (
				<div className='flex flex-col fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-[480px] min-h-[416px] max-h-[550px] bg-white shadow-md rounded-lg overflow-scroll'>
					<div className='flex-1 flex flex-col px-12 py-8'>
						<p className='text-xl text-purple font-bold mb-6'>{name}</p>
						<div className='flex-1 text-purple mb-12 space-y-4'>
							<div className='space-y-1'>
								<p className='font-bold'>Address</p>
								<p>{address}</p>
							</div>
							<div className='space-y-1'>
								<p className='font-bold'>Employer</p>
								<p>{employer}</p>
							</div>
							<div className='space-y-1'>
								<p className='font-bold'>Created</p>
								<p>{formattedCreated}</p>
							</div>
							<div className='space-y-1'>
								<p className='font-bold'>Tags</p>
								<p>{tags.join(', ')}</p>
							</div>
						</div>
						<Button text='Close' onClick={hideDetails} />
					</div>
				</div>
			)}
			{navigateToUserPage ? (
				<div
					className='flex justify-between items-center space-x-6 bg-white px-10 py-2'
					onClick={goToUser}
				>
					<div className='cursor-pointer flex items-center space-x-7'>
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
			) : (
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
			)}
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
					<Button onClick={showComments} text='Comments' />
					<Button onClick={showDetails} text='Details' secondary />
				</div>
			</div>
		</div>
	);
}
