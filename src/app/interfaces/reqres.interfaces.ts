export interface LoginSuccessful {
  Email: string,
  Password:string
  Token: string;
}

export interface IUser {
  ID: number;
  Email: string;
  First_name: string;
  Last_name: string;
  Avatar: string;
  Password: string;
  Token : string;
  Bitadmin: string
}

export interface SingleUserResponse {
  data: IUser;
  support: {
      url: string;
      text: string;
  }
}
