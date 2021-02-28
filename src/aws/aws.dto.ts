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
  activity_multiple_option = 'activities/multiple_option',
  activity_relate_element = 'activities/relate_element',
  activity_sort_item = 'activities/sort_item',
  activity_identify_word = 'activities/identify_word',
  activity_complete_text = 'activities/complete_text',
  themes_pictures = 'themes_pictures',
  lesson_comments_files = 'lesson_comments_files',
}

export type typeFileAwsTypes =
  | typeFilesAwsNames.users
  | typeFilesAwsNames.courses_pictures
  | typeFilesAwsNames.lesson_videos
  | typeFilesAwsNames.lesson_details_files
  | typeFilesAwsNames.program_pictures
  | typeFilesAwsNames.program_videos
  | typeFilesAwsNames.activity_multiple_option
  | typeFilesAwsNames.activity_relate_element
  | typeFilesAwsNames.activity_sort_item
  | typeFilesAwsNames.activity_identify_word
  | typeFilesAwsNames.activity_complete_text
  | typeFilesAwsNames.lesson_scorms
  | typeFilesAwsNames.themes_pictures
  | typeFilesAwsNames.lesson_comments_files;

export interface SaveFileAws {
  file: string;
  type: typeFileAwsTypes;
  name?: string;
}

export enum durationFilesUrl {
  img_user = 60 * 5,
}
