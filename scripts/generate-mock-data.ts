import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';

// Generate mock user data
const generateUsers = (count: number) => {
  const users = [];
  
  for (let i = 0; i < count; i++) {
    const user = {
      email: faker.internet.email(),
      password: 'password123', // In a real app, this would be hashed
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      profileCompleted: faker.datatype.boolean(0.8),
      academicRecords: {
        gpa: faker.number.float({ min: 2.5, max: 4.0, precision: 0.1 }),
        toeflScore: faker.number.int({ min: 80, max: 120 }),
        ieltsScore: faker.number.float({ min: 5.5, max: 9.0, precision: 0.5 }),
        greScore: faker.number.int({ min: 290, max: 340 }),
        satScore: faker.number.int({ min: 1000, max: 1600 }),
        transcripts: [faker.system.filePath(), faker.system.filePath()]
      },
      extracurricular: {
        activities: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => faker.lorem.words(3)),
        achievements: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () => faker.lorem.sentence()),
        awards: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () => faker.lorem.sentence())
      },
      researchInterests: Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, () => faker.lorem.words(2)),
      publications: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () => faker.lorem.sentence()),
      workExperience: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () => ({
        position: faker.person.jobTitle(),
        company: faker.company.name(),
        startDate: faker.date.past(),
        endDate: faker.datatype.boolean(0.7) ? faker.date.recent() : undefined,
        description: faker.lorem.paragraph()
      })),
      skills: Array.from({ length: faker.number.int({ min: 2, max: 8 }) }, () => faker.lorem.word()),
      preferences: {
        budget: faker.number.int({ min: 10000, max: 100000 }),
        countries: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => faker.location.country()),
        programTypes: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => 
          faker.helpers.arrayElement(['Undergraduate', 'Masters', 'PhD', 'Professional'])),
        careerGoals: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => faker.lorem.words(3))
      },
      familyDetails: faker.datatype.boolean(0.3) ? {
        spouseEmployment: faker.person.jobTitle(),
        childrenSchooling: faker.lorem.sentence()
      } : undefined,
      documents: Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, () => ({
        name: faker.system.fileName(),
        type: faker.helpers.arrayElement(['CV', 'SOP', 'LOR', 'Transcript', 'Certificate']),
        path: faker.system.filePath(),
        uploadDate: faker.date.recent(),
        version: faker.number.int({ min: 1, max: 3 })
      }))
    };
    
    users.push(user);
  }
  
  return users;
};

// Generate mock university data
const generateUniversities = (count: number) => {
  const universities = [];
  
  for (let i = 0; i < count; i++) {
    const university = {
      name: faker.company.name() + ' University',
      country: faker.location.country(),
      city: faker.location.city(),
      ranking: faker.number.int({ min: 1, max: 1000 }),
      programs: Array.from({ length: faker.number.int({ min: 5, max: 20 }) }, () => ({
        name: faker.lorem.words(3) + ' Program',
        level: faker.helpers.arrayElement(['Undergraduate', 'Masters', 'PhD', 'Professional']),
        department: faker.lorem.words(2) + ' Department',
        duration: faker.number.int({ min: 1, max: 5 }),
        tuition: faker.number.int({ min: 5000, max: 50000 }),
        gpaRequirement: faker.number.float({ min: 2.5, max: 4.0, precision: 0.1 }),
        toeflRequirement: faker.number.int({ min: 80, max: 110 }),
        ieltsRequirement: faker.number.float({ min: 6.0, max: 8.0, precision: 0.5 }),
        greRequirement: faker.number.int({ min: 290, max: 330 }),
        satRequirement: faker.number.int({ min: 1100, max: 1500 }),
        researchOpportunities: faker.datatype.boolean(),
        facultyInfo: Array.from({ length: faker.number.int({ min: 3, max: 10 }) }, () => 
          faker.person.fullName() + ', ' + faker.person.jobTitle()),
        careerOutcomes: Array.from({ length: faker.number.int({ min: 3, max: 8 }) }, () => 
          faker.lorem.sentence())
      })),
      admissionCriteria: {
        averageGPA: faker.number.float({ min: 3.0, max: 3.9, precision: 0.1 }),
        acceptanceRate: faker.number.float({ min: 0.05, max: 0.7, precision: 0.01 }),
        applicationFee: faker.number.int({ min: 50, max: 200 }),
        requiredDocuments: [
          'Transcripts',
          'Statement of Purpose',
          'Letters of Recommendation',
          'CV/Resume',
          ...Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () => faker.lorem.words(2) + ' Certificate')
        ]
      },
      financialInfo: {
        averageCostOfLiving: faker.number.int({ min: 500, max: 3000 }),
        scholarshipsAvailable: faker.datatype.boolean(0.8),
        workStudyOptions: faker.datatype.boolean(0.7)
      },
      location: {
        coordinates: [
          parseFloat(faker.location.longitude()),
          parseFloat(faker.location.latitude())
        ],
        address: faker.location.streetAddress() + ', ' + faker.location.city() + ', ' + faker.location.country(),
        campusSize: faker.helpers.arrayElement(['Small', 'Medium', 'Large', 'Very Large'])
      }
    };
    
    universities.push(university);
  }
  
  return universities;
};

// Generate mock scholarship data
const generateScholarships = (count: number) => {
  const scholarships = [];
  
  for (let i = 0; i < count; i++) {
    const scholarship = {
      name: faker.company.name() + ' ' + faker.lorem.word() + ' Scholarship',
      provider: faker.company.name(),
      type: faker.helpers.arrayElement(['university', 'government', 'private', 'foundation', 'corporate']),
      amount: faker.number.int({ min: 1000, max: 50000 }),
      currency: faker.helpers.arrayElement(['USD', 'EUR', 'GBP', 'CAD', 'AUD']),
      description: faker.lorem.paragraph(),
      eligibility: {
        nationalities: Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, () => 
          faker.location.country()),
        academicLevels: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () => 
          faker.helpers.arrayElement(['Undergraduate', 'Masters', 'PhD', 'Professional'])),
        fields: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => 
          faker.lorem.words(2)),
        minimumGPA: faker.number.float({ min: 3.0, max: 3.8, precision: 0.1 }),
        languageRequirements: {
          toefl: faker.number.int({ min: 80, max: 110 }),
          ielts: faker.number.float({ min: 6.0, max: 8.0, precision: 0.5 })
        },
        otherCriteria: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () => 
          faker.lorem.sentence())
      },
      applicationProcess: {
        deadline: faker.date.future(),
        requiredDocuments: [
          'Application Form',
          'Transcripts',
          'Statement of Purpose',
          ...Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () => 
            faker.lorem.words(2) + ' Document')
        ],
        applicationUrl: faker.internet.url(),
        applicationFee: faker.datatype.boolean(0.3) ? faker.number.int({ min: 10, max: 100 }) : undefined
      },
      renewalCriteria: faker.datatype.boolean(0.7) ? faker.lorem.paragraph() : undefined,
      successRate: faker.datatype.boolean(0.6) ? faker.number.float({ min: 0.05, max: 0.5, precision: 0.01 }) : undefined
    };
    
    scholarships.push(scholarship);
  }
  
  return scholarships;
};

// Generate mock visa data
const generateVisaData = (count: number) => {
  const countries = ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'Singapore', 'Netherlands', 'Sweden'];
  const visaData = [];
  
  for (const country of countries) {
    const visaTypes = Array.from({ length: faker.number.int({ min: 2, max: 5 }) }, () => ({
      type: faker.helpers.arrayElement(['Student', 'Work', 'Tourist', 'Dependent', 'Research']),
      description: faker.lorem.paragraph(),
      eligibility: faker.lorem.paragraph(),
      processingTime: faker.helpers.arrayElement(['2-4 weeks', '4-8 weeks', '8-12 weeks', '3-6 months']),
      fee: faker.number.int({ min: 100, max: 500 }),
      currency: faker.helpers.arrayElement(['USD', 'EUR', 'GBP', 'CAD', 'AUD']),
      requiredDocuments: [
        'Valid Passport',
        'Acceptance Letter',
        'Financial Proof',
        'Health Insurance',
        ...Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => 
          faker.lorem.words(2) + ' Document')
      ],
      applicationSteps: Array.from({ length: faker.number.int({ min: 3, max: 7 }) }, (_, index) => ({
        step: index + 1,
        description: faker.lorem.sentence()
      })),
      interviewQuestions: Array.from({ length: faker.number.int({ min: 5, max: 15 }) }, () => 
        faker.lorem.sentence() + '?'),
      restrictions: Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, () => 
        faker.lorem.sentence()),
      postArrivalRequirements: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => 
        faker.lorem.sentence())
    }));
    
    visaData.push({
      country,
      visaTypes,
      embassyContact: {
        website: faker.internet.url(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        address: faker.location.streetAddress() + ', ' + faker.location.city()
      },
      generalRequirements: faker.lorem.paragraph(),
      tips: Array.from({ length: faker.number.int({ min: 3, max: 8 }) }, () => 
        faker.lorem.sentence())
    });
  }
  
  return visaData;
};

// Generate mock cultural data
const generateCulturalData = (count: number) => {
  const countries = ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'Singapore', 'Netherlands', 'Sweden'];
  const culturalData = [];
  
  for (const country of countries) {
    culturalData.push({
      country,
      academicCulture: {
        classroomNorms: faker.lorem.paragraph(),
        professorStudentRelationship: faker.lorem.paragraph(),
        groupWork: faker.lorem.paragraph(),
        academicIntegrity: faker.lorem.paragraph(),
        gradingSystem: faker.lorem.paragraph()
      },
      socialNorms: {
        greetings: faker.lorem.paragraph(),
        personalSpace: faker.lorem.paragraph(),
        punctuality: faker.lorem.paragraph(),
        tipping: faker.lorem.paragraph(),
        taboos: faker.lorem.paragraph()
      },
      dailyLife: {
        transportation: faker.lorem.paragraph(),
        housing: faker.lorem.paragraph(),
        food: faker.lorem.paragraph(),
        healthcare: faker.lorem.paragraph(),
        banking: faker.lorem.paragraph()
      },
      language: {
        officialLanguage: faker.helpers.arrayElement(['English', 'French', 'German', 'Japanese', 'Dutch', 'Swedish']),
        usefulPhrases: Array.from({ length: faker.number.int({ min: 5, max: 15 }) }, () => ({
          phrase: faker.lorem.words(3),
          meaning: faker.lorem.sentence()
        })),
        languageResources: Array.from({ length: faker.number.int({ min: 3, max: 8 }) }, () => ({
          name: faker.company.name() + ' Language Resource',
          url: faker.internet.url(),
          description: faker.lorem.sentence()
        }))
      },
      communityResources: Array.from({ length: faker.number.int({ min: 5, max: 15 }) }, () => ({
        name: faker.company.name() + ' ' + faker.lorem.word() + ' Association',
        type: faker.helpers.arrayElement(['Student Organization', 'Cultural Center', 'Religious Group', 'Sports Club', 'Professional Network']),
        description: faker.lorem.paragraph(),
        contactInfo: {
          website: faker.internet.url(),
          email: faker.internet.email(),
          phone: faker.phone.number()
        },
        events: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
          name: faker.lorem.words(3) + ' Event',
          date: faker.date.future(),
          description: faker.lorem.sentence()
        }))
      })),
      adaptationTips: Array.from({ length: faker.number.int({ min: 5, max: 10 }) }, () => 
        faker.lorem.sentence())
    });
  }
  
  return culturalData;
};

// Generate mock career data
const generateCareerData = (count: number) => {
  const careerData = [];
  
  for (let i = 0; i < count; i++) {
    careerData.push({
      jobTitle: faker.person.jobTitle(),
      company: faker.company.name(),
      location: faker.location.city() + ', ' + faker.location.country(),
      industry: faker.helpers.arrayElement(['Technology', 'Healthcare', 'Finance', 'Education', 'Engineering', 'Marketing', 'Consulting', 'Research']),
      jobType: faker.helpers.arrayElement(['Full-time', 'Part-time', 'Contract', 'Internship']),
      description: faker.lorem.paragraphs(3),
      requirements: {
        education: faker.helpers.arrayElement(['Bachelor\'s', 'Master\'s', 'PhD', 'Professional Degree']),
        experience: faker.helpers.arrayElement(['Entry Level', '1-3 years', '3-5 years', '5+ years']),
        skills: Array.from({ length: faker.number.int({ min: 3, max: 10 }) }, () => 
          faker.lorem.words(2)),
        languages: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => 
          faker.helpers.arrayElement(['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese']))
      },
      salary: {
        min: faker.number.int({ min: 30000, max: 80000 }),
        max: faker.number.int({ min: 80001, max: 200000 }),
        currency: faker.helpers.arrayElement(['USD', 'EUR', 'GBP', 'CAD', 'AUD'])
      },
      benefits: Array.from({ length: faker.number.int({ min: 3, max: 8 }) }, () => 
        faker.lorem.sentence()),
      applicationProcess: {
        steps: Array.from({ length: faker.number.int({ min: 3, max: 6 }) }, (_, index) => ({
          step: index + 1,
          description: faker.lorem.sentence()
        })),
        deadline: faker.date.future(),
        contactEmail: faker.internet.email()
      },
      interviewQuestions: Array.from({ length: faker.number.int({ min: 5, max: 15 }) }, () => 
        faker.lorem.sentence() + '?'),
      visaSponsorship: faker.datatype.boolean(0.4),
      remoteWork: faker.helpers.arrayElement(['Remote', 'Hybrid', 'On-site']),
      careerPath: {
        entryLevel: faker.person.jobTitle(),
        midLevel: faker.person.jobTitle(),
        seniorLevel: faker.person.jobTitle()
      }
    });
  }
  
  return careerData;
};

// Generate all mock data
const generateAllMockData = () => {
  const mockData = {
    users: generateUsers(2000),
    universities: generateUniversities(1000),
    scholarships: generateScholarships(500),
    visaData: generateVisaData(50),
    culturalData: generateCulturalData(50),
    careerData: generateCareerData(500)
  };
  
  return mockData;
};

// Save mock data to JSON files
const saveMockData = () => {
  const mockData = generateAllMockData();
  const outputDir = path.join(__dirname, '../database/seeds');
  
  // Ensure directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Save each data set to a separate file
  Object.entries(mockData).forEach(([key, data]) => {
    fs.writeFileSync(
      path.join(outputDir, `${key}.json`),
      JSON.stringify(data, null, 2)
    );
    console.log(`Generated ${data.length} ${key} records`);
  });
  
  console.log('All mock data generated successfully!');
};

// Execute the function
saveMockData();
