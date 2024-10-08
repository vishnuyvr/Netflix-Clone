import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, Search } from "lucide-react";
import { useAuthStore } from "../store/authUser";
import { useContentStore } from "../store/content";

const Navbar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const { user, logout } = useAuthStore();

	const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const { setContentType } = useContentStore();

	return (
		<header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20'>
			<div className='flex items-center gap-10 z-50'>
				<Link to='/'>
					<img src='/netflix-edit-logo.png' alt='Netflix Logo' className='w-32 sm:w-96' />
				</Link>

				{/* desktop navbar items */}
				<div className='hidden sm:flex gap-8 items-center '>
					<Link to='/' className='relative hover:text-red-600 transition duration-300 before:content-[""] before:absolute before:w-full before:h-[2px] before:bg-red-600 before:left-0 before:bottom-0 before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100
                    ' onClick={() => setContentType("movie")}>
						Movies
					</Link>
					<Link to='/' className='relative hover:text-red-600 transition duration-300 before:content-[""] before:absolute before:w-full before:h-[2px] before:bg-red-600 before:left-0 before:bottom-0 before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100'
                     onClick={() => setContentType("tvshow")}>
						Tv Shows
					</Link>
					<Link to='/history' className='relative hover:text-red-600 transition duration-300 before:content-[""] before:absolute before:w-full before:h-[2px] before:bg-red-600 before:left-0 before:bottom-0 before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100'>
						History
					</Link>
				</div>
			</div>

			<div className='flex gap-2 items-center z-50'>
				<Link to={"/search"}>
					<Search className='size-6 cursor-pointer' />
				</Link>
				<img src={user.image} alt='Avatar' className='h-8 rounded cursor-pointer' />
				<LogOut className='size-6 cursor-pointer' onClick={logout} />
				<div className='sm:hidden'>
					<Menu className='size-6 cursor-pointer' onClick={toggleMobileMenu} />
				</div>
			</div>

			{/* mobile navbar items */}
			{isMobileMenuOpen && (
				<div className='w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800 flex flex-col'>
					<Link to={"/"} className='ml-4 relative hover:text-red-600 transition duration-300 before:content-[""] before:absolute before:w-12 before:h-[2px] before:bg-red-600 before:left-0 before:bottom-0 before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100' 
					onClick={toggleMobileMenu}>
						Movies
					</Link>
					<Link to={"/"} className='ml-4 relative hover:text-red-600 transition duration-300 before:content-[""] before:absolute before:w-16 before:h-[2px] before:bg-red-600 before:left-0 before:bottom-0 before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100' 
					onClick={toggleMobileMenu}>
						Tv Shows
					</Link>
					<Link to={"/history"} className='ml-4 relative hover:text-red-600 transition duration-300 before:content-[""] before:absolute before:w-12 before:h-[2px] before:bg-red-600 before:left-0 before:bottom-0 before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100' 
					onClick={toggleMobileMenu}>
						History
					</Link>
				</div>
			)}
		</header>
	);
};
export default Navbar;