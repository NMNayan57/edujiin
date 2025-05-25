import express from 'express';
import { DeepSeekAI } from '../../ai/deepseek/index';

const router = express.Router();
const deepseekAI = new DeepSeekAI();

// Profile analysis endpoint
router.post('/analyze-profile', async (req, res) => {
  try {
    const profileData = req.body;
    const analysis = await deepseekAI.analyzeProfile(profileData);
    res.json({ success: true, analysis });
  } catch (error) {
    console.error('Error analyzing profile:', error);
    res.status(500).json({ success: false, error: 'Failed to analyze profile' });
  }
});

// University matching endpoint
router.post('/match-universities', async (req, res) => {
  try {
    const { profileData, universityData } = req.body;
    const matches = await deepseekAI.matchUniversities(profileData, universityData);
    res.json({ success: true, matches });
  } catch (error) {
    console.error('Error matching universities:', error);
    res.status(500).json({ success: false, error: 'Failed to match universities' });
  }
});

// Scholarship matching endpoint
router.post('/match-scholarships', async (req, res) => {
  try {
    const { profileData, scholarshipData } = req.body;
    const matches = await deepseekAI.matchScholarships(profileData, scholarshipData);
    res.json({ success: true, matches });
  } catch (error) {
    console.error('Error matching scholarships:', error);
    res.status(500).json({ success: false, error: 'Failed to match scholarships' });
  }
});

// Application timeline generation endpoint
router.post('/generate-timeline', async (req, res) => {
  try {
    const { profileData, deadlines } = req.body;
    const timeline = await deepseekAI.generateTimeline(profileData, deadlines);
    res.json({ success: true, timeline });
  } catch (error) {
    console.error('Error generating timeline:', error);
    res.status(500).json({ success: false, error: 'Failed to generate timeline' });
  }
});

// Document enhancement endpoint
router.post('/enhance-document', async (req, res) => {
  try {
    const { documentText, documentType, programInfo } = req.body;
    const enhancedDocument = await deepseekAI.enhanceDocument(documentText, documentType, programInfo);
    res.json({ success: true, enhancedDocument });
  } catch (error) {
    console.error('Error enhancing document:', error);
    res.status(500).json({ success: false, error: 'Failed to enhance document' });
  }
});

// Visa guidance endpoint
router.post('/visa-guidance', async (req, res) => {
  try {
    const studentInfo = req.body;
    const visaGuidance = await deepseekAI.generateVisaGuidance(studentInfo);
    res.json({ success: true, visaGuidance });
  } catch (error) {
    console.error('Error generating visa guidance:', error);
    res.status(500).json({ success: false, error: 'Failed to generate visa guidance' });
  }
});

// Cultural adaptation guidance endpoint
router.post('/cultural-guidance', async (req, res) => {
  try {
    const { originCountry, destinationCountry, interests } = req.body;
    const culturalGuidance = await deepseekAI.generateCulturalGuidance(originCountry, destinationCountry, interests);
    res.json({ success: true, culturalGuidance });
  } catch (error) {
    console.error('Error generating cultural guidance:', error);
    res.status(500).json({ success: false, error: 'Failed to generate cultural guidance' });
  }
});

// Career matching endpoint
router.post('/match-careers', async (req, res) => {
  try {
    const { studentInfo, jobOpportunities } = req.body;
    const matches = await deepseekAI.matchCareers(studentInfo, jobOpportunities);
    res.json({ success: true, matches });
  } catch (error) {
    console.error('Error matching careers:', error);
    res.status(500).json({ success: false, error: 'Failed to match careers' });
  }
});

// Conversational AI endpoint
router.post('/chat', async (req, res) => {
  try {
    const { query, contextData } = req.body;
    const response = await deepseekAI.generateConversationalResponse(query, contextData);
    res.json({ success: true, response });
  } catch (error) {
    console.error('Error generating conversational response:', error);
    res.status(500).json({ success: false, error: 'Failed to generate conversational response' });
  }
});

export default router;
