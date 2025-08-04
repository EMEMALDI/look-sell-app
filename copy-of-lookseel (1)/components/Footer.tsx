
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/20 backdrop-blur-md border-t border-white/10 mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} LookSeel. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;