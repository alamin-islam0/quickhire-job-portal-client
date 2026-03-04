import { Menu } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import Container from './Container';

const navLinkClass = 'text-[13px] font-medium text-[#1f2f52] transition hover:text-[#4640de]';

export default function Navbar() {
  return (
    <header className="bg-[#f3f4f8] py-3 sm:py-5">
      <Container className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 sm:gap-12">
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#4640de] text-[12px] font-bold text-white">
              Q
            </span>
            <span className="text-[20px] font-extrabold tracking-tight text-[#202430] sm:text-[30px]">QuickHire</span>
          </Link>
          <nav className="hidden items-center gap-5 md:flex">
            <NavLink to="/" end className={navLinkClass}>
              Find Jobs
            </NavLink>
            <a href="#" className={navLinkClass}>
              Browse Companies
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-5">
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#5d647d] sm:hidden"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
          <a href="#" className="hidden text-[13px] font-semibold text-[#3f49d8] transition hover:text-[#2d34b3] sm:inline">
            Login
          </a>
          <Link
            to="/admin"
            className="hidden h-9 items-center rounded-none bg-[#4640de] px-4 text-[12px] font-semibold text-white transition hover:bg-[#3a34c9] sm:inline-flex sm:h-10 sm:px-6 sm:text-[13px]"
          >
            Sign Up
          </Link>
        </div>
      </Container>
    </header>
  );
}
