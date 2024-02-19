"use client";
import Link from "next/link";
import { ReactNode, useState } from "react";
import classes from "@/components/elements/links.module.css";
import { usePathname } from "next/navigation";

export type LinkType = {
  href: string;
  children: ReactNode;
}

export const NavLink = (linkData: LinkType) => {
  const path = usePathname();
  const {href, children,} = linkData;

  return (
    <>
      <Link href={href} className={path.startsWith(href) ? `${classes.active} ${classes.link}` : classes.link}>
        {children}
      </Link>
    </>
  )

}