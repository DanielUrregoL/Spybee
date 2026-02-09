"use client";

import styles from "./Table.module.css";

interface TableProps {
  headers: string[];
  children: React.ReactNode;
  compact?: boolean;
}

export default function Table({ headers, children, compact = false }: TableProps) {
  return (
    <div className={compact ? styles.wrapperCompact : styles.wrapper}>
      <table className={compact ? styles.tableCompact : styles.table}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>

        <tbody>{children}</tbody>
      </table>
    </div>
  );
}