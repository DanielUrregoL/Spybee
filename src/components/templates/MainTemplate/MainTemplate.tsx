import { ReactNode } from "react";
import styles from "./MainTemplate.module.css";
import NavBar from "@/components/organisms/NavBar/NavBar";

interface MainTemplateProps {
  header?: ReactNode;
}

export default function MainTemplate({ header }: MainTemplateProps) {
  return (
    <div className={styles.container}>
      <NavBar user={{
        name: "Daniel Urrego",
        role: "Administrador",
      }} />
      
      {header && <header className={styles.header}>{header}</header>}


    </div>
  );
}
