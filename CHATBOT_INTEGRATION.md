# Chatbot Integration Guide

## Overview
The TechNova Systems simulator includes a floating chat interface that can be integrated with your custom AI backend. The system supports four distinct personas, each with unique knowledge about the security incident.

## Quick Start

### Option 1: Use Built-in Responses
The simulator includes comprehensive fallback responses. No integration needed - it works out of the box!

### Option 2: Custom JavaScript Integration
Add your custom chatbot backend by implementing this function:

```javascript
window.chatbotBackend = async function(persona, message, context) {
    // Your AI API call here
    const response = await fetch('/your-api-endpoint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            persona: persona,
            message: message,
            context: context
        })
    });
    
    const data = await response.json();
    return data.reply;
};
```

## Persona Profiles

### 1. IT Support Analyst (`it-analyst`)
- **Name**: Dave Wilson
- **Knowledge**: Technical details, timeline, system logs
- **Key Information**:
  - Phishing email arrived at 9:02 AM
  - Domain typo: "tecknova.com" (missing 'h')
  - 23 invoice files downloaded
  - IP address: 203.0.113.45
- **Personality**: Technical, helpful, stressed

### 2. Accounts Clerk (`accounts-clerk`)
- **Name**: Sarah Mitchell
- **Knowledge**: Personal experience as victim
- **Key Information**:
  - Clicked phishing link at 9:12 AM
  - Entered credentials on fake site
  - Processes all customer invoices
  - Feels terrible about the incident
- **Personality**: Anxious, apologetic, worried

### 3. Security Officer (`security-officer`)
- **Name**: Michael Torres
- **Knowledge**: Investigation findings, recommendations
- **Key Information**:
  - 23 files exfiltrated in 14 minutes
  - $8,750 confirmed stolen
  - Recommends MFA, training, monitoring
  - Leading incident response
- **Personality**: Professional, analytical, focused

### 4. CEO (`ceo`)
- **Name**: James Patterson
- **Knowledge**: Business impact, management response
- **Key Information**:
  - 23 customers potentially affected
  - Reputation damage concerns
  - Approved $45K security budget
  - Board meeting at 2 PM
- **Personality**: Stressed, concerned, wants solutions

## Context Object

The context object passed to your backend includes:

```javascript
{
    persona: 'it-analyst',        // Current persona ID
    message: 'What happened?',    // User's message
    context: {
        page: '/internal/helpdesk-log.html',  // Current page
        sessionId: 1699123456789              // Session identifier
    }
}
```

## Persona-Specific Responses

Each persona should respond based on their knowledge and personality:

### IT Analyst Example
```
User: "What happened with the email?"
Response: "The phishing email arrived at 9:02 AM claiming to be from CloudSafe. 
It had a typo in the domain - 'tecknova.com' instead of 'technova.com'. 
Sarah clicked it and entered her credentials, which were then used to access 
our file server."
```

### Accounts Clerk Example
```
User: "How did you fall for it?"
Response: "The email looked exactly like our regular CloudSafe renewals! 
It had our logo, mentioned our account, and said it was urgent. I was just 
trying to make sure our backups didn't expire. I feel terrible about this."
```

### Security Officer Example
```
User: "What's the damage?"
Response: "23 invoice PDFs were exfiltrated between 10:01 and 10:15 AM. 
At least 5 customers received fraudulent invoices, and two have confirmed 
payments totaling $8,750. We're implementing MFA and enhanced email filtering 
immediately."
```

### CEO Example
```
User: "Are we in trouble?"
Response: "This is serious. Customers are furious, some are threatening to 
leave. The board wants answers. But we're taking action - I've approved 
emergency funding for security improvements. We will recover from this."
```

## Implementation Tips

1. **Maintain Persona Consistency**: Each persona has specific knowledge. Don't let the IT Analyst know CEO-level details.

2. **Guide Discovery**: Drop hints about evidence locations:
   - "Check the helpdesk log for details"
   - "The phishing email is in our evidence files"
   - "Compare the real and fake invoices"

3. **Emotional Responses**: 
   - Sarah is apologetic and worried
   - Dave is technical but stressed
   - Michael is professional and methodical
   - James is concerned about business impact

4. **Progressive Disclosure**: Start vague, provide more details as students ask follow-up questions.

## Testing Your Integration

1. Open the simulator in your browser
2. Click the "+" chat button
3. Select different personas
4. Test these key questions:
   - "What happened?"
   - "Tell me about the email"
   - "What was stolen?"
   - "How can we prevent this?"

## Advanced Integration

For more sophisticated responses, consider:

```javascript
window.chatbotBackend = async function(persona, message, context) {
    // Add conversation history
    if (!window.chatHistory) window.chatHistory = [];
    window.chatHistory.push({ persona, message, timestamp: Date.now() });
    
    // Persona-specific system prompts
    const systemPrompts = {
        'it-analyst': 'You are Dave, an IT support analyst...',
        'accounts-clerk': 'You are Sarah, who clicked the phishing link...',
        'security-officer': 'You are Michael, the security officer...',
        'ceo': 'You are James, the CEO dealing with a crisis...'
    };
    
    // Your AI API call with context
    const response = await callYourAI({
        systemPrompt: systemPrompts[persona],
        message: message,
        history: window.chatHistory.slice(-10), // Last 10 messages
        currentPage: context.page
    });
    
    return response;
};
```

## Fallback Behavior

If no custom backend is provided, the simulator uses built-in responses from `personas.js` which includes:
- Keyword-based responses for common questions
- Persona-specific knowledge bases
- Default responses for unmatched queries

## Support

The chatbot system is designed to be flexible. You can:
- Use it as-is with built-in responses
- Partially override with your own responses
- Fully replace with your AI backend
- Mix static and dynamic responses

The key is maintaining the narrative consistency of the security incident investigation!