const donutBtn = document.getElementById('donutBtn');
const message = document.getElementById('message');

const messages = [
    "Mmm, delicious! 🍩",
    "Un donut pe zi te ține vesel! 🎉",
    "Donuts sunt viața! 💖",
    "Încă unul? Sigur! 🍩✨",
    "Glazed perfection! 🌟",
    "Sweet happiness! 🎊"
];

let clickCount = 0;

donutBtn.addEventListener('click', () => {
    clickCount++;

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    message.textContent = randomMessage;

    donutBtn.style.animation = 'none';
    setTimeout(() => {
        donutBtn.style.animation = '';
    }, 10);

    if (clickCount === 10) {
        message.textContent = "Wow! 10 donuts! Ești un adevărat fan! 🏆🍩";
    }
});

const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
document.head.appendChild(style);
