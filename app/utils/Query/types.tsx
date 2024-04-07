export type StudentProfileDataType = {
    user_id: string;
    branch: string;
    email: string;
    mobile: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    dob: string;
    tenth_percentage: string;
    twelfth_percentage: string;
    ug_cgpa: string;
}


export type AlumniCompanyData = {
    _id: string;
    company_name: string;
    company_website: string;

    placements: Array<any>;
}