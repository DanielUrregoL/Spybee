export interface RawProject {
  _id: string;
  title: string;

  projectPlan: {
    _id: string;
  };

  projectPlanData: {
    plan: string;
  };

  status: string;
  img: string;
  lastVisit: string;
  lastUpdated: string;
  createdAt: string;

  position: {
    _id: string;
    lat: number;
    lng: number;
  };

  address: string;
  city: string;
  companyId: string;

  clientData: {
    title: string;
    _id: string;
  };

  users: RawUser[];
  projectClientAdmin: string[];

  partnerClients: RawPartnerClients[];
  incidents: RawIncident[];
}

export interface RawIncident {
  _id: string;
  status: string;
  item: string;
  description: string;
  owner: string;
  tag: string;

  coordinates: {
    lat: number;
    lng: number;
  };

  limitDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface RawUser {
  name: string;
  lastName: string;
}

export interface RawPartnerClients {
  _id: string;
  maxUsers: number;
  maxAdmins: number;
  maxStorage: number;
}
