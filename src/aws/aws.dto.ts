export const AWS_PROVIDER = 'AWS_PROVIDER';
export const S3_PROVIDER = 'S3_PROVIDER';

export enum typeFilesAwsNames {
  users = 'users/avatar',
  courses_pictures = 'courses/pictures',
  lesson_videos = 'lessons/videos',
  lesson_details_files = 'lesson_details/files',
  program_videos = 'programs/videos',
  program_pictures = 'programs/pictures',
  lesson_scorms = 'scorms',
}

export type typeFileAwsTypes =
  | typeFilesAwsNames.users
  | typeFilesAwsNames.courses_pictures
  | typeFilesAwsNames.lesson_videos
  | typeFilesAwsNames.lesson_details_files
  | typeFilesAwsNames.program_pictures
  | typeFilesAwsNames.program_videos
  | typeFilesAwsNames.lesson_scorms;

export interface SaveFileAws {
  file: string;
  type: typeFileAwsTypes;
  name?: string;
}

export enum durationFilesUrl {
  img_user = 60 * 5,
}
