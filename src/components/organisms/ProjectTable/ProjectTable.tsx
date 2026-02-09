import Table from "@/components/molecules/Table/Table";
import { Project } from "@/types/project";
import { formatShortDate } from "@/utils/formatDate";
import { Clock3, RefreshCcw } from "lucide-react";
import { getInitialsTeamMember } from "@/utils/getInitialsTeamMember";
import Image from "next/image";
import styles from "./ProjectTable.module.css";

const HEADERS = [
  "Proyecto",
  "Plan",
  "Estado",
  "Equipo",
  "Items por vencer",
];

const AVATAR_COLORS = ["#fff5d7", // 1 
  "#ffebaf", // 2 
  "#fad75f", // 3 
  "#fac30f", // 4 
  "#ebb400", // 5 
  "#fff5d7", // 6 
];

export default function ProjectTable({
  projects,
  selectedId,
  onSelect,
}: {
  projects: Project[];
  selectedId?: string;
  onSelect: (id: string) => void;
}) {
  if (!projects.length) {
    return <p className={styles.empty}>No hay proyectos</p>;
  }

  return (
    <Table headers={HEADERS}>
      {projects.map((project) => (
        <tr
          key={project.id}
          onClick={() => onSelect(project.id)}
          className={project.id === selectedId ? styles.active : ""}
        >
          {/* Proyecto */}
          <td>
            <div className={styles.projectCell}>
              <Image
                src="/spybee_logo.jpg"
                alt="Spybee logo"
                width={50}
                height={50}
                className={styles.projectImage}
              />

              <div>
                <span className={styles.projectTitle}>{project.name}</span>
                <div className={styles.projectDates}>
                  <span><Clock3 size={14} /> {formatShortDate(project.lastVisit)}</span>
                  <span><RefreshCcw size={14} /> {formatShortDate(project.lastUpdated)}</span>
                </div>
              </div>
            </div>
          </td>

          {/* Plan */}
          <td>
            <span className={`${styles.label} ${styles[`plan_${project.plan}`]}`}>
              {project.plan}
            </span>
          </td>

          {/* Estado */}
          <td>
            <span className={`${styles.label} ${styles[`status_${project.status}`]}`}>
              {project.status}
            </span>
          </td>

          {/* Equipo */}
          <td className={styles.team}>
            <div>
              {getInitialsTeamMember(project.team)
                .slice(0, 6)
                .map((initials, index) => (
                  <span key={index}
                    className={styles.avatar}
                    style={{ backgroundColor: AVATAR_COLORS[index] }}>
                    <p>{initials}</p>
                  </span>
                ))}
            </div>
          </td>

          {/* Stats */}
          <td className={styles.statsCell}>
            <div>
              <div className={styles.stat}>
                <strong>{project.stats.incidents}</strong>
                <span>Incidencias</span>
              </div>

              <div className={styles.stat}>
                <strong>{project.stats.rfi}</strong>
                <span>RFI</span>
              </div>

              <div className={styles.stat}>
                <strong>{project.stats.tasks}</strong>
                <span>Tareas</span>
              </div>
            </div>
          </td>
        </tr>
      ))}
    </Table>
  );
}
