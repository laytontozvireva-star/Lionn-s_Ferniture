import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Heart, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#e7dfd4] shadow-[0_1px_0_rgba(16,23,38,0.04)]">
      <div className="hidden md:block bg-[#101726] text-[#f7f1e7]">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-[11px] font-medium tracking-[0.12em] uppercase">
          <span>Made for living beautifully</span>
          <span className="text-[#e3c587]">Complimentary delivery on orders over $500</span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2 md:py-1.5">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.jpg" alt="Lion's Furnitures Logo" className="h-16 md:h-20 w-auto object-contain mix-blend-multiply" />
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
          <NavLink to="/wishlist" className={getNavLinkClass} aria-label={`Wishlist, ${wishlistCount} items`}>
            <span className="relative block"><Heart className="w-5 h-5" />{wishlistCount > 0 && <span className="absolute -right-2.5 -top-2.5 min-w-4 h-4 px-1 grid place-items-center rounded-full bg-[#b38947] text-[9px] text-white">{wishlistCount}</span>}</span>
          </NavLink>
          <NavLink to="/cart" className={getNavLinkClass} aria-label={`Cart, ${cartCount} items`}>
            <span className="relative block"><ShoppingCart className="w-5 h-5" />{cartCount > 0 && <span className="absolute -right-2.5 -top-2.5 min-w-4 h-4 px-1 grid place-items-center rounded-full bg-[#b38947] text-[9px] text-white">{cartCount}</span>}</span>
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
