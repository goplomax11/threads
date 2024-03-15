'use client'

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";

function BottomBar() {
    const pathname = usePathname();

    return (
        <section className="bottombar">
            <div className="bottombar_container">
                {sidebarLinks.map((link) => {
                    const isActive =
                        (pathname.includes(link.route) && link.route.length > 1) ||
                        pathname === link.route;

                    return (
                        <Link
                            href={link.route}
                            key={link.label}
                            className={`bottombar_link ${isActive && "bg-primary-500"}`}
                        >
                            <Image
                                src={link.imgURL}
                                alt="leftsidebar-icon"
                                width={24}
                                height={24}
                            />

                            <p className="text-subtitle-medium text-light-1 max-sm:hidden">
                                {link.label.split(/\s+/)[0]}
                            </p>

                        </Link>
                    )
                })}
            </div>

        </section>
    )
}

export default BottomBar;