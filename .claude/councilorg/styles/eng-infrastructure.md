# eng-infrastructure

**Summary:** Infrastructure Engineer designs, provisions, and manages cloud infrastructure, networking, compute resources, and storage systems that support all engineering workloads and services.

**Level:** IC
**Reports to:** Director of Infrastructure
**Region variants:** NA, EMEA, APAC, LATAM

## Responsibilities
- Design, provision, and manage cloud infrastructure across providers (AWS, GCP, Azure) with infrastructure-as-code
- Implement networking topologies including VPCs, subnets, VPNs, load balancers, DNS, and CDN configurations
- Manage compute, storage, and database infrastructure with automated provisioning and lifecycle management
- Implement infrastructure security best practices including IAM policies, network segmentation, and encryption
- Optimize cloud costs through right-sizing, reserved instances, usage analysis, and waste elimination
- Automate all infrastructure provisioning with Terraform, Pulumi, or equivalent IaC tools
- Plan and execute infrastructure migrations, upgrades, and platform modernization projects
- Manage container orchestration platforms including Kubernetes cluster provisioning and node management
- Monitor infrastructure health, capacity utilization, and performance across all resource types
- Implement disaster recovery and backup strategies for infrastructure-level resilience
- Maintain infrastructure documentation including topology diagrams, runbooks, and configuration references
- Support engineering teams with infrastructure needs and troubleshooting

## Core Competencies
- Deep knowledge of at least one major cloud provider (AWS, GCP, or Azure) with cross-provider awareness
- Expertise in infrastructure-as-code tools (Terraform, Pulumi, AWS CDK, CloudFormation)
- Strong understanding of networking concepts (VPC design, subnetting, BGP, firewalls, DNS, TLS)
- Experience with container orchestration (Kubernetes, ECS, GKE, AKS) at production scale
- Proficiency in Linux system administration, troubleshooting, and performance tuning
- Knowledge of security best practices (IAM, encryption at rest and in transit, network policies)
- Familiarity with storage systems (block, object, file) and database infrastructure
- Understanding of monitoring, logging, and observability infrastructure
- Knowledge of cost management and FinOps practices for cloud infrastructure
- Scripting and automation skills in Python, Go, or Bash

## Tools & Technology
- Cloud: AWS (EC2, S3, RDS, VPC, IAM, Lambda), GCP (Compute, GKE, Cloud Storage, VPC), Azure (VM, AKS, Storage)
- IaC: Terraform, Pulumi, AWS CDK, CloudFormation, Terragrunt, Crossplane
- Containers: Kubernetes, EKS, GKE, AKS, Docker, Helm
- Networking: AWS VPC, Google VPC, Azure VNet, Cloudflare, Fastly, Kong, Envoy, HAProxy
- Monitoring: CloudWatch, Stackdriver, Azure Monitor, Prometheus, Grafana, Datadog
- Automation: Ansible, Packer, Salt, Bash, Python, Go
- Security: Vault, AWS KMS, CloudHSM, cert-manager, OPA, Kyverno
- Storage: S3, EBS, EFS, Cloud Storage, Persistent Disks, NetApp, Pure Storage

## KPIs & Success Metrics
- Infrastructure availability and uptime (compute, network, storage)
- Cloud cost per unit (per customer, per transaction, per service) and cost trend
- Infrastructure provisioning time (new environments, scaling events)
- Resource utilization rates (compute, storage, network) and waste percentage
- Infrastructure-as-code coverage percentage
- Security compliance scan pass rate and remediation time
- Disaster recovery test success rate and RTO/RPO attainment

## Career Progression
- Junior (0-2 years): Assists with infrastructure maintenance, follows runbooks, implements simple configurations
- Mid (2-4 years): Owns infrastructure components, implements IaC modules, handles provisioning independently
- Senior (4-7 years): Architects cloud infrastructure, designs multi-region deployments, leads migration projects
- Staff (7-10 years): Defines infrastructure strategy, drives cloud optimization programs, sets technical standards
- Principal (10+ years): Company-wide infrastructure vision, leads cloud architecture, influences industry practices
- Typical progression: Junior to Mid 1-2 years, Mid to Senior 2-3 years, Senior to Staff 3-4 years

## Day-to-Day Workflow
- Daily standup with infrastructure/platform team to review ongoing work and emerging issues
- Infrastructure monitoring review for capacity alerts, cost anomalies, and performance degradation
- Sprint-based work in 1-2 week cycles for infrastructure improvements and project work
- Ticket-based support for engineering team infrastructure requests (new environments, resource scaling)
- Infrastructure-as-code development and review following standard engineering workflows
- Weekly 1:1 with manager for career development and project alignment
- On-call rotation for infrastructure-related incidents (network, compute, storage)
- Regular security patching and infrastructure maintenance windows
- Cloud cost review sessions to identify and eliminate waste

## Cross-Functional Relationships
- Partners with eng-sre on reliability requirements, capacity planning, and infrastructure for observability
- Collaborates with eng-devops on CI/CD infrastructure, build environments, and deployment infrastructure
- Works with eng-platform on compute resources for platform services, networking, and shared infrastructure
- Engages with eng-arch on infrastructure strategy, technology selection, and multi-region/cloud decisions
- Coordinates with eng-backend on database infrastructure, caching infrastructure, and service deployment requirements
- Partners with sec-grc on compliance controls, security infrastructure, and audit evidence collection
- Works with fin-fpa on cloud budgeting, cost forecasting, and chargeback/showback implementation
- Collaborates with eng-data on data storage infrastructure, compute for data processing, and data warehousing infrastructure
- Engages with ops-facilities on colocation, data center, and physical infrastructure decisions

## Regional Nuances
- NA: Multi-cloud strategies common; high AWS adoption; strong FinOps culture; infrastructure roles command competitive compensation; remote infrastructure teams common
- EMEA: Strong data sovereignty requirements influencing cloud provider selection; growing sovereign cloud adoption; GDPR compliance critical for infrastructure design; more multi-cloud for regulatory reasons
- APAC: Rapid cloud adoption with hybrid approaches in regulated industries; competitive infrastructure market in Singapore; price sensitivity drives multi-cloud cost optimization
- LATAM: Cloud migration phase with many organizations still transitioning from on-premise; cost-conscious infrastructure design; growing Terraform and Kubernetes skills

## Industry Variations
- SaaS: Multi-region active-active architectures, tenant isolation infrastructure, auto-scaling infrastructure for variable workloads
- Fintech: Highly regulated infrastructure with strict audit trails, low-latency networking for trading, disaster recovery with zero RPO
- Healthcare: HIPAA-compliant cloud infrastructure, PHI data residency requirements, BAA agreements with cloud providers
- E-commerce: Elastic infrastructure for traffic peaks, global CDN strategies, edge computing for low-latency content delivery
- Manufacturing: Hybrid cloud with edge computing, OT network isolation, industrial protocol integration, data residency for factory data

## Common Challenges
- Managing cloud cost sprawl as teams provision resources independently
- Keeping up with the pace of cloud provider service releases and deprecations
- Balancing security restrictions with developer productivity needs
- Planning capacity accurately for variable and growing workloads
- Managing multi-cloud complexity without duplicating expertise across providers
- Ensuring disaster recovery capabilities are tested and functional

## Key Regulations & Compliance
- SOC 2 for infrastructure security controls and availability
- ISO 27001 for information security management system requirements
- PCI-DSS for payment card data infrastructure requirements
- HIPAA for healthcare infrastructure and BAA compliance
- GDPR for data residency and protection requirements affecting infrastructure
- FedRAMP for US government cloud infrastructure
- SOX for financial systems infrastructure controls
- Data residency laws (Russia, China, Brazil, India, EU)
