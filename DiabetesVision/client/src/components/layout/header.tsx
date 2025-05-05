import { Link, useLocation } from "wouter";
import EyeIcon from "@/components/ui/eye-icon";

const Header = () => {
  const [location] = useLocation();

  return (
    <header className="relative">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NiIgaGVpZ2h0PSIxMDAiPgo8cmVjdCB3aWR0aD0iNTYiIGhlaWdodD0iMTAwIiBmaWxsPSIjZjhkMWNjIj48L3JlY3Q+CjxwYXRoIGQ9Ik0yOCA2NkwwIDUwTDAgMTZMMjggMEw1NiAxNkw1NiA1MEwyOCA2NkwyOCAxMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIj48L3BhdGg+CjxwYXRoIGQ9Ik0yOCAwTDI4IDM0TDAgNTBMMCA4NEwyOCAxMDBMNTYgODRMNTYgNTBMMjggMzQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIj48L3BhdGg+Cjwvc3ZnPg==')] opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-5">
        <div className="flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center gap-3 hover:cursor-pointer group">
              <div className="bg-white p-3 rounded-full shadow-md group-hover:shadow-lg transition-all duration-300 backdrop-blur-lg">
                <EyeIcon className="text-primary h-7 w-7" />
              </div>
              <div>
                <h1 className="text-xl md:text-3xl font-bold tracking-tight text-white drop-shadow-md">
                  Eye<span className="text-accent font-black">Check</span>
                </h1>
                <p className="text-white/70 text-xs md:text-sm tracking-wide">Advanced Retinopathy Detection</p>
              </div>
            </div>
          </Link>
          
          <nav className="backdrop-blur-sm bg-white/10 px-6 py-3 rounded-full shadow-lg">
            <ul className="flex space-x-8">
              <li>
                <Link href="/">
                  <div className={`text-white hover:text-accent transition-all duration-300 font-medium relative ${
                    location === '/' ? 'after:content-[""] after:absolute after:h-[3px] after:w-full after:bg-accent after:bottom-[-5px] after:left-0 after:rounded-full' : ''
                  }`}>
                    Home
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <div className={`text-white hover:text-accent transition-all duration-300 font-medium relative ${
                    location === '/about' ? 'after:content-[""] after:absolute after:h-[3px] after:w-full after:bg-accent after:bottom-[-5px] after:left-0 after:rounded-full' : ''
                  }`}>
                    About
                  </div>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
