const fs = require("fs");
const path = require("path");
const PptxGenJS = require("pptxgenjs");

const distDir = path.join(__dirname, "dist");
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

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

const chapters = Array.from({ length: 60 }, (_, i) => {
  const chapterNumber = i + 1;
  const title = topicBank[(chapterNumber - 1) % topicBank.length];
  const difficulty = ["Débutant", "Intermédiaire", "Avancé"][chapterNumber % 3];

  return {
    id: chapterNumber,
    title,
    summary: `Ce chapitre explique comment utiliser l'IA pour améliorer ${title.toLowerCase()} dans un contexte de développement logiciel réel, avec des bonnes pratiques, des exemples concrets et des objectifs mesurables.`,
    objective: `Comprendre et appliquer les bonnes pratiques de ${title.toLowerCase()} avec l'assistant IA pour livrer du code plus fiable et plus rapide.`,
    difficulty,
    prompt: `Tu es un architecte logiciel senior. Explique-moi de manière concrète comment appliquer ${title.toLowerCase()} en équipe, avec bons exemples, pièges, méthodes, validation et bons usages de l'IA.`,
    deliverable: `Livrable : mini projet ou composant de ${title.toLowerCase()} avec critique de qualité, tests et documentation.`
  };
});

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "AI Studio";
pptx.company = "AI Learning Lab";
pptx.subject = "Programmation assistée par IA";
pptx.title = "Cours IA & Programmation";
pptx.theme = {
  colorScheme: {
    name: "Horizon",
    fill: { color: "F8FAFC" },
    accent1: "2563EB",
    accent2: "7C3AED",
    accent3: "14B8A6",
    accent4: "F59E0B",
    accent5: "EF4444",
    accent6: "0F172A",
    hlink: "2563EB",
    folLink: "475569"
  }
};

chapters.forEach((chapter, index) => {
  const slide = pptx.addSlide();

  slide.background = {
    color: index % 2 === 0 ? "F8FAFC" : "EEF4FF"
  };

  slide.addText(`Chapitre ${chapter.id}`, {
    x: 0.5,
    y: 0.32,
    w: 2.2,
    h: 0.45,
    fontFace: "Aptos",
    fontSize: 16,
    bold: true,
    color: "2563EB"
  });

  slide.addText(chapter.title, {
    x: 0.5,
    y: 0.85,
    w: 7.8,
    h: 0.7,
    fontFace: "Aptos",
    fontSize: 28,
    bold: true,
    color: "0F172A"
  });

  slide.addText(chapter.summary, {
    x: 0.65,
    y: 1.6,
    w: 7.3,
    h: 1.1,
    fontFace: "Aptos",
    fontSize: 18,
    color: "334155",
    margin: 0.1,
    breakLine: true
  });

  slide.addText("Objectif", {
    x: 0.7,
    y: 2.8,
    w: 2.4,
    h: 0.35,
    fontFace: "Aptos",
    fontSize: 15,
    bold: true,
    color: "1E293B"
  });

  slide.addText(chapter.objective, {
    x: 0.7,
    y: 3.2,
    w: 3.9,
    h: 0.7,
    fontFace: "Aptos",
    fontSize: 14,
    color: "1F2937",
    margin: 0.04
  });

  slide.addText("Niveau", {
    x: 5.1,
    y: 2.8,
    w: 1.6,
    h: 0.35,
    fontFace: "Aptos",
    fontSize: 15,
    bold: true,
    color: "1E293B"
  });

  slide.addText(chapter.difficulty, {
    x: 5.1,
    y: 3.2,
    w: 2.2,
    h: 0.7,
    fontFace: "Aptos",
    fontSize: 16,
    bold: true,
    color: "7C3AED"
  });

  slide.addText("Prompt IA", {
    x: 0.7,
    y: 4.1,
    w: 2.2,
    h: 0.30,
    fontFace: "Aptos",
    fontSize: 14,
    bold: true,
    color: "1E293B"
  });

  slide.addText(chapter.prompt, {
    x: 0.72,
    y: 4.45,
    w: 8.1,
    h: 1.2,
    fontFace: "Aptos",
    fontSize: 10.5,
    color: "374151",
    margin: 0.04,
    breakLine: true
  });

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 8.45,
    y: 0.7,
    w: 1.65,
    h: 1.1,
    fill: { color: "2563EB" },
    line: { color: "2563EB", width: 1 },
    radius: 0.12
  });

  slide.addText(`${chapter.id}`, {
    x: 8.58,
    y: 1.1,
    w: 1.35,
    h: 0.5,
    fontFace: "Aptos",
    fontSize: 24,
    bold: true,
    color: "FFFFFF",
    align: "center"
  });
});

pptx.writeFile({
  fileName: path.join(distDir, "ai-programming-course.pptx"),
  compression: true
})
  .then(() => {
    console.log("PPTX généré : dist/ai-programming-course.pptx");
  })
  .catch((error) => {
    console.error("Erreur pendant la génération du PPTX :", error);
    process.exit(1);
  });
