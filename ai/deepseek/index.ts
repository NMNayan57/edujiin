import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

interface DeepSeekResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export class DeepSeekAI {
  private apiKey: string;

  constructor(apiKey: string = OPENROUTER_API_KEY || '') {
    this.apiKey = apiKey;
  }

  /**
   * Generate a profile analysis based on student data
   */
  async analyzeProfile(profileData: any): Promise<string> {
    const prompt = `Given this student profile ${JSON.stringify(profileData)}, analyze academic and extracurricular strengths/weaknesses, and provide three actionable recommendations to improve university application competitiveness.`;
    
    return this.generateResponse(prompt);
  }

  /**
   * Match universities based on student profile
   */
  async matchUniversities(profileData: any, universityData: any[]): Promise<string> {
    const prompt = `Search this university database ${JSON.stringify(universityData)} for programs matching this student profile ${JSON.stringify(profileData)}. Return top 10 programs with match scores (0-100) and admission probabilities based on historical patterns.`;
    
    return this.generateResponse(prompt);
  }

  /**
   * Match scholarships based on student profile
   */
  async matchScholarships(profileData: any, scholarshipData: any[]): Promise<string> {
    const prompt = `Match this student profile ${JSON.stringify(profileData)} with this scholarship database ${JSON.stringify(scholarshipData)}. Return top 5 scholarships with eligibility scores (0-100) and predicted success likelihood.`;
    
    return this.generateResponse(prompt);
  }

  /**
   * Generate application timeline
   */
  async generateTimeline(profileData: any, deadlines: any[]): Promise<string> {
    const prompt = `Given this student profile ${JSON.stringify(profileData)} and deadlines ${JSON.stringify(deadlines)}, generate a prioritized application timeline with task recommendations.`;
    
    return this.generateResponse(prompt);
  }

  /**
   * Analyze and enhance documents
   */
  async enhanceDocument(documentText: string, documentType: string, programInfo: any): Promise<string> {
    const prompt = `Analyze this ${documentType} draft "${documentText}" for a ${programInfo.program} application. Suggest improvements for structure, clarity, and impact, and rephrase key sections to align with program requirements ${JSON.stringify(programInfo)}.`;
    
    return this.generateResponse(prompt);
  }

  /**
   * Generate visa guidance
   */
  async generateVisaGuidance(studentInfo: any): Promise<string> {
    const prompt = `Generate a visa document checklist and 10 interview questions for a student ${JSON.stringify(studentInfo)} applying for an F-1 visa, with feedback on sample responses.`;
    
    return this.generateResponse(prompt);
  }

  /**
   * Generate cultural adaptation guidance
   */
  async generateCulturalGuidance(originCountry: string, destinationCountry: string, interests: string[]): Promise<string> {
    const prompt = `Provide cultural adaptation guidance for a student from ${originCountry} studying in ${destinationCountry}, including academic/social norms and three community recommendations based on interests ${JSON.stringify({interests})}.`;
    
    return this.generateResponse(prompt);
  }

  /**
   * Match career opportunities
   */
  async matchCareers(studentInfo: any, jobOpportunities: any[]): Promise<string> {
    const prompt = `Match this student ${JSON.stringify(studentInfo)} with job opportunities ${JSON.stringify(jobOpportunities)} and generate 10 interview questions with feedback for ${studentInfo.industry || 'their industry'}.`;
    
    return this.generateResponse(prompt);
  }

  /**
   * Conversational AI response
   */
  async generateConversationalResponse(query: string, contextData: any): Promise<string> {
    const prompt = `Respond to this user query "${query}" with accurate information based on platform data ${JSON.stringify(contextData)}, maintaining a natural, concise tone.`;
    
    return this.generateResponse(prompt);
  }

  /**
   * Generate response using DeepSeek via OpenRouter
   */
  private async generateResponse(prompt: string): Promise<string> {
    try {
      const response = await axios.post<DeepSeekResponse>(
        OPENROUTER_URL,
        {
          model: 'deepseek/deepseek-chat',
          messages: [
            { role: 'system', content: 'You are an AI assistant for international students, providing accurate, helpful, and concise guidance.' },
            { role: 'user', content: prompt }
          ]
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling DeepSeek AI:', error);
      return this.getFallbackResponse(prompt);
    }
  }

  /**
   * Provide fallback responses when AI is unavailable
   */
  private getFallbackResponse(prompt: string): string {
    // Simple rule-based fallbacks
    if (prompt.includes('analyze') && prompt.includes('profile')) {
      return 'Based on your profile, your academic achievements are strong. Consider enhancing your extracurricular activities, gaining relevant work experience, and improving your standardized test scores if applicable.';
    }
    
    if (prompt.includes('university') || prompt.includes('program')) {
      return 'Based on your profile, consider universities that match your academic strengths and career goals. Top universities typically require strong academic records and relevant extracurricular activities.';
    }
    
    if (prompt.includes('scholarship')) {
      return 'Look for scholarships that match your nationality, field of study, and academic achievements. Many scholarships also value leadership experience and community involvement.';
    }
    
    return 'I apologize, but I cannot provide a detailed response at this moment. Please try again later or contact support for assistance.';
  }
}
