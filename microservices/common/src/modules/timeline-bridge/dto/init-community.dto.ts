export type InitCommunityReqMessage = {
  community_id: string;
};

export type InitCommunityResMessage =
  | {
      timeline_id: string;
    }
  | {
      error: any;
    };
