# eng-platform

**Summary:** Platform Engineer builds internal developer platforms, shared infrastructure services, and paved-road tooling that enable engineering teams to ship faster with reduced cognitive load.

**Level:** IC
**Reports to:** Director of Infrastructure
**Region variants:** NA, EMEA, APAC, LATAM

## Responsibilities
- Design, build, and maintain internal developer platforms (IDPs) with self-service capabilities for infrastructure provisioning
- Develop shared infrastructure services including service mesh, API gateways, secret management, and identity proxies
- Create and maintain platform abstractions that reduce cognitive load for feature teams building and deploying services
- Establish golden paths and paved roads for common development patterns including service creation, deployment, and observability
- Build and maintain service templates, project scaffolding tools, and onboarding automation for new services
- Monitor platform adoption, gather feedback from developer teams, and iterate on platform capabilities
- Drive standardization of infrastructure patterns, deployment practices, and observability instrumentation across the organization
- Manage platform-level concerns including service discovery, configuration distribution, and cross-cutting security policies
- Develop and maintain SDKs, client libraries, and CLI tools that make platform services easy to consume
- Participate in architecture reviews to ensure new services align with platform conventions and standards
- Contribute to documentation, tutorials, and training materials for platform consumers
- Evaluate and integrate third-party tools and open-source technologies into the platform ecosystem

## Core Competencies
- Deep experience with Kubernetes, cloud-native ecosystem, and container orchestration patterns
- Proficiency in Go, Rust, or TypeScript for building platform services and SDKs
- Expertise in building and maintaining internal APIs, SDKs, and developer-facing tooling
- Strong understanding of developer experience (DX) principles and platform adoption strategies
- Knowledge of service mesh technologies (Istio, Linkerd, Consul, Cilium)
- Experience with platform engineering tools (Backstage, Port, Crossplane, Kratix, Kubernetes operators)
- Understanding of API gateway and ingress patterns (Envoy, Kong, NGINX, Traefik)
- Familiarity with secret management and security infrastructure (Vault, External Secrets, cert-manager)
- Knowledge of infrastructure-as-code and GitOps delivery patterns (ArgoCD, Flux, Crossplane)
- Strong collaboration and communication skills for working with internal developer teams

## Tools & Technology
- Platforms: Kubernetes, Docker, Helm, Kustomize, Crossplane, Kratix
- Service mesh: Istio, Linkerd, Consul, Cilium, Envoy
- Developer portals: Backstage, Port, Cortex, OpsLevel, Atlassian Compass
- SDK/tooling: Go, Rust, TypeScript, gRPC, Connect, Protobuf, Cobra CLI
- Secrets: HashiCorp Vault, External Secrets Operator, AWS Secrets Manager, SOPS
- GitOps: ArgoCD, Flux, Renovate, Dependabot
- Observability: OpenTelemetry, Prometheus, Grafana, Loki, Tempo
- IaC: Terraform, Pulumi, CDK, Crossplane compositions

## KPIs & Success Metrics
- Platform adoption rate (percentage of services using platform features)
- Developer onboarding time reduction for new services
- Developer satisfaction score (internal NPS surveys)
- Platform uptime and reliability guarantees
- Self-service request completion rate and fulfillment time
- Infrastructure standardization percentage across services
- Platform engineering team pull request cycle time

## Career Progression
- Mid (2-4 years): Contributes to platform components, builds internal tooling, supports platform consumers
- Senior (4-7 years): Architects platform features, drives adoption, establishes platform standards
- Staff (7-10 years): Defines platform vision, builds organization-wide platform strategy, influences engineering culture
- Principal (10+ years): Company-wide technical platform leadership, industry influence through open source contributions
- Manager track: Platform Engineering Manager leads the team, manages stakeholder relationships, and drives platform roadmap
- Typical progression: Mid to Senior 2-3 years, Senior to Staff 3-4 years

## Day-to-Day Workflow
- Daily standup with the platform team to align on priorities and support requests
- Sprint-based work in 1-2 week iterations focused on platform features and technical debt
- Developer support through office hours, Slack channels, and ad-hoc troubleshooting
- Code reviews with emphasis on API design, backward compatibility, and developer experience
- Regular feedback sessions with platform consumers through surveys and user research
- Monthly platform roadmap reviews with engineering leadership
- Weekly 1:1 with manager for career growth and project priorities
- Continuous documentation and onboarding material updates

## Cross-Functional Relationships
- Partners with eng-devops on CI/CD integration with platform services, pipeline templates, and deployment automation
- Collaborates with eng-sre on platform reliability, SLOs for platform services, and incident response for platform issues
- Works with eng-backend on golden-path service patterns, SDK consumption, and platform feedback
- Engages with eng-infrastructure on underlying compute, networking, and cloud resource management
- Coordinates with eng-arch on platform strategy, technology selection, and standardization roadmaps
- Partners with eng-data on data platform services, pipeline infrastructure, and data tooling integration
- Works with sec-grc on platform security controls, policy-as-code, and compliance automation
- Collaborates with hr-onboarding on developer workflow onboarding and environment setup automation
- Engages with all engineering teams as internal customers of the platform

## Regional Nuances
- NA: Leading platform engineering adoption with dedicated teams; Backstage and Kubernetes ecosystem heavily dominant; high compensation for platform engineers
- EMEA: Growing platform engineering community; strong open-source contributions to CNCF projects; regulated industries driving platform standardization needs
- APAC: Platform engineering emerging in larger tech companies; Kubernetes adoption growing rapidly in India and Singapore; emphasis on cost-effective platform solutions
- LATAM: Early platform engineering adoption; platform engineers often wear DevOps/SRE hats; opportunity to build platform capabilities in growing teams

## Industry Variations
- SaaS: Platform engineering focused on multi-tenant infrastructure, service mesh for inter-service communication, and developer velocity
- Fintech: Compliance-integrated platforms with policy-as-code, audit-trail platforms, and secure-by-default service templates
- Healthcare: HIPAA-compliant platform defaults, PHI-aware infrastructure patterns, audit-integrated platform services
- E-commerce: Traffic-scaling automation in platform, feature flag platforms, A/B testing infrastructure as platform services

## Common Challenges
- Balancing platform team feature work with direct developer support requests
- Driving adoption of platform services without mandating their use
- Maintaining backward compatibility while evolving platform capabilities
- Measuring and communicating platform value to business stakeholders
- Avoiding over-abstraction that limits flexibility for teams with unique needs
- Keeping pace with the rapidly evolving cloud-native ecosystem while maintaining stability

## Key Regulations & Compliance
- SOC 2 for platform service controls and security
- ISO 27001 for information security management
- PCI-DSS for platform services handling payment data
- HIPAA for healthcare platform compliance requirements
- GDPR for data protection in platform services
- Internal security standards for platform-wide controls
