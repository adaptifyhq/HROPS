import { findAssessmentById } from "@/lib/assessments";
import {
  type AssessmentContext,
  formatAverage,
  getDimensionScores,
  levelReading,
  selectPriorities,
  type MaturityLevel,
} from "@/lib/assessment";

export const dynamic = "force-dynamic";

const REPORT_SANS = 'Helvetica, Arial, sans-serif';
const REPORT_SERIF = 'Georgia, "Times New Roman", serif';

interface AssessmentDoc {
  companyName?: string;
  contactName?: string;
  email?: string;
  answers?: Record<string, number>;
  context?: AssessmentContext | null;
  totalScore: number;
  maturityLevel: string;
  aiAnalysis?: string;
  createdAt?: string | Date;
}

type Block =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

const HEADINGS = new Set([
  "résumé",
  "forces",
  "forces principales",
  "forces liées aux dimensions",
  "zones de progression",
  "trois priorités",
  "vos 3 priorités",
  "priorités",
  "opportunités",
  "risques",
  "risques potentiels",
]);

function cleanInline(text: string) {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/__(.+?)__/g, "$1")
    .replace(/\*([^*\n]+)\*/g, "$1")
    .replace(/_([^_\n]+)_/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^#+\s*/, "")
    .trim();
}

function parseAnalysis(raw: string): Block[] {
  const blocks: Block[] = [];
  let list: string[] = [];

  const flush = () => {
    if (list.length) {
      blocks.push({ type: "list", items: list });
      list = [];
    }
  };

  for (const line of raw.replace(/\r/g, "").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) {
      flush();
      continue;
    }

    const heading = cleanInline(trimmed).replace(/:$/, "");
    const isMdHeading = /^\*\*[^*]+\*\*$/.test(trimmed) || /^#{1,3}\s+/.test(trimmed);
    if (isMdHeading || HEADINGS.has(heading.toLowerCase())) {
      flush();
      blocks.push({ type: "heading", text: heading });
      continue;
    }

    const bullet = trimmed.match(/^(?:[-•]|\*(?=\s)|\d+\.)\s+(.+)$/);
    if (bullet) {
      list.push(cleanInline(bullet[1]));
      continue;
    }

    flush();
    blocks.push({ type: "paragraph", text: cleanInline(trimmed) });
  }

  flush();
  return blocks;
}

function displayLevel(level: string): MaturityLevel {
  if (level === "Optimizer" || level === "En progrès") return "Optimizer";
  if (level === "Leader" || level === "Avancé") return "Leader";
  return "Starter";
}

export default async function AssessmentPdfTemplate({
  searchParams,
}: {
  searchParams: Promise<{ assessmentId?: string }>;
}) {
  const resolvedParams = await searchParams;
  const assessmentId = resolvedParams.assessmentId;

  if (!assessmentId) {
    return <p className="report-missing">Aucun diagnostic fourni.</p>;
  }

  const assessment = (await findAssessmentById(assessmentId)) as AssessmentDoc | null;
  if (!assessment) {
    return <p className="report-missing">Diagnostic introuvable.</p>;
  }

  const level = displayLevel(assessment.maturityLevel);
  const average = assessment.totalScore / 32;
  const dimensions = getDimensionScores(assessment.answers || {});
  const priorities = selectPriorities(dimensions);
  const strengths = dimensions.filter((dimension) => dimension.average >= 2);
  const gaps = dimensions.filter((dimension) => dimension.level === "Starter");
  const reading = parseAnalysis(assessment.aiAnalysis || "");
  const generated = new Date(assessment.createdAt || new Date()).toLocaleDateString("fr-CA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const reference = assessmentId.slice(0, 8).toUpperCase();

  const facts = [
    ["Organisation", assessment.companyName || "Non précisée"],
    ["Personne", assessment.contactName || "Non précisée"],
    ["Courriel", assessment.email || "Non précisé"],
    ["Secteur", assessment.context?.sector || "Non précisé"],
    ["Taille", assessment.context?.organizationSize || "Non précisée"],
    ["Équipe RH", assessment.context?.hrTeamSize || "Non précisée"],
    ["SIRH principal", assessment.context?.primarySirh || "Non précisé"],
    ["Priorité déclarée", assessment.context?.currentPriority || "Non précisée"],
  ];

  return (
    <article
      className="report"
      style={
        {
          "--report-serif": REPORT_SERIF,
          "--report-sans": REPORT_SANS,
        } as React.CSSProperties
      }
    >
      <style>{`
        .report {
          color: #1c1917;
          font-family: var(--report-sans), Helvetica, Arial, sans-serif;
          font-size: 10.5pt;
          line-height: 1.45;
          background: #fff;
        }
        .report * { box-sizing: border-box; }
        .report h1, .report h2, .report h3, .report .serif {
          font-family: var(--report-serif), Georgia, "Times New Roman", serif;
          font-weight: 600;
          color: #1c1917;
          letter-spacing: -0.015em;
        }
        .cover {
          min-height: 250mm;
          display: flex;
          flex-direction: column;
          break-after: page;
        }
        .report, .report p, .report li, .report td, .report th, .report h1, .report h2, .report h3 {
          color: #1c1917;
        }
        .brand-row, .cover-foot, .section-kicker, .meta, .muted {
          color: #6b625b;
          font-size: 8.5pt;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .meta { display: block; font-weight: 600; }
        .brand-row, .cover-foot {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 16px;
        }
        .rule { border: 0; border-top: 0.6pt solid #d6d0c8; margin: 0; }
        .cover h1 {
          font-size: 26pt;
          line-height: 1.08;
          margin: 10px 0 0;
        }
        .lede {
          margin: 14px 0 0;
          max-width: 150mm;
          color: #3f3a36;
          font-size: 11.5pt;
          line-height: 1.4;
        }
        .facts {
          width: 100%;
          border-collapse: collapse;
          margin-top: 8mm;
        }
        .facts th, .facts td, .dims th, .dims td {
          text-align: left;
          vertical-align: top;
          padding: 6px 8px 6px 0;
          border-bottom: 0.4pt solid #e6e1db;
          font-weight: 400;
        }
        .facts th {
          width: 38mm;
          color: #6b625b;
          font-size: 8.5pt;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          font-weight: 600;
        }
        .score-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          border-top: 1.5pt solid #1c1917;
          border-bottom: 0.6pt solid #1c1917;
          margin-top: 10mm;
        }
        .score-row div { padding: 10px 12px 12px 0; }
        .score-row strong {
          display: block;
          font-family: var(--report-serif), Georgia, serif;
          font-size: 18pt;
          font-weight: 600;
          line-height: 1.1;
          margin-top: 3px;
        }
        .report .level-Starter { color: #9a3412; }
        .report .level-Optimizer { color: #1c1917; }
        .report .level-Leader { color: #3f6212; }
        .reading h3, .priority, .cta { break-inside: avoid; }
        .section h2 {
          font-size: 16pt;
          margin: 2px 0 4mm;
        }
        .section-kicker { margin: 0 0 2px; }
        .dims { width: 100%; border-collapse: collapse; }
        .dims th {
          font-size: 8pt;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #6b625b;
          font-weight: 600;
          border-bottom: 1pt solid #1c1917;
          padding-bottom: 5px;
        }
        .dims td { font-size: 10pt; padding-top: 7px; padding-bottom: 7px; }
        .dims td.num, .dims th.num { text-align: right; white-space: nowrap; }
        .meter { height: 3px; background: #efeae4; width: 28mm; margin-left: auto; }
        .meter span { display: block; height: 3px; background: #c2410c; }
        .split { display: grid; grid-template-columns: 1fr 1fr; gap: 10mm; }
        .split h2 { font-size: 13pt; margin: 0 0 3mm; }
        .split ul { margin: 0; padding: 0; list-style: none; }
        .split li { margin: 0 0 3mm; padding-left: 4mm; border-left: 1.5pt solid #c2410c; }
        .reading ul { margin: 0 0 4mm; padding-left: 5mm; list-style: disc; }
        .reading li { margin: 0 0 2mm; padding-left: 1mm; border-left: 0; }
        .priority { display: grid; grid-template-columns: 12mm 1fr; gap: 4mm; break-inside: avoid; margin: 0 0 6mm; }
        .priority .num {
          font-family: var(--report-serif), Georgia, serif;
          font-size: 13pt;
          color: #c2410c;
        }
        .priority h3 { font-size: 12pt; margin: 0 0 1mm; }
        .priority p { margin: 0; }
        .meta { margin-top: 1.5mm !important; letter-spacing: 0.04em; }
        .reading h3 {
          font-size: 13pt;
          margin: 6mm 0 2mm;
          break-after: avoid;
        }
        .reading p { margin: 0 0 3mm; }
        .note, .cta {
          break-inside: avoid;
          border: 0.6pt solid #d6d0c8;
          padding: 5mm;
          margin-top: 6mm;
        }
        .cta h2 { font-size: 13pt; margin: 0 0 2mm; }
        .cover-foot { margin-top: auto; padding-top: 8mm; }
        .report p, .report li { orphans: 3; widows: 3; }
        .priority, .note, .cta, .dims tr, .facts tr { break-inside: avoid; }
        .report-missing { font-family: Helvetica, Arial, sans-serif; padding: 24px; }
      `}</style>

      <section className="cover">
        <div>
          <div className="brand-row">
            <img src="/images/logo-2.png" alt="HROps Consulting Inc." style={{ width: "22mm", height: "auto" }} />
            <span>Document confidentiel</span>
          </div>
          <hr className="rule" style={{ marginTop: 8 }} />

          <p className="section-kicker" style={{ marginTop: 18 }}>
            Rapport · autoévaluation indicative
          </p>
          <h1 className="serif">
            Diagnostic de maturité
            <br />
            digitale RH
          </h1>
          <p className="lede">
            Lecture structurée en 8 dimensions et 32 questions. Le score est calculé
            par une grille fixe. Le texte qui suit l&apos;explique, il ne le modifie pas.
          </p>

          <table className="facts">
            <tbody>
              {facts.map(([label, value]) => (
                <tr key={label}>
                  <th>{label}</th>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="score-row">
            <div>
              <span className="section-kicker">Score global</span>
              <strong>{assessment.totalScore} / 96</strong>
            </div>
            <div>
              <span className="section-kicker">Moyenne</span>
              <strong>{formatAverage(average)} / 3</strong>
            </div>
            <div>
              <span className="section-kicker">Niveau</span>
              <strong className={`level-${level}`}>{level}</strong>
            </div>
          </div>

          <p className="lede">{levelReading(level, assessment.context?.sector)}</p>
        </div>

        <div className="cover-foot">
          <span>Québec, Canada</span>
          <span>
            {generated} · Réf. {reference}
          </span>
        </div>
      </section>

      <section className="section">
        <p className="section-kicker">01 — Profil</p>
        <h2>Huit dimensions</h2>
        <table className="dims">
          <thead>
            <tr>
              <th>Dimension</th>
              <th className="num">Score</th>
              <th className="num">Moyenne</th>
              <th className="num">Niveau</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {dimensions.map((dimension) => (
              <tr key={dimension.id}>
                <td>{dimension.title}</td>
                <td className="num">
                  {dimension.score}/{dimension.maxScore}
                </td>
                <td className="num">{formatAverage(dimension.average)}</td>
                <td className={`num level-${dimension.level}`}>{dimension.level}</td>
                <td>
                  <div className="meter">
                    <span style={{ width: `${(dimension.score / dimension.maxScore) * 100}%` }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="split" style={{ marginTop: "8mm" }}>
          <div>
            <h2>Forces</h2>
            {strengths.length === 0 ? (
              <p>Aucune dimension n&apos;atteint encore une moyenne de 2 sur 3.</p>
            ) : (
              <ul>
                {strengths.map((dimension) => (
                  <li key={dimension.id}>
                    {dimension.title}
                    <span className="meta">
                      {dimension.score}/{dimension.maxScore} · {dimension.level}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h2>Zones de progression</h2>
            {gaps.length === 0 ? (
              <p>Aucune dimension n&apos;est au niveau Starter.</p>
            ) : (
              <ul>
                {gaps.map((dimension) => (
                  <li key={dimension.id}>
                    {dimension.title}
                    <span className="meta">
                      {dimension.score}/{dimension.maxScore} · {dimension.level}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <p className="section-kicker">02 — Action</p>
        <h2>Trois priorités</h2>
        <p className="lede" style={{ marginTop: 0, marginBottom: "6mm" }}>
          Elles partent des dimensions les moins matures. L&apos;horizon et l&apos;impact sont indicatifs.
        </p>
        {priorities.map((priority, index) => (
          <div className="priority" key={priority.id}>
            <div className="num">{String(index + 1).padStart(2, "0")}</div>
            <div>
              <h3>{priority.title}</h3>
              <p>{priority.action}</p>
              <p className="meta">
                Horizon {priority.horizon} · Impact {priority.impact}
              </p>
            </div>
          </div>
        ))}

        <div className="cta">
          <h2>Session d&apos;interprétation</h2>
          <p>
            HROps Consulting Inc. peut revoir ce profil avec vous, mettre les priorités à
            l&apos;épreuve et identifier les chantiers d&apos;un diagnostic approfondi ou d&apos;une
            feuille de route. Session de 30 minutes.
          </p>
        </div>
      </section>

      <section className="section reading">
        <p className="section-kicker">03 — Lecture</p>
        <h2>Commentaire</h2>
        <p className="meta" style={{ marginBottom: "4mm" }}>
          Ce commentaire explique les scores. Il ne les recalcule pas.
        </p>
        {reading.length === 0 ? (
          <p>Commentaire non disponible.</p>
        ) : (
          reading.map((block, index) => {
            if (block.type === "heading") return <h3 key={index}>{block.text}</h3>;
            if (block.type === "list") {
              return (
                <ul key={index}>
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            }
            return <p key={index}>{block.text}</p>;
          })
        )}
      </section>

      <section className="section">
        <p className="section-kicker">04 — Méthode</p>
        <h2>Comment le score est obtenu</h2>
        <p>
          Huit dimensions, quatre questions chacune, 32 questions notées 1, 2 ou 3.
          La moyenne décide du niveau. Starter : 1,00 à 1,66, soit 32 à 53 points.
          Optimizer : 1,67 à 2,33, soit 54 à 74. Leader : 2,34 à 3,00, soit 75 à 96.
        </p>
        <p>
          Si au moins deux dimensions critiques — données, processus ou adoption — sont
          Starter, le niveau global ne peut pas être Leader. Le score chiffré, lui, ne change pas.
          Les questions de contexte ne comptent pas dans le score. Ceci est une perception
          déclarée, pas un audit du niveau réel de l&apos;organisation. HROps Consulting Inc. ·
          Québec, Canada · {generated}
        </p>
      </section>
    </article>
  );
}
