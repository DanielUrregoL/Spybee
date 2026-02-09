import rawProjects from "@/data/mock_data.json";
import { RawProject } from "@/types/rawProject";
import { Project } from "@/types/project";
import { countProjectItems } from "@/utils/countProjectItems";

export const getProjects = (): Project[] => {
  return (rawProjects as RawProject[]).map((p) => {
    const { incidents, rfi, tasks } = countProjectItems(p.incidents);

    return {
      id: p._id,
      name: p.title,
      plan: p.projectPlanData.plan,
      status: p.status,
            team: p.users
        .map((u) => `${u.name} ${u.lastName}`)
        .join(", "),
      lastVisit: p.lastVisit,
      lastUpdated: p.lastUpdated,
      location: {
        lat: p.position.lat,
        lng: p.position.lng,
      },

      stats: {
        incidents,
        rfi,
        tasks,
        limitDate:
          p.incidents
            .map((i) => i.limitDate)
            .sort()[0] ?? p.lastVisit,
      },
    };
  });
};
