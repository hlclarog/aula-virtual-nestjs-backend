// ! =================== USER_REGISTER_PLATFORM ===================
export const USER_REGISTER_PLATFORM_ID = 1;
export const USER_REGISTER_PLATFORM_CODE = 'USER_REGISTER_PLATFORM';
export enum USER_REGISTER_PLATFORM_ACTIONS {
  student_name = 'STUDENT_NAME',
  tenancy_name = 'TENANCY_NAME',
}
export interface USER_REGISTER_PLATFORM {
  [USER_REGISTER_PLATFORM_ACTIONS.student_name]: string;
  [USER_REGISTER_PLATFORM_ACTIONS.tenancy_name]: string;
}
// ! =================== USER_SUBSCRIBE_COURSE ===================
export const USER_SUBSCRIBE_COURSE_ID = 2;
export const USER_SUBSCRIBE_COURSE_CODE = 'USER_SUBSCRIBE_COURSE';
export enum USER_SUBSCRIBE_COURSE_ACTIONS {
  student_name = 'STUDENT_NAME',
  course_name = 'COURSE_NAME',
}
export interface USER_SUBSCRIBE_COURSE {
  [USER_SUBSCRIBE_COURSE_ACTIONS.student_name]: string;
  [USER_SUBSCRIBE_COURSE_ACTIONS.course_name]: string;
}

//  TODO: =================== TYPES GENERAL ===================
export const EMAIL_ACTIVITITES_HELP = {
  [USER_REGISTER_PLATFORM_CODE]: {
    [USER_REGISTER_PLATFORM_ACTIONS.student_name]: 'Nombre del estudiante',
    [USER_REGISTER_PLATFORM_ACTIONS.tenancy_name]: 'Nombre de la tenencia',
  },
  [USER_SUBSCRIBE_COURSE_CODE]: {
    [USER_SUBSCRIBE_COURSE_ACTIONS.student_name]: 'Nombre del estudiante',
    [USER_SUBSCRIBE_COURSE_ACTIONS.course_name]: 'Nombre del curso',
  },
};
export const EMAIL_ACTIVITITES_TYPES = {
  [USER_REGISTER_PLATFORM_ID]: USER_REGISTER_PLATFORM_CODE,
  [USER_SUBSCRIBE_COURSE_ID]: USER_SUBSCRIBE_COURSE_CODE,
};

export type EMAIL_ACTIVITITES_TYPES_DATA =
  | USER_REGISTER_PLATFORM
  | USER_SUBSCRIBE_COURSE;
