const legalContent = {
    privacy: `
        <h2 class="text-2xl text-[#D4AF37] mb-4">Privacy Policy</h2>
        <p>At Daiya's, we value your privacy. We do not track you with invasive cookies. This site uses standard analytics to improve user experience. Any contact information shared via WhatsApp or Email is strictly used for business inquiries only and will never be sold to third parties.</p>
    `,
    terms: `
        <h2 class="text-2xl text-[#D4AF37] mb-4">Terms of Service</h2>
        <p>All content, including the "Tradition Deconstructed" animation, logos, and imagery, are the intellectual property of Daiya Agro Industries Pvt. Ltd. Unauthorized reproduction is prohibited. Product information provided is for educational and inquiry purposes.</p>
    `
};

export function initUI() {
    const modal = document.getElementById('legalModal');
    const content = document.getElementById('modalContent');
    const privacyBtn = document.getElementById('btn-privacy');
    const termsBtn = document.getElementById('btn-terms');

    // The close button is the button inside the legalModal div
    // Based on HTML: <div id="legalModal"> ... <button onclick="closeModal()">Close</button> ... </div>
    const closeBtn = modal ? modal.querySelector('button') : null;

    function openModal(type) {
        if (!modal || !content) return;
        content.innerHTML = legalContent[type];
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }

    if (privacyBtn) privacyBtn.addEventListener('click', () => openModal('privacy'));
    if (termsBtn) termsBtn.addEventListener('click', () => openModal('terms'));
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
}
