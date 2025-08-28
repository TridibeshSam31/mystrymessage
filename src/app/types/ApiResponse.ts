import { Message } from "../model/User";

export interface ApiResponse {
  success: boolean;
  message: string;
  isAcceptingMessages?: boolean;
  messages?: Array<Message>
};

//demo project ki tarah idhar bhi ek wrapper bna diya ab issi ka use krenge production mai
