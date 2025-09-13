"use strict"
const speeds = ['slow', 'medium', 'fast'];

function createConfettiPiece() {
    const confetti = document.createElement('div');
    let confettiContainer = document.getElementById('confetti-container');
    confetti.classList.add('confetti');

    const speed = speeds[Math.floor(Math.random() * speeds.length)];
    confetti.classList.add(`confetti--animation-${speed}`);

    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;

    confettiContainer.appendChild(confetti);

    setTimeout(() => confetti.remove(), 3000);
}

export function startConfetti() {
    let confettiContainer = document.getElementById('confetti-container');
    for (let i = 0; i < 100; i++) {
        setTimeout(createConfettiPiece, i * 30);
    }
}

// Start on page load
//startConfetti();