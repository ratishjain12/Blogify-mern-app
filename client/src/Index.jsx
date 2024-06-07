import { ArrowRight, InstagramIcon, LinkedinIcon, Youtube } from "lucide-react";
import heroImg from "./assets/hero-image.png";
import test1 from "./assets/test1.avif";
import test2 from "./assets/test2.avif";
import test3 from "./assets/test3.avif";
import test4 from "./assets/test4.avif";
import test5 from "./assets/test5.avif";
import { useNavigate } from "react-router-dom";
function Index() {
  const navigate = useNavigate();
  return (
    <div className="relative w-full">
      <div className="hero mt-20 md:mt-30 w-full flex flex-col justify-center items-center p-6">
        <div className="bg-[#2a2727] rounded-md p-6">
          <img
            src={heroImg}
            alt="landing image"
            className="md:w-[700px] lg:w-[820px] max-h-[420px] shadow-lg"
          />
        </div>
        <h2 className="text-2xl font-bold mt-4 sm:text-4xl md:text-5xl">
          Effortless Publishing
        </h2>
        <p className="sm:text-md md:text-lg text-gray-400 text-center ">
          Blogging platform for Developer Community
        </p>

        <button
          className="bg-white flex items-center gap-2 text-black px-2 py-2 rounded-lg mt-3 text-lg font-semibold"
          onClick={() => navigate("/blogs")}
        >
          Get Started
          <ArrowRight size={18} className="" />
        </button>
      </div>
      <div className="md:w-[90%] mt-10 mx-auto grid auto-rows-[210px] sm:auto-rows-[230px] sm:grid-cols-3 md:grid-cols-4 gap-4 p-6">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`shadow-lg relative row-span-1 rounded-xl border-2 border-slate-400/10  p-6 bg-neutral-900 ${
              i === 0 ? "sm:col-span-3 md:col-span-2" : ""
            }${i === 1 || i == 4 ? "sm:col-span-2" : ""}`}
          >
            {i == 0 && (
              <div>
                <p className="text-lg font-thin sm:font-medium ">
                  “The freeCodeCamp community makes heavy use of Blogify&apos;s
                  publishing workflow to collaborate on books and tutorials.”
                </p>
                <div className="absolute bottom-2 w-full flex justify-between items-center">
                  <div>
                    <p className="font-bold text-md sm:text-lg">
                      Quincy Larson
                    </p>
                    <p className="text-xs sm:text-sm text-slate-400">
                      Founder, FreeCodeCamp
                    </p>
                  </div>
                  <div>
                    <img src={test1} className="w-10 rounded-md mr-8" />
                  </div>
                </div>
              </div>
            )}
            {i == 1 && (
              <div>
                <p className="text-lg font-thin sm:font-medium ">
                  “Blogify is incredibly easy to integrate into existing CMS.”
                </p>
                <div className="absolute w-full bottom-2 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-md sm:text-lg">Amy Dutton</p>
                    <p className="text-xs sm:text-sm text-slate-400">
                      Lead Maintainer Core Team, Redwoodjs
                    </p>
                  </div>
                  <div>
                    <img src={test2} className="w-10 rounded-md mr-8" />
                  </div>
                </div>
              </div>
            )}
            {i == 2 && (
              <div>
                <p className="text-md font-thin sm:font-medium">
                  “Setting up a base blog for our company was super easy.”
                </p>
                <div className="absolute w-full items-center bottom-2 flex justify-between">
                  <div>
                    <p className="font-bold text-md sm:text-sm">
                      Chris Battarbee
                    </p>
                    <p className="text-xs sm:text-sm text-slate-400">
                      CEO, Metoro
                    </p>
                  </div>
                  <div>
                    <img src={test3} className="w-10 rounded-md mr-8" />
                  </div>
                </div>
              </div>
            )}
            {i == 3 && (
              <div>
                <p className="text-md font-thin sm:font-medium">
                  “It took a single developer an afternoon to integrate. ”
                </p>
                <div className="absolute  w-full bottom-2 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-md sm:text-sm">
                      Kevin Van Gundy
                    </p>
                    <p className="text-xs sm:text-sm text-slate-400">
                      CEO, Hypermode
                    </p>
                  </div>
                  <div>
                    <img src={test4} className="w-10 rounded-md mr-8" />
                  </div>
                </div>
              </div>
            )}
            {i == 4 && (
              <div>
                <p className="text-lg font-thin sm:font-medium">
                  “It&apos;s amazing to see how fast devs go from 0 to Blog
                  under a domain they own on Blogify 🤯.”
                </p>
                <div className="absolute w-full bottom-2 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-md sm:text-lg">
                      Guillermo Rauch
                    </p>
                    <p className="text-xs sm:text-sm text-slate-400">
                      CEO, Vercel
                    </p>
                  </div>
                  <div>
                    <img src={test5} className="w-10 rounded-md mr-8" />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="text-3xl sm:text-6xl w-full text-center mt-12">
        <span className="font-serif">Blog anywhere,</span> <br />
        <span className="font-mono text-5xl; italic ">Anyhow.</span>
      </div>
      <div className="footer bg-neutral-900 flex flex-col sm:flex-row border-t-2 sm:items-center justify-between border-slate-400/10 w-full  mt-6 p-10">
        <div className="flex-[0.7]">
          <span className="font-medium text-2xl md:text-4xl">Blogify</span>
          <div className="flex gap-2 mt-3">
            <InstagramIcon className="cursor-pointer" />
            <LinkedinIcon className="cursor-pointer" />
            <Youtube className="cursor-pointer" />
          </div>
          <p className="text-slate-400/50 mt-3">&#169; Blogify 2024</p>
        </div>
        <div className="mt-3  sm:mt-0 space-y-2 sm:space-y-0 flex-1  text-md sm:text-xl text-slate-300 flex flex-col justify-evenly sm:flex-row sm:gap-4  sm:items-center">
          {["Privacy Policy", "Terms", "Code of Conduct"].map((item, i) => {
            return (
              <p key={i} className="cursor-pointer hover:text-white">
                {item}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Index;
