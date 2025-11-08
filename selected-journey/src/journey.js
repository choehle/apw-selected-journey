export const phases = [
  { id: 'onb',  name: 'Onboarding',          color: '#2962FF' },
  { id: 'int',  name: 'Family Interview',    color: '#7E57C2' },
  { id: 'sl',   name: 'Shortlist (5)',       color: '#00ACC1' },
  { id: 'p1',   name: 'P1 (5/24h)',          color: '#43A047' },
  { id: 'p2',   name: 'P2 (3⇒1)',            color: '#FB8C00' },
  { id: 'off',  name: 'Offer',               color: '#EF5350' },
  { id: 'hov',  name: 'Handover',            color: '#8D6E63' },
]

export const roles = [
  { id: 'AP',   name: 'AuPair',       lane: 0, color: '#12c2e9' },
  { id: 'HF',   name: 'Family',       lane: 1, color: '#ff77e9' },
  { id: 'OPS',  name: 'Ops',          lane: 2, color: '#b388ff' },
  { id: 'CORE', name: 'Core (Mira)',  lane: 3, color: '#6ee7ff' },
]

export const steps = [
  // Onboarding
  { id:'s1',  role:'AP',   phase:'onb',  label:'Register + Consent', desc:'Create account, locale, push-token.', },
  { id:'s2',  role:'AP',   phase:'onb',  label:'Profile + Availability', desc:'Wizard for basics and timing.', },
  { id:'s3',  role:'AP',   phase:'onb',  label:'ID & Liveness', desc:'Verification pass/retry.', badge:'Trust' },

  { id:'s4',  role:'HF',   phase:'onb',  label:'Onboard + House Guide', desc:'Muss/Nice-to-have, photos, rules.', },
  { id:'s5',  role:'CORE', phase:'onb',  label:'Trust Gate', desc:'Store verification, consent, PII boundaries.', small:true },

  // Interview (family)
  { id:'s6',  role:'HF',   phase:'int',  label:'Mira chat interview', desc:'Guided Q&A; 25–30 min.', badge:'AI' },
  { id:'s7',  role:'CORE', phase:'int',  label:'Family Summary (6 lines)', desc:'Explainable digest for matching.', badge:'AI' },

  // Shortlist (5)
  { id:'s8',  role:'CORE', phase:'sl',   label:'Matching + “Why it fits”', desc:'Hard filter + score + explain.', badge:'AI' },
  { id:'s9',  role:'OPS',  phase:'sl',   label:'Curation 20→5', desc:'Quality check; release drop.', },
  { id:'s10', role:'HF',   phase:'sl',   label:'Shortlist drop (48h)', desc:'Review candidates; timer starts.', badge:'48h' },

  // P1 (5/24h)
  { id:'s11', role:'AP',   phase:'p1',   label:'Apply (24h)', desc:'One-tap apply per slot.', badge:'24h' },
  { id:'s12', role:'CORE', phase:'p1',   label:'Timer + Nudges', desc:'Quiet hours aware; ghost-shield.', small:true },

  // P2 (3⇒1)
  { id:'s13', role:'HF',   phase:'p2',   label:'Select Top-3', desc:'Compare cards + notes.', },
  { id:'s14', role:'CORE', phase:'p2',   label:'Recommendation', desc:'Evidence-based guidance.', badge:'AI' },
  { id:'s15', role:'HF',   phase:'p2',   label:'Decide 3⇒1', desc:'Commit choice.', },

  // Offer
  { id:'s16', role:'HF',   phase:'off',  label:'Send Offer', desc:'Deadline included.', },
  { id:'s17', role:'AP',   phase:'off',  label:'Accept Offer', desc:'Match confirmed.', },

  // Handover
  { id:'s18', role:'CORE', phase:'hov',  label:'Handover Checklists', desc:'Docs + tasks for both sides.', },
  { id:'s19', role:'OPS',  phase:'hov',  label:'Partner/Agency Handover', desc:'Export package to partner.', },
]
