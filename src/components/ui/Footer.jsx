import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaArrowUp } from 'react-icons/fa';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#101726] text-gray-300 border-t border-white/10">
      {/* ── Top section: 3-column grid ── */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Column 1 – Brand */}
        <div className="md:pr-8">
          <h3 className="text-white text-lg font-bold tracking-wide mb-4">
            LION'S FURNITURES
          </h3>
          <p className="text-sm leading-relaxed">
            Handcrafted, premium furniture designed to elevate every room in your
            home. Quality you can see and feel.
          </p>
        </div>

        {/* Column 2 – Quick Links */}
        <div>
          <h4 className="text-[#b38947] font-semibold uppercase text-sm tracking-wider mb-4">
            Quick Links
          </h4>
          <nav aria-label="Footer navigation">
            <ul className="space-y-2 text-sm">
              {[
                { to: '/', label: 'Home' },
                { to: '/shop', label: 'Shop' },
                { to: '/about', label: 'About Us' },
                { to: '/custom-furniture', label: 'Custom Furniture' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="hover:text-[#b38947] transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Column 3 – Contact Info */}
        <div>
          <h4 className="text-[#b38947] font-semibold uppercase text-sm tracking-wider mb-4">
            Contact Us
          </h4>
          <ul className="space-y-2 text-sm">
            <li>📍 123 Main Street, City</li>
            <li>
              📞{' '}
              <a
                href="tel:5551234567"
                className="hover:text-[#b38947] transition-colors"
              >
                (555) 123-4567
              </a>
            </li>
            <li>
              ✉️{' '}
              <a
                href="mailto:hello@lionsfurnitures.com"
                className="hover:text-[#b38947] transition-colors"
              >
                hello@lionsfurnitures.com
              </a>
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full border border-gray-500 flex items-center justify-center hover:bg-[#b38947] hover:border-[#b38947] hover:text-white transition-all duration-200"
            >
              <FaFacebookF size={14} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-gray-500 flex items-center justify-center hover:bg-[#b38947] hover:border-[#b38947] hover:text-white transition-all duration-200"
            >
              <FaInstagram size={14} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="w-9 h-9 rounded-full border border-gray-500 flex items-center justify-center hover:bg-[#b38947] hover:border-[#b38947] hover:text-white transition-all duration-200"
            >
              <FaTwitter size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Lion's Furnitures. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="w-9 h-9 rounded-full border border-gray-500 flex items-center justify-center hover:bg-[#b38947] hover:border-[#b38947] hover:text-white transition-all duration-200"
          >
            <FaArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
