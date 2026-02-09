import rawProjects from "@/data/mock_data.json";
import { RawProject } from "@/types/rawProject";
import { Project } from "@/types/project";

export const getProjects = (): Project[] => {
  console.log(rawProjects)
  return (rawProjects as RawProject[]).map((p) => ({
    id: p._id,
    name: p.title,
    plan: p.projectPlanData.plan,
    status: p.status,
    team: p.users.map(u => `${u.name} ${u.lastName}`).join(", "),
    lastVisit: p.lastVisit,
    lastUpdated: p.lastUpdated,
    location: {
      lat: p.position.lat,
      lng: p.position.lng,
    },
    stats: {
      incidents: p.incidents.length,
      rfi: 0,
      tasks: 0,
    },
  }));
};
