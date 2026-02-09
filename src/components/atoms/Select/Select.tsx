"use client";

import { SelectHTMLAttributes } from "react";
import styles from "./Select.module.css";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

export default function Select(props: SelectProps) {
  return <select {...props} className={styles.select} />;
}
