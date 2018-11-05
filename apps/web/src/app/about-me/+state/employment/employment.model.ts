export interface Employment {
  id: string;
  name: string;
  content: EmploymentContent;
  jobTitle: string;
  location: string;
}

export interface EmploymentContent {
  statements: string[];
}
