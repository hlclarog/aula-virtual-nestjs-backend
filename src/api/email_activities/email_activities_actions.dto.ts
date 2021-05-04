export const EMAIL_BUY_COURSE_CODE = 'EMAIL_BUY_COURSE';
export enum EMAIL_BUY_COURSE_ACTIONS {
  student_name = 'STUDENT_NAME',
  course_name = 'COURSE_NAME',
}
export interface EMAIL_BUY_COURSE {
  [EMAIL_BUY_COURSE_ACTIONS.student_name]?: string;
  [EMAIL_BUY_COURSE_ACTIONS.course_name]?: string;
}
export const EMAIL_BUY_COURSE_HELP = {
  [EMAIL_BUY_COURSE_CODE]: {
    [EMAIL_BUY_COURSE_ACTIONS.student_name]: 'Nombre del estudiante',
    [EMAIL_BUY_COURSE_ACTIONS.course_name]: 'Nombre del curso',
  },
};

export const REJECT_PURCHASE_CODE = 'REJECT_PURCHASE';

export const EMAIL_ACTIVITITES_TYPES = {
  1: EMAIL_BUY_COURSE_CODE,
  2: REJECT_PURCHASE_CODE,
};
