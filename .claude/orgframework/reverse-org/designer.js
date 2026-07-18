#!/usr/bin/env node
// reverse-org.js — Bottom-up org designer from existing headcount
// Usage: node bin/reverse-org.js <json-file>
// JSON format: { "people": [{ "title": "Backend Engineer", "count": 5 }, ...] }

import { readFileSync } from 'fs';

export function designReverseOrg(people) {
  const total = people.reduce((s, p) => s + (p.count || 1), 0);
  const types = people.map(p => p.title.toLowerCase());

  // Detect primary function
  const isTech = types.some(t => t.includes('engineer') || t.includes('developer') || t.includes('designer'));
  const isSales = types.some(t => t.includes('sales') || t.includes('account') || t.includes('success'));
  const isCreative = types.some(t => t.includes('designer') || t.includes('artist') || t.includes('creative'));
  const isMedical = types.some(t => t.includes('nurse') || t.includes('doctor') || t.includes('physician') || t.includes('clinician'));
  const isTrade = types.some(t => t.includes('carpenter') || t.includes('electrician') || t.includes('plumber'));
  const isHospitality = types.some(t => t.includes('chef') || t.includes('server') || t.includes('bartender'));
  const isGov = types.some(t => t.includes('officer') || t.includes('inspector') || t.includes('analyst-govt'));

  // Determine stage from headcount
  let stage, maxLayers, ceoTitle;
  if (total <= 10) { stage = 'startup'; maxLayers = 2; ceoTitle = 'Founder / CEO'; }
  else if (total <= 80) { stage = 'scaleup'; maxLayers = 3; ceoTitle = 'CEO'; }
  else { stage = 'enterprise'; maxLayers = 4; ceoTitle = 'CEO'; }

  // Build departments from people
  const departments = [];
  const deptMap = new Map();

  for (const p of people) {
    const title = p.title.toLowerCase();
    let dept = 'Unassigned';

    if (title.includes('engineer') || title.includes('developer') || title.includes('architect') || title.includes('sre') || title.includes('devops') || title.includes('qa') || title.includes('data')) dept = 'Engineering';
    else if (title.includes('product') || title.includes('pm ') || title.includes('owner')) dept = 'Product';
    else if (title.includes('design') || title.includes('ux') || title.includes('ui')) dept = 'Design';
    else if (title.includes('market') || title.includes('content') || title.includes('seo') || title.includes('social') || title.includes('brand') || title.includes('pr ') || title.includes('growth')) dept = 'Marketing';
    else if (title.includes('sales') || title.includes('account') || title.includes('bdr') || title.includes('revenue') || title.includes('success')) dept = 'Sales';
    else if (title.includes('hr') || title.includes('recruit') || title.includes('talent') || title.includes('people')) dept = 'HR';
    else if (title.includes('fin') || title.includes('accountant') || title.includes('budget') || title.includes('audit') || title.includes('tax')) dept = 'Finance';
    else if (title.includes('legal') || title.includes('counsel') || title.includes('attorney') || title.includes('contract') || title.includes('compliance')) dept = 'Legal';
    else if (title.includes('oper') || title.includes('supply') || title.includes('logistics') || title.includes('facility')) dept = 'Operations';
    else if (title.includes('support') || title.includes('tier') || title.includes('cs-') || title.includes('docs')) dept = 'Customer Support';
    else if (title.includes('exec') || title.includes('ceo') || title.includes('cto') || title.includes('cfo') || title.includes('coo') || title.includes('chief')) dept = 'Executive';

    if (!deptMap.has(dept)) deptMap.set(dept, []);
    deptMap.get(dept).push(p);
  }

  for (const [name, members] of deptMap.entries()) {
    departments.push({
      name,
      total: members.reduce((s, m) => s + (m.count || 1), 0),
      roles: members
    });
  }

  // Determine if leaders exist
  const hasLeaders = departments.some(d => d.roles.some(r =>
    r.title.toLowerCase().includes('head') || r.title.toLowerCase().includes('director') || r.title.toLowerCase().includes('vp') || r.title.toLowerCase().includes('manager')
  ));

  let orgDesign;
  if (total <= 10) {
    orgDesign = {
      structure: 'Flat',
      layers: 2,
      ceo: ceoTitle,
      departments: departments.filter(d => d.name !== 'Executive').map(d => ({
        name: d.name,
        lead: hasLeaders ? 'Existing lead' : 'Team lead (player-coach)',
        team_size: d.total,
        notes: d.total <= 2 ? 'Small team, keep flat' : d.total <= 5 ? 'Natural team, consider a tech lead' : 'Growing team, needs a dedicated manager soon'
      })),
      gaps: ['No dedicated manager layer yet — founders still manage ICs', 'Missing: HR, Finance, Legal (use fractional)'],
      next_hires: ['First dedicated manager for the largest team', 'Fractional HR/Finance if missing']
    };
  } else if (total <= 80) {
    orgDesign = {
      structure: 'Functional departments with VPs/Directors',
      layers: 3,
      ceo: ceoTitle,
      departments: departments.filter(d => d.name !== 'Executive').map(d => ({
        name: d.name,
        lead: hasLeaders ? 'Existing Director/VP' : `Need to hire: Head of ${d.name}`,
        team_size: d.total,
        notes: d.total >= 8 ? 'Needs 2 levels (lead + ICs)' : 'Single level is fine'
      })),
      gaps: ['First dedicated People/HR hire recommended', 'Finance needs a FP&A lead by Series B', 'Legal: fractional counsel is fine at this stage'],
      next_hires: ['Head of missing function', 'First dedicated HR/People person', 'Customer Success lead if growing']
    };
  } else {
    orgDesign = {
      structure: 'Deep hierarchy with C-suite, VPs, Directors',
      layers: 4,
      ceo: ceoTitle,
      departments: departments.filter(d => d.name !== 'Executive').map(d => ({
        name: d.name,
        lead: 'VP / SVP',
        team_size: d.total,
        notes: d.total >= 20 ? 'Needs 3+ layers of management' : 'Standard department'
      })),
      gaps: ['Check: every C-level has a succession plan', 'Check: no department has >15 direct reports to one person', 'Consider: shared services for enterprise functions'],
      next_hires: ['Fill missing C-suite roles', 'Internal audit / SOX compliance', 'Corporate development / M&A']
    };
  }

  return { total_people: total, stage, orgDesign, recommended_title: ceoTitle };
}

const arg = process.argv[2];
if (arg) {
  const data = JSON.parse(readFileSync(arg, 'utf-8'));
  const result = designReverseOrg(data.people || data);
  console.log(JSON.stringify(result, null, 2));
}
