
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
        max_tokens: 150,
        temperature: 0.7
      })
    });

    if (!openAIResponse.ok) {
      const errorData = await openAIResponse.json();
      console.error('OpenAI API error details:', errorData);
      
      // Check for quota exceeded error
      if (errorData.error?.code === 'insufficient_quota') {
        return new Response(
          JSON.stringify({ 
            error: 'OpenAI API quota exceeded', 
            details: 'Please check your OpenAI account billing and quota.' 
          }),
          { 
            status: 402,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      
      throw new Error(`OpenAI API error: ${JSON.stringify(errorData)}`);
    }

    const data = await openAIResponse.json();
    console.log('OpenAI response received successfully');

    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response format from OpenAI');
    }

    const insights = data.choices[0].message.content;
    console.log('Generated insights:', insights);

    return new Response(
      JSON.stringify({ insights }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Function error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate food insights', 
        details: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
