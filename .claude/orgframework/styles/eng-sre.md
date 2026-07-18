# eng-sre

**Summary:** Site Reliability Engineer ensures production systems are reliable, scalable, observable, and cost-efficient through automation, incident response, and capacity planning.

**Level:** IC or Manager
**Reports to:** Director of Infrastructure / VP Engineering
**Region variants:** NA, EMEA, APAC, LATAM

## Responsibilities
- Define, monitor, and iteratively improve Service Level Objectives (SLOs), Service Level Indicators (SLIs), and error budgets for all production services
- Lead incident response as Incident Commander, driving triage, mitigation, and blameless postmortems with root cause analysis
- Design and build automation to eliminate toil in deployment, monitoring, remediation, and operational workflows
- Plan and execute capacity management strategies including load testing, right-sizing, and auto-scaling configuration
- Operate and continuously improve on-call rotations, escalation policies, and incident management processes
- Drive reliability improvements through chaos engineering, fault injection, and resilience testing
- Manage disaster recovery planning, backup validation, and business continuity testing
- Design and maintain observability infrastructure including metrics, logging, distributed tracing, and alerting
- Partner with development teams to ensure new services meet reliability and operability standards before production launch
- Conduct production readiness reviews and capacity assessments for new features and services
- Analyze error budget burn rates and make data-driven recommendations for release velocity trade-offs
- Document operational runbooks, system dependencies, and incident response procedures
- Participate in architecture reviews to ensure resilience, fault tolerance, and disaster recovery considerations

## Core Competencies
- Deep knowledge of distributed systems, fault-tolerant architectures, and consensus protocols
- Proficiency in scripting and systems programming (Python, Go, Rust)
- Expertise in infrastructure-as-code (Terraform, Pulumi, Crossplane)
- Mastery of observability tooling (Prometheus, Grafana, Datadog, OpenTelemetry, New Relic)
- Strong incident command, communication, and postmortem facilitation skills
- Understanding of networking concepts (TCP/IP, HTTP, DNS, load balancing, CDN)
- Data-driven approach to reliability, capacity, and cost optimization decisions
- Knowledge of container orchestration (Kubernetes, ECS, Nomad)
- Familiarity with chaos engineering tools (Gremlin, Chaos Mesh, Litmus)
- Experience with change management, release engineering, and deployment strategies

## Tools & Technology
- Prometheus, Grafana, Datadog, New Relic, OpenTelemetry
- Terraform, Pulumi, Crossplane, Ansible
- Kubernetes, Docker, Helm, Istio, Envoy
- AWS, GCP, or Azure cloud platforms
- PagerDuty, OpsGenie, Incident.io, FireHydrant
- Python, Go, Rust, Bash
- Kafka, Redis, PostgreSQL, Cassandra
- Gremlin, Chaos Mesh, Litmus

## KPIs & Success Metrics
- SLO/SLI attainment percentage (target: 99.9%+ availability per service)
- Mean Time to Detect (MTTD) and Mean Time to Resolve (MTTR) for incidents
- Error budget burn rate and remaining budget
- Toil reduction percentage quarter-over-quarter
- On-call incident volume and alert fatigue reduction
- Capacity utilization efficiency and infrastructure cost per transaction
- Disaster recovery recovery time objective (RTO) and recovery point objective (RPO) attainment

## Career Progression
- Entry level: Junior SRE focuses on monitoring, alert configuration, and runbook maintenance under guidance
- Mid level: SRE owns SLO definition for specific services, leads incident response, and builds automation
- Senior: SRE designs multi-service reliability strategies, mentors team members, and drives organization-wide reliability initiatives
- Staff/Principal: SRE defines reliability culture across engineering, influences architecture decisions at company level, and sets multi-year reliability roadmaps
- Manager track: SRE Manager leads a team, manages on-call culture, and partners with engineering leadership on reliability investments
- Typical timeframe: Junior to Senior 3-5 years, Senior to Staff 3-5 years

## Day-to-Day Workflow
- Daily standup to review ongoing incidents, critical alerts, and current reliability work
- Rotating on-call schedule with primary and secondary coverage (typically 1-week rotations)
- Incident response interrupts the day when pages fire; post-incident reviews scheduled within 48 hours
- Capacity planning and performance analysis cycles aligned with quarterly business reviews
- Regular review of error budgets and SLO attainment with service owners
- Weekly 1:1s with manager and team-level retros on incident trends and process improvements
- Sprint-based work for longer reliability projects with 2-week iterations
- Collaboration sessions with development teams for production readiness reviews
- Documentation is a continuous activity tied to each system change or incident

## Cross-Functional Relationships
- Works with eng-backend on service architecture, deployment strategies, and production readiness standards
- Partners with eng-infrastructure on capacity planning, cloud resource optimization, and disaster recovery testing
- Collaborates with eng-devops on CI/CD pipeline reliability, build automation, and release engineering
- Aligns with eng-platform on shared observability instrumentation, service mesh, and platform reliability guarantees
- Engages with prd-manager to communicate reliability trade-offs and negotiate SLOs for product features
- Coordinates with sec-grc on compliance requirements for uptime, audit logging, and data retention
- Partners with da-analyst on capacity forecasting using historical usage data and growth trends
- Works with eng-arch on system design reviews focusing on resilience patterns and fault isolation

## Regional Nuances
- NA: Highest concentration of SRE roles in large tech companies; strong emphasis on automation and platform engineering; competitive compensation with significant RSU components
- EMEA: Stronger regulatory requirements around data locality affect disaster recovery planning (GDPR); growing SRE communities in London, Berlin, Amsterdam; works council involvement possible in Germany
- APAC: Follow-the-sun on-call models common for global coverage; faster growth in cloud adoption in India and Southeast Asia; competitive talent market with high demand in Singapore, Tokyo, Bangalore
- LATAM: Growing remote SRE talent pool; cost-optimization focus in cloud spending due to currency fluctuations; smaller SRE communities with broader role scope (combined DevOps/SRE)

## Industry Variations
- SaaS: Error budgets tied to customer-facing uptime SLAs in contracts; SRE directly influences customer retention and contract renewals
- Fintech: Extremely low tolerance for downtime; SOC 2, PCI-DSS, and SOX compliance requirements drive additional controls; audit trails and reconciliation critical
- Healthcare: HIPAA compliance adds data privacy requirements to observability; uptime requirements for critical patient-facing systems; change management more rigorous
- E-commerce: Seasonal traffic patterns (Black Friday, Cyber Monday) require intensive capacity planning; peak load testing is a recurring high-stakes activity; cost optimization critical at scale

## Common Challenges
- Balancing reliability investments with feature velocity and business pressure to ship quickly
- Combating alert fatigue while maintaining sufficient coverage for critical failure modes
- Gaining adoption of SLO and error budget practices across engineering teams with varying maturity
- Managing cognitive load of on-call responsibilities and preventing burnout
- Justifying infrastructure and reliability investments in terms of business impact and customer retention
- Keeping up with evolving cloud-native technologies and rapid pace of change in the ecosystem

## Key Regulations & Compliance
- SOC 2 Type II (availability criteria specific to SRE)
- ISO 27001 for information security management systems
- PCI-DSS for payment card data environments
- HIPAA for healthcare customer data handling
- GDPR for data protection in EMEA operations
- SOX for financial services and public company controls
- FedRAMP for US government workloads (if applicable)
