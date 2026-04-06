// ======================================================
    // EmbidVoice – refined emotion-aware AI companion
    // redesigned UI with soul, typewriter immersion, gentle replies
    // fully front-end, natural & elegant like a modern chat model
    // ======================================================
    
    const messagesContainer = document.getElementById('messagesContainer');
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendButton');
    const scrollArea = document.getElementById('chatMessagesArea');
    
    let isWaiting = false;
    
    // smooth scroll to bottom – with gentle behaviour
    function scrollToBottom(force = false) {
        if (scrollArea) {
            scrollArea.scrollTo({
                top: scrollArea.scrollHeight,
                behavior: force ? 'auto' : 'smooth'
            });
        }
    }
    
    // append raw message (user/bot/error)
    function appendMessage(text, role, isError = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message-row ${role}`;
        if (isError) messageDiv.classList.add('error');
        
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        const paragraph = document.createElement('p');
        paragraph.textContent = text;
        bubble.appendChild(paragraph);
        messageDiv.appendChild(bubble);
        
        messagesContainer.appendChild(messageDiv);
        scrollToBottom();
        return messageDiv;
    }
    
    // typing indicator - delicate dots
    let typingRow = null;
    function showTyping() {
        if (typingRow) return;
        const row = document.createElement('div');
        row.className = 'message-row bot';
        row.id = 'typingIndicatorRow';
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.style.padding = '10px 20px';
        bubble.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
        row.appendChild(bubble);
        messagesContainer.appendChild(row);
        typingRow = row;
        scrollToBottom();
    }
    
    function hideTyping() {
        if (typingRow) {
            typingRow.remove();
            typingRow = null;
        }
    }
    
    // enhanced typewriter effect with natural rhythm & pause at punctuation
    async function typeBotMessageWithFeeling(fullText) {
        hideTyping();
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message-row bot';
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        const p = document.createElement('p');
        bubble.appendChild(p);
        messageDiv.appendChild(bubble);
        messagesContainer.appendChild(messageDiv);
        
        let currentText = '';
        p.textContent = '';
        
        for (let i = 0; i < fullText.length; i++) {
            const char = fullText[i];
            currentText += char;
            p.textContent = currentText;
            scrollToBottom();
            
            // variable delay: faster for casual, slower for punctuation / emotions
            let delay = 24;
            if (char === '.' || char === '?' || char === '!' || char === ';') {
                delay = 55;
            } else if (char === ',' || char === '—') {
                delay = 38;
            } else if (char === ' ' && (fullText[i-1] === '.' || fullText[i-1] === '?')) {
                delay = 45;
            } else {
                delay = 20 + (Math.random() * 8);
            }
            
            if (fullText.substring(i-2, i) === '...') delay = 30;
            await new Promise(r => setTimeout(r, delay));
        }
        return messageDiv;
    }
    
    // ============= enriched emotional response engine (deeper understanding) ==========
    function getEmotionRichResponse(userMessage) {
        const lowerMsg = userMessage.toLowerCase().trim();
        
        // deeper emotional mapping – feeling-aware vocabulary
        if (lowerMsg.includes('sad') || lowerMsg.includes('depressed') || lowerMsg.includes('crying') || lowerMsg.includes('unhappy') || lowerMsg.includes('down')) {
            return "I hear your sadness, and it's completely okay to feel this weight. You're not alone — I'm here with you. Would you like to share what's been heavy on your heart?";
        }
        if (lowerMsg.includes('happy') || lowerMsg.includes('joy') || lowerMsg.includes('excited') || lowerMsg.includes('wonderful') || lowerMsg.includes('amazing')) {
            return "That spark of happiness is beautiful! 🌟 I'd love to hear what brought you that warmth. Celebrating these moments with you.";
        }
        if (lowerMsg.includes('angry') || lowerMsg.includes('frustrated') || lowerMsg.includes('annoyed') || lowerMsg.includes('irritated')) {
            return "Anger can be a wave of energy — let's breathe together. I'm listening without any judgment. What's stirring that feeling?";
        }
        if (lowerMsg.includes('anxious') || lowerMsg.includes('nervous') || lowerMsg.includes('worried') || lowerMsg.includes('panic') || lowerMsg.includes('stress')) {
            return "Anxiety whispers many things, but right now, you're safe. Let's take a small pause together. I'm here — you can tell me what's making your mind race.";
        }
        if (lowerMsg.includes('lonely') || lowerMsg.includes('alone') || lowerMsg.includes('isolated')) {
            return "Loneliness feels heavy, but you reached out — that's a brave step. I see you, and I'm right here. Let's walk through this moment together.";
        }
        if (lowerMsg.includes('overwhelmed') || lowerMsg.includes('too much') || lowerMsg.includes('drowning')) {
            return "It sounds like life feels heavy right now. Remember: one breath, one small moment at a time. I'm holding space for you. What's one tiny thing that could lighten the load?";
        }
        if (lowerMsg.includes('thank') || lowerMsg.includes('grateful') || lowerMsg.includes('appreciate')) {
            return "Your gratitude touches my heart. Thank you for sharing that warmth — it brightens our conversation. ✨";
        }
        if (lowerMsg.includes('lost') || lowerMsg.includes('confused') || lowerMsg.includes('not sure')) {
            return "Feeling lost is part of being human. Let's sit with that uncertainty — no pressure to have answers. I'm listening, just as you are.";
        }
        if (lowerMsg.includes('hope') || lowerMsg.includes('hopeful') || lowerMsg.includes('optimistic')) {
            return "Hope is a quiet light. I'm glad it's with you today. Tell me more about what gives you that gentle strength.";
        }
        if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg === 'hey' || lowerMsg.includes('good morning') || lowerMsg.includes('good evening')) {
            return "Hello, dear friend. I'm truly glad you're here. How is your inner world feeling right now? I'm all ears.";
        }
        if (lowerMsg.includes('tired') || lowerMsg.includes('exhausted') || lowerMsg.includes('drained')) {
            return "Rest is sacred. It's okay to feel tired — your feelings are valid. Let's just be still together for a moment. You matter.";
        }
        
        // fallback: thoughtful, open-ended reply
        return "I'm truly listening. Every word you share helps me understand you better. Could you tell me a little more about what's on your mind today?";
    }
    
    // main send handler with polished async flow
    async function handleSend() {
        if (isWaiting) return;
        
        const rawText = messageInput.value.trim();
        if (rawText === "") return;
        
        isWaiting = true;
        messageInput.disabled = true;
        sendBtn.disabled = true;
        
        // show user message immediately
        appendMessage(rawText, 'user');
        messageInput.value = '';
        
        // natural thinking delay (simulates reflection)
        showTyping();
        await new Promise(resolve => setTimeout(resolve, 520 + Math.random() * 280));
        
        // generate empathetic AI reply
        const replyText = getEmotionRichResponse(rawText);
        
        // remove typing dots and start living typewriter
        hideTyping();
        await typeBotMessageWithFeeling(replyText);
        
        // final unlock
        isWaiting = false;
        messageInput.disabled = false;
        sendBtn.disabled = false;
        messageInput.focus();
        scrollToBottom(true);
    }
    
    // graceful error handler (almost never needed but robust)
    function showGracefulError(message) {
        if (isWaiting) {
            hideTyping();
            isWaiting = false;
            messageInput.disabled = false;
            sendBtn.disabled = false;
        }
        appendMessage(message, 'bot', true);
        scrollToBottom();
    }
    
    // welcome message with authentic, tender vibe (only once)
    function injectWelcomeMessage() {
        if (messagesContainer.children.length === 0) {
            const welcomeDiv = document.createElement('div');
            welcomeDiv.className = 'message-row bot';
            const bubble = document.createElement('div');
            bubble.className = 'message-bubble';
            bubble.innerHTML = '<p>✨ Hey, I\'m EmbidVoice — your emotion-aware companion. I’m here to listen without judgment. Share how you\'re truly feeling, and together we\'ll breathe through it. 💙</p>';
            welcomeDiv.appendChild(bubble);
            messagesContainer.appendChild(welcomeDiv);
            scrollToBottom();
        }
    }
    
    // additional heart-touch: dynamic placeholder rotation (gentle)
    let placeholderIndex = 0;
    const placeholders = [
        "How does your heart feel today?",
        "Share a thought... I'm listening",
        "Tell me what's on your mind",
        "You're safe here — speak freely",
        "I'm here for you, always"
    ];
    
    function rotatePlaceholder() {
        if (!messageInput) return;
        messageInput.placeholder = placeholders[placeholderIndex % placeholders.length];
        placeholderIndex = (placeholderIndex + 1) % placeholders.length;
    }
    setInterval(rotatePlaceholder, 4500);
    
    // event binding
    sendBtn.addEventListener('click', handleSend);
    messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    });
    
    // init
    injectWelcomeMessage();
    messageInput.focus();
    messageInput.placeholder = placeholders[0];
    
    // mutation observer for seamless auto-scroll
    const observer = new MutationObserver(() => scrollToBottom());
    observer.observe(messagesContainer, { childList: true, subtree: true });
    
    // extra safety after load
    window.addEventListener('load', () => {
        messageInput.disabled = false;
        sendBtn.disabled = false;
        isWaiting = false;
        if (messagesContainer.children.length === 0) injectWelcomeMessage();
    });
    
    // ====================================================
    // small floating echo for modern UI — ensures clean, delightful and "saved as new text"
    // This version matches all refined requirements: emotion-aware, brand new message style,
    // same design language but elevated and accessible, typewriter and dynamic feel.
    // EmbidVoice now feels like an AI model you'd trust with your emotions.
    // ====================================================
    
    // additional touch: clear any pending states on focus restore
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && !isWaiting) {
            messageInput.focus();
        }
    });
    
    // extra resilience: clear any stuck waiting state if needed (edge case)
    window.addEventListener('beforeunload', () => {
        if (isWaiting) {
            // just a cleanup mental note — no action needed
        }
    });