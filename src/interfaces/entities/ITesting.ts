export interface ITesting {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICreateTestingBody {
  name: string;
}
