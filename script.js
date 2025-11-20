// Canvas Setup
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    const container = document.querySelector('.canvas-container');
    const maxWidth = Math.min(container.clientWidth - 40, 800);
    canvas.width = maxWidth;
    canvas.height = Math.min(maxWidth * 0.75, 600);
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Drawing state
let isDrawing = false;
let currentColor = '#000000';
let currentSize = 3;
let isEraser = false;

// Get elements
const colorButtons = document.querySelectorAll('.color-btn');
const brushSize = document.getElementById('brushSize');
const brushSizeValue = document.getElementById('brushSizeValue');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');
const saveBtn = document.getElementById('saveBtn');
const tutorialButtons = document.querySelectorAll('.tutorial-btn');
const tutorialContent = document.getElementById('tutorialContent');

// Set first color as active
colorButtons[0].classList.add('active');

// Color selection
colorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        colorButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentColor = btn.getAttribute('data-color');
        isEraser = false;
        eraserBtn.classList.remove('active');
    });
});

// Brush size
brushSize.addEventListener('input', (e) => {
    currentSize = e.target.value;
    brushSizeValue.textContent = currentSize + 'px';
});

// Eraser
eraserBtn.addEventListener('click', () => {
    isEraser = !isEraser;
    eraserBtn.classList.toggle('active');
    if (isEraser) {
        colorButtons.forEach(b => b.classList.remove('active'));
    }
});

// Clear canvas
clearBtn.addEventListener('click', () => {
    if (confirm('Ești sigur că vrei să ștergi tot desenul?')) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

// Save drawing
saveBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'desenul-meu.png';
    link.href = canvas.toDataURL();
    link.click();
});

// Drawing functions
function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.lineWidth = currentSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = isEraser ? '#ffffff' : currentColor;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// Mouse events
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseout', stopDrawing);

// Touch events for mobile
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    startDrawing(e);
});

canvas.addEventListener('touchend', (e) => {
    e.preventDefault();
    stopDrawing();
});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    draw(e);
});

// Tutorials
const tutorials = {
    circle: {
        title: 'Cum să desenezi un cerc perfect',
        steps: [
            'Alege o culoare din paletă',
            'Setează grosimea pensulei la aproximativ 3-5px',
            'Începe să desenezi încet, formând o curbă',
            'Continuă curba până formezi un cerc complet',
            'Dacă nu iese perfect prima dată, apasă "Șterge tot" și încearcă din nou!',
            'Pro tip: Desenează mai multe cercuri concentrice pentru un efect artistic!'
        ]
    },
    house: {
        title: 'Cum să desenezi o casă simplă',
        steps: [
            'Desenează un pătrat mare pentru corp casă',
            'Deasupra pătratului, desenează un triunghi pentru acoperiș',
            'Adaugă un dreptunghi în mijlocul casei pentru ușă',
            'Desenează două pătrățele mici pentru ferestre',
            'Opțional: Schimbă culoarea și adaugă detalii (mâner ușă, cadre ferestre)',
            'Desenează un drum sau iarbă în jurul casei pentru ambientare!'
        ]
    },
    flower: {
        title: 'Cum să desenezi o floare',
        steps: [
            'Alege o culoare vie (roșu, roz, galben) pentru petale',
            'Desenează un cerc mic în centru',
            'În jurul cercului, desenează 5-6 ovale pentru petale',
            'Schimbă culoarea la verde',
            'Desenează o linie verticală în jos pentru tulpină',
            'Adaugă 2-3 frunze de-a lungul tulpinii',
            'Pro tip: Poți face mai multe flori de culori diferite!'
        ]
    },
    face: {
        title: 'Cum să desenezi o față zâmbitoare',
        steps: [
            'Desenează un cerc mare pentru cap',
            'Adaugă două cercuri mici pentru ochi (puțin deasupra centrului)',
            'În fiecare ochi, desenează un punct negru pentru pupilă',
            'Sub ochi, desenează un semicerc pentru nas',
            'Mai jos, desenează o curbă mare în sus pentru zâmbet',
            'Adaugă 2-3 linii scurte în colțurile gurii pentru a arăta obrajii',
            'Opțional: Adaugă păr, urechi, sau accesorii pentru personalitate!'
        ]
    }
};

tutorialButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const tutorialType = btn.getAttribute('data-tutorial');
        const tutorial = tutorials[tutorialType];

        tutorialContent.innerHTML = `
            <h4>${tutorial.title}</h4>
            <ol>
                ${tutorial.steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
            <p style="margin-top: 15px; font-style: italic; color: #667eea;">
                Gata să încerci? Folosește canvas-ul de mai sus și urmează pașii!
            </p>
        `;

        // Scroll to tutorial
        tutorialContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
});

// Welcome message
window.addEventListener('load', () => {
    tutorialContent.innerHTML = `
        <p style="text-align: center; color: #667eea; font-size: 1.2em;">
            👆 Selectează o lecție de mai sus pentru a învăța să desenezi!
        </p>
    `;
});
