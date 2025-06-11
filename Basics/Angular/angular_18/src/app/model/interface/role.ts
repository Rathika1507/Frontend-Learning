export interface IRole{
    roleId:number,
    role:string
}

export interface IDesignation {
  id: number;
  title: string;
  description: string;
}


export interface APIResponseModel{
    message: string,
    result: boolean,
    data: any
}