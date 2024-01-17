"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState,useRef,useEffect } from "react";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const path = usePathname();
  const isLinkActive = (href: string) => path === href;

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = () => {
    setIsOpen(false);
    // Add your code here for handling the selected option
  };


  return (
    <div className="relative z-50">
      <button
        className={`focus:outline-none bg-gray-900 rounded-full px-2 py-1 text-white`}
>
        By Date
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 py-2 w-48 bg-white shadow-lg font-decent text-black">
          <Link
            href="/ascending"
            className="block px-4 py-2 text-brown hover:bg-emerald-800 hover:text-white"
            onClick={handleOptionSelect}
          >
            Ascending
          </Link>
          <Link
            href="/descending"
            className="block px-4 py-2 hover:bg-emerald-800 hover:text-white"
            onClick={handleOptionSelect}
          >
            Descending
          </Link>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
