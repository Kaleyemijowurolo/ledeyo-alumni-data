import { IAlumniAdmin } from "@/types/AlumniAdmin";
import mongoose, { Schema, model } from "mongoose";

const AlumniAdminSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Export the model
export default mongoose.models.AlumniAdmin ||
  model<IAlumniAdmin>("AlumniAdmin", AlumniAdminSchema, "alumniAdmins");
