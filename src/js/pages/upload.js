// Upload & Feedback Page
import State from '../utils/state.js';

export default class UploadPage {
    constructor() {
        this.state = State.getInstance();
        this.selectedFile = null;
        this.previewURL = null;
    }

    async render() {
        return `
            <div class="page-container">
                <header class="mb-4">
                    <h1 style="color: var(--primary); font-size: 2.5rem;">📸 Încarcă Desen</h1>
                    <p style="font-size: 1.1rem; color: var(--text-gray);">
                        Primește feedback instant de la AI
                    </p>
                </header>

                <div class="grid grid-2 gap-3">
                    <!-- Upload Section -->
                    <div class="card">
                        <h2 style="color: var(--primary); margin-bottom: 1rem;">📤 Upload</h2>

                        <div id="dropZone" class="drop-zone">
                            <div style="text-align: center;">
                                <div style="font-size: 3rem; margin-bottom: 1rem;">📁</div>
                                <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">
                                    Trage fișierul aici sau
                                </p>
                                <button class="btn btn-primary" id="selectFileBtn">
                                    Selectează fișier
                                </button>
                                <input type="file" id="fileInput" accept="image/*" style="display: none;">
                                <p style="font-size: 0.875rem; color: var(--text-gray); margin-top: 1rem;">
                                    Acceptă: JPG, PNG, WEBP (max 10MB)
                                </p>
                            </div>
                        </div>

                        <div id="preview" style="display: none; margin-top: 1rem;">
                            <img id="previewImage" style="width: 100%; border-radius: var(--radius); margin-bottom: 1rem;">
                            <button class="btn btn-danger" id="removeFileBtn" style="width: 100%; margin-bottom: 0.5rem;">
                                🗑️ Șterge
                            </button>
                            <button class="btn btn-primary" id="analyzeBtn" style="width: 100%;">
                                🤖 Analizează cu AI
                            </button>
                        </div>

                        <div id="analyzing" style="display: none; text-align: center; padding: 2rem;">
                            <div class="spinner" style="margin: 0 auto 1rem;"></div>
                            <p>Analizez desenul... Poate dura 10-30 secunde</p>
                        </div>
                    </div>

                    <!-- Feedback Section -->
                    <div class="card">
                        <h2 style="color: var(--primary); margin-bottom: 1rem;">💬 Feedback AI</h2>
                        <div id="feedbackContainer">
                            <div style="text-align: center; padding: 3rem; color: var(--text-gray);">
                                <div style="font-size: 3rem; margin-bottom: 1rem;">🤖</div>
                                <p>Încarcă un desen pentru a primi feedback</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recent Submissions -->
                <div class="mt-4">
                    <h2 style="color: var(--primary); margin-bottom: 1rem;">📋 Desene Recente</h2>
                    <div class="grid grid-4">
                        ${this.renderRecentSubmissions()}
                    </div>
                </div>
            </div>

            <style>
                .drop-zone {
                    border: 3px dashed var(--primary);
                    border-radius: var(--radius);
                    padding: 3rem;
                    text-align: center;
                    transition: all 0.3s;
                    background: var(--bg-light);
                }
                .drop-zone.drag-over {
                    background: var(--primary);
                    color: white;
                }
            </style>
        `;
    }

    renderRecentSubmissions() {
        const submissions = [
            { id: 1, title: 'Portret', date: 'Azi', score: 85, thumbnail: '👤' },
            { id: 2, title: 'Natură Statică', date: 'Ieri', score: 78, thumbnail: '🍎' },
            { id: 3, title: 'Peisaj', date: 'Acum 2 zile', score: 92, thumbnail: '🏞️' },
            { id: 4, title: 'Animale', date: 'Acum 3 zile', score: 70, thumbnail: '🐱' }
        ];

        return submissions.map(sub => `
            <div class="card" style="cursor: pointer;">
                <div style="font-size: 3rem; text-align: center; margin-bottom: 0.5rem;">${sub.thumbnail}</div>
                <h4 style="text-align: center; color: var(--primary);">${sub.title}</h4>
                <p style="text-align: center; font-size: 0.875rem; color: var(--text-gray);">${sub.date}</p>
                <div style="text-align: center;">
                    <span style="color: ${sub.score >= 80 ? 'var(--success)' : 'var(--warning)'}; font-weight: bold;">
                        Score: ${sub.score}/100
                    </span>
                </div>
            </div>
        `).join('');
    }

    mount() {
        const dropZone = document.getElementById('dropZone');
        const fileInput = document.getElementById('fileInput');
        const selectFileBtn = document.getElementById('selectFileBtn');
        const preview = document.getElementById('preview');
        const previewImage = document.getElementById('previewImage');

        // Select file button
        selectFileBtn?.addEventListener('click', () => {
            fileInput.click();
        });

        // File input change
        fileInput?.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.handleFile(file);
            }
        });

        // Drag and drop
        dropZone?.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });

        dropZone?.addEventListener('dragleave', () => {
            dropZone.classList.remove('drag-over');
        });

        dropZone?.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                this.handleFile(file);
            }
        });

        // Remove file
        document.getElementById('removeFileBtn')?.addEventListener('click', () => {
            this.clearFile();
        });

        // Analyze button
        document.getElementById('analyzeBtn')?.addEventListener('click', () => {
            this.analyzeDrawing();
        });
    }

    handleFile(file) {
        this.selectedFile = file;
        const reader = new FileReader();

        reader.onload = (e) => {
            this.previewURL = e.target.result;
            document.getElementById('previewImage').src = this.previewURL;
            document.getElementById('dropZone').style.display = 'none';
            document.getElementById('preview').style.display = 'block';
        };

        reader.readAsDataURL(file);
    }

    clearFile() {
        this.selectedFile = null;
        this.previewURL = null;
        document.getElementById('dropZone').style.display = 'block';
        document.getElementById('preview').style.display = 'none';
        document.getElementById('fileInput').value = '';
    }

    async analyzeDrawing() {
        // Hide preview, show loading
        document.getElementById('preview').style.display = 'none';
        document.getElementById('analyzing').style.display = 'block';

        // Simulate AI analysis (will be real API call later)
        await this.delay(2000);

        // Hide loading
        document.getElementById('analyzing').style.display = 'none';
        document.getElementById('preview').style.display = 'block';

        // Show feedback
        this.showFeedback(this.generateMockFeedback());
    }

    generateMockFeedback() {
        return {
            overallScore: 82,
            proportions: {
                score: 85,
                feedback: 'Proporțiile sunt în general bune. Nasul este puțin prea scurt față de restul feței. Încearcă să măsori distanțele între trăsături.'
            },
            lighting: {
                score: 78,
                feedback: 'Lumina este corect plasată, dar umbrele ar trebui să fie mai soft la tranziții. Folosește blending pentru tranziții mai naturale.'
            },
            lineQuality: {
                score: 90,
                feedback: 'Liniile sunt sigure și clare! Variația grosimii liniilor adaugă profunzime.'
            },
            composition: {
                score: 75,
                feedback: 'Compoziția este decentă, dar subiectul este prea centrat. Încearcă regula treimilor pentru compoziții mai dinamice.'
            },
            strengths: [
                'Linii clare și sigure',
                'Utilizare bună a contrast-ului',
                'Atenție la detalii'
            ],
            improvements: [
                'Lucrează la proporțiile faciale',
                'Îmbunătățește tranziția umbrelor',
                'Experimentează cu compoziții off-center'
            ],
            nextSteps: [
                'Practică desenarea proporțiilor faciale cu grila Loomis',
                'Studiază tutorialul "Lumină și Umbre"',
                'Încearcă tema "Portret în Perspectivă 3/4"'
            ]
        };
    }

    showFeedback(feedback) {
        const feedbackHTML = `
            <div style="margin-bottom: 2rem; text-align: center;">
                <div style="font-size: 3rem; color: ${feedback.overallScore >= 80 ? 'var(--success)' : 'var(--warning)'};">
                    ${feedback.overallScore}/100
                </div>
                <p style="font-size: 1.2rem; font-weight: bold;">Score Global</p>
            </div>

            <div class="mb-3">
                <h3 style="color: var(--primary); margin-bottom: 1rem;">📊 Analiză Detaliată</h3>
                ${this.renderFeedbackSection('Proporții', feedback.proportions)}
                ${this.renderFeedbackSection('Lumină & Umbre', feedback.lighting)}
                ${this.renderFeedbackSection('Calitate Linii', feedback.lineQuality)}
                ${this.renderFeedbackSection('Compoziție', feedback.composition)}
            </div>

            <div class="mb-3">
                <h3 style="color: var(--success); margin-bottom: 0.5rem;">✓ Puncte Forte:</h3>
                <ul style="padding-left: 1.5rem;">
                    ${feedback.strengths.map(s => `<li>${s}</li>`).join('')}
                </ul>
            </div>

            <div class="mb-3">
                <h3 style="color: var(--warning); margin-bottom: 0.5rem;">📈 De Îmbunătățit:</h3>
                <ul style="padding-left: 1.5rem;">
                    ${feedback.improvements.map(i => `<li>${i}</li>`).join('')}
                </ul>
            </div>

            <div>
                <h3 style="color: var(--primary); margin-bottom: 0.5rem;">🎯 Pași Următori:</h3>
                <ul style="padding-left: 1.5rem;">
                    ${feedback.nextSteps.map(step => `<li>${step}</li>`).join('')}
                </ul>
            </div>
        `;

        document.getElementById('feedbackContainer').innerHTML = feedbackHTML;
    }

    renderFeedbackSection(title, data) {
        return `
            <div style="margin-bottom: 1.5rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <strong>${title}</strong>
                    <span style="color: ${data.score >= 80 ? 'var(--success)' : 'var(--warning)'};">${data.score}/100</span>
                </div>
                <div style="background: var(--bg-light); height: 8px; border-radius: 10px; overflow: hidden; margin-bottom: 0.5rem;">
                    <div style="
                        background: linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%);
                        width: ${data.score}%;
                        height: 100%;
                    "></div>
                </div>
                <p style="font-size: 0.875rem; color: var(--text-gray);">${data.feedback}</p>
            </div>
        `;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    cleanup() {}
}
