import Link from "next/link";

const Navbar = () => {
  return (
    <div className="h-14 px-10 xl:mx-52 sm:mx-24 mx-10  mt-5 rounded-xl bg-[#933a3a37] text-white flex items-center justify-center">
      <Link href="/" className="text-2xl font-bold mr-5 hover:text-red-500">
        Typos
      </Link>

      <div className="flex items-center justify-center ml-auto">
        <Link href="/Leaderboard" className="text-xl mr-5 hover:text-red-500">
          Leaderboard
        </Link>

        <Link href="/Profile" className="text-xl mr-5 hover:text-red-500">
          Profile
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
