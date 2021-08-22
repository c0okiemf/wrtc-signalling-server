import { MessageType } from '../constants/message';

export type BaseResponse = {
  type: MessageType;
  success: boolean;
  body?: string;
};

export type LoginResponse = BaseResponse & {
  type: MessageType.Login;
};

export type OfferResponse = {
  type: MessageType.Offer;
  sdp: string;
};

export type AnswerResponse = {
  type: MessageType.Answer;
  userName: string;
  sdp: string;
};

export type IceCandidateResponse = BaseResponse & {
  type: MessageType.IceCandidate;
  candidate: string;
  forUserName: string;
  fromUserName: string;
};

export type Response = BaseResponse | LoginResponse | OfferResponse | AnswerResponse | IceCandidateResponse;
