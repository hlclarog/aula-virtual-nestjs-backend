export enum EVENTS_SOCKET {
  SUBSCRIBE = 'subscribe',
  CHANGE_GAMIFICATION_USER = 'change_me_gamification',
  NEW_COMMENT_LESSON = 'new_comment_lesson',
}

export interface EmitchangeGamificationUser {
  user_id: number;
  info: {
    user_id: number;
    points: number;
    lives: number;
  };
}

export interface EmitNewCommentLesson {
  user_id: number;
  lesson_id: number;
  id?: number;
  comment?: string;
  content?: string;
  comment_answer_id?: number;
}
