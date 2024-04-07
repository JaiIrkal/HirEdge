


type AuthStateType = {
    role: 'student' | 'tpo' | 'hod' | 'alumni' | null;
    access_token: string | null;
}

type RoundType = {
    round_no: number;
    round_name: string;
    date: Date;
}





type  CompanyDetails = {
    _id: string;
    company_name: string;
    company_website: string;
    placements: Array<{
      year: number;
      placed_students: Array<{
        full_name: string;
        email: string;
        branch:string;
      }>
    }>
  }
  type Round = {
    round_no: number;
    round_name: string;
    date: string;
  }

  type DriveCardData = {
    _id: string;
    company_id: string;
    job_title: string;
    job_ctc: string;
    company_name:string;
    company_website: string;
  }

  type TPODriveCardData  = DriveCardData & {
    registered_students: number;
    registration_status: string;
  } 

  type TPODrivesPanelResponseType={
    metadata: {
      totalCount: number;
      pageCount: number;
      page: number;
      
    };
    data: Array<TPODriveCardData>
  }



  type fetchDrivesResponseType = {
    drives: Array<DriveCardData>;
    total: number;
    lastPageNumber: number;
  }


type ManageDriveDataType = {
    _id: string
    job_title: string
    tenth_cutoff: number
    twelfth_cutoff: number
    ug_cutoff: any
    job_location: string[]
    job_ctc: string
    branch: string[]
    rounds: RoundType[]
    job_description: string
    company_details: Omit<CompanyDetails, _id>
  }

  type DriveStudentDataType =  {
    _id: string
    job_title: string
    tenth_cutoff: number
    twelfth_cutoff: number
    ug_cutoff: any
    job_locations: string[]
    job_ctc: string
    branch: string[]
    rounds: RoundType[]
    job_description: string
    company_details: Omit<CompanyDetails,"placements">
    registered: boolean;
    eligible: boolean;
  }

  //route types

type RootStackParamList  ={
  Welcome: undefined;
  Login: undefined;
  student: NavigationProp<StudentDrawerParamList>;
  tpo: NavigationProp<TPODrawerParamList>;
  alumni: undefined;
  hod: undefined;
}


type StudentDrawerParamList = {
    Home: undefined;
    OngoingDrives: undefined;
    Drive: {
        drive_id: string
    };
    Companies: undefined;
    Company: {
      company_id: string
    };
    Profile: undefined;
    "Ongoing Drives": undefined;
    "Share Experience": {
      company_id:string;
      company_name: string;
    };
}

type TPODrawerParamList = { 
  Home: undefined;
  "Add Student": undefined;
  "Add Company": undefined;
  "Add Drive": {
    company_id:string;
    company_name: string;
  };
  "Ongoing Drives": undefined;
  Profile: undefined;
  Drive: {
    drive_id: string;
  };
  "Post Update": {
    drive_id: string;
    company_name: string;
  };
  Companies:undefined;

};


type TPOProfile = {

  user_id: string;
  title: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  mobile: string;

}

type CompaniesPageResponseType = {
  metadata: {
    totalCount: number;
    pageCount: number;
    page: number;
  };
  data: Array<CompanyListItemType>
}

type CompanyListItemType= {
  _id: string;
  company_name: string;
  company_website: string;
}


type StudentDriveListType= {
  _id: string;
  company_id: string;
  job_title: string;
  job_ctc: string;
  company_name: string;
  eligible: boolean;
}

type StudentOngoingDriveResponseType = {
    metadata: {
      totalCount: number;
      pageCount: number;
    };
    data: Array<StudentDriveListType>
}


type ExperienceType= {
  experience: string;
  difficulty? : number;
  important_topics?: Array<string>;
};

type ExperiencesResponseType = {
  metadata: {
    totalCount: number;
    pageCount: number;
    page: number;
  },
  data: Array<ExperienceType>
}

type DriveData = {
  _id: string;
  company_id: string;
  job_title: string;
  tenth_cutoff: number;
  twelfth_cutoff: number;
  ug_cutoff?: any;
  job_locations: string[];
  job_ctc: string;
  branch: string[];
  rounds: Round[];
  job_description: string;
  company_details: CompanyDetails;
  registered_students: Array<string>
  current_status: string;
  updates: Array<{
      type: string;
      postedon: EpochTimeStamp;
      description: string;
      students_list?: Array<string>
  }>;
}


type TPODriveResponseType = {
  drive: DriveData;
  studentData: Object;
}