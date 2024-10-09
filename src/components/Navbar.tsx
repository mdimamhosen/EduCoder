"use client";
import { NavbarLinks } from "@/data/NavbarLinks";
import { ACCOUNT_TYPE } from "@/utils/roles";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import ProfileDropdown from "./Core/ProfileDropdown";
import { setLoading, setUser } from "@/redux/slices/profileSlice";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const token = session?.user;
  console.log("session", session);

  const { user, loading } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const updateUserState = async () => {
      if (status === "loading") {
        dispatch(setLoading(true));
      } else if (status === "authenticated" && session?.user) {
        dispatch(setLoading(true));
        try {
          // You might want to fetch additional user data here if needed
          dispatch(setUser(session.user));
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          dispatch(setLoading(false));
        }
      } else {
        dispatch(setUser(null));
        dispatch(setLoading(false));
      }
    };

    updateUserState();
  }, [session, status, dispatch]);

  const [subLinks, setSubLinks] = useState([
    { name: "Data Structures", courses: ["Array", "LinkedList", "Tree"] },
    { name: "Algorithms", courses: ["Sorting", "Graph Algorithms"] },
    { name: "Python", courses: ["Basics", "OOP"] },
    { name: "JavaScript", courses: ["ES6", "React"] },
  ]);

  const matchRoute = (route: string) => {
    return pathname === route;
  };

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-gray-300 ${
        pathname !== "/" ? "bg-gray-950" : "bg-gray-900"
      } transition-all duration-300`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <Link href="/">
          <p className="text-2xl font-extrabold leading-8 text-gray-300">
            EduCoder
          </p>
        </Link>

        {/* Navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 ">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog")
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-gray-700 p-4 text-gray-300 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-gray-700"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks && subLinks.length ? (
                          subLinks.map((subLink, i) => (
                            <div key={i}>
                              <p className="font-semibold text-gray-300">
                                {subLink.name}
                              </p>
                              {subLink.courses.map((course, j) => (
                                <Link
                                  href={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}/${course.toLowerCase()}`}
                                  className="block rounded-lg bg-transparent py-2 pl-4 hover:bg-gray-800"
                                  key={j}
                                >
                                  {course}
                                </Link>
                              ))}
                            </div>
                          ))
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : link.path ? (
                  <Link href={link.path}>
                    <p
                      className={`${
                        matchRoute(link.path)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                ) : (
                  <span className="text-gray-800">{link.title}</span>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-3 md:flex ">
          {user && user.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link href="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-gray-300" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-gray-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {!token && (
            <>
              <Link href="/login">
                <button className="rounded border border-gray-300 bg-gray-700 px-[8px] py-[4px] text-gray-300 hover:bg-gray-800 hover:text-gray-200 hover:scale-95 transition-all duration-300 ease-linear ">
                  Log in
                </button>
              </Link>
              <Link href="/register">
                <button className="rounded border border-gray-300 bg-gray-700 px-[8px] py-[4px] text-gray-300 hover:bg-gray-800 hover:text-gray-200 hover:scale-95 transition-all duration-300 ease-linear ">
                  Sign up
                </button>
              </Link>
            </>
          )}

          {token && <ProfileDropdown />}
          {loading && (
            <p className={!token ? "hidden" : "text-gray-100 text-sm"}>
              Loading...
            </p>
          )}
        </div>

        <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
