// OpenAI Service - Replacement for Base44 InvokeLLM
// This service provides AI capabilities using OpenAI API directly

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

/**
 * Invoke LLM with a prompt and optional JSON schema for structured responses
 * @param {Object} options
 * @param {string} options.prompt - The prompt to send to the LLM
 * @param {Object} options.response_json_schema - Optional JSON schema for structured responses
 * @param {boolean} options.add_context_from_internet - Not used (was Base44 feature)
 * @returns {Promise<Object>} - The parsed response from the LLM
 */
export async function invokeLLM({ prompt, response_json_schema, add_context_from_internet = false }) {
    if (!OPENAI_API_KEY) {
        console.error('[OpenAI] API key not configured. Please set VITE_OPENAI_API_KEY in .env');
        throw new Error('OpenAI API key not configured');
    }

    try {
        const requestBody = {
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: 'אתה עוזר AI מועיל שמגיב בעברית. כשמבקשים ממך להחזיר JSON, החזר רק JSON תקין ללא טקסט נוסף.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 4096
        };

        // If JSON schema is provided, request JSON response format
        if (response_json_schema) {
            requestBody.response_format = { type: 'json_object' };
        }

        console.log('[OpenAI] Sending request...');
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('[OpenAI] API Error:', response.status, errorData);
            throw new Error(errorData.error?.message || `OpenAI API error: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.choices || !data.choices[0]?.message?.content) {
            console.error('[OpenAI] Invalid response structure:', data);
            throw new Error('Invalid response from OpenAI');
        }

        const content = data.choices[0].message.content;
        console.log('[OpenAI] Response received successfully');

        // If JSON schema was provided, parse the response as JSON
        if (response_json_schema) {
            try {
                return JSON.parse(content);
            } catch (parseError) {
                console.error('[OpenAI] Failed to parse JSON response:', content);
                // Try to extract JSON from the response
                const jsonMatch = content.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    return JSON.parse(jsonMatch[0]);
                }
                throw new Error('Failed to parse LLM response as JSON');
            }
        }

        // Return raw content if no JSON schema
        return content;

    } catch (error) {
        console.error('[OpenAI] Error:', error);
        throw error;
    }
}

/**
 * InvokeLLM with retry logic for better reliability
 * @param {Object} options - Same as invokeLLM
 * @param {number} retries - Number of retries (default: 2)
 * @returns {Promise<Object>} - The parsed response from the LLM
 */
export async function invokeLLMWithRetry(options, retries = 2) {
    let lastError;
    
    for (let i = 0; i <= retries; i++) {
        try {
            return await invokeLLM(options);
        } catch (error) {
            lastError = error;
            console.warn(`[OpenAI] Attempt ${i + 1} failed:`, error.message);
            
            if (i < retries) {
                // Wait before retry with exponential backoff
                await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
            }
        }
    }
    
    throw lastError;
}

export default { invokeLLM, invokeLLMWithRetry };

