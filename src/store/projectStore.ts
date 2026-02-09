import { create } from "zustand";
import { Project } from "@/types/project";
import { SortBy } from "@/types/ui";

const ITEMS_PER_PAGE = 10;

interface ProjectState {
  // data
  projects: Project[];

  // ui state
  search: string;
  statusFilter: string;
  planFilter: string;
  filterBy: SortBy;
  currentPage: number;
  selectedProjectId?: string;

  // derived state
  filteredProjects: Project[];
  paginatedProjects: Project[];
  totalPages: number;

  // actions
  setProjects: (projects: Project[]) => void;
  setSearch: (value: string) => void;
  setStatusFilter: (value: string) => void;
  setPlanFilter: (value: string) => void;
  setFilterBy: (value: SortBy) => void;
  setPage: (page: number) => void;
  selectProject: (id: string) => void;
}


/* Recalcula filtros, orden y paginación*/

const recalc = (state: ProjectState) => {
  let result = [...state.projects];

  // 🔍 search
  if (state.search) {
    result = result.filter((p) =>
      p.name.toLowerCase().includes(state.search.toLowerCase())
    );
  }

  // status filter
  if (state.statusFilter !== "all") {
    result = result.filter((p) => p.status === state.statusFilter);
  }

  // plan filter
  if (state.planFilter !== "all") {
    result = result.filter((p) => p.plan === state.planFilter);
  }

  // order (filterBy)
  switch (state.filterBy) {
    case "alphabetical":
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case "incidents":
      result.sort((a, b) => b.stats.incidents - a.stats.incidents);
      break;

    case "rfi":
      result.sort((a, b) => b.stats.rfi - a.stats.rfi);
      break;

    case "tasks":
      result.sort((a, b) => b.stats.tasks - a.stats.tasks);
      break;
  }

  // pagination
  const totalPages = Math.ceil(result.length / ITEMS_PER_PAGE);
  const start = (state.currentPage - 1) * ITEMS_PER_PAGE;

  return {
    filteredProjects: result,
    paginatedProjects: result.slice(start, start + ITEMS_PER_PAGE),
    totalPages,
  };
};

export const useProjectStore = create<ProjectState>((set, get) => ({
  // initial state
  projects: [],

  search: "",
  statusFilter: "all",
  planFilter: "all",
  filterBy: "alphabetical",
  currentPage: 1,
  selectedProjectId: undefined,

  filteredProjects: [],
  paginatedProjects: [],
  totalPages: 0,

  // actions
  setProjects: (projects) =>
    set((state) => ({
      projects,
      currentPage: 1,
      ...recalc({ ...state, projects, currentPage: 1 }),
    })),

  setSearch: (search) =>
    set((state) => ({
      search,
      currentPage: 1,
      ...recalc({ ...state, search, currentPage: 1 }),
    })),

  setStatusFilter: (statusFilter) =>
    set((state) => ({
      statusFilter,
      currentPage: 1,
      ...recalc({ ...state, statusFilter, currentPage: 1 }),
    })),

  setPlanFilter: (planFilter) =>
    set((state) => ({
      planFilter,
      currentPage: 1,
      ...recalc({ ...state, planFilter, currentPage: 1 }),
    })),

  setFilterBy: (filterBy) =>
    set((state) => ({
      filterBy,
      currentPage: 1,
      ...recalc({ ...state, filterBy, currentPage: 1 }),
    })),

  setPage: (currentPage) =>
    set((state) => ({
      currentPage,
      ...recalc({ ...state, currentPage }),
    })),

  selectProject: (id) => set({ selectedProjectId: id }),
}));
