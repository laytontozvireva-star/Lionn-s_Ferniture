import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-cream text-umber py-6 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">© 2026 Lion's Furnitures. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link to="/" className="hover:text-olive-500 transition-colors duration-200">Home</Link>
          <Link to="/shop" className="hover:text-olive-500 transition-colors duration-200">Shop</Link>
          <Link to="/contact" className="hover:text-olive-500 transition-colors duration-200">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
