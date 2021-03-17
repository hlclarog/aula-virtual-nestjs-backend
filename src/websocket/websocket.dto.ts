export enum EVENTS_SOCKET {
  SUBSCRIBE = 'subscribe',
  CHANGE_GAMIFICATION_USER = 'change_me_gamification',
}

export interface EmitchangeGamificationUser {
  user_id: number;
  info: {
    points: number;
    lives: number;
  };
}
