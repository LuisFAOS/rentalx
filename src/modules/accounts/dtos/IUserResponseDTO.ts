export interface IUserResponseDTO{
   email: string; 
   username: string;
   name: string;
   driver_license: string; 
   avatar: string;
   avatar_url(): string;
}