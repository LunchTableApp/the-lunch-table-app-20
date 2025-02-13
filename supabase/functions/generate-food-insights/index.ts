
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      console.error('OpenAI API key not found in environment');
      throw new Error('OpenAI API key not configured');
    }

    console.log('API Key present:', !!openAIApiKey);

    const { foodName } = await req.json();
    if (!foodName) {
      throw new Error('Food name is required');
    }

    console.log('Starting OpenAI request for food:', foodName);
    console.log('Making request to OpenAI API...');

    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey.trim()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a positive and encouraging nutritionist. Focus only on the beneficial aspects and positive nutritional value of foods. Keep responses under 100 words and highlight only the good qualities and health benefits. Do not mention calories, macronutrients, or any numerical measurements. Do not mention any drawbacks, warnings, or negative aspects. Focus on nutrients, vitamins, minerals, and general well-being benefits.'
          },
          {
            role: 'user',
            content: `What are the key nutritional benefits and positive qualities of ${foodName}?`
          }
        ],
        