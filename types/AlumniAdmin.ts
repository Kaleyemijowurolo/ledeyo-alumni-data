import { Document } from "mongoose";

export interface IAlumniAdmin extends Document {
  email: string;
  password: string;
}
