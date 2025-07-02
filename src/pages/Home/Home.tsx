import BooksSection from "@/components/Home/BooksSection";
import Hero from "@/components/Home/Hero";

const Home = () => {
  return (
    <div>
      <Hero />
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 mx-auto">
        <BooksSection />
      </div>
    </div>
  );
};

export default Home;
