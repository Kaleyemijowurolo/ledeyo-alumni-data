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
  firstName: { type: String },
  middleName: { type: String },
  surname: { type: String },
  gender: { type: String },
  phone: { type: String },
  email: { type: String },
  ledeyoSet: { type: String },
  contactsAttended: { type: Number },
  commissioning: { type: Boolean },
  workshops: { type: String },
  //   workshops: [{ type: String }],
  nationality: { type: String },
  country: { type: String },
  state: { type: String },
  city: { type: String },
  education: { type: String },
  discipline: { type: String },
  occupation: { type: String },
  crossCareer: { type: String },
  crossCareerPath: { type: String },
  callMinistry: { type: String },
  //   callMinistry: { type: Boolean, required: true },
  ministryCalling: { type: String },
  expectations: { type: String },
  suggestions: { type: String },
});

// Export the Alumni model, using an existing model if it exists, otherwise create a new one
// if you want your collection to be named alumniRecords, you can pass that as the third argument:
export default mongoose.models.Alumni ||
  model<IAlumni>("Alumni", AlumniSchema, "alumniRecords");
