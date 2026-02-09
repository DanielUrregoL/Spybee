"use client";

import styles from "./Filter.module.css";
import { useProjectStore } from "@/store/projectStore";
import { SortBy } from "@/types/ui";

interface FilterOption {
  key: SortBy;
  label: string;
}

interface FilterProps {
  options: readonly FilterOption[];
}

export default function Filter({ options }: FilterProps) {
  const filterBy = useProjectStore((s) => s.filterBy);
  const setFilterBy = useProjectStore((s) => s.setFilterBy);

  return (
    <div className={styles.dropdown}>
      {options.map(({ key, label }) => (
        <button
          key={key}
          className={filterBy === key ? styles.active : ""}
          onClick={() => setFilterBy(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
