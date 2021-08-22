import { MessageType } from '../constants/message';

export type AdminCredentials = {
  userName: string;
  password: string;
};

export type BaseRequest = {
  type: MessageType;
};

export type LoginRequest = {
  type: MessageType.Login;
  adminCredentials?: AdminCredentials;
  sdp: string;
};

export type AdminLoginRequest = {
  type: MessageType.Login;
  adminCredentials?: AdminCredentials;
};

export type OfferRequest = {
  type: MessageType.Offer;
  sdp: string;
};

export type AnswerRequest = {
  type: MessageType.Answer;
  sdp: string;
  forUserName: string;
};

export type IceCandidateRequest = {
  type: MessageType.IceCandidate;
  candidate: string;
  forUserName: string;
};

export type Request = BaseRequest | LoginRequest | AdminLoginRequest | OfferRequest | AnswerRequest;
