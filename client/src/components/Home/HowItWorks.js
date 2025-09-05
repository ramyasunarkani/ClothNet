import { CiUser } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import { LuMessageSquareMore } from "react-icons/lu";

export default function HowItWorks() {
  const steps = [
    {
      title: "1. Create Your Profile",
      description: "Manufacturers set up factory details and requirements. Workers showcase their skills and experience.",
      icon: <CiUser className="h-6 w-6 text-white" />
    },
    {
      title: "2. Post or Browse Jobs",
      description: "Manufacturers post available jobs with details. Workers browse opportunities that match their skills.",
      icon: <IoSearchOutline className="h-6 w-6 text-white" />
    },
    {
      title: "3. Connect & Get Notified",
      description: "Workers apply to jobs, and manufacturers receive instant WhatsApp notifications for applications.",
      icon: <LuMessageSquareMore className="h-6 w-6 text-white" />
    }
  ];

  return (
    <div  className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How MiniMarketPlace Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow text-center">
              <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}