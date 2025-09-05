export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 text-center md:text-left">
        
        <p className="text-gray-400 max-w-md">
          Connecting textile manufacturers with skilled gig workers for efficient
          production and employment opportunities.
        </p>

        <div className="mt-4 md:mt-0">
          <p className="text-gray-400">info@clothnet.com</p>
          <p className="text-gray-400">+1 (555) 123-4567</p>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-4 text-sm">
        &copy; 2025 ClothNet. All rights reserved.
      </div>
    </footer>
  );
}
