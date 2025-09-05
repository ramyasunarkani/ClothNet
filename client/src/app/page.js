// pages/index.js
import Header from '../components/Layout/Header';
import Hero from '../components/Home/Hero';
import HowItWorks from '../components/Home/HowItWorks';
import Footer from '../components/Layout/Footer';


export default function Home() {
  console.log(process.env.NEXT_PUBLIC_API_BASE_URL);
  return (
    <div className="min-h-screen bg-white">
     
      <Header />
      <Hero />
      <HowItWorks />
      <Footer />
    </div>
  );
}