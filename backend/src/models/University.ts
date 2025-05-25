import mongoose, { Schema, Document } from 'mongoose';

export interface IUniversity extends Document {
  name: string;
  country: string;
  city: string;
  ranking: number;
  programs: {
    name: string;
    level: string;
    department: string;
    duration: number;
    tuition: number;
    gpaRequirement: number;
    toeflRequirement?: number;
    ieltsRequirement?: number;
    greRequirement?: number;
    satRequirement?: number;
    researchOpportunities: boolean;
    facultyInfo: string[];
    careerOutcomes: string[];
  }[];
  admissionCriteria: {
    averageGPA: number;
    acceptanceRate: number;
    applicationFee: number;
    requiredDocuments: string[];
  };
  financialInfo: {
    averageCostOfLiving: number;
    scholarshipsAvailable: boolean;
    workStudyOptions: boolean;
  };
  location: {
    coordinates: [number, number];
    address: string;
    campusSize: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UniversitySchema: Schema = new Schema(
  {
    name: { type: String, required: true, index: true },
    country: { type: String, required: true, index: true },
    city: { type: String, required: true },
    ranking: { type: Number },
    programs: [
      {
        name: { type: String, required: true },
        level: { type: String, required: true, enum: ['Undergraduate', 'Masters', 'PhD', 'Professional'] },
        department: { type: String, required: true },
        duration: { type: Number, required: true }, // in years
        tuition: { type: Number, required: true }, // annual tuition in USD
        gpaRequirement: { type: Number },
        toeflRequirement: { type: Number },
        ieltsRequirement: { type: Number },
        greRequirement: { type: Number },
        satRequirement: { type: Number },
        researchOpportunities: { type: Boolean, default: false },
        facultyInfo: [{ type: String }],
        careerOutcomes: [{ type: String }]
      }
    ],
    admissionCriteria: {
      averageGPA: { type: Number },
      acceptanceRate: { type: Number },
      applicationFee: { type: Number },
      requiredDocuments: [{ type: String }]
    },
    financialInfo: {
      averageCostOfLiving: { type: Number }, // monthly in USD
      scholarshipsAvailable: { type: Boolean, default: false },
      workStudyOptions: { type: Boolean, default: false }
    },
    location: {
      coordinates: { type: [Number], index: '2dsphere' }, // [longitude, latitude]
      address: { type: String },
      campusSize: { type: String }
    }
  },
  { timestamps: true }
);

// Create indexes for efficient querying
UniversitySchema.index({ 'programs.name': 1 });
UniversitySchema.index({ 'programs.level': 1 });
UniversitySchema.index({ 'programs.department': 1 });
UniversitySchema.index({ ranking: 1 });

export default mongoose.model<IUniversity>('University', UniversitySchema);
