"use client";
import { NavbarLinks } from "@/data/NavbarLinks";
import { ACCOUNT_TYPE } from "@/utils/roles";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import ProfileDropdown from "./Core/ProfileDropdown";
import { setLoading, setNavOpen, setUser } from "@/redux/slices/profileSlice";
import { RootState } from "@/redux/reducer";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const token = session?.user;

  const [catalogOpen, setCatalogOpen] = useState(false);

  const { user, loading, isNavOpen } = useSelector(
    (state: RootState) => state.profile
  );
  const { totalItems } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [subLinks, setSubLinks] = useState([
    { name: "Data Structures", courses: ["Array", "LinkedList", "Tree"] },
    { name: "Algorithms", courses: ["Sorting", "Graph Algorithms"] },
    { name: "Python", courses: ["Basics", "OOP"] },
    { name: "JavaScript", courses: ["ES6", "React"] },
  ]);

  useEffect(() => {
    const updateUserState = async () => {
      if (status === "loading") {
        dispatch(setLoading(true));
      } else if (status === "authenticated" && session?.user) {
        dispatch(setLoading(true));
        try {
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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  useEffect(() => {
    //  here i want to make the isNavOpen true when the mobileMenuOpen is true
    if (mobileMenuOpen) {
      dispatch(setNavOpen(true));
    } else {
      dispatch(setNavOpen(false));
    }
  }, [mobileMenuOpen, dispatch]);
  console.log("isNavOpen in navbar", isNavOpen);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const matchRoute = (route: string) => {
    return pathname === route;
  };

  const toggleCatalog = () => {
    setCatalogOpen(!catalogOpen);
  };

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-gray-300 ${
        pathname !== "/" ? "bg-gray-950" : "bg-gray-900"
      } transition-all duration-300  `}
    >
      <button className="ml-4 mr-4 md:hidden" onClick={toggleMobileMenu}>
        {mobileMenuOpen ? (
          <AiOutlineClose fontSize={24} fill="#AFB2BF" />
        ) : (
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        )}
      </button>
      <div className="flex w-11/12 max-w-maxContent items-center justify-between  ">
        <Link href="/">
          <div className="flex justify-center items-center gap-1">
            <div className="flex justify-center items-center bg-gray-200 border border-gray-400 rounded-full h-10 w-10">
              <span className="text-xl font-extrabold text-gray-700  ">EC</span>
            </div>
            <p className="text-lg font-extrabold text-gray-200">EduCoder</p>
          </div>
        </Link>
        <nav className="hidden md:block  ">
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

        {/* Login / Register / Dashboard */}
        <div className="  items-center gap-x-3  flex mr-4 md:mr-0">
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
                <button className="rounded border border-gray-300 bg-gray-700 px-[8px] py-[4px] text-gray-300 hover:bg-gray-800 hover:text-gray-200 hover:scale-95 transition-all duration-300 ease-linear">
                  Log in
                </button>
              </Link>
              <Link href="/register">
                <button className="rounded border border-gray-300 bg-gray-700 px-[8px] py-[4px] text-gray-300 hover:bg-gray-800 hover:text-gray-200 hover:scale-95 transition-all duration-300 ease-linear">
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
      </div>

      {/* Mobile Menu */}

      <div
        className={`fixed md:hidden top-0 left-0 h-full w-[75%] bg-gray-900 z-50 transform ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col p-6">
          <button className="self-end text-white" onClick={closeMobileMenu}>
            <AiOutlineClose fontSize={24} />
          </button>
          <nav className="mt-6">
            <ul className="flex flex-col gap-6">
              {NavbarLinks.map((link, index) => (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div className="flex items-center cursor-pointer">
                      <p
                        className={`text-gray-300 flex justify-center items-center gap-2 ${
                          catalogOpen ? "text-yellow-400" : ""
                        }`}
                      >
                        {link.title}{" "}
                        <BsChevronDown
                          onClick={toggleCatalog}
                          className={`transition-transform ${
                            catalogOpen ? "rotate-180" : ""
                          }`}
                        />
                      </p>
                    </div>
                  ) : (
                    <Link
                      href={link.path as string}
                      className={`text-gray-300 ${
                        matchRoute(link.path as string) ? "text-yellow-400" : ""
                      }`}
                    >
                      {link.title}
                    </Link>
                  )}

                  {/* Mobile Sub-links */}
                  {link.title === "Catalog" && catalogOpen && (
                    <div className="pl-6">
                      {loading ? (
                        <p className="text-center text-gray-300">Loading...</p>
                      ) : subLinks && subLinks.length ? (
                        subLinks.map((subLink, i) => (
                          <div key={i} className="mb-4">
                            <p className="font-semibold text-gray-300">
                              {subLink.name}
                            </p>
                            {subLink.courses.map((course, j) => (
                              <Link
                                key={j}
                                href={`/catalog/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}/${course.toLowerCase()}`}
                                className="block rounded-lg bg-transparent py-2 pl-4 text-gray-300 hover:bg-gray-800"
                              >
                                {course}
                              </Link>
                            ))}
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-gray-300">
                          No Courses Found
                        </p>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
