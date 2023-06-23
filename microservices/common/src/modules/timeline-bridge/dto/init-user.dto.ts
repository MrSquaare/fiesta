export type InitUserReqMessage = {
  user_id: string;
};

export type InitUserResMessage = {
  timeline_id?: string;
  for_you_timeline_id?: string;
  following_timeline_id?: string;
  error?: any;
};
