const personaKnowledge = {
    'it-analyst': {
        name: 'Dave Wilson',
        role: 'IT Support Analyst',
        personality: 'Technical, helpful, slightly stressed about the incident',
        knowledge: {
            incident_timeline: {
                '09:02': 'Phishing email arrived in multiple inboxes',
                '09:12': 'Sarah Mitchell reported she clicked the link and entered credentials',
                '09:18': 'James Chen reported the email looked suspicious - domain typo',
                '09:40': 'We reset Sarah\'s password and terminated all her sessions',
                '10:01': 'Security noticed unusual file server activity',
                '10:15': 'External IP stopped accessing our systems'
            },
            technical_details: {
                phishing_domain: 'tecknova.com - missing the "h" in technova',
                malicious_link: 'backups-secure.net - not our real backup provider',
                real_backup: 'CloudSafe is our actual provider, they use cloudsafe.com',
                ip_address: '203.0.113.45 - traced to Eastern Europe, likely VPN',
                files_accessed: '23 invoice PDFs were downloaded'
            },
            observations: [
                'The email looked very professional, used our colors and logo',
                'Several staff almost clicked it before we sent the warning',
                'Sarah\'s account was used to access the file server',
                'The attacker knew exactly where our invoices were stored',
                'They downloaded files systematically, like they had a script'
            ],
            recommendations: [
                'We need better email filtering',
                'Staff need more security training',
                'Should implement 2FA immediately',
                'Need to monitor file access better'
            ]
        },
        responses: {
            greeting: "Hi, I'm Dave from IT Support. It's been a crazy morning with this security incident. What do you need to know?",
            email: "The phishing email came in around 9 AM. It claimed to be from CloudSafe about backup renewal, but the domain was actually 'tecknova.com' - missing the 'h'. Very sneaky.",
            sarah: "Sarah clicked the link around 9:12 AM thinking it was legitimate. She entered her credentials on the fake site. We reset her password immediately but the damage was done.",
            password: "Sarah's password was compromised when she entered it on the phishing site. We've reset all passwords as a precaution. This is why we need 2FA!",
            backup: "CloudSafe is our real backup provider. They use cloudsafe.com, not the fake 'backups-secure.net' from the phishing email. The attackers did their homework.",
            timeline: "Email at 9:02, Sarah clicked at 9:12, customers started calling at 9:26, file access from 10:01 to 10:15. It all happened so fast.",
            files: "23 invoice PDFs were downloaded between 10:01 and 10:15 AM. The attacker used Sarah's compromised credentials to access them.",
            ip: "The suspicious IP was 203.0.113.45, coming from Eastern Europe through a VPN. They covered their tracks well.",
            help: "Check the helpdesk log for the full timeline. The phishing email and access logs show exactly what happened. This could have been prevented with better security.",
            default: "This incident shows we need better security measures. Check the helpdesk log and other evidence. What specific aspect are you investigating?"
        }
    },
    
    'accounts-clerk': {
        name: 'Sarah Mitchell',
        role: 'Accounts Clerk',
        personality: 'Anxious, apologetic, worried about job security',
        knowledge: {
            personal_experience: [
                'Received email at 9:02 AM about CloudSafe renewal',
                'It looked exactly like previous renewal notices',
                'Clicked link and entered password around 9:12 AM',
                'Password stopped working immediately after',
                'IT had to reset my account',
                'Feel terrible about the whole situation'
            ],
            email_details: {
                subject: 'URGENT: Cloud Backup Renewal Required',
                sender: 'backup-support@tecknova.com',
                appearance: 'Had our logo and colors, looked professional',
                urgency: 'Said backup would expire in 24 hours',
                link_text: 'RENEW YOUR BACKUP NOW'
            },
            what_happened: [
                'Entered my email and password on the renewal page',
                'Page looked like CloudSafe login',
                'After submitting, got an error message',
                'Tried to log back into our systems - password didn\'t work',
                'Called IT support immediately',
                'They said my account was compromised'
            ],
            invoice_work: [
                'I process all customer invoices',
                'Usually send out 20-30 per month',
                'Keep them in the shared invoices folder',
                'Anyone with my login could access them all'
            ]
        },
        responses: {
            greeting: "Oh, hello... I'm Sarah from Accounts. I feel absolutely terrible about what happened. Are you here about the email incident?",
            email: "The email looked completely legitimate! It had our company logo, mentioned CloudSafe by name, and said our backup was expiring. How was I supposed to know?",
            click: "Yes, I clicked the link. It said URGENT and that our backups would be deleted in 24 hours! I was trying to protect our data...",
            password: "I entered my password on what I thought was the CloudSafe site. As soon as I submitted it, things went wrong. My password stopped working everywhere.",
            sorry: "I'm so sorry! I should have been more careful. I've worked here for 5 years without any issues. Will I lose my job over this?",
            invoice: "I handle all the customer invoices. They're stored in a shared folder I have access to. Oh no... did they get our customer invoices?",
            legitimate: "The email looked exactly like the real CloudSafe emails we've gotten before. Same format, same colors, even mentioned our account specifically.",
            renewal: "We get CloudSafe renewal notices every year. This one just seemed more urgent than usual. I was trying to be responsible!",
            training: "We had security training last year, but they never showed us anything this sophisticated. This looked real!",
            timeline: "I got the email at 9:02, clicked around 9:12, realized something was wrong by 9:15, and called IT immediately.",
            default: "I feel terrible about falling for this. The email just looked so real. I was trying to help the company by renewing quickly..."
        }
    },
    
    'security-officer': {
        name: 'Michael Torres',
        role: 'Head of Security',
        personality: 'Professional, analytical, focused on facts and solutions',
        knowledge: {
            attack_analysis: {
                vector: 'Spear phishing targeting accounts department',
                sophistication: 'Medium - well-crafted email but basic credential harvesting',
                attribution: 'Likely organized crime, not state-sponsored',
                methodology: 'Social engineering followed by data exfiltration'
            },
            technical_findings: {
                compromised_account: 'sarah.mitchell@technova.example',
                attack_ip: '203.0.113.45 (VPN exit node)',
                data_accessed: '23 invoice PDF files totaling 18.4MB',
                attack_duration: '14 minutes 24 seconds of file access',
                modified_invoices: 'At least 5 confirmed with altered bank details'
            },
            security_gaps: [
                'No multi-factor authentication enabled',
                'Insufficient email filtering (SPF/DKIM not enforced)',
                'No rate limiting on file server access',
                'Limited security awareness training',
                'No anomaly detection for unusual access patterns'
            ],
            immediate_actions: [
                'Force password reset for all users - COMPLETE',
                'Contacted affected customers - IN PROGRESS',
                'Engaged incident response team - COMPLETE',
                'Preserving evidence for investigation - ONGOING',
                'Drafting breach notification - IN PROGRESS'
            ],
            recommendations: {
                immediate: ['Enable MFA', 'Update email filters', 'Block suspicious IPs'],
                short_term: ['Security training', 'Implement EDR', 'Access controls'],
                long_term: ['Zero trust architecture', 'Regular pen testing', 'SOC implementation']
            }
        },
        responses: {
            greeting: "Security Officer Torres here. I'm coordinating our incident response. What specific information do you need about the breach?",
            attack: "This was a targeted spear phishing attack. The attacker researched our vendors and created a convincing CloudSafe renewal email. Classic social engineering.",
            data: "23 invoice PDFs were exfiltrated between 10:01 and 10:15 AM. The attacker used compromised credentials to access our file server from IP 203.0.113.45.",
            impact: "At least 5 customers received fraudulent invoices. Two have confirmed payments totaling $8,750 to the attacker's account. We're contacting all 23 affected customers.",
            technical: "The phishing email failed SPF checks and had no DKIM signature. Our email gateway should have caught this. We're implementing stricter filtering immediately.",
            sarah: "Ms. Mitchell was the initial victim. Her credentials were harvested at 09:12 and used for the attack at 10:01. This wasn't her fault - the phishing was sophisticated.",
            prevention: "We need MFA immediately, better email filtering, security awareness training, and access monitoring. I've requested emergency budget for these implementations.",
            evidence: "Check the access logs for the complete attack timeline. The phishing email shows clear indicators we should train staff to recognize.",
            response: "Password resets complete, customers being notified, law enforcement contacted. We're following our incident response playbook to the letter.",
            gaps: "This incident exposed critical gaps: no MFA, weak email filtering, insufficient training. We're addressing all of these immediately.",
            default: "This was a preventable incident. We need to implement proper security controls. Review the evidence and let me know what specific data you need."
        }
    },
    
    'ceo': {
        name: 'James Patterson',
        role: 'Chief Executive Officer',
        personality: 'Stressed, concerned about reputation, wants quick resolution',
        knowledge: {
            business_impact: {
                customers_affected: '23 customers potentially impacted',
                financial_loss: 'At least $8,750 confirmed stolen',
                reputation_risk: 'Significant - trust is everything in IT services',
                regulatory_risk: 'Must notify authorities within 72 hours',
                operational_impact: 'Portal down, staff passwords reset'
            },
            customer_concerns: [
                'Multiple customers calling about fake invoices',
                'Two customers already paid fraudulent accounts',
                'Some threatening to switch providers',
                'Media might pick up the story',
                'Board of directors wants answers'
            ],
            management_response: [
                'Emergency board meeting at 2 PM',
                'Approved $45,000 emergency security budget',
                'All-hands meeting scheduled for tomorrow',
                'Considering hiring external security firm',
                'Drafting customer communication strategy'
            ],
            staff_issues: {
                sarah: 'Not planning to terminate - she was a victim too',
                training: 'Clearly need better security awareness',
                morale: 'Team is shaken, some pointing fingers',
                overtime: 'Authorizing overtime for incident response'
            }
        },
        responses: {
            greeting: "Yes? I'm dealing with a crisis here. We've had a security breach and customers are furious. What do you need?",
            customer: "We've got customers calling non-stop about fake invoices. Two have already paid nearly $9,000 to fraudulent accounts! This is a disaster.",
            reputation: "Our reputation is everything. We promise to keep client data safe, and now this happens. Some customers are threatening to leave us.",
            sarah: "Sarah Mitchell in accounts fell for a phishing email. I'm not firing her - she's been with us 5 years. But we clearly need better training.",
            money: "At least $8,750 stolen so far. But the reputation damage could cost us millions if we lose customers. The board is not happy.",
            press: "We issued a vague press release to avoid panic. If the full details get out, we could lose half our client base. We need to control the narrative.",
            response: "I've approved $45K for immediate security improvements. Torres wants MFA, new email filters, training - whatever it takes to prevent this happening again.",
            staff: "The whole team is rattled. Sarah's devastated, IT is working overtime, and everyone's pointing fingers. We need to pull together.",
            board: "Emergency board meeting at 2 PM. They want answers: how it happened, impact assessment, and prevention plan. My job might be on the line.",
            solution: "We need to fix this fast. Notify customers, implement security measures, and restore confidence. I don't care what it costs - make it happen.",
            default: "This is the worst day we've had in 9 years of business. We need solutions, not problems. What's your specific question?"
        }
    }
};

// Enhanced response function for integration
window.getPersonaResponse = function(persona, message, context) {
    const p = personaKnowledge[persona];
    if (!p) return "I'm not sure who you're trying to reach.";
    
    const lowerMessage = message.toLowerCase();
    
    // Check for keyword matches in responses
    for (const [keyword, response] of Object.entries(p.responses)) {
        if (keyword !== 'greeting' && keyword !== 'default') {
            if (lowerMessage.includes(keyword)) {
                return response;
            }
        }
    }
    
    // Check for specific evidence references
    if (lowerMessage.includes('helpdesk') || lowerMessage.includes('log')) {
        return "Yes, check the helpdesk log - it has the complete timeline of what happened this morning.";
    }
    
    if (lowerMessage.includes('phishing') && lowerMessage.includes('email')) {
        return "The phishing email is in our evidence files. It's a textbook example of social engineering.";
    }
    
    if (lowerMessage.includes('invoice')) {
        return "We have examples of real versus fake invoices in the evidence. The bank details were changed.";
    }
    
    if (lowerMessage.includes('access') && lowerMessage.includes('log')) {
        return "The server access logs show exactly when and what files were accessed. 23 files in 14 minutes.";
    }
    
    // Return default response
    return p.responses.default;
};

// Export for use in chatbot.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { personaKnowledge, getPersonaResponse };
}