import { useState } from 'react';
import Link from 'next/link';
import MenuIcon from './MenuIcon';

export default function Header() {
	function showMenu() {
		toggleMenu(true);
	}

	function hideMenu() {
		toggleMenu(false);
	}

	const [showingMenu, toggleMenu] = useState(false);

	return (
		<div className='fixed w-full px-10 py-8'>
			<MenuIcon
				className='stroke-current text-purple cursor-pointer'
				onClick={showingMenu ? hideMenu : showMenu}
			/>
			{showingMenu && (
				<div className='absolute bottom-0 left-0 transform translate-x-1/2 translate-y-2/3 z-10 space-y-4 py-4 px-8 shadow-md bg-white rounded-lg'>
					<div onClick={hideMenu}>
						<Link href='/'>
							<a className='text-purple'>Users</a>
						</Link>
					</div>
					<div onClick={hideMenu}>
						<Link href='/analysis'>
							<a className='text-purple'>Analysis</a>
						</Link>
					</div>
				</div>
			)}
		</div>
	);
}
