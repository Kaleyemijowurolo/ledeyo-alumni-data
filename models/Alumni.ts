import mongoose, { Document, Schema, model } from "mongoose";

export interface IAlumni extends Document {
  firstName: string;
  middleName?: string;
  surname: string;
  gender: string;
  phone: string;
  email: string;
  ledeyoSet: string;
  contactsAttended: number;
  commissioning: boolean;
  workshops: string[];
  nationality: string;
  country: string;
  state: string;
  city: string;
  education: string;
  discipline: string;
  occupation: string;
  crossCareer: boolean;
  crossCareerPath?: string;
  callMinistry: boolean;
  ministryCalling?: string;
  expectations?: string;
  suggestions?: string;
}

const AlumniSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  middleName: { type: String },
  surname: { type: String, required: true },
  gender: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  ledeyoSet: { type: String, required: true },
  contactsAttended: { type: Number, required: true },
  commissioning: { type: Boolean, required: true },
  workshops: [{ type: String }],
  nationality: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  education: { type: String, required: true },
  discipline: { type: String, required: true },
  occupation: { type: String, required: true },
  crossCareer: { type: Boolean, required: true },
  crossCareerPath: { type: String },
  callMinistry: { type: Boolean, required: true },
  ministryCalling: { type: String },
  expectations: { type: String },
  suggestions: { type: String },
});

export default mongoose.models.Alumni || model<IAlumni>("Alumni", AlumniSchema);
