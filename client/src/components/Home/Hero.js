import Link from 'next/link';

export default function Hero() {
  return (
    <div className="bg-indigo-800 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Connecting Textile Manufacturers with Skilled Gig Workers</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Streamline your textile production with our platform that connects manufacturers with vetted gig workers.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/register/manufacturer">
            <span className="bg-white text-indigo-700 px-6 py-3 rounded-md font-medium cursor-pointer">
              Iam a Manufacturer
            </span>
          </Link>
          <Link href="/register/worker">
            <span className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium cursor-pointer">
              Iam a Gig Worker 
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}