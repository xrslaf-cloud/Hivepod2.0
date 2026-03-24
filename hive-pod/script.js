document.addEventListener('DOMContentLoaded', () => {

    // --- Fake Door Modal Logic ---
    const modalOverlay = document.getElementById('fake-door-modal');
    const modalContent = modalOverlay.querySelector('.modal-content');
    const closeBtn = modalOverlay.querySelector('.close-modal-btn');
    const closeFinalBtn = modalOverlay.querySelector('.close-modal-final-btn');
    const fakeDoorBtns = document.querySelectorAll('.fake-door-btn');
    const optionBtns = document.querySelectorAll('.option-btn');
    const modalOptionsContainer = modalOverlay.querySelector('.modal-options');
    const successMessage = modalOverlay.querySelector('.success-message');
    const modalHeadline = modalOverlay.querySelector('.modal-headline');
    const modalText = modalOverlay.querySelector('.modal-text');

    // Open Modal
    fakeDoorBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            resetModal();
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close Modal on X button or clicking outside
    const closeModal = () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeModal);
    closeFinalBtn.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // Handle Option Selection
    optionBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const selectedReason = e.target.getAttribute('data-reason');
            console.log(`Fake Door Test - User selected: ${selectedReason}`);
            
            // Show Success Message
            modalHeadline.style.display = 'none';
            modalText.style.display = 'none';
            modalOptionsContainer.style.display = 'none';
            successMessage.style.display = 'block';
        });
    });

    // Reset Modal Content
    function resetModal() {
        modalHeadline.style.display = 'block';
        modalText.style.display = 'block';
        modalOptionsContainer.style.display = 'flex';
        successMessage.style.display = 'none';
    }


    // --- Scroll Animations (Keynote Style) ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-scale, .problem-statement');
    
    const revealOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.classList.contains('problem-statement')) {
                    entry.target.style.opacity = '1';
                }
            } else {
                // Remove active to allow re-triggering the animation when scrolling back up
                entry.target.classList.remove('active');
                if (entry.target.classList.contains('problem-statement')) {
                    entry.target.style.opacity = '0.3';
                }
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

});
