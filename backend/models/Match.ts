import mongoose, { Schema, Document } from 'mongoose';

interface IMatch extends Document {
  userA: mongoose.Types.ObjectId;
  userB: mongoose.Types.ObjectId;
  status: 'pending' | 'matched' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const MatchSchema = new Schema<IMatch>({
  userA: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  userB: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: ['pending', 'matched', 'rejected'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

MatchSchema.index({ userA: 1, userB: 1 }, { unique: true });
MatchSchema.index({ status: 1 });

export default mongoose.model<IMatch>('Match', MatchSchema);
