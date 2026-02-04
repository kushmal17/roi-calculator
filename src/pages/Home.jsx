import Navbar from "../components/Navbar";
import ROICalculator from "../components/ROICalculator";
import Footer from "../components/Footer";
import "../styles/roi.css";

const Home = () => {
  return (
    <div className="page-wrapper">
      <Navbar />

      {/* 👇 TEXT SECTION */}
      <div className="info-section">
        <h2>Turn Numbers into Smart Decisions</h2>
        <p>
          Understand how much your investment is really earning.
          Our ROI Calculator gives you a clear picture of returns, helping you plan with confidence and reduce risk.
        </p>
      </div>

      <ROICalculator />

      <Footer />
    </div>
  );
};

export default Home;
