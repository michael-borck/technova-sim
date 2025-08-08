# TechNova Systems Security Incident Simulator

An interactive cybersecurity education tool designed for Year 12 IT students to investigate a realistic phishing attack and data breach scenario.

## 🎯 Purpose

This simulator provides hands-on experience in:
- Identifying phishing attacks
- Investigating security incidents  
- Understanding attack timelines
- Interviewing witnesses (via AI chatbots)
- Recommending security improvements

## 🚀 Quick Start

### 1. Start the Web Server

```bash
cd teknova-sim
python3 -m http.server 8080
```

### 2. Open in Browser

Navigate to: `http://localhost:8080/briefing.html`

### 3. Begin Investigation

Students start at the briefing page which introduces the scenario, then proceed to investigate by:
- Reading the press release
- Checking the FAQ
- Accessing internal documents
- Chatting with virtual employees
- Collecting evidence

## 📁 Project Structure

```
teknova-sim/
├── index.html                 # Company homepage
├── press.html                 # Public press release
├── services.html              # Company services
├── about.html                 # About the company
├── faq.html                   # Customer FAQ (contains clues)
├── staff-portal.html          # Staff login (disabled, has hints)
├── internal/                  # Evidence pages
│   ├── helpdesk-log.html     # IT support timeline
│   ├── phishing-email.html   # The malicious email
│   ├── invoices.html         # Real vs fake comparison
│   ├── access-log.html       # Server logs
│   └── memo.html             # Security officer's report
├── assets/
│   ├── css/style.css         # Styling
│   └── js/
│       ├── chatbot.js        # Chat interface
│       └── personas.js       # Character knowledge bases
└── facilitator/
    ├── student-worksheet.html # Investigation worksheet
    └── FACILITATOR_GUIDE.md  # Teacher instructions & answers
```

## 🎭 Virtual Employees (Chatbot Personas)

Students can interview four different employees:

1. **Dave Wilson** (IT Support) - Technical details about the attack
2. **Sarah Mitchell** (Accounts) - The employee who clicked the phishing link
3. **Michael Torres** (Security) - Investigation findings and recommendations
4. **James Patterson** (CEO) - Business impact and management response

## 📚 The Scenario

**Company**: TechNova Systems - IT services provider

**Incident**: A sophisticated phishing email led to:
- Credential theft
- 23 customer invoices stolen
- Fake invoices sent with altered bank details
- $8,750 confirmed stolen from customers

**Timeline**: November 15, 2024, 9:00 AM - 11:00 AM

## 🔍 Evidence Trail

Students must discover:
1. **Phishing email** with domain typo (tecknova.com)
2. **Timeline** of the attack (9:02 AM - 10:15 AM)
3. **Compromised data** (23 invoice PDFs)
4. **Attack method** (credential harvesting)
5. **Impact** (financial and reputational)

## 👥 For Instructors

### Time Required
- 45-60 minutes for full activity
- 30 minutes minimum

### Materials Provided
- Complete website simulation
- Student worksheet (auto-saves progress)
- Facilitator guide with answer key
- Assessment rubric
- Discussion prompts

### Learning Outcomes
- Recognize phishing indicators
- Understand social engineering
- Practice incident investigation
- Develop critical thinking
- Learn security best practices

## 🤖 Chatbot Integration

The simulator includes built-in chatbot responses. For custom AI integration:

```javascript
window.chatbotBackend = async function(persona, message, context) {
    // Your AI API implementation
    return responseString;
};
```

See `CHATBOT_INTEGRATION.md` for detailed integration instructions.

## 💡 Tips for Students

1. **Start with the homepage** - Look for service notices
2. **Read carefully** - Details matter in investigations
3. **Talk to everyone** - Each employee has unique information
4. **Check URLs** - Phishing often uses similar-looking domains
5. **Follow the timeline** - Events are connected
6. **Think like an attacker** - How did they plan this?

## 🛠️ Technical Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3.x or any web server
- No internet connection required (runs locally)
- Works on tablets and laptops

## 📝 Assessment

Students are evaluated on:
- Evidence collection (8 key pieces)
- Timeline accuracy
- Attack analysis
- Impact assessment
- Security recommendations
- Teamwork and collaboration

## 🔐 Ethical Considerations

This simulator is for **educational purposes only**. Students learn to:
- Defend against attacks (not perform them)
- Recognize threats
- Protect organizations
- Think critically about security

## 📊 Difficulty Level

- **Target Audience**: Year 12 (Grade 12) IT students
- **Prior Knowledge**: Basic computer literacy
- **Cybersecurity Experience**: None required
- **Complexity**: Introductory to intermediate

## 🐛 Troubleshooting

### Chat not working?
- Built-in responses will activate as fallback
- Check browser console for errors
- Ensure JavaScript is enabled

### Can't find evidence?
- Start with the FAQ page
- Look for links in the staff portal
- Chat with employees for hints

### Pages not loading?
- Ensure web server is running
- Check file paths are correct
- Try a different browser

## 📚 Additional Resources

- [Implementation Plan](IMPLEMENTATION_PLAN.md)
- [Chatbot Integration](CHATBOT_INTEGRATION.md)
- [Facilitator Guide](teknova-sim/facilitator/FACILITATOR_GUIDE.md)
- [Progress Summary](PROGRESS_SUMMARY.md)

## 🎓 Educational Value

This simulator teaches critical cybersecurity concepts through experiential learning:
- **Human Factor**: Why people fall for phishing
- **Technical Controls**: MFA, email filtering, access controls
- **Incident Response**: How to investigate and respond
- **Business Impact**: Beyond just technical damage
- **Prevention**: Practical security improvements

## 📧 Support

For questions or improvements:
1. Review the facilitator guide
2. Check the chatbot integration docs
3. Test with a small group first
4. Adjust difficulty as needed

---

**Remember**: The goal is learning through discovery. Encourage students to explore, make mistakes, and think critically about cybersecurity challenges in the real world.