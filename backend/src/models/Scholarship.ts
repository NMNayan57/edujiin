import mongoose, { Schema, Document } from 'mongoose';

export interface IScholarship extends Document {
  name: string;
  provider: string;
  type: string; // university, government, private
  amount: number;
  currency: string;
  description: string;
  eligibility: {
    nationalities: string[];
    academicLevels: string[];
    fields: string[];
    minimumGPA?: number;
    languageRequirements?: {
      toefl?: number;
      ielts?: number;
    };
    otherCriteria: string[];
  };
  applicationProcess: {
    deadline: Date;
    requiredDocuments: string[];
    applicationUrl: string;
    applicationFee?: number;
  };
  renewalCriteria?: string;
  successRate?: number;
  createdAt: Date;
  updatedAt: Date;
}

const ScholarshipSchema: Schema = new Schema(
  {
    name: { type: String, required: true, index: true },
    provider: { type: String, required: true },
    type: { 
      type: String, 
      required: true, 
      enum: ['university', 'government', 'private', 'foundation', 'corporate'],
      index: true
    },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: 'USD' },
    description: { type: String, required: true },
    eligibility: {
      nationalities: [{ type: String, index: true }],
      academicLevels: [{ 
        type: String, 
        enum: ['Undergraduate', 'Masters', 'PhD', 'Professional'],
        index: true
      }],
      fields: [{ type: String, index: true }],
      minimumGPA: { type: Number },
      languageRequirements: {
        toefl: { type: Number },
        ielts: { type: Number }
      },
      otherCriteria: [{ type: String }]
    },
    applicationProcess: {
      deadline: { type: Date, index: true },
      requiredDocuments: [{ type: String }],
      applicationUrl: { type: String },
      applicationFee: { type: Number }
    },
    renewalCriteria: { type: String },
    successRate: { type: Number }
  },
  { timestamps: true }
);

export default mongoose.model<IScholarship>('Scholarship', ScholarshipSchema);
