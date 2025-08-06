import React from 'react'
import { Button } from "@/components/ui/button";

export default function Navbar() {
	return (
		<nav className='w-full flex items-center mx-auto p-4 bg-background'>
			<div className="flex gap-4">
				<Button
					asChild
					variant="secondary"
					className="text-md group flex w-fit items-center justify-center gap-2 rounded-full px-4 py-1 tracking-tight"
				>
					<a href='/about'>About</a>
				</Button>
				<Button
					variant="default"
					className="text-md group flex w-fit items-center justify-center gap-2 rounded-full px-4 py-1 tracking-tight"
				>
					<a href='/contact'>Documentation</a>
				</Button>
			</div>
		</nav>
	);
}
