const Footer = () => {
  return (
    <footer className="bg-blue-600 p-4 mt-auto">
      <div className="container mx-auto text-center text-white">
        <p>&copy; 2024 Moh & Ilyes. All rights reserved.</p>
        <p>
          <a href="/privacy" className="hover:text-blue-200">
            Privacy Policy
          </a>

          <a href="/terms" className="hover:text-blue-200 ml-2">
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
