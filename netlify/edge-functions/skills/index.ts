// Tipos e dados centrais dos 24 skills dp-createur PT-BR

import dpBusinessProfile from "./dp-business-profile.ts";
import dpMarketResearch from "./dp-market-research.ts";
import dpLaunch from "./dp-launch.ts";
import dpPlaybookCreate from "./dp-playbook-create.ts";
import dpPlaybookSection from "./dp-playbook-section.ts";
import dpEbookCover from "./dp-ebook-cover.ts";
import dpLeadMagnetCreate from "./dp-lead-magnet-create.ts";
import dpLandingPage from "./dp-landing-page.ts";
import dpSalesFunnel from "./dp-sales-funnel.ts";
import dpUpsellStrategy from "./dp-upsell-strategy.ts";
import dpBlogStrategy from "./dp-blog-strategy.ts";
import dpBlogArticle from "./dp-blog-article.ts";
import dpBlogPublish from "./dp-blog-publish.ts";
import dpEmailSequence from "./dp-email-sequence.ts";
import dpSocialCaption from "./dp-social-caption.ts";
import dpAdAnglesMeta from "./dp-ad-angles-meta.ts";
import dpAdAnglesGoogle from "./dp-ad-angles-google.ts";
import dpMediaplan from "./dp-mediaplan.ts";
import dpTrackingSetup from "./dp-tracking-setup.ts";
import dpPlaybookAudit from "./dp-playbook-audit.ts";
import dpPlaybookSync from "./dp-playbook-sync.ts";
import dpExportPdf from "./dp-export-pdf.ts";
import dpCompetitorAnalysis from "./dp-competitor-analysis.ts";
import dpCopyReview from "./dp-copy-review.ts";

export type SkillCategory =
  | "Fundação"
  | "Criação do Produto"
  | "Venda e Monetização"
  | "Conteúdo e SEO"
  | "Promoção"
  | "Análise e Qualidade";

export interface SkillRecord {
  nome: string;
  categoria: SkillCategory;
  descricao: string;
  argumentHint: string;
  allowedTools: string[];
  conteudo: string;
}

export interface WorkflowNext {
  skill: string;
  justificativa: string;
}

export const skillsMap: Record<string, SkillRecord> = {
  [dpBusinessProfile.nome]: dpBusinessProfile,
  [dpMarketResearch.nome]: dpMarketResearch,
  [dpLaunch.nome]: dpLaunch,
  [dpPlaybookCreate.nome]: dpPlaybookCreate,
  [dpPlaybookSection.nome]: dpPlaybookSection,
  [dpEbookCover.nome]: dpEbookCover,
  [dpLeadMagnetCreate.nome]: dpLeadMagnetCreate,
  [dpLandingPage.nome]: dpLandingPage,
  [dpSalesFunnel.nome]: dpSalesFunnel,
  [dpUpsellStrategy.nome]: dpUpsellStrategy,
  [dpBlogStrategy.nome]: dpBlogStrategy,
  [dpBlogArticle.nome]: dpBlogArticle,
  [dpBlogPublish.nome]: dpBlogPublish,
  [dpEmailSequence.nome]: dpEmailSequence,
  [dpSocialCaption.nome]: dpSocialCaption,
  [dpAdAnglesMeta.nome]: dpAdAnglesMeta,
  [dpAdAnglesGoogle.nome]: dpAdAnglesGoogle,
  [dpMediaplan.nome]: dpMediaplan,
  [dpTrackingSetup.nome]: dpTrackingSetup,
  [dpPlaybookAudit.nome]: dpPlaybookAudit,
  [dpPlaybookSync.nome]: dpPlaybookSync,
  [dpExportPdf.nome]: dpExportPdf,
  [dpCompetitorAnalysis.nome]: dpCompetitorAnalysis,
  [dpCopyReview.nome]: dpCopyReview,
};

export const skillsList: SkillRecord[] = [
  dpBusinessProfile,
  dpMarketResearch,
  dpLaunch,
  dpPlaybookCreate,
  dpPlaybookSection,
  dpEbookCover,
  dpLeadMagnetCreate,
  dpLandingPage,
  dpSalesFunnel,
  dpUpsellStrategy,
  dpBlogStrategy,
  dpBlogArticle,
  dpBlogPublish,
  dpEmailSequence,
  dpSocialCaption,
  dpAdAnglesMeta,
  dpAdAnglesGoogle,
  dpMediaplan,
  dpTrackingSetup,
  dpPlaybookAudit,
  dpPlaybookSync,
  dpExportPdf,
  dpCompetitorAnalysis,
  dpCopyReview,
];

export const workflowGraph: Record<string, WorkflowNext[]> = {
  "dp-business-profile": [
    { skill: "dp-market-research", justificativa: "Com o perfil criado, valide sua ideia de produto antes de criar." }
  ],
  "dp-market-research": [
    { skill: "dp-playbook-create",     justificativa: "Validação GO: crie o ebook agora." },
    { skill: "dp-competitor-analysis", justificativa: "Aprofunde a análise competitiva antes de criar." },
    { skill: "dp-lead-magnet-create",  justificativa: "Validação TEST: crie um lead magnet para testar a demanda." }
  ],
  "dp-playbook-create": [
    { skill: "dp-playbook-audit",  justificativa: "Audite o ebook antes de exportar." },
    { skill: "dp-export-pdf",      justificativa: "Converta o ebook em PDF vendável." },
    { skill: "dp-ebook-cover",     justificativa: "Crie a capa profissional do ebook." }
  ],
  "dp-playbook-audit": [
    { skill: "dp-playbook-section", justificativa: "Corrija ou adicione seções identificadas no audit." },
    { skill: "dp-export-pdf",       justificativa: "Ebook aprovado: exporte para PDF." }
  ],
  "dp-export-pdf": [
    { skill: "dp-landing-page",     justificativa: "PDF pronto: crie a página de venda." },
    { skill: "dp-ebook-cover",      justificativa: "Crie a capa e mockup 3D para a página." },
    { skill: "dp-email-sequence",   justificativa: "Prepare a sequência de lançamento por email." }
  ],
  "dp-landing-page": [
    { skill: "dp-email-sequence",   justificativa: "Com a landing page pronta, crie a sequência de emails." },
    { skill: "dp-tracking-setup",   justificativa: "Configure o tracking antes de lançar." },
    { skill: "dp-sales-funnel",     justificativa: "Desenhe o funil completo de vendas." }
  ],
  "dp-email-sequence": [
    { skill: "dp-launch",           justificativa: "Sequência pronta: siga o checklist de lançamento." },
    { skill: "dp-ad-angles-meta",   justificativa: "Crie os anúncios Meta para o lançamento." }
  ],
  "dp-launch": [
    { skill: "dp-ad-angles-meta",   justificativa: "Lance anúncios Facebook/Instagram para escalar." },
    { skill: "dp-blog-strategy",    justificativa: "Crie conteúdo SEO para tráfego orgânico." },
    { skill: "dp-upsell-strategy",  justificativa: "Maximize o LTV com estratégia de upsell." }
  ],
  "dp-ad-angles-meta":   [{ skill: "dp-ad-angles-google", justificativa: "Complete a cobertura de mídia com Google Ads." }],
  "dp-ad-angles-google": [{ skill: "dp-tracking-setup",   justificativa: "Configure conversões para otimizar os anúncios." }],
  "dp-tracking-setup":   [{ skill: "dp-copy-review",      justificativa: "Revise os copies antes de investir em ads." }],
  "dp-blog-strategy":    [{ skill: "dp-blog-article",     justificativa: "Estratégia definida: escreva os artigos." }],
  "dp-blog-article":     [{ skill: "dp-blog-publish",     justificativa: "Artigo pronto: publique no WordPress." }],
  "dp-blog-publish":     [{ skill: "dp-social-caption",   justificativa: "Artigo publicado: crie os posts sociais." }],
  "dp-social-caption":   [{ skill: "dp-mediaplan",        justificativa: "Captions criados: monte o calendário de conteúdo." }],
  "dp-mediaplan":        [{ skill: "dp-ad-angles-meta",   justificativa: "Plano de mídia pronto: crie os anúncios." }],
  "dp-sales-funnel":     [{ skill: "dp-upsell-strategy",  justificativa: "Funil desenhado: adicione estratégia de upsell." }],
  "dp-upsell-strategy":  [{ skill: "dp-copy-review",      justificativa: "Revise o copy de upsell antes de publicar." }],
  "dp-ebook-cover":      [{ skill: "dp-export-pdf",       justificativa: "Capa criada: exporte o PDF completo." }],
  "dp-lead-magnet-create": [{ skill: "dp-landing-page",  justificativa: "Lead magnet criado: faça a página de captura." }],
  "dp-playbook-section": [{ skill: "dp-playbook-audit",  justificativa: "Seção adicionada: audite o ebook atualizado." }],
  "dp-playbook-sync":    [{ skill: "dp-export-pdf",       justificativa: "Sincronização concluída: exporte o PDF atualizado." }],
  "dp-competitor-analysis": [{ skill: "dp-playbook-create", justificativa: "Análise concluída: crie o ebook com posicionamento diferenciado." }],
  "dp-copy-review":      [{ skill: "dp-landing-page",    justificativa: "Copy aprovado: aplique na landing page." }],
};

export const objectiveIndex: Record<string, string[]> = {
  "criar ebook":      ["dp-playbook-create", "dp-ebook-cover", "dp-export-pdf"],
  "criar playbook":   ["dp-playbook-create", "dp-playbook-section", "dp-ebook-cover", "dp-export-pdf"],
  "criar lead magnet": ["dp-lead-magnet-create", "dp-landing-page", "dp-email-sequence"],
  "validar ideia":    ["dp-market-research", "dp-competitor-analysis"],
  "criar página de venda": ["dp-landing-page", "dp-copy-review", "dp-tracking-setup"],
  "escrever artigo":  ["dp-blog-strategy", "dp-blog-article", "dp-blog-publish"],
  "criar anúncios":   ["dp-ad-angles-meta", "dp-ad-angles-google", "dp-tracking-setup"],
  "lançar produto":   ["dp-launch", "dp-email-sequence", "dp-ad-angles-meta"],
  "fazer email marketing": ["dp-email-sequence"],
  "aumentar vendas":  ["dp-upsell-strategy", "dp-sales-funnel", "dp-copy-review"],
  "configurar tracking": ["dp-tracking-setup"],
  "analisar concorrentes": ["dp-competitor-analysis"],
  "criar funil":      ["dp-sales-funnel", "dp-landing-page", "dp-upsell-strategy"],
  "exportar pdf":     ["dp-export-pdf"],
  "criar posts sociais": ["dp-social-caption", "dp-mediaplan"],
  "publicar wordpress": ["dp-blog-publish"],
  "sincronizar ebook": ["dp-playbook-sync"],
  "auditar ebook":    ["dp-playbook-audit", "dp-copy-review"],
  "configurar perfil": ["dp-business-profile"],
  "criar capa":       ["dp-ebook-cover"],
};
