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
            bottom: 20px;
            right: 20px;
            width: 400px;
            height: 600px;
            z-index: 9999;
            display: none;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            background: white;
        `;
        
        // Add a header to show it's AnythingLLM
        const header = document.createElement('div');
        header.style.cssText = `
            background: #2563eb;
            color: white;
            padding: 10px;
            font-size: 14px;
            font-weight: bold;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;
        
        const title = document.createElement('span');
        title.textContent = 'AI-Powered Chat';
        header.appendChild(title);
        
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        closeBtn.onclick = () => {
            container.style.display = 'none';
            // Uncheck the AI Mode toggle
            const aiToggle = document.getElementById('anythingllm-toggle');
            if (aiToggle && aiToggle.checked) {
                aiToggle.checked = false;
                // Show built-in chat elements
                const chatBody = document.getElementById('chat-body');
                const chatInput = document.querySelector('.chat-input');
                if (chatBody) chatBody.style.display = 'block';
                if (chatInput) chatInput.style.display = 'flex';
            }
        };
        header.appendChild(closeBtn);
        
        container.appendChild(header);
        
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

        // Ensure widget container exists
        if (!widgetContainer) {
            widgetContainer = createWidgetContainer();
        }

        // Update header title
        const titleSpan = widgetContainer.querySelector('span');
        if (titleSpan) {
            titleSpan.textContent = `AI Chat - ${config.name}`;
        }
        
        // Remove any existing iframe containers
        const existingIframes = widgetContainer.querySelectorAll('iframe');
        existingIframes.forEach(iframe => {
            if (iframe.parentElement !== widgetContainer) {
                iframe.parentElement.remove();
            } else {
                iframe.remove();
            }
        });

        // Create iframe container
        const iframeContainer = document.createElement('div');
        iframeContainer.style.cssText = 'width: 100%; height: calc(100% - 45px);';
        
        // Create iframe for the embed
        const iframe = document.createElement('iframe');
        iframe.id = `anythingllm-iframe-${persona}`;
        iframe.style.cssText = 'width: 100%; height: 100%; border: none; background: white;';
        iframe.setAttribute('allow', 'clipboard-write; microphone');
        iframe.setAttribute('allowfullscreen', 'true');
        
        // Build the embed URL - use direct embed link
        const embedUrl = `https://chat.serveur.au/embed/${config.embedId}`;
        
        console.log('Loading AnythingLLM iframe:', embedUrl);
        iframe.src = embedUrl;
        
        // Add load event listener
        iframe.onload = () => {
            console.log('AnythingLLM iframe loaded successfully');
        };
        iframe.onerror = (e) => {
            console.error('AnythingLLM iframe failed to load:', e);
        };
        
        iframeContainer.appendChild(iframe);
        widgetContainer.appendChild(iframeContainer);
        
        currentPersona = persona;
        console.log('Widget loaded for persona:', persona);
        return true;
    }

    // Initialize the integration
    function initializeIntegration() {
        if (isInitialized) return;
        
        // Create container for widgets
        widgetContainer = createWidgetContainer();
        
        // Wait for toggleChat to be available
        const setupOverride = () => {
            const originalToggle = window.toggleChat;
            if (originalToggle) {
                window.toggleChat = function(open) {
                    if (open) {
                        // Get current persona from dropdown
                        const select = document.getElementById('persona-select');
                        if (select) {
                            const persona = select.value;
                            const config = ANYTHINGLLM_CONFIG[persona];
                            // Check if AnythingLLM is configured for this persona
                            if (config && config.embedId && !config.embedId.includes('YOUR-')) {
                                // Hide the default chat panel
                                const panel = document.querySelector('.chat-panel');
                                if (panel) panel.classList.remove('active');
                                
                                // Load and show AnythingLLM widget
                                if (loadPersonaWidget(persona)) {
                                    widgetContainer.style.display = 'block';
                                    console.log('Using AnythingLLM for', persona);
                                    return;
                                }
                            }
                        }
                    } else {
                        // Hide AnythingLLM widget
                        if (widgetContainer) {
                            widgetContainer.style.display = 'none';
                        }
                    }
                    // Fallback to original chat
                    originalToggle(open);
                };
                return true;
            }
            return false;
        };
        
        // Try to setup override, retry if toggleChat not yet available
        if (!setupOverride()) {
            setTimeout(setupOverride, 200);
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
        toggleLabel.style.cssText = 'font-size: 12px; color: #fff; font-weight: 500;';
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
                // Get current persona
                const select = document.getElementById('persona-select');
                const persona = select ? select.value : 'it-analyst';
                const config = ANYTHINGLLM_CONFIG[persona];
                
                // Check if AnythingLLM is configured
                if (config && config.embedId && !config.embedId.includes('YOUR-')) {
                    // Hide built-in chat elements
                    if (chatBody) chatBody.style.display = 'none';
                    if (chatInput) chatInput.style.display = 'none';
                    
                    // Hide the entire chat panel
                    if (chatPanel) chatPanel.classList.remove('active');
                    
                    // Load and show AnythingLLM widget
                    if (loadPersonaWidget(persona)) {
                        widgetContainer.style.display = 'block';
                        console.log('AI Mode enabled for', persona);
                    } else {
                        console.error('Failed to load AnythingLLM widget');
                        this.checked = false;
                        if (chatBody) chatBody.style.display = 'block';
                        if (chatInput) chatInput.style.display = 'flex';
                    }
                } else {
                    alert('AnythingLLM is not configured for ' + persona);
                    this.checked = false;
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
