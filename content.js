(function() {
    console.log("LinkedIn Connect Note Generator Extension loaded");
  
    const styles = `
      .generate-note-btn {
        position: absolute !important;
        right: 10px !important;
        bottom: 10px !important;
        z-index: 9999 !important;
        width: 30px !important;
        height: 30px !important;
        padding: 0 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        background-color: #0a66c2 !important;
        border: none !important;
        border-radius: 50% !important;
        color: white !important;
        font-size: 16px !important;
        cursor: pointer !important;
        transition: background-color 0.3s !important;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12) !important;
      }
      .generate-note-btn:hover {
        background-color: #004182 !important;
      }
      .send-invite__custom-message {
        padding-right: 45px !important;
      }
    `;
  
    function addStyles() {
      const styleElement = document.createElement('style');
      styleElement.textContent = styles;
      document.head.appendChild(styleElement);
      console.log("Styles added to the page");
    }
  
    function addGenerateButton() {
      console.log("Attempting to add generate button");
      const noteTextarea = document.querySelector('.send-invite__custom-message');
      if (!noteTextarea) {
        console.log("Textarea not found, skipping button addition");
        return;
      }
      if (document.querySelector('#generate-note-btn')) {
        console.log("Button already exists, skipping");
        return;
      }
      const generateButton = document.createElement('button');
      generateButton.id = 'generate-note-btn';
      generateButton.className = 'generate-note-btn';
      generateButton.innerHTML = '✏️';
      generateButton.title = 'Generate Note';
      generateButton.addEventListener('click', generateNote);
      
      // Create a wrapper div for positioning
      const wrapper = document.createElement('div');
      wrapper.style.position = 'relative';
      noteTextarea.parentNode.insertBefore(wrapper, noteTextarea);
      wrapper.appendChild(noteTextarea);
      wrapper.appendChild(generateButton);
      
      console.log("Generate button added to the textarea");
    }
  
    function generateNote(event) {
      console.log("Generate note button clicked");
      event.preventDefault();
      const noteTextarea = document.querySelector('.send-invite__custom-message');
      if (noteTextarea) {
        const name = document.querySelector('.artdeco-entity-lockup__title')?.textContent.trim() || '[Name]';
        const headline = document.querySelector('.artdeco-entity-lockup__subtitle')?.textContent.trim() || '[Headline]';
        const generatedNote = `Hi ${name},\n\nI came across your profile and was impressed by your experience as a ${headline}. I'd love to connect and learn more about your work in the industry.\n\nBest regards,\n[Your Name]`;
        noteTextarea.value = generatedNote;
        noteTextarea.dispatchEvent(new Event('input', { bubbles: true }));
        console.log("Note generated and inserted into textarea");
      } else {
        console.log("Textarea not found");
      }
    }
  
    function init() {
      console.log("Initializing extension");
      addStyles();
      addGenerateButton();
    }
  
    // Run initialization
    init();
  
    // Set up a MutationObserver to watch for changes
    const observer = new MutationObserver(() => {
      console.log("DOM changed, checking for textarea");
      addGenerateButton();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    console.log("MutationObserver set up");
  
    // Also check periodically
    setInterval(() => {
      console.log("Periodic check");
      addGenerateButton();
    }, 2000);
  })();