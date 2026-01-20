const { GoogleGenerativeAI } = require("@google/generative-ai");
const logger = require('../../utils/logger');

// Initialize Gemini
let genAI = null;
let isAIConfigured = false;

try {
    const apiKey = process.env.GOOGLE_API_KEY;
    
    if (apiKey && apiKey.trim() !== '' && apiKey.startsWith('AIza')) {
        genAI = new GoogleGenerativeAI(apiKey.trim());
        isAIConfigured = true;
        logger.info('✅ Gemini AI service initialized with FREE LATEST models');
    } else {
        logger.warn('⚠️ Gemini API key missing. AI features disabled.');
    }
} catch (error) {
    logger.error('Gemini initialization error:', error.message);
}

class ChatbotService {
    constructor() {
        // USE THESE MODELS - THEY'RE FREE AND WORK!
        this.availableModels = [
            'gemini-flash-latest',      // Fast, free, latest flash
            'gemini-flash-lite-latest', // Even lighter
            'gemini-pro-latest',        // Latest pro model
            'gemini-2.0-flash-lite',    // Might work with free tier
            'gemini-2.0-flash-lite-001' // Another free option
        ];
        
        this.currentModelIndex = 0;
        this.modelName = this.availableModels[0];
    }

    async processQuery(userId, query) {
        if (!isAIConfigured || !genAI) {
            return this.getFallbackResponse(query);
        }

        // Try all available models in sequence
        for (let i = 0; i < this.availableModels.length; i++) {
            const modelToTry = this.availableModels[i];
            
            try {
                logger.info(`🔄 Trying Gemini model: ${modelToTry}`);
                
                const model = genAI.getGenerativeModel({ 
                    model: modelToTry 
                });

                // const prompt = `You are MediTracker AI, a helpful medication assistant.
                // User query: "${query}"
                
                // Please respond helpfully about:
                // - Medication schedules and timing
                // - Side effect information  
                // - Adherence tips
                // - General medication questions
                
                // Always remind users to consult healthcare professionals for medical advice.
                // Keep response concise, empathetic, and under 300 words.`;
                const prompt = `You are MediTracker AI, a helpful medication assistant.
User query: "${query}"

Give a detailed answer in full sentences.
Use bullet points if necessary.
Explain clearly all symptoms, side effects, and recommendations.
Always remind users to consult healthcare professionals.`;
                const result = await model.generateContent({
                    contents: [
                        {
                            role: "user",
                            parts: [{ text: prompt }]
                        }
                    ],
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 1000,
                    }
                });

                const response = await result.response;
                const aiResponse = response.text();
                
                // Update current model if this one works
                this.currentModelIndex = i;
                this.modelName = modelToTry;
                
                logger.info(`✅ Success with model: ${modelToTry}`);
                
                return {
                    success: true,
                    response: aiResponse,
                    model: modelToTry,
                    free: true
                };

            } catch (error) {
                logger.warn(`❌ Model ${modelToTry} failed: ${error.message}`);
                
                // If it's a quota error, try next model
                if (error.message.includes('quota') || error.message.includes('billing')) {
                    continue; // Try next model
                }
                
                // For other errors, use fallback
                break;
            }
        }
        
        // All models failed, use fallback
        logger.warn('All Gemini models failed, using fallback response');
        return this.getFallbackResponse(query);
    }

    getFallbackResponse(query) {
        const lowerQuery = query.toLowerCase();
        
        // Smart fallback responses
        if (/(hi|hello|hey)/.test(lowerQuery)) {
            return "Hello! 👋 I'm your MediTracker AI Assistant. How can I help with your medications today? 💊";
        }
        
        if (/(schedule|time|when)/.test(lowerQuery)) {
            return `**Medication Scheduling Tips:**\n• Take at same time daily\n• Set reminders in MediTracker\n• Use pill organizers\n• Space doses evenly\n\nEnable push notifications to never miss a dose! 🔔`;
        }
        
        if (/(side|effect|symptom)/.test(lowerQuery)) {
            return `**Side Effect Guidance:**\n• Contact doctor for severe symptoms\n• Note mild effects in health log\n• Never stop medication suddenly\n• Report all symptoms to healthcare provider\n\n🚨 For emergencies, seek immediate medical attention!`;
        }
        
        if (/(forgot|missed|skip)/.test(lowerQuery)) {
            return `**Missed Dose Protocol:**\n1. Take as soon as you remember\n2. If near next dose, skip missed one\n3. NEVER double dose\n4. Record in MediTracker app\n5. Adjust future reminders\n\nSet multiple reminders to avoid missing doses!`;
        }
        
        return `I'm your MediTracker AI Assistant! I can help with:\n• Medication schedules and reminders\n• Side effect information\n• Adherence improvement tips\n• General medication questions\n\nWhat would you like to know about your medications? 💊`;
    }

    async healthCheck() {
        if (!isAIConfigured) {
            return {
                service: 'Google Gemini AI',
                configured: false,
                status: 'DISABLED ❌',
                error: 'API key not configured'
            };
        }

        // Test if any model works
        for (const modelName of this.availableModels.slice(0, 2)) {
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Say 'OK'");
                const response = await result.response;
                
                return {
                    service: 'Google Gemini AI',
                    configured: true,
                    status: 'ACTIVE ✅',
                    workingModel: modelName,
                    testResponse: response.text(),
                    free: true,
                    availableModels: this.availableModels
                };
            } catch (error) {
                continue;
            }
        }
        
        return {
            service: 'Google Gemini AI',
            configured: true,
            status: 'ERROR ⚠️',
            error: 'All models failed',
            fallback: 'Using enhanced responses',
            availableModels: this.availableModels
        };
    }
}

module.exports = new ChatbotService();