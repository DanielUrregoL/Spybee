"use client";

import Input from "@/components/atoms/Input/Input";
import styles from "./SearchBar.module.css";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className={styles.container}>
      <Input
        type="text"
        placeholder="Buscar"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Search className={styles.icon} />
    </div>
  );
}
