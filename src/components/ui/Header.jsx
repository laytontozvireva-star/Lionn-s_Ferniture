import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Heart, ShoppingCart, User } from 'lucide-react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'Shop', to: '/shop' },
    { name: 'Custom Furniture', to: '/custom-furniture' },
    { name: 'About', to: '/about' },
    { name: 'Contact', to: '/contact' },
  ];

  const getNavLinkClass = ({ isActive }) => 
    `relative font-medium transition-all duration-300 hover:-translate-y-0.5 inline-block ${
      isActive ? 'text-[#b38947]' : 'text-[#101726] hover:text-[#b38947]'
    }`;

  const getMobileNavLinkClass = ({ isActive }) => 
    `block relative font-medium transition-all duration-300 hover:-translate-y-0.5 ${
      isActive ? 'text-[#b38947]' : 'text-[#101726] hover:text-[#b38947]'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#e5e5e5] shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.jpg" alt="Lion's Furnitures Logo" className="h-20 md:h-24 w-auto object-contain mix-blend-multiply" />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={getNavLinkClass}
              end={link.to === '/'}
            >
              {link.name}
            </NavLink>
          ))}

          {/* Icon links */}
          <NavLink
            to="/wishlist"
            className={getNavLinkClass}
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
          </NavLink>
          <NavLink
            to="/cart"
            className={getNavLinkClass}
            aria-label="Cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </NavLink>
          <NavLink
            to="/account"
            className={getNavLinkClass}
            aria-label="Account"
          >
            <User className="w-5 h-5" />
          </NavLink>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center text-[#101726] focus-visible:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <nav className="md:hidden bg-white border-t border-[#e5e5e5]">
          <ul className="flex flex-col space-y-2 p-4">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={getMobileNavLinkClass}
                  onClick={() => setMobileOpen(false)}
                  end={link.to === '/'}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
            <li className="flex space-x-4 pt-2">
              <NavLink
                to="/wishlist"
                className={getNavLinkClass}
                aria-label="Wishlist"
                onClick={() => setMobileOpen(false)}
              >
                <Heart className="w-5 h-5" />
              </NavLink>
              <NavLink
                to="/cart"
                className={getNavLinkClass}
                aria-label="Cart"
                onClick={() => setMobileOpen(false)}
              >
                <ShoppingCart className="w-5 h-5" />
              </NavLink>
              <NavLink
                to="/account"
                className={getNavLinkClass}
                aria-label="Account"
                onClick={() => setMobileOpen(false)}
              >
                <User className="w-5 h-5" />
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
