import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Heavy Notation",
};

const HomePage = () => {
  return (
    <main className="min-h-screen w-full py-24">
      <div className="mx-auto flex max-w-3xl flex-col gap-y-4">
        <p>Home Page</p>
      </div>
    </main>
  );
};

export default HomePage;
