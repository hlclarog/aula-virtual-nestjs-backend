import { EMAIL_ACTIVITITES_TYPES_DATA } from './../api/email_activities/email_activities_actions.dto';

export interface EmailProviderCofig {
  host: string;
  port: number;
  user: string;
  pass: string;
}
export interface EmailContent {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}
export interface OptionsEmailFromActivity {
  alias: string;
  email_activity_id: number;
  user_id: number;
  data: EMAIL_ACTIVITITES_TYPES_DATA;
}
