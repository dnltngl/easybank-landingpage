import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useInnerWidth } from "../custom-hook/useInnerWidth";
import { cn } from "../utils/cn";

import navbarLogo from "../assets/images/logo-navbar.svg";
import hamburger from "../assets/icons/icon-hamburger.svg";
import close from "../assets/icons/icon-close.svg";
import Button from "./Button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const innerWidth = useInnerWidth();

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isOpen]);

  useEffect(() => {
    if (innerWidth > 768) setIsOpen(false);
  }, [innerWidth]);

  return (
    <header className="px-6 py-[0.938rem] flex justify-between bg-white md:px-0 md:py-7">
      <img
        className="min-w-[8.688rem] min-h-5"
        src={navbarLogo}
        alt="Company logo"
        aria-hidden
      />
      <NavigationMenu className="hidden md:flex md:text-sm md:gap-[1.963rem] md:py-0 md:items-center" />
      <Button className="hidden md:block" />

      <button
        className="focus-visible:outline focus-visible:outline-2 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="menu"
      >
        {isOpen ? (
          <img src={close} alt="" aria-hidden />
        ) : (
          <img src={hamburger} alt="" aria-hidden />
        )}
      </button>

      <NavigationPortal
        isOpen={isOpen}
        screenWidth={innerWidth}
        setIsOpen={setIsOpen}
      />
    </header>
  );
}

type NavigationPortalProps = {
  isOpen: boolean;
  screenWidth: number;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
function NavigationPortal({
  isOpen,
  screenWidth,
  setIsOpen,
}: NavigationPortalProps) {
  const PortalRoot = document.getElementById("root-portal") as HTMLElement;
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [show, setShow] = useState(false);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let id: number | undefined;
    if (isOpen) {
      setShouldRender(true);
      id = setTimeout(() => {
        setShow(true);
      }, 100);
    } else {
      setShow(false);
    }
    return () => clearTimeout(id);
  }, [isOpen]);

  useEffect(() => {
    const closeMenu = (e: any) => {
      if (isOpen && !menu.current?.contains(e.target)) {
        setShow(false);
        setTimeout(() => {
          setShouldRender(false);
          setIsOpen(false);
        }, 250);
      }
    };

    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, [isOpen,menu]);

  if (!shouldRender) return null;

  const isMobile = screenWidth < 500;
  const isTablet = screenWidth >= 500 && screenWidth <= 768;

  return createPortal(
    <div
      role="menu"
      id="menu"
      className={cn(
        "absolute bg-white rounded-[0.625rem] duration-250 md:hidden",
        "top-[3.75rem] right-4 left-4 xs:left-0 xs:top-0 xs:bottom-0 xs:rounded-l-none xs:rounded-bl-none xs:max-w-96",
        isMobile && "transition-opacity",
        isMobile && (show ? "opacity-100" : "opacity-0"),
        isTablet && "transition-transform",
        isTablet && (show ? "translate-x-0" : "-translate-x-full")
      )}
      onTransitionEnd={() => {
        if (!isOpen) {
          console.log("onAnimationEnd");

          setShouldRender(false);
        }
      }}
      ref={menu}
    >
      <NavigationMenu />
    </div>,
    PortalRoot
  );
}

type NavigationMenuProps = { className?: string };
function NavigationMenu({ className }: NavigationMenuProps) {
  const menuItems = [
    { label: "Home", href: "#" },
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
  ];

  return (
    <nav className="grid content-center">
      <ul
        className={`justify-center py-6 text-2xl font-medium text-center text-menu-foreground ${className}`}
      >
        {menuItems.map((item) => (
          <MenuItem key={item.label} label={item.label} href={item.href} />
        ))}
      </ul>
    </nav>
  );
}

function MenuItem({ label, href }: { label: string; href: string }) {
  return (
    <li className="px-[1.875rem] py-[0.625rem] md:p-0">
      <a href={href}>{label}</a>
    </li>
  );
}
