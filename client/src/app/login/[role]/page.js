import Header from "@/components/Layout/Header";
import PublicRoute from "@/components/PublicRoute";
import LoginForm from "@/components/LoginForm";

export default async function Login({ params }) {
  const resolvedParams = await params;

  return (
    <PublicRoute>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center p-4">
          <LoginForm role={resolvedParams.role} />
        </div>
      </div>
    </PublicRoute>
  );
}
