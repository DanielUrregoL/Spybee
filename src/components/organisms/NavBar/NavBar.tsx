"use client";

import { useState } from "react";
import { ChevronDown, UserRound } from "lucide-react";
import { UserType } from "@/types/ui";
import Image from "next/image";
import styles from "./NavBar.module.css";


interface NavBarProps {
    user: UserType;
}


export default function Navbar({ user }: NavBarProps) {
    if (!user) return null;
    const [open, setOpen] = useState(false);

    return (
        <nav className={styles.nav}>
            {/* Left */}
            <div className={styles.left}>
                <Image
                    src="/spybee_logo.jpg"
                    alt="Spybee logo"
                    width={120}
                    height={60}
                    priority
                />
            </div>

            {/* Right */}
            <div className={styles.right}>
                <button
                    className={styles.userButton}
                    onClick={() => setOpen(!open)}
                >
                    <div className={styles.avatar}>
                        <UserRound strokeWidth={1.2} size={30} />
                    </div>

                    <div className={styles.userInfo}>
                        <p>{user.name}</p>
                        <p>{user.role}</p>
                    </div>

                    <ChevronDown strokeWidth={1} size={30} />
                </button>

                {open && (
                    <div className={styles.dropdown}>
                        <button>Mi perfil</button>
                        <button className={styles.logout}>Cerrar sesión</button>
                    </div>
                )}
            </div>
        </nav>

    );
}
