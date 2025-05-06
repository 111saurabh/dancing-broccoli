import mongoose, { Schema, Document } from 'mongoose';

interface ISkillTag {
  name: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface ISession {
  partner: mongoose.Types.ObjectId;
  date: Date;
  rating?: number;
  feedback?: string;
}

interface IUser extends Document {
  firebaseUid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  teachSkills: ISkillTag[];
  learnSkills: ISkillTag[];
  location: {
    type: 'Point';
    coordinates: number[];
  };
  sessionHistory: ISession[];
  avgRating?: number;
  createdAt: Date;
  swipes: Map<string, Date>;
  matches: mongoose.Types.ObjectId[];
}

const SkillTagSchema = new Schema<ISkillTag>({
  name: { type: String, required: true },
  proficiency: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced']
  }
});
const SessionSchema = new Schema<ISession>({
  partner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  rating: { type: Number, min: 1, max: 5 },
  feedback: String
});
const UserSchema = new Schema<IUser>({
  firebaseUid: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  photoURL: String,
  teachSkills: [SkillTagSchema],
  learnSkills: [SkillTagSchema],
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }
  },
  sessionHistory: [SessionSchema],
  avgRating: { type: Number, min: 0, max: 5 },
  createdAt: { type: Date, default: Date.now },
  swipes: {
    type: Map,
    of: Date,
    default: new Map()
  },
  matches: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

export default mongoose.model<IUser>('User', UserSchema);
