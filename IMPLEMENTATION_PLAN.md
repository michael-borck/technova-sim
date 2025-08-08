# TechNova Systems Security Breach Simulator - Implementation Plan

## Project Overview
An interactive cybersecurity incident response simulation for Year 12 IT students. Students will investigate a data breach at the fictional "TechNova Systems" company through website exploration, evidence gathering, and AI-powered employee interviews.

## Scenario Summary
- **Company**: TechNova Systems - mid-sized IT services provider
- **Incident**: Phishing attack leading to credential theft and fake invoices
- **Student Role**: Junior incident responders investigating the breach
- **Learning Objectives**: Understanding phishing, evidence gathering, incident timeline construction, and basic security recommendations

## Implementation Tasks

### Phase 1: Foundation (Tasks 1-3)

#### Task 1: Set up basic project structure and static website framework
- Create directory structure: `teknova-sim/`
- Set up assets folders (css, js, img, evidence)
- Implement responsive CSS framework with corporate theme
- Create shared header/footer templates
- Set up basic navigation structure

#### Task 2: Create public-facing pages
- **index.html**: Company homepage with subtle "Service Notice" banner
- **services.html**: IT services offered (cloud backup, endpoint support, network services)
- **about.html**: Company background and team info
- **press.html**: Public press release downplaying the incident
- **faq.html**: Customer FAQ with hidden clues about fake invoices

#### Task 3: Design and implement staff portal page
- **staff-portal.html**: Fake login page (disabled)
- Include "Having trouble? See Helpdesk Updates" hint
- Links to internal documentation (initially hidden)
- Professional corporate portal appearance

### Phase 2: Evidence Trail (Tasks 4-5)

#### Task 4: Create internal evidence pages
- **internal/phishing-email.html**: The malicious email
  - From: backup-support@tecknova.com (typo in domain)
  - Subject: "Urgent: Cloud Backup Renewal Required"
  - Suspicious link to backups-secure.net
  - Poor grammar and urgency indicators
  
- **internal/helpdesk-log.html**: IT support timeline
  - 09:12 - Accounts clerk reports email issue
  - 09:26 - Customer complaints about fake invoices
  - 09:40 - Password reset initiated
  - 10:05 - Unusual IP access discovered
  
- **internal/memo.html**: Security officer's internal memo
  - 23 invoice PDFs accessed from suspicious IP
  - Recommends organization-wide password reset
  - Suggests implementing 2FA
  - Proposes security awareness training

#### Task 5: Generate comparison materials
- **internal/invoices.html**: Side-by-side comparison
  - Real invoice with legitimate bank details
  - Fake invoice with different bank account
  - Subtle formatting differences highlighted
  
- **internal/access-log.html**: Server access logs
  - Timestamps matching helpdesk incidents
  - Unusual IP address (203.0.113.45)
  - Multiple invoice file downloads
  - Pattern showing systematic data access

### Phase 3: Interactive Elements (Tasks 6-8)

#### Task 6: Implement floating chat UI
- Floating "+" button in bottom-right corner
- Expandable chat panel (320px wide)
- Persona selector dropdown
- Message input field
- Chat history display
- Mobile-responsive design

#### Task 7: Create chatbot persona profiles
**Four distinct personas with unique knowledge:**

1. **IT Support Analyst**
   - Technical but cautious personality
   - Knowledge: Login issues, email incidents, system logs
   - Key info: "Saw logins after 'backup renewal' email"
   
2. **Accounts Clerk**
   - Confused and apologetic
   - Knowledge: Clicked the phishing link, password issues
   - Key info: "Thought it was our normal renewal email"
   
3. **Security Officer**
   - Methodical, professional
   - Knowledge: Technical details, IP addresses, file access
   - Key info: "23 invoices accessed from unusual IP"
   
4. **CEO**
   - Concerned about reputation, less technical
   - Knowledge: Customer complaints, business impact
   - Key info: "Customers paying to wrong bank accounts"

#### Task 8: Integrate JavaScript backend
- Connection to your provided JavaScript API
- Persona context switching
- Message routing based on selected employee
- Response generation with persona-specific knowledge
- Session state management
- Error handling and fallback responses

### Phase 4: Student Experience (Tasks 9-10)

#### Task 9: Add breadcrumb trail and clue system
**Discovery Flow:**
1. Land on homepage → Notice service banner
2. Read press release → Find vague admission
3. Check FAQ → Discover invoice warning
4. Visit staff portal → Find helpdesk link
5. Read helpdesk log → Get phishing email reference
6. View phishing email → Identify attack vector
7. Check invoices → Spot the fraud
8. Review access logs → Confirm breach timeline

**Clue Placement:**
- Subtle hints in public pages
- Direct links in internal pages
- Chat responses guide to evidence
- Progressive difficulty curve

#### Task 10: Create student worksheet/reporting template
**Investigation Worksheet:**
- Team name and members
- Evidence collection checklist
- Timeline construction grid
- Root cause analysis section
- Impact assessment
- Recommended actions
- Presentation template

### Phase 5: Testing & Documentation (Tasks 11-12)

#### Task 11: Test complete simulation flow
- Run through as different student personas
- Verify all links and evidence trails
- Test chatbot responses
- Check difficulty level (15-20 min completion)
- Mobile device testing
- Browser compatibility check

#### Task 12: Create facilitator guide
**Instructor Documentation:**
- Setup instructions
- Answer key with complete solution
- Timing suggestions (45-60 min activity)
- Discussion prompts
- Extension activities for advanced students
- Assessment rubric
- Common student mistakes and hints

## Technical Architecture

### Frontend Stack
- Pure HTML5/CSS3/JavaScript (no frameworks)
- Responsive design for tablets/laptops
- Local storage for session state
- Progressive disclosure of evidence

### Chatbot Integration
- RESTful API endpoint: `/chat`
- POST requests with: `{persona, message, context}`
- JSON responses with persona-appropriate replies
- Fallback to static responses if API unavailable

### File Structure
```
teknova-sim/
├── index.html
├── press.html
├── services.html
├── about.html
├── faq.html
├── staff-portal.html
├── internal/
│   ├── memo.html
│   ├── helpdesk-log.html
│   ├── phishing-email.html
│   ├── invoices.html
│   └── access-log.html
├── assets/
│   ├── css/style.css
│   ├── js/
│   │   ├── chatbot.js
│   │   └── personas.js
│   └── img/
│       ├── logo.svg
│       ├── invoice-real.pdf
│       └── invoice-fake.pdf
├── facilitator/
│   ├── guide.pdf
│   ├── answer-key.md
│   └── student-worksheet.pdf
└── README.md
```

## Success Criteria
- Students can complete investigation in 30-45 minutes
- Clear evidence trail leading to correct conclusions
- Engaging chat interactions that provide helpful hints
- Professional appearance maintaining immersion
- Accessible to non-technical students
- Generates discussion about real-world security

## Next Steps
Once this plan is approved, we'll proceed task by task:
1. Start with basic website structure
2. Add content and evidence progressively
3. Integrate chatbot functionality
4. Test with sample student interactions
5. Refine based on difficulty and engagement

## Deliverables
- Fully functional mock website
- Four AI-powered employee personas
- Complete evidence trail
- Student worksheet materials
- Facilitator documentation
- Deployment-ready package