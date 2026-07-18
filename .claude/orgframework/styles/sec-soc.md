# sec-soc

**Summary:** Monitors security events, triages alerts, and operates the Security Operations Center (SOC) to detect and respond to security threats in real time.

**Level:** IC
**Reports to:** Security Director / CISO
**Region variants:** NA, EMEA, APAC, LATAM

## Responsibilities
- Monitor security events and alerts across the organization's infrastructure, applications, and user activity.
- Triage, investigate, and escalate security incidents following established procedures and playbooks.
- Operate and maintain SIEM platforms (Splunk, Sentinel, QRadar, Chronicle) and security monitoring tools.
- Develop and refine detection rules, correlation logic, and alerting thresholds to improve threat detection.
- Document incident findings, timelines, response actions, and lessons learned in case management systems.
- Participate in 24/7 on-call rotation for security incident response and escalation handling.
- Perform initial containment actions on confirmed security incidents following runbook procedures.
- Analyze logs from endpoints, networks, cloud platforms, and applications for signs of compromise.
- Maintain situational awareness of the threat landscape and emerging attack techniques.
- Escalate complex incidents to senior analysts or incident response team as needed.
- Contribute to SOC process improvements, runbook development, and tool tuning.
- Provide shift handoff reports to ensure continuous coverage across SOC team rotations.

## Core Competencies
- Security monitoring and SIEM operations for real-time detection of security events.
- Incident triage and investigation with analytical thinking for assessing alert severity and impact.
- Threat detection and analysis across network, endpoint, cloud, and identity attack surfaces.
- Security tooling and log analysis for extracting meaningful signals from diverse data sources.
- Incident documentation and communication for clear, accurate record-keeping and escalation.
- Analytical thinking and attention to detail for distinguishing genuine threats from noise.
- Network and system administration fundamentals for understanding attack paths and containment options.
- Malware analysis basics for identifying malicious files and behavior patterns.
- Cloud security monitoring across AWS, GCP, and Azure environments.
- Scripting and automation skills (Python, PowerShell) for SOC tooling and workflow efficiency.
- Incident response frameworks (NIST 800-61, SANS PICERL) for structured response approach.
- Communication skills for clear escalation and stakeholder updates during active incidents.

## Tools & Technology
- SIEM platforms (Splunk Enterprise Security, Microsoft Sentinel, IBM QRadar, Google Chronicle, Elastic Security)
- Endpoint detection and response (CrowdStrike, SentinelOne, Microsoft Defender for Endpoint, Carbon Black)
- Network detection and response (Darktrace, Vectra, ExtraHop, Cisco Secure Network Analytics)
- SOAR platforms (Splunk SOAR, Palo Alto XSOAR, Swimlane, Torq)
- Threat intelligence platforms (MISP, Recorded Future, Anomali, ThreatConnect)
- Case management and ticketing (Jira Service Management, ServiceNow, RequestTracker)
- Email security and analysis (Proofpoint, Mimecast, Microsoft Defender for Office 365)
- Cloud security monitoring (AWS GuardDuty, GCP Security Command Center, Azure Sentinel)
- Log management and aggregation (Splunk, ELK Stack, Graylog)
- Vulnerability management integration (Tenable, Qualys, Rapid7)
- Communication tools (Slack, Teams, PagerDuty, OpsGenie for alerting)
- Packet capture and analysis (Wireshark, tcpdump, Zeek)

## KPIs & Success Metrics
- Mean time to detect (MTTD) for security incidents from initial compromise to identification.
- Mean time to respond (MTTR) from alert generation to initial containment action.
- Alert triage time — average time to assess and categorize incoming alerts.
- False positive rate — percentage of alerts determined to be non-malicious after investigation.
- Escalation accuracy — percentage of escalated incidents that confirm as genuine security events.
- Coverage hours — SOC operating hours and response availability coverage percentage.
- Backlog clearance — number of uninvestigated alerts awaiting triage at any time.

## Career Progression
SOC analysts typically start as Tier 1 (junior) analysts (0-2 years), progress to Tier 2 (mid-level) analysts (2-4 years), Tier 3 (senior) analysts (4-7 years), and SOC lead or manager (7+ years). Growth involves expanding from alert triage to advanced threat hunting and SOC operations management. Tier 1 analysts follow playbooks for initial triage. Tier 2 analysts conduct deeper investigation and handle complex incidents. Tier 3 analysts are subject matter experts for advanced threats and forensics. Career branching includes transitioning to incident response, threat intelligence, penetration testing, or security engineering. SOC experience provides foundational security operations knowledge applicable across security disciplines. Certifications (Security+, CySA+, GCIH, GCIA, CISSP) support career progression.

## Day-to-Day Workflow
A SOC analyst's day is driven by the alert queue and ongoing investigations. Shift start involves a handoff from the previous shift covering active incidents, notable events, and pending investigations. Continuous monitoring of SIEM dashboards, alert queues, and threat intelligence feeds fills the shift. Each alert requires triage — validate the alert, gather context, assess severity, determine if escalation is needed. Escalated incidents require deeper investigation, documentation, and coordination with response teams. Shift duties include maintaining situational awareness, updating case notes, and conducting proactive threat hunting during lulls. Regular check-ins with the SOC lead cover team workload, training needs, and process improvements. Shift end includes completing documentation and preparing the handoff report. Training time for new detection rules, tools, and threat intelligence is built into the schedule. Professional development through certification study and lab practice is encouraged.

## Cross-Functional Relationships
- **Incident Response Team** — Escalation point for confirmed incidents requiring deeper investigation and response coordination.
- **Threat Intelligence Team** — Receives threat intelligence inputs for detection rule tuning and alert prioritization.
- **IT Operations** — Collaborates on system access, log sources, and infrastructure context during investigations.
- **SRE / Engineering** — Coordinates on incident containment actions affecting production systems.
- **Identity and Access Management** — Partners on authentication anomalies, account compromise investigations.
- **Endpoint Engineering** — Collaborates on EDR sensor coverage and endpoint detection optimization.
- **Network Engineering** — Requests network flow data, firewall logs, and traffic captures for investigations.
- **Cloud Infrastructure Team** — Partners on cloud security monitoring coverage and access log analysis.
- **HR** — Coordinates on insider threat investigations and user account actions involving employees.
- **Legal / Privacy** - Consults on data breach notification obligations and evidence preservation requirements.

## Regional Nuances
**NA:** 24/7 SOC operations are common with in-house, co-managed, or fully outsourced models. Higher salaries and more career opportunities in security operations. Strong emphasis on automation and SOAR to reduce analyst burnout from alert fatigue. MSSP/MDR partnerships are common for after-hours coverage.
**EMEA:** GDPR breach notification timelines (72 hours) create pressure on SOC detection and response speed. Works Council notification for employee monitoring practices. Growing SOC maturity with regional SOC hubs in London, Dublin, and Eastern Europe. Data residency affects SIEM architecture and log storage locations.
**APAC:** Follow-the-sun SOC models span APAC, EMEA, and NA for 24/7 coverage. India has large SOC talent pools serving global organizations through managed security services. China requires in-country SOC for domestic operations with data localization requirements. Japan's SOC culture emphasizes process adherence and detailed documentation.
**LATAM:** SOC maturity varies widely — many organizations use MSSP partners rather than in-house SOCs. Growing demand for SOC analysts as security awareness increases. Near-shore SOC services for US companies are common from Brazil, Argentina, and Colombia. Budget constraints limit SIEM and tooling investment.

## Industry Variations
**SaaS:** SOC monitors cloud infrastructure, SaaS application logs, and customer-facing service availability threats. High volume of authentication and access events from global user base. DevOps integration for security monitoring in CI/CD pipelines. Customer data protection monitoring is paramount.
**Fintech:** Regulatory compliance drives SOC scope — transaction monitoring, fraud detection integration, and regulatory reporting. Real-time monitoring for payment processing and financial transaction systems. Stringent incident notification requirements to regulators. Enhanced monitoring for insider threats given access to financial systems.
**Healthcare:** HIPAA breach notification requirements create urgency for PHI-related incident detection. Clinical system monitoring balancing patient safety with security controls. Legacy medical device monitoring presents unique challenges. IoT medical device security event monitoring.
**E-commerce:** High-volume transaction monitoring during peak periods (holidays, promotions). Payment card data monitoring (PCI DSS scope). Fraud-adjacent security monitoring — account takeover, credential stuffing, payment fraud. Global customer traffic monitoring for distributed denial of service attacks.

## Common Challenges
- Managing alert fatigue from high false positive rates that desensitize analysts to genuine threats.
- Retaining experienced SOC analysts who burn out from shift work, repetitive tasks, and high-stress environments.
- Keeping detection rules current with rapidly evolving threat landscape and attack techniques.
- Integrating diverse log sources with inconsistent formats, timestamps, and quality into SIEM.
- Maintaining coverage across cloud, on-premise, and hybrid environments with different monitoring capabilities.
- Distinguishing sophisticated attacks from normal administrative activity and authorized unusual behavior.
- Scaling SOC operations as the organization grows without proportional headcount increases.
- Balancing investigation depth with response speed — moving fast enough while gathering sufficient evidence.

## Key Regulations & Compliance
- GDPR — breach detection and notification within 72 hours, data processing record requirements.
- NIST 800-61 — incident handling guide for SOC processes and response procedures.
- PCI DSS Requirement 10 — log monitoring, audit trail requirements, and SIEM for cardholder data environments.
- HIPAA Security Rule — security incident procedures, monitoring, and breach notification requirements.
- SOX — IT general controls for security monitoring of financial systems.
- ISO 27001 — security operations controls under A.12 (Operations Security) and A.16 (Incident Management).
- SOC 2 Type II — security monitoring controls for service organizations.
- CCPA — data breach notification requirements for California residents.
- FISMA / FedRAMP — security monitoring standards for federal systems.
- Network and Information Systems (NIS) Directive — security monitoring for EU critical infrastructure.
