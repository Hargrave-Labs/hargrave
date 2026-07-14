export type RequestType = 'bug' | 'content' | 'feature' | 'design';

export type CrStatus =
  | 'submitted'
  | 'in_backlog'
  | 'in_progress'
  | 'in_review'
  | 'completed'
  | 'needs_info'
  | 'declined';

export interface Profile {
  company_name: string | null;
  website_url: string | null;
}

export interface ChangeRequestListItem {
  id: string;
  title: string;
  request_type: RequestType;
  status: CrStatus;
  created_at: string;
}

export interface ChangeRequest extends ChangeRequestListItem {
  user_id: string;
  description: string;
  page_url: string | null;
  acceptance_criteria: string | null;
  updated_at: string;
}

export interface Attachment {
  id: string;
  storage_path: string;
  file_name: string;
}
