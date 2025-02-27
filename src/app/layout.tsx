import "./globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

const RootLayout = ({ children }: Props) => {
  return children;
};

export default RootLayout;
