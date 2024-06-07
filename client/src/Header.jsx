import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton, useAuth } from "@clerk/clerk-react";
import { DoorOpen, Scroll } from "lucide-react";
import { PencilLine } from "lucide-react";

function Header() {
  const { isSignedIn } = useAuth();
  return (
    <header className="w-full flex justify-center">
      <div className="w-[90%] sm:w-[60%] md:w-[70%] flex items-center m-2 fixed rounded-full top-0 z-50  gap-3 justify-between p-3 backdrop-filter backdrop-blur-lg bg-opacity-5 bg-gray-200 ">
        <Link to="/" className="logo">
          <span className="text-xl font-semibold bg-black bg-opacity-50 px-3 py-2 font-mono rounded-full">
            Blogify
          </span>
        </Link>
        <nav className="flex items-center gap-2">
          {isSignedIn && (
            <>
              <Link to="/blogs">
                <div className="bg-white  text-black px-2 py-1 font-semibold flex gap-2 items-center  rounded-md">
                  Blogs
                  <Scroll size={18} />
                </div>
              </Link>
              <Link to="/create">
                <div className="bg-black bg-opacity-50 text-white font-semibold flex gap-4 items-center  p-2 rounded-full">
                  <PencilLine size={18} />
                </div>
              </Link>
            </>
          )}

          <SignedOut>
            <Link to="/signin">
              <div className="bg-white font-semibold flex gap-2 items-center text-black p-2 rounded-full px-4">
                Login
                <DoorOpen size={16} />
              </div>
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl={"/"} />
          </SignedIn>
        </nav>
      </div>
    </header>
  );
}
export default Header;
