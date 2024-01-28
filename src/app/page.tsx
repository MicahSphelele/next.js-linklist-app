import HeroForm from "@/components/forms/hero-form";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "./api/auth/[...nextauth]/route";

const HomePage = async() => {

  const session = await getServerSession(nextAuthOptions);
  
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
        <HeroForm user={session?.user} />
      </section>
    </main>
  );
};

export default HomePage;
