export default function CustomFooter() {
  return (
    <footer className="bg-white text-gray-600 py-6 px-4 border-t border-gray-200">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Tên công ty và tagline */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold text-gray-800">Your Company Name</h2>
          <p className="text-sm">Your Company Tagline or Slogan</p>
        </div>

        {/* Các liên kết điều hướng */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="/about" className="hover:text-gray-500">About Us</a>
          <a href="/contact" className="hover:text-gray-500">Contact</a>
          <a href="/privacy-policy" className="hover:text-gray-500">Privacy Policy</a>
        </div>

        {/* Bản quyền */}
        <div className="text-center mt-4 md:mt-0">
          <p className="text-sm">© {new Date().getFullYear()} Your Company Name. All Rights Reserved.</p>
        </div>
      </div>
    </footer>

  );
};