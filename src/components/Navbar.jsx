import logo from "../assets/logo.webp";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="Company Logo" />
      </div>
    </header>
  );
};

export default Navbar;
