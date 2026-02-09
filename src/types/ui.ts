export type SortBy =
  | "alphabetical"
  | "incidents"
  | "rfi"
  | "tasks";

export type UserType = {
  name: string;
  role: string;
}


export const FILTER_OPTIONS = [
  { key: "alphabetical", label: "Orden alfabético" },
  { key: "incidents", label: "Número de incidencias" },
  { key: "rfi", label: "Número de RFI" },
  { key: "tasks", label: "Número de tareas" },
] as const satisfies readonly { key: SortBy; label: string }[];
