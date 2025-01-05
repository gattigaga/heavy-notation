import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Heavy Notation",
};

const DashboardPage = () => {
  return (
    <main className="w-full min-h-screen py-24">
      <div className="max-w-3xl mx-auto flex flex-col gap-y-4">
        <p>Home Page</p>
      </div>
    </main>
  );
};

export default DashboardPage;
