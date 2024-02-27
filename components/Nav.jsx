"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";

const Nav = () => {
	const { data: session } = useSession();
	const [providers, setProviders] = useState(null);
	const [toggleDropdown, setToggleDropdown] = useState(false);

	useEffect(() => {
		const initializeProviders = async () => {
			const response = await getProviders();
			setProviders(response);
		};

		initializeProviders();
	}, []);

	return (
		<nav className='flex-between w-full mb-16 pt-3'>
			<Link
				href='/'
				className='flex gap-2 flex-center'
			>
				<Image
					src='/assets/images/logo.svg'
					alt='Promtopia Logo'
					className='object-contain'
					width={30}
					height={30}
				/>
				<p className='logo_text'>Promtopia</p>
			</Link>

			{/* Desktop Navigation */}
			<div className='sm:flex hidden'>
				{session?.user ? (
					<div className='flex gap-3 md:gap-5'>
						<Link
							href='/create-prompt'
							className='black_btn'
						>
							Create Post
						</Link>

						<button
							type='button'
							onClick={signOut}
							className='outline_btn'
						>
							Sign Out
						</button>

						<Link href='/profile'>
							<Image
								src={session?.user.image}
								width={37}
								height={37}
								className='rounded-full'
								alt='profile'
							/>
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider, key) => (
								<button
									key={key}
									type='button'
									className='black_btn'
									onClick={() => signIn(provider.id)}
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>

			{/* Mobile Navigation */}
			<div className='sm:hidden flex relative'>
				{session?.user ? (
					<div className='flex'>
						<Image
							src={session?.user.image}
							alt='profile'
							className='rounded-full'
							width={37}
							height={37}
							onClick={() => {
								setToggleDropdown((prev) => !prev);
							}}
						/>

						{toggleDropdown && (
							<div className='dropdown'>
								<Link
									href='/profile'
									className='dropdown_link'
									onClick={() => {
										setToggleDropdown(false);
									}}
								>
									My Profile
								</Link>
								<Link
									href='/create-prompt'
									className='dropdown_link'
									onClick={() => {
										setToggleDropdown(false);
									}}
								>
									Create Prompt
								</Link>
								<button
									typ='button'
									className='mt-5 w-full black_btn'
									onClick={() => {
										setToggleDropdown(false);
										signOut();
									}}
								>
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider, key) => (
								<button
									key={key}
									type='button'
									className='black_btn'
									onClick={() => signIn(provider.id)}
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	);
};

export default Nav;
