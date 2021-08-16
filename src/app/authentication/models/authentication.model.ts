export interface LoginPayload {
    password: string; 
    userName: string;
}

export interface LoginResponseModel {
    isAdmin: boolean;
}