# sec-incident

**Summary:** Leads security incident investigation, containment, and recovery, coordinating response efforts to minimize damage and restore normal operations.

**Level:** Manager
**Reports to:** CISO / SOC Director
**Region variants:** NA, EMEA, APAC, LATAM

## Responsibilities
- Lead the investigation and response to security incidents end-to-end, from detection through closure.
- Coordinate incident containment, eradication, and recovery efforts across technical teams and business stakeholders.
- Conduct forensic analysis and determine root cause of security breaches, intrusions, and compromises.
- Manage incident communication and stakeholder updates during active events, including executive briefings.
- Develop and maintain incident response plans, playbooks, and standard operating procedures.
- Lead post-incident reviews (PIRs) and drive improvements to security posture, detection, and response capabilities.
- Direct containment strategies including network isolation, system quarantine, and credential revocation.
- Coordinate with legal, communications, and HR on incident-related legal obligations and messaging.
- Manage evidence preservation, chain of custody, and forensic data collection for legal proceedings.
- Track incident metrics and produce post-incident reports with root cause analysis and lessons learned.
- Conduct incident response tabletop exercises and simulation training with teams.
- Lead and mentor incident responders, providing technical direction and professional development.

## Core Competencies
- Incident response management and coordination for organizing multi-team response to complex security events.
- Digital forensics and investigative analysis across endpoint, network, memory, and cloud forensics domains.
- Technical security expertise across network, endpoint, cloud, application, and identity security domains.
- Crisis management and communication under pressure for managing active security incidents.
- Playbook development and process improvement for refining response capabilities over time.
- Team leadership and cross-functional coordination for mobilizing response resources effectively.
- Forensic tool proficiency for evidence collection and analysis.
- Threat hunting and attacker methodology understanding for proactive threat detection.
- Legal and regulatory knowledge for breach notification obligations and evidence handling.
- Written communication for incident reports, executive summaries, and legal documentation.
- Negotiation and decision-making for making rapid containment decisions with incomplete information.
- Emotional intelligence for managing team stress and stakeholder anxiety during high-pressure incidents.

## Tools & Technology
- Endpoint detection and response (CrowdStrike, SentinelOne, Microsoft Defender for Endpoint)
- Forensic analysis tools (FTK, Autopsy, EnCase, Axiom, Volatility, Rekall)
- Network forensics (Wireshark, NetworkMiner, Zeek, Arkime)
- Cloud forensics tools (AWS CloudTrail, GCP Logging, Azure Monitor, and cloud-specific tools)
- SIEM and log analysis (Splunk, ELK Stack, Azure Sentinel, Google Chronicle)
- Case management and ticketing (ServiceNow, Jira Service Management, RequestTracker)
- Memory analysis (Volatility, Rekall, Redline, MemProcFS)
- Disk imaging and acquisition (FTK Imager, dd, Guymager, MacQuisition)
- Malware analysis sandbox (Cuckoo, CAPE, Joe Sandbox, Any.Run)
- Communication and collaboration tools (Slack, Teams, Zoom, Signal for incident coordination)
- Incident response platforms (Palo Alto XSOAR, Splunk SOAR, Swimlane)
- Evidence management (FTK, Axiom, custom evidence tracking systems)

## KPIs & Success Metrics
- Mean time to contain (MTTC) — time from incident detection to effective containment of the threat.
- Mean time to resolve (MTTR) — time from incident detection to full recovery and closure.
- Mean time to identify (MTTI) — time from initial compromise to detection and alert.
- Post-incident review (PIR) completion rate — percentage of incidents with completed lessons learned.
- Playbook coverage — percentage of incident types with documented and tested response playbooks.
- Tabletop exercise frequency and participation rates across the incident response team.
- Recurrence rate — percentage of similar incidents recurring after remediation.
- Regulatory notification timeliness — percentage of breaches reported within required notification windows.

## Career Progression
Incident response professionals typically start as SOC analysts or junior incident responders (0-2 years), progress to incident responder (2-4 years), senior incident responder (4-7 years), incident response lead or manager (7-10 years), and incident response director or head of incident response (10+ years). Growth involves expanding from technical investigation to program management and strategic leadership. Senior responders handle the most complex incidents and mentor team members. IR managers lead response teams, manage programs, and interface with executive leadership. Career branching includes forensic specialist, threat hunting, security architecture, or CISO roles. Certifications are highly valued (GCIH, GCFA, GCFE, GNFA, CISSP). Experience with major breach responses is career-defining. Many incident responders have military or law enforcement backgrounds.

## Day-to-Day Workflow
Incident response is reactive by nature — the role is driven by active incidents. During quiet periods, IR leads focus on preparation — updating playbooks, conducting tabletop exercises, improving detection rules, and training team members. When an incident activates, the IR lead mobilizes the response team, establishes communication channels, and leads the investigation. Initial triage determines incident scope, severity, and response priorities. Containment actions are executed rapidly while evidence is preserved for forensic analysis. Investigation continues through containment, eradication, and recovery phases. Stakeholder updates are provided at regular intervals — technical updates to the response team, status updates to management, and escalation notifications as needed. Post-incident activities include completing documentation, conducting the PIR, and tracking remediation items. Between incidents, IR leads work on program improvements, tool evaluations, and team development. On-call rotation provides 24/7 coverage for incident activation.

## Cross-Functional Relationships
- **SOC Team** — Primary source of incident detection and initial triage handoff.
- **Security Engineering** — Partners on containment implementation and security control improvements.
- **IT Operations** — Collaborates on system isolation, credential actions, and recovery operations.
- **SRE / Infrastructure** — Coordinates on production system containment and service restoration.
- **Network Engineering** — Implements network-level containment controls and traffic monitoring.
- **Legal / Litigation** — Consults on evidence handling, legal hold, breach notification obligations.
- **Communications / PR** — Coordinates on external communication, disclosure, and media response.
- **HR** — Partners on insider threat investigations, employee involvement actions, and policy violations.
- **Executive Team** — Provides incident status briefings, business impact assessments, and strategic decisions.
- **External Counsel** - Engages for legal privilege, regulatory notification guidance, and litigation risk management.
- **External Incident Response Firms** - Contracts for surge capacity during major incidents.
- **Law Enforcement** - Engages for criminal investigations involving significant breaches, ransomware, or extortion.

## Regional Nuances
**NA:** Incident response is a mature discipline with specialized firms (Mandiant, CrowdStrike, Secureworks). High compensation for experienced responders. Breach notification laws vary by state (50-state patchwork). SEC cybersecurity incident disclosure rules for public companies. Cybersecurity insurance drives IR retainer agreements.
**EMEA:** GDPR imposes strict 72-hour breach notification timeline to supervisory authorities. Data protection authority coordination during incidents is required. EU Cyber Resilience Act for connected devices incident reporting. Works Council notification for incidents involving employee data. Growing cyber insurance market with specific IR requirements.
**APAC:** Varying breach notification laws across markets — Australia has mandatory notification, Japan requires notification, China has complex reporting requirements under MLPS and PIPL. Government cyber incident reporting is mandatory in some APAC countries. Ransomware payment restrictions in some jurisdictions. Follow-the-sun IR coordination across regions.
**LATAM:** Data breach notification regulations are emerging across LATAM. Brazil's LGPD requires breach notification to ANPD. Incident response maturity varies significantly — many organizations rely on external MSSP/IR partners. Cybersecurity insurance adoption growing. Coordination with local law enforcement for cybercrime varies by country.

## Industry Variations
**SaaS:** Customer notification obligations during incidents affecting customer data. Multi-tenant isolation verification during containment. Service availability impact management. Ransomware targeting cloud infrastructure and SaaS backup systems. API abuse and account takeover incidents are common.
**Fintech:** Regulatory breach notification is mandatory and time-sensitive. Transaction fraud incidents may overlap with security incidents. Payment system compromise requires PCI forensic investigator (PFI) engagement. Market manipulation through compromised trading systems. Banking regulator notification requirements in addition to privacy regulations.
**Healthcare:** HIPAA breach notification to HHS and affected individuals. Patient safety considerations during clinical system containment. Medical device compromise during incident response. Ransomware affecting critical patient care systems has life-safety implications. Longer recovery timelines due to legacy system dependencies.
**E-commerce:** Payment card breach notification requirements under PCI DSS. Large-scale account takeover incidents affecting customer accounts. High-availability requirements constrain containment options during peak periods. Consumer notification for incidents involving personal information. Holiday season incident response planning for increased threat activity.

## Common Challenges
- Balancing thorough investigation with urgency of containment — gathering evidence without delaying containment actions.
- Managing stakeholder pressure during high-profile incidents while maintaining investigation quality.
- Keeping incident response capabilities current with evolving cloud-native and containerized environments.
- Preserving forensic evidence in ephemeral cloud and container environments where evidence disappears quickly.
- Determining breach scope and impact with sufficient confidence for regulatory notification decisions.
- Coordinating response across multiple teams, time zones, and sometimes legal jurisdictions.
- Retaining experienced incident responders in a high-stress role with burnout risk and competitive talent market.
- Navigating communication between technical investigation and legal/PR requirements that may conflict.

## Key Regulations & Compliance
- GDPR — breach notification within 72 hours to supervisory authority and communication to data subjects without undue delay.
- HIPAA Breach Notification Rule — notification to HHS, affected individuals, and media for PHI breaches.
- SEC Cybersecurity Rules — incident disclosure requirements for public companies, including material incident reporting on Form 8-K.
- PCI DSS Requirement 12 — incident response plan requirements and annual testing for cardholder data environments.
- NIST SP 800-61 — incident handling guide providing response methodology framework.
- CCPA — breach notification requirements for California residents.
- State breach notification laws — notification requirements in all 50 US states with varying timelines and requirements.
- PIPEDA (Canada) — breach notification requirements for Canadian organizations.
- Cybersecurity Incident Reporting for Critical Infrastructure Act (CIRCIA) — mandatory CISA reporting for critical infrastructure incidents.
- FINRA — cybersecurity incident reporting requirements for financial services firms.
- DFARS / CMMC — incident reporting requirements for defense contractors.
- Cyber Incident Reporting for Critical Infrastructure — mandatory reporting to CISA for covered entities.
