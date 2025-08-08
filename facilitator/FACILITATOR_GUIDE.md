# TechNova Security Incident - Facilitator Guide

## Overview
This cybersecurity incident response simulation teaches Year 12 IT students about phishing attacks, social engineering, and incident investigation through hands-on exploration of a fictional company's data breach.

## Learning Objectives
By the end of this activity, students will be able to:
1. Identify phishing email indicators
2. Understand how credential theft leads to data breaches
3. Trace an attack timeline through evidence
4. Recommend security improvements
5. Appreciate human factors in cybersecurity

## Setup Instructions

### Technical Requirements
- Web browser (Chrome, Firefox, Safari, Edge)
- Local web server (Python SimpleHTTPServer or similar)
- 1 computer per 2-3 students (teamwork encouraged)
- Optional: Projector for introduction

### Starting the Simulation
```bash
cd teknova-sim
python3 -m http.server 8080
# Navigate to http://localhost:8080
```

## Activity Timeline (45-60 minutes)

### Introduction (5 minutes)
1. Brief students: "You're junior security consultants investigating a breach at TechNova Systems"
2. Explain they need to gather evidence and determine what happened
3. Distribute student worksheets (or direct to `/facilitator/student-worksheet.html`)
4. Form teams of 2-3 students

### Investigation Phase (30-35 minutes)
Students explore the website to uncover evidence

### Report Writing (10-15 minutes)
Teams complete their worksheets and prepare findings

### Discussion (5-10 minutes)
Review findings and discuss prevention strategies

## Answer Key

### Part 1: Evidence Locations
- ✅ **Press Release**: `/press.html`
- ✅ **Customer FAQ**: `/faq.html` (contains link to invoice comparison)
- ✅ **Staff Portal**: `/staff-portal.html` (has link to helpdesk log)
- ✅ **Helpdesk Log**: `/internal/helpdesk-log.html`
- ✅ **Phishing Email**: `/internal/phishing-email.html`
- ✅ **Invoice Comparison**: `/internal/invoices.html`
- ✅ **Access Logs**: `/internal/access-log.html`
- ✅ **Security Memo**: `/internal/memo.html`

### Part 2: Timeline (Correct Answers)

| Time | Event | Source |
|------|-------|--------|
| 9:02 AM | Phishing email sent to all staff | Phishing email, Helpdesk log |
| 9:12 AM | Sarah Mitchell clicks link, enters credentials | Helpdesk log, Chat with Sarah |
| 9:26 AM | First customer reports fake invoice | Helpdesk log |
| 10:01 AM | Attacker begins downloading invoices | Access log |
| 10:15 AM | Attack ends, 23 files stolen | Access log, Security memo |

### Part 3: Attack Analysis

**1. Type of Attack**
- Spear phishing / Social engineering attack
- Targeted credential harvesting
- Followed by data exfiltration

**2. How Attacker Gained Access**
1. Sent convincing phishing email mimicking CloudSafe
2. Sarah clicked link to fake site (backups-secure.net)
3. Sarah entered credentials thinking it was legitimate
4. Attacker used stolen credentials to access file server
5. Downloaded 23 invoice PDFs
6. Modified invoices with different bank details
7. Sent fake invoices to customers

**3. Phishing Email Red Flags**
1. Domain typo: "tecknova.com" (missing 'h')
2. Urgent language: "expires in 24 hours"
3. Generic greeting: "Dear Valued Customer"
4. Different reply-to domain: backups-secure.net
5. Grammar error: "require your immediate attention"
6. Failed SPF check
7. No DKIM signature
8. Return path doesn't match sender

**4. Compromised Data**
- 23 customer invoice PDFs
- Customer names and addresses
- Invoice amounts and payment terms
- Company bank details (replaced with fraudulent ones)

### Part 4: Impact Assessment

**1. Affected Parties**
- Sarah Mitchell (compromised account)
- 23 customers with stolen invoice data
- 5+ customers who received fake invoices
- 2 customers who paid $8,750 to fraudulent account
- TechNova Systems (reputation damage)
- All staff (passwords reset)

**2. Financial Impact**
- Direct theft: $8,750 confirmed
- Potential: $78,200 (if all 23 invoices paid)
- Emergency security budget: $45,000
- Possible customer loss (long-term)
- Regulatory fines (potential)

**3. Non-Financial Impact**
- Reputation damage
- Customer trust lost
- Employee morale affected
- Operational disruption
- Regulatory scrutiny
- Time lost to incident response

### Part 5: Recommendations

**Immediate (24 hours)**
1. Reset all passwords ✓ (already done)
2. Contact all 23 affected customers
3. Alert banks about fraudulent accounts
4. Preserve evidence for investigation
5. Issue detailed customer advisory

**Short-term (1 month)**
1. Implement Multi-Factor Authentication (MFA)
2. Deploy advanced email filtering
3. Conduct emergency security training
4. Review and restrict file access permissions
5. Implement anomaly detection

**Long-term (1 year)**
1. Regular phishing simulations
2. Comprehensive security awareness program
3. Zero-trust architecture
4. Regular penetration testing
5. 24/7 Security Operations Center (SOC)

## Discussion Points

### Why Did This Succeed?
- **Human Factor**: Sarah was trying to be responsible
- **Sophistication**: Email looked legitimate
- **Timing**: Seemed like routine renewal
- **Trust**: Exploited vendor relationship
- **Urgency**: Created pressure to act quickly

### Key Lessons
1. **Verify Suspicious Emails**: Check sender domain carefully
2. **Question Urgency**: Real vendors rarely demand immediate action
3. **Use Multiple Channels**: Verify requests via phone/separate email
4. **Technical Controls**: MFA would have prevented access
5. **Defense in Depth**: Multiple security layers needed

### Common Student Mistakes
1. **Missing the domain typo** in the phishing email
2. **Not checking all evidence** locations
3. **Focusing only on technical** aspects (missing human factors)
4. **Incomplete timeline** (missing intermediate steps)
5. **Unrealistic recommendations** (too expensive/complex)

## Assessment Rubric

| Criteria | Excellent (A) | Good (B) | Satisfactory (C) | Needs Improvement (D) |
|----------|--------------|----------|------------------|----------------------|
| Evidence Collection | Found all 8 pieces | Found 6-7 pieces | Found 4-5 pieces | Found <4 pieces |
| Timeline Accuracy | All events correct with times | Most events correct | Basic timeline present | Incomplete/incorrect |
| Attack Analysis | Comprehensive understanding | Good understanding | Basic understanding | Limited understanding |
| Recommendations | Realistic, prioritized, complete | Mostly realistic | Some good ideas | Vague or unrealistic |
| Teamwork | Excellent collaboration | Good collaboration | Some collaboration | Limited collaboration |

## Extension Activities

### For Advanced Students
1. Research real phishing attacks (e.g., Anthem, Sony)
2. Design their own phishing awareness poster
3. Write a security policy for TechNova
4. Calculate full financial impact including downtime
5. Research compliance requirements (GDPR, etc.)

### For Struggling Students
1. Provide hints about evidence locations
2. Work through timeline together
3. Focus on identifying phishing indicators
4. Simplify to immediate recommendations only

## Troubleshooting

### If students can't find evidence:
- Hint: "Check the FAQ page carefully"
- Hint: "The staff portal has useful links"
- Hint: "Try chatting with different employees"

### If students finish early:
- Have them calculate total potential losses
- Ask them to rank recommendations by cost/benefit
- Challenge them to find ALL phishing indicators
- Have them present findings to class

### If chatbot isn't working:
- Fallback responses are built-in
- Students can still complete activity
- Use evidence pages primarily

## Safety & Ethics

Remind students:
- This is a simulation for learning
- Never attempt real phishing (illegal)
- Report real phishing to authorities
- Protect personal information online
- Be skeptical but not paranoid

## Wrap-Up Questions

1. "What surprised you most about this attack?"
2. "Would you have clicked the email?"
3. "What's the most important defense?"
4. "How would you train employees?"
5. "What would you do differently as CEO?"

## Additional Resources

- [ACSC Phishing Guidance](https://www.cyber.gov.au/learn/phishing)
- [Have I Been Pwned](https://haveibeenpwned.com/)
- [PhishTank](https://phishtank.org/)
- [KnowBe4 Training](https://www.knowbe4.com/)

## Contact

For technical issues or questions about the simulation:
- Check the README.md file
- Review CHATBOT_INTEGRATION.md for API setup
- Test all evidence pages load correctly

Remember: The goal is learning, not perfection. Encourage exploration and discussion!