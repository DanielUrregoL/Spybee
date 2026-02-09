export interface Project {
  id: string;
  name: string;
  plan: string;
  status: string;
  team: string;
  location: Location;
  stats: ProjectStats;
  lastVisit: string;
  lastUpdated: string;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface ProjectStats {
  incidents: number;
  rfi: number;
  tasks: number;
  limitDate: string;
}
