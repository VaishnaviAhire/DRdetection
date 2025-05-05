const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-2">EyeCheck - Educational Demo © {new Date().getFullYear()}</p>
        <p className="text-sm text-neutral-300">Not for clinical use</p>
      </div>
    </footer>
  );
};

export default Footer;
