(() => {
    const chatState = {
        isOpen: false,
        currentPersona: 'it-analyst',
        messages: [],
        sessionId: Date.now()
    };

    function createElements() {
        const fab = document.createElement('div');
        fab.className = 'chat-fab';
        fab.innerHTML = '+';
        fab.title = 'Chat with TechNova staff';
        fab.setAttribute('aria-label', 'Open chat');

        const panel = document.createElement('div');
        panel.className = 'chat-panel';
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-modal', 'true');

        const header = document.createElement('div');
        header.className = 'chat-header';
        
        const select = document.createElement('select');
        select.id = 'persona-select';
        select.innerHTML = `
            <option value="it-analyst">IT Support Analyst</option>
            <option value="accounts-clerk">Accounts Clerk</option>
            <option value="security-officer">Security Officer</option>
            <option value="ceo">CEO</option>
        `;
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-btn';
        closeBtn.innerHTML = '×';
        closeBtn.setAttribute('aria-label', 'Close chat');
        
        header.appendChild(select);
        header.appendChild(closeBtn);

        const body = document.createElement('div');
        body.className = 'chat-body';
        body.id = 'chat-body';
        
        const inputRow = document.createElement('div');
        inputRow.className = 'chat-input';
        
        const input = document.createElement('input');
        input.id = 'chat-input';
        input.type = 'text';
        input.placeholder = 'Ask a question...';
        input.setAttribute('aria-label', 'Chat message input');
        
        const sendBtn = document.createElement('button');
        sendBtn.id = 'send-btn';
        sendBtn.textContent = 'Send';
        
        inputRow.appendChild(input);
        inputRow.appendChild(sendBtn);
        
        panel.appendChild(header);
        panel.appendChild(body);
        panel.appendChild(inputRow);
        
        document.body.appendChild(fab);
        document.body.appendChild(panel);
        
        return { fab, panel, select, closeBtn, body, input, sendBtn };
    }

    function toggleChat(open) {
        const panel = document.querySelector('.chat-panel');
        chatState.isOpen = open;
        
        if (open) {
            panel.classList.add('active');
            document.getElementById('chat-input').focus();
            if (chatState.messages.length === 0) {
                addWelcomeMessage();
            }
        } else {
            panel.classList.remove('active');
        }
    }

    function addWelcomeMessage() {
        const persona = document.getElementById('persona-select').value;
        const welcomeMessages = {
            'it-analyst': "Hi, I'm from IT Support. I heard there's been some issues today. What do you need to know?",
            'accounts-clerk': "Oh, hello... I'm still a bit shaken about what happened. Are you here about the email incident?",
            'security-officer': "Security Officer here. I'm investigating the incident. What specific information are you looking for?",
            'ceo': "Yes? I'm quite busy dealing with this situation. How can I help you quickly?"
        };
        
        appendMessage('assistant', welcomeMessages[persona], getPersonaName(persona));
    }

    function getPersonaName(persona) {
        const names = {
            'it-analyst': 'IT Support',
            'accounts-clerk': 'Sarah (Accounts)',
            'security-officer': 'Security Officer',
            'ceo': 'CEO'
        };
        return names[persona] || 'Staff';
    }

    function appendMessage(type, text, name) {
        const body = document.getElementById('chat-body');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${type}`;
        
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        if (name && type === 'assistant') {
            const nameDiv = document.createElement('div');
            nameDiv.className = 'name';
            nameDiv.textContent = name;
            bubble.appendChild(nameDiv);
        }
        
        const textDiv = document.createElement('div');
        textDiv.textContent = text;
        bubble.appendChild(textDiv);
        
        messageDiv.appendChild(bubble);
        body.appendChild(messageDiv);
        
        body.scrollTop = body.scrollHeight;
        
        chatState.messages.push({ type, text, name, timestamp: Date.now() });
    }

    async function handleSend() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        appendMessage('user', message, 'You');
        input.value = '';
        
        const persona = document.getElementById('persona-select').value;
        const response = await getResponse(persona, message);
        
        setTimeout(() => {
            appendMessage('assistant', response, getPersonaName(persona));
        }, 500 + Math.random() * 1000);
    }

    async function getResponse(persona, message) {
        if (window.chatbotBackend && typeof window.chatbotBackend === 'function') {
            try {
                const response = await window.chatbotBackend(persona, message, {
                    page: location.pathname,
                    sessionId: chatState.sessionId
                });
                return response;
            } catch (error) {
                console.error('Chatbot backend error:', error);
            }
        }
        
        if (window.getPersonaResponse && typeof window.getPersonaResponse === 'function') {
            return window.getPersonaResponse(persona, message, {
                page: location.pathname,
                sessionId: chatState.sessionId
            });
        }
        
        const lowerMessage = message.toLowerCase();
        const responses = {
            'it-analyst': {
                'email': "There was an email about 'Cloud Backup Renewal' that came in this morning. Several people clicked it before we realized something was wrong. Check the helpdesk log for details.",
                'password': "Yes, we had to reset passwords for several accounts after the incident. The accounts clerk's credentials were compromised.",
                'login': "The accounts clerk reported login issues around 9:12 AM, right after clicking that backup renewal email link.",
                'backup': "We use CloudSafe for backups normally, but that email wasn't from them. The domain was slightly different - had a typo.",
                'help': "I can tell you about the email incident, login problems, or our normal backup procedures. What would you like to know?",
                'log': "Check the internal helpdesk log. It has a timeline of everything that happened this morning.",
                'default': "I saw unusual activity after that backup email went around. You might want to check the helpdesk log or ask the accounts clerk what happened."
            },
            'accounts-clerk': {
                'email': "I got an email about our cloud backup renewal. It looked legitimate! It had our company name and everything...",
                'click': "Yes, I clicked the link. I thought it was for our regular backup renewal. Then my password stopped working!",
                'password': "After I entered my password on that website, I couldn't log in anymore. IT had to reset it for me.",
                'invoice': "I usually process invoices, yes. I hope none of the customer files were affected...",
                'sorry': "I feel terrible about this. I should have been more careful. The email just looked so real!",
                'backup': "The email said our CloudSafe backup was expiring and needed immediate renewal. It had our logo and everything.",
                'default': "I'm so worried about what happened. That email looked completely legitimate to me. I entered my password and then everything went wrong."
            },
            'security-officer': {
                'access': "23 invoice PDF files were accessed from IP address 203.0.113.45 between 10:01 and 10:15 AM.",
                'invoice': "The attacker downloaded customer invoices and appears to have created modified versions with different bank details.",
                'ip': "The suspicious IP 203.0.113.45 isn't from our normal network range. It's from an external location.",
                'recommend': "We need immediate password resets, 2FA implementation, and security awareness training for all staff.",
                'phishing': "Classic phishing attack. The email domain had a typo - 'tecknova' instead of 'technova'.",
                'evidence': "Check the access logs and compare the real invoices with the fake ones being sent to customers.",
                'default': "This was a targeted phishing attack leading to credential theft. 23 files were compromised. We need to act fast."
            },
            'ceo': {
                'customer': "We've had multiple customers calling about invoices with different bank account numbers. This is a disaster!",
                'press': "We've issued a press release but kept it vague. We don't want to cause panic.",
                'damage': "The reputation damage could be severe. Some customers have already paid to the wrong accounts.",
                'staff': "Someone in accounting clicked a phishing email. We need better training, clearly.",
                'money': "We're still calculating losses. Several customers paid the fake invoices before we caught this.",
                'help': "Focus on finding out how this happened and how to stop it. I need solutions, not problems!",
                'default': "This incident is affecting our reputation. Customers are receiving fake invoices. We need to resolve this immediately!"
            }
        };
        
        const personaResponses = responses[persona] || responses['it-analyst'];
        
        for (const [keyword, response] of Object.entries(personaResponses)) {
            if (keyword !== 'default' && lowerMessage.includes(keyword)) {
                return response;
            }
        }
        
        return personaResponses.default;
    }

    function handlePersonaChange() {
        const body = document.getElementById('chat-body');
        body.innerHTML = '';
        chatState.messages = [];
        addWelcomeMessage();
    }

    function init() {
        const elements = createElements();
        
        elements.fab.addEventListener('click', () => toggleChat(true));
        elements.closeBtn.addEventListener('click', () => toggleChat(false));
        elements.sendBtn.addEventListener('click', handleSend);
        elements.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });
        elements.select.addEventListener('change', handlePersonaChange);
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && chatState.isOpen) {
                toggleChat(false);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();