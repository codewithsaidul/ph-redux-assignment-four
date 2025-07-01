const Hero = () => {
  return (
    <div
      className="w-full aspect-video h-[60vh] min-[450px]:h-[80vh] flex justify-center items-center mt-32"
      style={{
        backgroundImage: `url(/banner.png)`,
        backgroundPosition: "center",
        backgroundSize: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <div>
            <h1 className="text-5xl min-[450px]:text-7xl min-sm:text-8xl min-md:text-9xl font-bold text-white">
              10 Awesome <span className="text-book-primary">BOOKS</span>
            </h1>
            <p className="text-lg text-gray-200 mt-8">That Changed My Mindset</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
