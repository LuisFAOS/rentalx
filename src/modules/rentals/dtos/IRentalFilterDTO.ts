
export interface IRentalFilterDTO{
   id?: string;
   user_id?: string;
   car_id?: string;
   start_date?: Date;
   expected_return_date?: Date;
   end_date?: Date;
   total?: Number;
}