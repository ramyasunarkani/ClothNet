import Header from "@/components/Layout/Header";
import PublicRoute from "@/components/PublicRoute";
import RegisterForm from "@/components/RegisterForm";

export default async function Register({ params }) {
  const resolvedParams = await params;

  return (
    <PublicRoute>
      <div className="flex flex-col min-h-screen">
        <Header />

        <div className="flex-1 flex items-center justify-center p-4">
          <RegisterForm role={resolvedParams.role} />
        </div>
      </div>
    </PublicRoute>
  );
}
