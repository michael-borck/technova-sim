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
    let isInitialized = false;
    let widgetScriptLoaded = false;

    // Load the widget script with specific embed ID
    function loadWidgetScript(embedId) {
        // Remove existing script if present
        const existingScript = document.getElementById('anythingllm-embed-script');
        if (existingScript) {
            existingScript.remove();
            widgetScriptLoaded = false;
        }
        
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.id = 'anythingllm-embed-script';
            script.setAttribute('data-embed-id', embedId || ''); // Set the embed ID
            script.setAttribute('data-base-api-url', BASE_API_URL);
            script.setAttribute('data-button-hidden', 'true'); // Hide the floating button!
            script.src = WIDGET_SCRIPT_URL;
            
            script.onload = () => {
                widgetScriptLoaded = true;
                console.log('AnythingLLM widget script loaded with embed ID:', embedId);
                resolve();
            };
            
            script.onerror = (e) => {
                console.error('Failed to load AnythingLLM widget script:', e);
                reject(e);
            };
            
            document.body.appendChild(script);
        });
    }

    // Open chat for specific persona
    async function loadPersonaWidget(persona) {
        const config = ANYTHINGLLM_CONFIG[persona];
        if (!config || !config.embedId || config.embedId.includes('YOUR-')) {
            console.warn(`AnythingLLM embed ID not configured for ${persona}`);
            return false;
        }

        try {
            // Load script with the correct embed ID
            await loadWidgetScript(config.embedId);
            
            // Small delay to ensure widget initializes
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Open the chat window using the widget's API
            if (window.AnythingLLMEmbed && window.AnythingLLMEmbed.open) {
                window.AnythingLLMEmbed.open();
                console.log('Opened AnythingLLM chat for', persona);
                currentPersona = persona;
                return true;
            } else {
                console.error('AnythingLLMEmbed.open not available');
                return false;
            }
        } catch (error) {
            console.error('Error loading persona widget:', error);
            return false;
        }
    }

    // Initialize the integration
    function initializeIntegration() {
        if (isInitialized) return;
        
        // No need to override toggleChat anymore - we're using the AI Mode toggle instead

        // Listen for persona changes
        const personaSelect = document.getElementById('persona-select');
        if (personaSelect) {
            personaSelect.addEventListener('change', async function() {
                const newPersona = this.value;
                // If AI Mode is active, switch to new persona
                const aiToggle = document.getElementById('anythingllm-toggle');
                if (aiToggle && aiToggle.checked) {
                    // Close current chat
                    if (window.AnythingLLMEmbed && window.AnythingLLMEmbed.close) {
                        window.AnythingLLMEmbed.close();
                    }
                    
                    // Small delay before opening with new persona
                    setTimeout(async () => {
                        await loadPersonaWidget(newPersona);
                    }, 300);
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
        
        toggleSwitch.addEventListener('change', async function() {
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
                    
                    // Load and open AnythingLLM widget
                    const success = await loadPersonaWidget(persona);
                    if (success) {
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
                // Close AnythingLLM chat if open
                if (window.AnythingLLMEmbed && window.AnythingLLMEmbed.close) {
                    window.AnythingLLMEmbed.close();
                }
                
                // Restore our chat FAB
                if (chatFab) chatFab.style.display = 'block';
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

    // Direct API integration for chat messages
    window.anythingLLMAPI = async function(persona, message, sessionId) {
        const config = ANYTHINGLLM_CONFIG[persona];
        if (!config || !config.embedId) {
            console.error('AnythingLLM not configured for', persona);
            return null;
        }

        try {
            // Use a consistent session ID per conversation
            const session = sessionId || `technova-${persona}-${Date.now()}`;
            
            const response = await fetch(`${BASE_API_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    embedId: config.embedId,
                    message: message,
                    sessionId: session
                })
            });

            if (!response.ok) {
                console.error(`API request failed: ${response.status}`);
                const text = await response.text();
                console.error('Response:', text);
                return null;
            }

            const data = await response.json();
            return {
                text: data.textResponse || data.response || data.message || 'No response',
                sessionId: session
            };
        } catch (error) {
            console.error('AnythingLLM API error:', error);
            return null;
        }
    };

    // Hook into the existing chatbot backend
    window.chatbotBackend = async function(persona, message, context) {
        // Check if AI Mode is enabled
        const aiToggle = document.getElementById('anythingllm-toggle');
        if (aiToggle && aiToggle.checked) {
            // Try AnythingLLM API
            const response = await window.anythingLLMAPI(persona, message, context.sessionId);
            if (response) {
                // Store session ID for continuity
                context.sessionId = response.sessionId;
                return response.text;
            }
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
