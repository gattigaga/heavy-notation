import Header from "./components/Header";
import Content from "./components/Content";

const PageDetailPage = async () => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex-1 overflow-y-scroll">
        <div className="min-h-screen w-full py-24">
          <Content />
        </div>
      </div>
    </div>
  );
};

export default PageDetailPage;
