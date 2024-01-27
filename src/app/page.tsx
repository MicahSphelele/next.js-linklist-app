
const HomePage = () => {
  return (
    <main>
      <section className="pt-32">
        <div className="max-w-md mb-6">
          <h1 className="text-6xl font-bold">
            Your one link
            <br /> to everything
          </h1>
          <h2 className="text-gray-500 text-xl mt-6">
            Share your links, music, socials profiles, contact info and more on
            one page
          </h2>
        </div>
        <form action="" className="inline-flex items-center shadow-lg shadow-gray/700">
          <span className="bg-white py-4 pl-4">linklist.to/</span>
          <input type="text" placeholder="username" className="py-4 outline-none"/>
          <button type="submit" className="bg-blue-500 text-white py-4 px-6">
            Join for free
          </button>
        </form>
      </section>
    </main>
  );
};

export default HomePage;
