const chapters = Array.from({ length: 60 }, (_, i) => {
  const chapterNumber = i + 1;
  const topicBank = [
    "Prompt engineering",
    "Débogage",
    "Refactoring",
    "Tests unitaires",
    "Sécurité logicielle",
    "Architecture",
    "API design",
    "CI/CD",
    "UX engineering",
    "Observabilité",
    "Productivité",
    "Design systems",
    "Frontend",
    "Backend",
    "Data",
    "AI copilote",
    "Review IA",
    "Automation",
    "Accessibilité",
    "Performance",
    "Architecture serveur",
    "Cloud",
    "DevOps",
    "Documentation",
    "Git workflow",
    "Code review",
    "Clean code",
    "Erreur humaine",
    "Analyse de risque",
    "Microservices",
    "Monolithes",
    "Debugging avancé",
    "Root cause analysis",
    "Code generation",
    "Prompt chain",
    "Critique de code",
    "Model evaluation",
    "LLM safety",
    "Retrieval augmentation",
    "Agents IA",
    "Systèmes multi-agents",
    "Human-in-the-loop",
    "Test d’intégration",
    "PWA",
    "Design pattern",
    "Conventions",
    "Collaboration",
    "Versioning",
    "Analyse de données",
    "Feedback loop",
    "A/B testing",
    "Rétroplanning",
    "Sprints",
    "Story mapping",
    "Product mindset",
    "Roadmap",
    "Métriques",
    "Reliability",
    "Operations",
    "Sustainability",
    "Ethics",
    "AI governance",
    "AI adoption"
  ];

  const topic = topicBank[(chapterNumber - 1) % topicBank.length];
  const difficulty = ["Débutant", "Intermédiaire", "Avancé"][chapterNumber % 3];
  const summary = `Ce chapitre explore comment utiliser l'IA pour améliorer ${topic.toLowerCase()} dans un contexte de développement logiciel réel, avec des bonnes pratiques, des exemples concrets et des objectifs mesurables.`;

  return {
    id: chapterNumber,
    title: topic,
    summary,
    objective: `Comprendre et appliquer les bonnes pratiques de ${topic.toLowerCase()} avec l'assistant IA pour livrer du code plus fiable et plus rapide.`,
    skill: `${topic} et efficacité de développement`,
    prompt: `Tu es un architecte logiciel senior. Explique-moi de manière concrète comment appliquer ${topic.toLowerCase()} en équipe, avec bons exemples, pièges, méthodes, validation et bons usages de l'IA.`,
    practice: `Exercice : créer un mini module, demander une critique IA, corriger les défauts de sécurité ou de qualité, puis valider le résultat avec un test ciblé.`,
    deliverable: `Livrable : un mini projet ou composant de ${topic.toLowerCase()} avec critique de qualité, tests et documentation.`,
    tools: ["IA copilote", "tests automatisés", "review AI", "refactoring", "documentation"],
    difficulty
  };
});

const state = { selectedId: 1, theme: "light" };

const chapterCountEl = document.getElementById("chapterCount");
const chaptersListEl = document.getElementById("chaptersList");
const chapterContentEl = document.getElementById("chapterContent");
const themeToggleBtn = document.getElementById("themeToggle");
const exportPptxBtn = document.getElementById("exportPptx");
const printPageBtn = document.getElementById("printPage");

function renderList() {
  chaptersListEl.innerHTML = "";

  chapters.forEach((chapter) => {
    const button = document.createElement("button");
    button.className = `chapter-item ${chapter.id === state.selectedId ? "active" : ""}`;
    button.innerHTML = `
      <div class="chapter-index">${chapter.id}</div>
      <div>
        <h3>${chapter.title}</h3>
        <p>${chapter.summary.slice(0, 80)}...</p>
      </div>
    `;
    button.addEventListener("click", () => {
      state.selectedId = chapter.id;
      renderList();
      renderChapter();
    });
    chaptersListEl.appendChild(button);
  });

  chapterCountEl.textContent = `${chapters.length} chapitres`;
}

function renderChapter() {
  const chapter = chapters.find((item) => item.id === state.selectedId);
  if (!chapter) return;

  chapterContentEl.innerHTML = `
    <div class="chapter-header">
      <h2>${chapter.title}</h2>
      <span class="chapter-badge">Chapitre ${chapter.id}</span>
    </div>

    <p class="chapter-summary">${chapter.summary}</p>

    <div class="meta-grid">
      <div class="meta-box">
        <h3>Objectif</h3>
        <p>${chapter.objective}</p>
      </div>

      <div class="meta-box">
        <h3>Compétence</h3>
        <p>${chapter.skill}</p>
      </div>

      <div class="meta-box">
        <h3>Niveau</h3>
        <p>${chapter.difficulty}</p>
      </div>
    </div>

    <div class="meta-box">
      <h3>Outils</h3>
      <ul>
        ${chapter.tools.map((tool) => `<li>${tool}</li>`).join("")}
      </ul>
    </div>

    <div class="practice">
      <h3>Exercice guidé</h3>
      <p>${chapter.practice}</p>
    </div>

    <div class="prompt-box">
      <h3>Prompt IA</h3>
      <pre>${chapter.prompt}</pre>
    </div>

    <div class="meta-box" style="margin-top: 18px;">
      <h3>Livrable</h3>
      <p>${chapter.deliverable}</p>
    </div>
  `;
}

function toggleTheme() {
  const root = document.body;
  state.theme = state.theme === "light" ? "dark" : "light";
  root.classList.toggle("dark", state.theme === "dark");
  themeToggleBtn.textContent = state.theme === "light" ? "Thème" : "Mode clair";
}

function exportPptx() {
  const chapter = chapters.find((item) => item.id === state.selectedId);
  if (!chapter) return;

  const payload = { selectedChapter: chapter, chapters };
  localStorage.setItem("ai-course-export", JSON.stringify(payload));
  alert("Le rendu est préparé pour l’export PPTX. Lancez le script de build pour générer le fichier .pptx.");
}

function printPage() {
  window.print();
}

themeToggleBtn.addEventListener("click", toggleTheme);
exportPptxBtn.addEventListener("click", exportPptx);
printPageBtn.addEventListener("click", printPage);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      await navigator.serviceWorker.register("./sw.js");
    } catch (error) {
      console.warn("Service worker non enregistré :", error);
    }
  });
}

renderList();
renderChapter();
