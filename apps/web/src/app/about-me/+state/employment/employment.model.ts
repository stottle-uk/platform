export interface Employment {
  id: string;
  name: string;
  content: EmploymentContent;
  jobTitle: string;
  location: string;
  description: string;
  from: string;
  to: string;
}

export interface EmploymentContent {
  statements: string[];
}
