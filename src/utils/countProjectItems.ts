import { RawIncident } from "@/types/rawProject";

export function countProjectItems(incidents: RawIncident[]) {
  let incidentsCount = 0;
  let rfiCount = 0;
  let tasksCount = 0;

  incidents.forEach((incident) => {
    const type = incident.item.toLowerCase();

    if (type === "incidents") incidentsCount++;
    if (type === "rfi") rfiCount++;
    if (type === "task") tasksCount++;
  });

  return {
    incidents: incidentsCount,
    rfi: rfiCount,
    tasks: tasksCount,
  };
}
