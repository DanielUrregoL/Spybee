"use client";

import { useState } from "react";
import SearchBar from "@/components/molecules/SearchBar/SearchBar";
import styles from "./Header.module.css";
import {
    ArrowUpNarrowWide,
    TableOfContents,
    LayoutGrid,
    MapPin,
    Plus
} from "lucide-react";
import Filter from "@/components/molecules/Filter/Filter";
import { FILTER_OPTIONS } from "@/types/ui";


interface HeaderProps {
    searchValue: string;
    onSearchChange: (value: string) => void;
    showMap: boolean;
    onToggleMap: () => void;
}

export default function Header({ searchValue, onSearchChange, showMap, onToggleMap }: HeaderProps) {
    const [open, setOpen] = useState(false);

    return (
        <header className={styles.header}>
            {/* Left */}
            <div className={styles.left}>
                <h1>Mis proyectos</h1>
                <label className={styles.label}>13 Proyectos</label>
            </div>

            {/* Right */}
            <div className={styles.right}>
                <button className={styles.buttonRotated}>
                    <ArrowUpNarrowWide />
                </button>

                <div className={styles.buttonGroup}>
                    <button
                        className={styles.buttonRotated}
                        onClick={() => setOpen(!open)}
                    >
                        <TableOfContents />
                    </button>

                    {open && <Filter options={FILTER_OPTIONS} />}

                    <button className={styles.midleButton}>
                        <LayoutGrid />
                    </button>

                    <button
                        className={`${styles.midleButton} ${showMap ? styles.active : ""}`}
                        onClick={onToggleMap}
                    >
                        <MapPin />
                    </button>
                </div>

                <SearchBar
                    value={searchValue}
                    onChange={onSearchChange}
                />

                <button className={styles.buttonCreate}>
                    <Plus /> <label>Crear proyecto</label>
                </button>
            </div>
        </header>
    );
}
