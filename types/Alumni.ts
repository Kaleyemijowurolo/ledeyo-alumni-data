import { Document } from "mongoose";

export interface IAlumni extends Document {
  firstName?: string;
  middleName?: string;
  surname?: string;
  gender?: string;
  phone?: string;
  email?: string;
  ledeyoSet?: string;
  contactsAttended?: string;
  commissioning?: string;
  workshops?: string;
  //   workshops: string[];
  nationality?: string;
  country?: string;
  state?: string;
  city?: string;
  education?: string;
  discipline?: string;
  occupation?: string;
  crossCareer?: boolean;
  crossCareerPath?: string;
  callMinistry?: boolean;
  ministryCalling?: string;
  expectations?: string;
  suggestions?: string;
}
