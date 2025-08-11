// AnythingLLM Integration for TechNova Chatbots
// This file manages multiple AnythingLLM embedded chatbots with persona switching

(function() {
    // Configuration for each persona's AnythingLLM embed
    // Replace these with your actual embed IDs from AnythingLLM
    const ANYTHINGLLM_CONFIG = {
        'it-analyst': {
            embedId: '938328b5-18ea-4c7f-8760-cb7caecf0694', // Replace with Dave Wilson's workspace embed ID
            name: 'Dave Wilson - IT Support',
            placeholder: 'Ask about technical details...'
        },
        'accounts-clerk': {
            embedId: '608097a5-197b-47db-a012-92ae5a53b35e', // Replace with Sarah Mitchell's workspace embed ID
            name: 'Sarah Mitchell - Accounts',
            placeholder: 'Ask about the phishing email...'
        },
        'security-officer': {
            embedId: '921a5ed7-e258-47d6-8293-14686669656d', // Replace with Michael Torres's workspace embed ID
            name: 'Michael Torres - Security',
            placeholder: 'Ask about the investigation...'
        },
        'ceo': {
            embedId: '0d959949-dc6f-4fd5-bf85-9deb9a5262f9', // Replace with James Patterson's workspace embed ID
            name: 'James Patterson - CEO',
            placeholder: 'Ask about business impact...'
        }
    };

    // Base configuration for all embeds
    const BASE_API_URL = 'https://chat.serveur.au/api/embed';
    const WIDGET_SCRIPT_URL = 'https://chat.serveur.au/embed/anythingllm-chat-widget.min.js';

    let currentPersona = 'it-analyst';
    let currentWidget = null;
    let isInitialized = false;
    let widgetScriptLoaded = false;

    // Load AnythingLLM iframe into our chat panel
    function loadPersonaWidget(persona) {
        const config = ANYTHINGLLM_CONFIG[persona];
        if (!config || !config.embedId || config.embedId.includes('YOUR-')) {
            console.warn(`AnythingLLM embed ID not configured for ${persona}`);
            return false;
        }

        const chatBody = document.getElementById('chat-body');
        if (!chatBody) {
            console.error('Chat body not found');
            return false;
        }

        // Clear chat body and add iframe
        chatBody.innerHTML = '';
        chatBody.style.padding = '0';
        chatBody.style.height = 'calc(100% - 50px)'; // Account for header
        
        // Create iframe for AnythingLLM
        const iframe = document.createElement('iframe');
        iframe.id = 'anythingllm-embed-iframe';
        iframe.src = `https://chat.serveur.au/embed/${config.embedId}`;
        iframe.style.cssText = `
            width: 100%;
            height: 100%;
            border: none;
            background: white;
        `;
        
        iframe.onload = () => {
            console.log('AnythingLLM iframe loaded for', persona);
        };
        
        iframe.onerror = (e) => {
            console.error('Failed to load AnythingLLM iframe:', e);
            // Restore normal chat on error
            chatBody.style.padding = '';
            chatBody.style.height = '';
            chatBody.innerHTML = '<div style="padding: 10px; color: red;">Failed to load AI chat. Please try again.</div>';
        };
        
        chatBody.appendChild(iframe);
        currentPersona = persona;
        return true;
    }

    // Initialize the integration
    function initializeIntegration() {
        if (isInitialized) return;
        
        // No need to override toggleChat anymore - we're using the AI Mode toggle instead

        // Listen for persona changes
        const personaSelect = document.getElementById('persona-select');
        if (personaSelect) {
            personaSelect.addEventListener('change', function() {
                const newPersona = this.value;
                // If AI Mode is active, reload the widget for new persona
                const aiToggle = document.getElementById('anythingllm-toggle');
                if (aiToggle && aiToggle.checked) {
                    loadPersonaWidget(newPersona);
                }
            });
        }

        // Modify the chat panel to show AnythingLLM option
        addAnythingLLMToggle();
        
        isInitialized = true;
    }

    // Add a toggle to switch between built-in chat and AnythingLLM
    function addAnythingLLMToggle() {
        const chatHeader = document.querySelector('.chat-header');
        if (!chatHeader) return;

        const toggleContainer = document.createElement('div');
        toggleContainer.style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
            margin-left: auto;
            margin-right: 10px;
        `;

        const toggleLabel = document.createElement('label');
        toggleLabel.style.cssText = 'font-size: 12px; color: #fff; font-weight: 500;';
        toggleLabel.textContent = 'AI Mode:';

        const toggleSwitch = document.createElement('input');
        toggleSwitch.type = 'checkbox';
        toggleSwitch.id = 'anythingllm-toggle';
        toggleSwitch.style.cssText = 'cursor: pointer;';
        
        toggleSwitch.addEventListener('change', function() {
            const useAnythingLLM = this.checked;
            const chatBody = document.getElementById('chat-body');
            const chatInput = document.querySelector('.chat-input');
            
            if (useAnythingLLM) {
                // Get current persona
                const select = document.getElementById('persona-select');
                const persona = select ? select.value : 'it-analyst';
                const config = ANYTHINGLLM_CONFIG[persona];
                
                // Check if AnythingLLM is configured
                if (config && config.embedId && !config.embedId.includes('YOUR-')) {
                    // Hide chat input
                    if (chatInput) chatInput.style.display = 'none';
                    
                    // Load AnythingLLM iframe into chat body
                    if (loadPersonaWidget(persona)) {
                        console.log('AI Mode enabled for', persona);
                    } else {
                        console.error('Failed to load AnythingLLM widget');
                        this.checked = false;
                        if (chatInput) chatInput.style.display = 'flex';
                        restoreNormalChat();
                    }
                } else {
                    alert('AnythingLLM is not configured for ' + persona);
                    this.checked = false;
                }
            } else {
                // Restore normal chat
                if (chatInput) chatInput.style.display = 'flex';
                restoreNormalChat();
            }
        });
        
        // Helper function to restore normal chat
        function restoreNormalChat() {
            const chatBody = document.getElementById('chat-body');
            if (chatBody) {
                // Remove iframe
                const iframe = document.getElementById('anythingllm-embed-iframe');
                if (iframe) iframe.remove();
                
                // Restore chat body styles
                chatBody.style.padding = '';
                chatBody.style.height = '';
                chatBody.innerHTML = '';
                
                // Re-add welcome message if needed
                if (window.addWelcomeMessage) {
                    window.addWelcomeMessage();
                }
            }
        }

        toggleContainer.appendChild(toggleLabel);
        toggleContainer.appendChild(toggleSwitch);
        
        // Insert before close button
        const closeBtn = chatHeader.querySelector('.close-btn');
        if (closeBtn) {
            chatHeader.insertBefore(toggleContainer, closeBtn);
        } else {
            chatHeader.appendChild(toggleContainer);
        }
    }

    // Alternative: Direct API integration (if you prefer API over iframe)
    window.anythingLLMAPI = async function(persona, message) {
        const config = ANYTHINGLLM_CONFIG[persona];
        if (!config || !config.embedId) {
            console.error('AnythingLLM not configured for', persona);
            return null;
        }

        try {
            const response = await fetch(`${BASE_API_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    embedId: config.embedId,
                    message: message,
                    sessionId: `technova-${Date.now()}`,
                    // Add any additional context here
                })
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }

            const data = await response.json();
            return data.textResponse || data.response || data.message;
        } catch (error) {
            console.error('AnythingLLM API error:', error);
            return null;
        }
    };

    // Hook into the existing chatbot backend
    window.chatbotBackend = async function(persona, message, context) {
        // Try AnythingLLM API first
        const response = await window.anythingLLMAPI(persona, message);
        if (response) {
            return response;
        }
        
        // Fallback to built-in responses
        if (window.getPersonaResponse) {
            return window.getPersonaResponse(persona, message, context);
        }
        
        return "I'm having trouble connecting to the chat service. Please try again.";
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            // Delay to ensure chatbot.js has fully initialized
            setTimeout(initializeIntegration, 500);
        });
    } else {
        // Delay to ensure chatbot.js has loaded first
        setTimeout(initializeIntegration, 500);
    }

    // Expose configuration for updates
    window.updateAnythingLLMConfig = function(persona, embedId) {
        if (ANYTHINGLLM_CONFIG[persona]) {
            ANYTHINGLLM_CONFIG[persona].embedId = embedId;
            console.log(`Updated AnythingLLM embed ID for ${persona}`);
        }
    };

    // Helper to test configuration
    window.testAnythingLLM = function() {
        console.log('AnythingLLM Configuration:');
        Object.entries(ANYTHINGLLM_CONFIG).forEach(([persona, config]) => {
            const status = config.embedId && !config.embedId.includes('YOUR-') ? '✓ Configured' : '✗ Not configured';
            console.log(`${persona}: ${status}`);
        });
    };

})();
