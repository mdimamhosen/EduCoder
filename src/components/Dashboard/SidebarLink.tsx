"use client";
import * as Icons from "react-icons/vsc";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
interface LinkProps {
  link: { id?: string; name?: string; path: string; type?: string };
  iconName?: string;
}

const SidebarLink = ({ link, iconName }: LinkProps) => {
  const Icon = Icons[iconName as keyof typeof Icons];

  const pathname = usePathname();
  // Check if the current route matches the link path
  const matchRoute = (route: string) => {
    // Get the last segment of the link route and remove "dashboard" if it exists
    let link = route.split("/").pop()?.replace("dashboard", "") || "";

    // Get the last segment of the current pathname and remove "dashboard" if it exists
    let lastSegment = pathname.split("/").pop()?.replace("dashboard", "") || "";

    // Compare the cleaned-up last segments
    return lastSegment === link;
  };

  // Handle invalid icon names gracefully
  if (!Icon) {
    return <span>Invalid Icon</span>;
  }

  return (
    <div>
      <Link
        href={link.path}
        className={`relative px-8 py-2 text-sm font-medium ${
          matchRoute(link.path)
            ? "  text-yellow-400 font-semibold hover:text-yellow-300"
            : "bg-opacity-0 text-gray-300 hover:text-gray-100 hover:scale-110"
        } transition-all duration-300  `}
      >
        <span
          className={`absolute left-0 top-0 h-full w-[0.15rem] text-yellow-400 ${
            matchRoute(link.path) ? "opacity-100" : "opacity-0"
          }`}
        ></span>
        <div className="flex items-center gap-x-2">
          <Icon className="text-lg" />

          <span>{link.name}</span>
        </div>
      </Link>
    </div>
  );
};

export default SidebarLink;
