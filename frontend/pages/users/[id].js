import axios from 'axios';
import {
	toFullName,
	getPurchaseProgressBar,
	formatDollarAmount,
	getFormattedPurchaseProgress,
} from '../index';
import UserCard from '../../components/UserCard';

export default function User({ user }) {
	if (!user) {
		return (
			<div className='flex flex-col items-center justify-start min-h-screen pt-20 pb-12'>
				<h1 className='text-4xl font-bold text-purple mb-8'>Not Found</h1>
			</div>
		);
	}

	const {
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
	} = user;
	const fullName = toFullName(name_first, name_last);
	const formattedBalance = formatDollarAmount(balance);
	const purchaseProgress = getFormattedPurchaseProgress(balance, credit);
	const progressBar = getPurchaseProgressBar(balance, credit);
	const details = { address, employer, tags, created };

	return (
		<div className='flex flex-col items-center justify-start min-h-screen pt-20 pb-12'>
			<h1 className='text-4xl font-bold text-purple mb-16'>{fullName}</h1>

			<UserCard
				balance={formattedBalance}
				credit={credit}
				details={details}
				picture={picture}
				comments={comments}
				email={email}
				phone={phone}
				name={fullName}
				progressBar={progressBar}
				purchaseProgress={purchaseProgress}
			/>
		</div>
	);
}

export async function getServerSideProps({ params }) {
	try {
		const { data: user } = await axios.get(
			`${process.env.API_URL}/api/users/${params.id}`
		);
		return { props: { user } };
	} catch (e) {
		console.error(e);
	}
	return { props: { user: null } };
}
