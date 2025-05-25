import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

// User profile interface
export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  profileCompleted: boolean;
  academicRecords: {
    gpa: number;
    toeflScore?: number;
    ieltsScore?: number;
    greScore?: number;
    satScore?: number;
    transcripts: string[];
  };
  extracurricular: {
    activities: string[];
    achievements: string[];
    awards: string[];
  };
  researchInterests: string[];
  publications: string[];
  workExperience: {
    position: string;
    company: string;
    startDate: Date;
    endDate?: Date;
    description: string;
  }[];
  skills: string[];
  preferences: {
    budget: number;
    countries: string[];
    programTypes: string[];
    careerGoals: string[];
  };
  familyDetails?: {
    spouseEmployment?: string;
    childrenSchooling?: string;
  };
  documents: {
    name: string;
    type: string;
    path: string;
    uploadDate: Date;
    version: number;
  }[];
  comparePassword(candidatePassword: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

// User schema
const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profileCompleted: { type: Boolean, default: false },
    academicRecords: {
      gpa: { type: Number },
      toeflScore: { type: Number },
      ieltsScore: { type: Number },
      greScore: { type: Number },
      satScore: { type: Number },
      transcripts: [{ type: String }]
    },
    extracurricular: {
      activities: [{ type: String }],
      achievements: [{ type: String }],
      awards: [{ type: String }]
    },
    researchInterests: [{ type: String }],
    publications: [{ type: String }],
    workExperience: [
      {
        position: { type: String },
        company: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        description: { type: String }
      }
    ],
    skills: [{ type: String }],
    preferences: {
      budget: { type: Number },
      countries: [{ type: String }],
      programTypes: [{ type: String }],
      careerGoals: [{ type: String }]
    },
    familyDetails: {
      spouseEmployment: { type: String },
      childrenSchooling: { type: String }
    },
    documents: [
      {
        name: { type: String },
        type: { type: String },
        path: { type: String },
        uploadDate: { type: Date, default: Date.now },
        version: { type: Number, default: 1 }
      }
    ]
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
