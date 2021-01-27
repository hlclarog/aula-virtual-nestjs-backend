export const AWS_PROVIDER = 'AWS_PROVIDER';
export const S3_PROVIDER = 'S3_PROVIDER';

export enum typeFilesAwsNames {
  users = 'users/avatar',
  courses = 'courses',
}

export type typeFileAwsTypes =
  | typeFilesAwsNames.users
  | typeFilesAwsNames.courses;

export interface SaveFileAws {
  file: string;
  type: typeFileAwsTypes;
  name?: string;
}

export enum durationFilesUrl {
  img_user = 60 * 5,
}
