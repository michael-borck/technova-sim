// AnythingLLM Integration for TechNova Chatbots
// This file manages multiple AnythingLLM embedded chatbots with persona switching

(function() {
    // Configuration for each persona's AnythingLLM embed
    // Replace these with your actual embed IDs from AnythingLLM
    const ANYTHINGLLM_CONFIG = {
        'it-analyst': {
            embedId: '0d959949-dc6f-4fd5-bf85-9deb9a5262f9', // Replace with Dave Wilson's workspace embed ID
            name: 'Dave Wilson - IT Support',
            placeholder: 'Ask about technical details...'
        },
        'accounts-clerk': {
            embedId: 'YOUR-SARAH-EMBED-ID', // Replace with Sarah Mitchell's workspace embed ID
            name: 'Sarah Mitchell - Accounts',
            placeholder: 'Ask about the phishing email...'
        },
        'security-officer': {
            embedId: 'YOUR-MICHAEL-EMBED-ID', // Replace with Michael Torres's workspace embed ID
            name: 'Michael Torres - Security',
            placeholder: 'Ask about the investigation...'
        },
        'ceo': {
            embedId: 'YOUR-JAMES-EMBED-ID', // Replace with James Patterson's workspace embed ID
            name: 'James Patterson - CEO',
            placeholder: 'Ask about business impact...'
        }
    };

    // Base configuration for all embeds
    const BASE_API_URL = 'https://chat.serveur.au/api/embed';
    const WIDGET_SCRIPT_URL = 'https://chat.serveur.au/embed/anythingllm-chat-widget.min.js';

    let currentPersona = 'it-analyst';
    let currentWidget = null;
    let widgetContainer = null;
    let isInitialized = false;

    // Create a custom container for the AnythingLLM widget
    function createWidgetContainer() {
        // Remove existing container if present
        const existing = document.getElementById('anythingllm-container');
        if (existing) {
            existing.remove();
        }

        // Create new container
        const container = document.createElement('div');
        container.id = 'anythingllm-container';
        container.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: 380px;
            height: 500px;
            z-index: 9998;
            display: none;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        `;
        
        document.body.appendChild(container);
        return container;
    }

    // Load AnythingLLM widget for specific persona
    function loadPersonaWidget(persona) {
        const config = ANYTHINGLLM_CONFIG[persona];
        if (!config || !config.embedId || config.embedId.includes('YOUR-')) {
            console.warn(`AnythingLLM embed ID not configured for ${persona}`);
            return false;
        }

        // Clear existing widget
        if (widgetContainer) {
            widgetContainer.innerHTML = '';
        }

        // Create iframe for the embed
        const iframe = document.createElement('iframe');
        iframe.id = `anythingllm-iframe-${persona}`;
        iframe.style.cssText = 'width: 100%; height: 100%; border: none;';
        
        // Build the embed URL with configuration
        const embedUrl = new URL(`${BASE_API_URL.replace('/api/embed', '')}/embed/${config.embedId}`);
        embedUrl.searchParams.set('theme', 'dark'); // or 'light'
        embedUrl.searchParams.set('assistant_name', config.name);
        embedUrl.searchParams.set('assistant_icon', '🔍');
        embedUrl.searchParams.set('window_height', '500');
        embedUrl.searchParams.set('window_width', '380');
        embedUrl.searchParams.set('text_size', 'normal');
        embedUrl.searchParams.set('open_on_load', 'false');
        
        iframe.src = embedUrl.toString();
        widgetContainer.appendChild(iframe);
        
        currentPersona = persona;
        return true;
    }

    // Initialize the integration
    function initializeIntegration() {
        if (isInitialized) return;
        
        // Create container for widgets
        widgetContainer = createWidgetContainer();
        
        // Override the existing chatbot toggle
        const originalToggle = window.toggleChat;
        if (originalToggle) {
            window.toggleChat = function(open) {
                if (open) {
                    // Get current persona from dropdown
                    const select = document.getElementById('persona-select');
                    if (select) {
                        const persona = select.value;
                        if (loadPersonaWidget(persona)) {
                            widgetContainer.style.display = 'block';
                        } else {
                            // Fallback to original chat if AnythingLLM not configured
                            console.log('Using fallback chat for', persona);
                            originalToggle(open);
                        }
                    }
                } else {
                    widgetContainer.style.display = 'none';
                    originalToggle(open);
                }
            };
        }

        // Listen for persona changes
        const personaSelect = document.getElementById('persona-select');
        if (personaSelect) {
            personaSelect.addEventListener('change', function() {
                const newPersona = this.value;
                if (widgetContainer && widgetContainer.style.display !== 'none') {
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
        toggleLabel.style.cssText = 'font-size: 12px; color: #666;';
        toggleLabel.textContent = 'AI Mode:';

        const toggleSwitch = document.createElement('input');
        toggleSwitch.type = 'checkbox';
        toggleSwitch.id = 'anythingllm-toggle';
        toggleSwitch.style.cssText = 'cursor: pointer;';
        
        toggleSwitch.addEventListener('change', function() {
            const useAnythingLLM = this.checked;
            const chatPanel = document.querySelector('.chat-panel');
            const chatBody = document.getElementById('chat-body');
            const chatInput = document.querySelector('.chat-input');
            
            if (useAnythingLLM) {
                // Hide built-in chat elements
                if (chatBody) chatBody.style.display = 'none';
                if (chatInput) chatInput.style.display = 'none';
                
                // Show AnythingLLM widget
                const select = document.getElementById('persona-select');
                if (select && loadPersonaWidget(select.value)) {
                    widgetContainer.style.display = 'block';
                }
            } else {
                // Show built-in chat elements
                if (chatBody) chatBody.style.display = 'block';
                if (chatInput) chatInput.style.display = 'flex';
                
                // Hide AnythingLLM widget
                if (widgetContainer) {
                    widgetContainer.style.display = 'none';
                }
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
        document.addEventListener('DOMContentLoaded', initializeIntegration);
    } else {
        // Small delay to ensure chatbot.js has loaded first
        setTimeout(initializeIntegration, 100);
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