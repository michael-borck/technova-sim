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

    // Load AnythingLLM widget script and initialize
    function loadPersonaWidget(persona) {
        const config = ANYTHINGLLM_CONFIG[persona];
        if (!config || !config.embedId || config.embedId.includes('YOUR-')) {
            console.warn(`AnythingLLM embed ID not configured for ${persona}`);
            return false;
        }

        // Remove any existing scripts
        const existingScript = document.querySelector('script[src*="anythingllm-chat-widget"]');
        if (existingScript) {
            existingScript.remove();
        }

        // Remove any existing widget elements
        const existingElements = document.querySelectorAll('[id*="anythingllm"]');
        existingElements.forEach(el => el.remove());

        // Create and add the script with data attributes
        const script = document.createElement('script');
        script.setAttribute('data-embed-id', config.embedId);
        script.setAttribute('data-base-api-url', BASE_API_URL);
        script.src = WIDGET_SCRIPT_URL;
        
        script.onload = () => {
            console.log('AnythingLLM script loaded for', persona);
            
            // The script should auto-initialize, but let's try to trigger it
            if (window.EmbeddedAnythingLLM) {
                console.log('EmbeddedAnythingLLM available');
            }
            
            // Auto-click the chat button after it appears
            setTimeout(() => {
                const chatButton = document.querySelector('[id*="anythingllm-chat-bubble"]');
                if (chatButton) {
                    chatButton.click();
                    console.log('Opened AnythingLLM chat');
                }
            }, 1000);
        };
        
        document.body.appendChild(script);
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
            const chatPanel = document.querySelector('.chat-panel');
            const chatFab = document.querySelector('.chat-fab');
            
            if (useAnythingLLM) {
                // Get current persona
                const select = document.getElementById('persona-select');
                const persona = select ? select.value : 'it-analyst';
                const config = ANYTHINGLLM_CONFIG[persona];
                
                // Check if AnythingLLM is configured
                if (config && config.embedId && !config.embedId.includes('YOUR-')) {
                    // Hide our chat panel and FAB
                    if (chatPanel) chatPanel.classList.remove('active');
                    if (chatFab) chatFab.style.display = 'none';
                    
                    // Load AnythingLLM widget
                    if (loadPersonaWidget(persona)) {
                        console.log('AI Mode enabled for', persona);
                    } else {
                        console.error('Failed to load AnythingLLM widget');
                        this.checked = false;
                        if (chatFab) chatFab.style.display = 'block';
                    }
                } else {
                    alert('AnythingLLM is not configured for ' + persona);
                    this.checked = false;
                }
            } else {
                // Restore our chat FAB
                if (chatFab) chatFab.style.display = 'block';
                
                // Remove AnythingLLM elements
                const existingScript = document.querySelector('script[src*="anythingllm-chat-widget"]');
                if (existingScript) existingScript.remove();
                
                const existingElements = document.querySelectorAll('[id*="anythingllm"]');
                existingElements.forEach(el => el.remove());
            }
        });

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
