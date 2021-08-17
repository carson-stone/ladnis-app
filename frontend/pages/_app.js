import Head from 'next/head';
import Footer from '../components/Footer';
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Landis Accounts</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className='flex flex-col w-full min-h-screen'>
				<main className=' flex-1 px-20'>
					<Component {...pageProps} />
				</main>
				<Footer />
			</div>
		</>
	);
}

export default MyApp;
