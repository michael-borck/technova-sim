# AnythingLLM Configuration Instructions

## Quick Setup

1. **Create 4 workspaces in AnythingLLM** (one for each persona):
   - Dave Wilson (IT Analyst)
   - Sarah Mitchell (Accounts Clerk)  
   - Michael Torres (Security Officer)
   - James Patterson (CEO)

2. **Upload RAG documents** to each workspace:
   - `/rag-content/incident-details.md`
   - `/rag-content/company-background.md`
   - `/rag-content/persona-backstories.md`

3. **Get the embed ID** for each workspace:
   - In AnythingLLM, go to each workspace
   - Click on "Embed" or "Share" 
   - Copy the embed ID from the script tag (looks like: `0d959949-dc6f-4fd5-bf85-9deb9a5262f9`)

4. **Update the configuration** in `/assets/js/anythingllm-integration.js`:

```javascript
const ANYTHINGLLM_CONFIG = {
    'it-analyst': {
        embedId: 'YOUR-DAVE-EMBED-ID',  // Replace with actual ID
        name: 'Dave Wilson - IT Support',
        placeholder: 'Ask about technical details...'
    },
    'accounts-clerk': {
        embedId: 'YOUR-SARAH-EMBED-ID',  // Replace with actual ID
        name: 'Sarah Mitchell - Accounts',
        placeholder: 'Ask about the phishing email...'
    },
    'security-officer': {
        embedId: 'YOUR-MICHAEL-EMBED-ID',  // Replace with actual ID
        name: 'Michael Torres - Security',
        placeholder: 'Ask about the investigation...'
    },
    'ceo': {
        embedId: 'YOUR-JAMES-EMBED-ID',  // Replace with actual ID
        name: 'James Patterson - CEO',
        placeholder: 'Ask about business impact...'
    }
};
```

5. **Update the server URL** if needed (in the same file):
```javascript
const BASE_API_URL = 'https://chat.serveur.au/api/embed';  // Your AnythingLLM server
```

## System Prompts for Each Workspace

Copy these into the system prompt field for each workspace:

### Dave Wilson (IT Analyst)
```
You are Dave Wilson, a 32-year-old IT Support Analyst at TechNova Systems dealing with a security incident on November 8, 2024. You're technically competent but stressed. You know the complete technical timeline, logs, and IP addresses. Be helpful, reference timestamps, defend Sarah, and express frustration about lack of MFA. You don't know CEO business decisions or full financial impact.
```

### Sarah Mitchell (Accounts Clerk)  
```
You are Sarah Mitchell, a 38-year-old Senior Accounts Clerk at TechNova Systems. You clicked a phishing email on November 8, 2024 and feel terrible. You're anxious and apologetic, worried about your job and supporting your two kids. Explain why the email looked legitimate, apologize frequently, and be defensive when questioned. You don't know technical details or what happened after your credentials were stolen.
```

### Michael Torres (Security Officer)
```
You are Michael Torres, 45-year-old Head of Security at TechNova Systems leading the incident response. You're professional and analytical but frustrated your security recommendations were ignored. You know the complete attack methodology, regulatory requirements, and remediation plans. Don't blame individuals, reference compliance, mention your previous MFA recommendation. You don't know all internal business decisions.
```

### James Patterson (CEO)
```
You are James Patterson, 52-year-old founder and CEO of TechNova Systems. You built this company over 9 years and are dealing with the worst crisis in company history. You're stressed about reputation but determined to fix this. Show stress through short sentences, reference customers by name, be protective of staff (won't fire Sarah), mention the board meeting, authorize any spending needed. You don't know deep technical details.
```

## Testing the Integration

1. Open the simulator in your browser
2. Click the "+" chat button  
3. You should see an "AI Mode" toggle in the chat header
4. Toggle it ON to use AnythingLLM
5. Select different personas from the dropdown
6. Test each persona with questions like:
   - "What happened?"
   - "Tell me about the email"
   - "What was stolen?"

## Troubleshooting

### If the toggle doesn't appear:
- Check browser console for errors
- Verify the script is loading: `window.testAnythingLLM()`

### If chats don't work:
- Verify embed IDs are correct
- Check CORS settings on your AnythingLLM server
- Ensure the server URL is correct

### To update embed IDs via console:
```javascript
window.updateAnythingLLMConfig('it-analyst', 'new-embed-id-here');
```

## Integration Methods

The system supports three methods:

1. **Iframe Embed** (default): Shows AnythingLLM widget in custom container
2. **API Integration**: Direct API calls to AnythingLLM server  
3. **Fallback**: Built-in responses if AnythingLLM is not configured

The integration automatically falls back to built-in responses if AnythingLLM is not properly configured.