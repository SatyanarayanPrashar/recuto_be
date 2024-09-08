export interface Profile {
    g_token: { id: string; name: string };
    full_name: string | null;
    profile_photo: string | null;
    bio: string | null;
    location: string | null;
    preferred_roles: string | null;
    portfolio_link: string | null;
    linkedin_link: string | null;
    github_link: string | null;
    anyother_link: string | null;
    exp_title: string | null;
    exp_company: string | null;
    exp_description: string | null;
    project_title: string | null;
    project_link: string | null;
    project_description: string | null;
    skills: string | null;
}
