import Link from "next/link";

import logoImg from "@/assets/logo.png";
import Image from "next/image";
import classes from '@/components/main-header/main-header.module.css';
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import MainHeaderBackground from "@/components/main-header/main-header-background";
import { NavLink } from "@/components/elements/links";


type ImageType = {
  src: string | StaticImport;
  alt: string;
  priority?: boolean
}

type LinkType = {
  href: string;
  title: string;
  className?: string;
}

type ImageLink = ImageType & LinkType;

const generateImageLink = (imgLink: ImageLink) => {

  const {href, src, alt, className, title, priority} = imgLink;
  return (
    <>
      <Link href={href} className={className}>
        <Image src={src} alt={alt} priority={priority}/>
        {title}
      </Link>
    </>
  )
}


const generateNavLinks = (navLinks: LinkType[]) => navLinks.map((aLink) => (
  <li key={aLink.href}><NavLink href={aLink.href}>{aLink.title}</NavLink></li>));

const navLinks: LinkType[] = [{href: "/meals", title: "Browse Meals"}, {href: "/community", title: "Foodies Community"}]

const MainHeader = () => {

  return (
    <>
      <MainHeaderBackground/>
      <header className={classes.header}>
        {generateImageLink({
          src: logoImg,
          alt: "meals",
          className: classes.logo,
          title: "Next level Food",
          href: "/",
          priority: true
        })};
        <nav className={classes.nav}>
          <ul>
            {generateNavLinks(navLinks)}
          </ul>
        </nav>
      </header>
    </>
  );
}

export default MainHeader;