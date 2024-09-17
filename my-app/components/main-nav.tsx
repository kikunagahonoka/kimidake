"use client"

import { NavItem } from "@/types"
import Link from "next/link"
import { ReactNode, useState } from "react";
import MobileNav from "./mobile-nav";

interface MainnavProps {
    items:NavItem[];
    children?:ReactNode;
}

export default function Mainnav({ items }: MainnavProps) {

    const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)
    return(
        <div className="flex items-center md:gap-10">
            <Link href={"/"} className="hidden md:flex items-center space-x-2">
                <span className="font-bold">Post writer</span>
            </Link>
            <nav className="md:flex gap-5 hidden">
                {items?.map((item,index) =>{
                    return(
                        <Link
                        key={index}
                        href={item.href} className="text-lg sm:text-sm font-medium hover:text-gray-700">
                            {item.title}
                        </Link>    
                    );
                
                })}
            </nav>
            <button className="md:hidden" onClick={() => setShowMobileMenu(!showMobileMenu)}>
                <span>メニュー</span>
            </button>
            {showMobileMenu &&   <MobileNav items={items} />}

        </div>
    )
}
