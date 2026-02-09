"use client";


import { Project } from "@/types/project";
import {
  Funnel,
  Presentation,
  CalendarRange,
  History,
  Clock3
} from "lucide-react";
import styles from "@/components/organisms/Summnary/Summary.module.css"
import Table from "@/components/molecules/Table/Table";
import { getInitialsTeamMember } from "@/utils/getInitialsTeamMember";
import { formatDateAndTime } from "@/utils/formatDate";

interface SummaryProps {
  projects: Project[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

const HEADERS1 = [
  "Proyecto",
  "Item",
  "Fecha Limite"
];

const HEADERS2 = [
  "Proyecto",
  "Equipo",
  "Fecha Limite"
];

const AVATAR_COLORS = ["#fff5d7", // 1 
  "#ffebaf", // 2 
  "#fad75f", // 3 
  "#fac30f", // 4 
  "#ebb400", // 5 
  "#fff5d7", // 6 
];

export default function Summary({
  projects,
  selectedId,
  onSelect, }: SummaryProps) {
  if (!projects.length) {
    return <p className={styles.empty}>No hay proyectos</p>;
  }

  const totals = projects.reduce(
    (acc, project) => {
      acc.incidents += project.stats.incidents;
      acc.rfi += project.stats.rfi;
      acc.tasks += project.stats.tasks;
      return acc;
    },
    {
      incidents: 0,
      rfi: 0,
      tasks: 0,
    }
  );


  return (
    <div className={styles.summary}>
      <div className={styles.sectionHeader}>
        <div className={styles.left}>
          <Presentation />
          <h2>Resumen</h2>
        </div>
      </div>


      <div className={styles.sectionHeader}>
        <div className={styles.tabs}>
          <h4 className={styles.active}>General</h4>
          <h4>Mis actualizaciones</h4>
        </div>
        <div className={styles.right}>
          <Funnel size={20} />
          <h4>Filtros</h4>
        </div>
      </div>



      <div className={styles.sectionHeader}>
        <div className={styles.left}>
          < History size={25} />
          <h2>Próximos a vencer</h2>
        </div>

        <h3 className={styles.link}>Ver todos</h3>
      </div>


      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <p>Incidencias</p>
          <p>{totals.incidents}</p>
          <h4 className={styles.subtitle}>Total Abiertas</h4>

          <div className={styles.progressCircle}>
            <span>10</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <p>RFI</p>
          <p>{totals.rfi}</p>
          <h4 className={styles.subtitle}>Total Abiertas</h4>

          <div className={styles.progressCircle}>
            <span>10</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <p>Tareas</p>
          <p>{totals.tasks}</p>
          <h4 className={styles.subtitle}>Total Abiertas</h4>

          <div className={styles.progressCircle}>
            <span>10</span>
          </div>
        </div>
      </div>


      <Table headers={HEADERS1} compact>
        {projects.slice(0, 3).map((project) => {
          const { date, time } = formatDateAndTime(project.lastVisit);

          return (
            <tr
              key={project.id}
              onClick={() => onSelect(project.id)}
              className={project.id === selectedId ? styles.active : ""}
            >
              {/* Proyecto */}
              <td>
                <div className={styles.projectCell}>
                  <span className={styles.projectTitle}>{project.name}</span>
                </div>
              </td>

              {/* Item */}
              <td>Incidencia</td>

              {/* Fecha Limite */}
              <td>
                <div className={styles.projectCell}>
                  <p>{date}</p>
                  <p><Clock3 size={14} /> {time}</p>
                </div>
              </td>
            </tr>
          );
        })}
      </Table>



      <div className={styles.sectionHeader}>
        <div className={styles.left}>
          <CalendarRange size={25} />
          <h2>Próximos eventos</h2>
        </div>

        <h3 className={styles.link}>Ver todos</h3>
      </div>


      <Table headers={HEADERS2} compact>
        {projects.slice(0, 3).map((project) => {
          const { date, time } = formatDateAndTime(project.lastVisit);

          return (
            <tr
              key={project.id}
              onClick={() => onSelect(project.id)}
              className={project.id === selectedId ? styles.active : ""}
            >
              {/* Proyecto */}
              <td>
                <div className={styles.projectCell}>
                  <span className={styles.projectTitle}>{project.name}</span>
                </div>
              </td>

              {/* Equipo */}
              <td className={styles.team}>
                <div>
                  {getInitialsTeamMember(project.team)
                    .slice(0, 3)
                    .map((initials, index) => (
                      <span key={index}
                        className={styles.avatar}
                        style={{ backgroundColor: AVATAR_COLORS[index] }}>
                        <p>{initials}</p>
                      </span>
                    ))}
                </div>
              </td>

              {/* Fecha Limite */}
              <td>
                <div className={styles.projectCell}>
                  <p>{date}</p>
                  <p><Clock3 size={14} /> {time}</p>
                </div>
              </td>
            </tr>
          );
        })}
      </Table>

    </div>
  );
}
