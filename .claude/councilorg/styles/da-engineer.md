# da-engineer

**Summary:** Builds and maintains data infrastructure, pipelines, and warehousing, enabling reliable, scalable, and accessible data across the organization.

**Level:** IC
**Reports to:** Data Engineering Manager
**Region variants:** NA, EMEA, APAC, LATAM

## Responsibilities
- Design, build, and maintain scalable data pipelines and ETL/ELT processes for ingesting, transforming, and loading data from diverse sources.
- Manage data warehousing, data lakes, and storage infrastructure including schema design, partitioning, and optimization.
- Ensure data quality, reliability, and availability across the data platform through monitoring, testing, and alerting.
- Optimize data storage and query performance for analytics workloads, balancing cost, speed, and accuracy.
- Implement data governance and security best practices including access controls, encryption, and data masking.
- Collaborate with data scientists and analysts to enable efficient data access and self-service analytics.
- Build and maintain data catalogs, data dictionaries, and data lineage documentation.
- Develop and maintain data platform infrastructure as code using modern IaC tools.
- Tune and optimize data processing jobs for cost efficiency, reliability, and performance.
- Participate in on-call rotation for data platform incident response and operational support.
- Evaluate and integrate new data technologies, tools, and platforms to improve the data ecosystem.
- Define data engineering standards, best practices, and development methodologies for the team.

## Core Competencies
- Data pipeline and ETL development using batch and streaming frameworks.
- Data warehouse and lake architecture including star/snowflake schemas, data vault, and lakehouse patterns.
- Distributed systems and big data technologies for processing large-scale datasets.
- SQL and database performance optimization across OLAP and OLTP systems.
- Cloud infrastructure management on major cloud providers (AWS, GCP, Azure).
- Data modeling and schema design for analytical and operational use cases.
- Programming proficiency in Python, Java, or Scala for data pipeline development.
- Infrastructure as code (Terraform, CloudFormation, Pulumi) for data platform management.
- Data quality frameworks and testing for ensuring pipeline reliability and data correctness.
- Monitoring and observability for data pipeline health, latency, and error tracking.
- Version control and CI/CD practices adapted for data engineering workflows.
- Cost optimization for cloud data infrastructure usage and storage.

## Tools & Technology
- Cloud data warehouses (Snowflake, BigQuery, Redshift, Databricks SQL)
- Data processing frameworks (Apache Spark, Apache Flink, dbt, Apache Beam)
- Workflow orchestration (Airflow, Dagster, Prefect, Apache Oozie)
- Stream processing (Apache Kafka, Confluent, Amazon Kinesis, Pulsar)
- Infrastructure as code (Terraform, Pulumi, CloudFormation, Ansible)
- Programming languages (Python, Java, Scala, SQL)
- Version control and CI/CD (Git, GitHub Actions, GitLab CI, Jenkins)
- Data catalog and lineage (Apache Atlas, DataHub, Collibra, Alation, Amundsen)
- Monitoring and observability (Datadog, Grafana, Prometheus, Monte Carlo)
- Container orchestration (Docker, Kubernetes, ECS, GKE)
- Object storage (AWS S3, GCP GCS, Azure Blob Storage)
- Data formats (Parquet, Avro, ORC, Delta Lake, Iceberg)

## KPIs & Success Metrics
- Pipeline reliability — data freshness and availability SLAs achieved percentage.
- Data quality score — percentage of tables passing automated quality checks and validation rules.
- Query performance — latency improvements for critical analytical queries over time.
- Platform uptime and availability of data warehouse and pipeline infrastructure.
- Pipeline cost efficiency — compute and storage cost per TB processed.
- Time to onboard new data sources from request to production availability.
- Self-service enablement — percentage of data consumers able to access data without engineering support.
- Incident response metrics — mean time to detect (MTTD) and mean time to resolve (MTTR) for data issues.

## Career Progression
Data engineers typically start as junior data engineers (0-2 years), progress to mid-level (2-5 years), senior (5-8 years), and staff/principal (8+ years). Growth involves expanding from pipeline building to data architecture and platform strategy. Senior data engineers lead complex data initiatives and design scalable data systems. Staff/principal engineers set data platform vision, evaluate technologies, and drive architectural decisions. Career branching includes analytics engineering (dbt-focused, closer to analysts), data platform engineering (infrastructure-focused), or ML engineering (supporting ML pipelines). Many data engineers come from software engineering backgrounds. Advancement depends on technical depth, system reliability, and platform impact. Certifications (GCP Data Engineer, AWS Data Analytics, Snowflake) can support career growth.

## Day-to-Day Workflow
A data engineer's day centers on building and maintaining data systems. Active development work includes writing data pipeline code, building data models, and optimizing queries. Operational work involves monitoring pipeline health, investigating failures, and resolving incidents. Infrastructure work includes managing cloud resources, scaling clusters, and provisioning storage. Morning stand-ups coordinate with the data team on pipeline status and priorities. Sprint planning and refinement ensure pipeline work aligns with data consumer needs. Architecture reviews evaluate new approaches, technologies, and system designs. On-call responsibilities rotate for production data platform support. Documentation of pipelines, data lineage, and system architecture is ongoing. Learning time for new data technologies and platform capabilities is important in this rapidly evolving field. Capacity planning for data growth and cost management is a recurring activity.

## Cross-Functional Relationships
- **Data Analysts** — Primary internal customers for well-structured, accessible data for analysis.
- **Data Scientists** — Partners on feature engineering infrastructure, data access for modeling, and experiment data pipelines.
- **Software Engineers** — Collaborates on application data integration, event tracking, and API data ingestion.
- **ML Engineers / MLOps** — Supports ML pipeline infrastructure, feature stores, and model serving data.
- **Analytics Engineers** — Partners on dbt model design, data transformation logic, and data modeling standards.
- **BI Team** — Ensures data warehouse performance and reliability for dashboard and reporting workloads.
- **DevOps / SRE** - Coordinates on infrastructure as code, deployment pipelines, and platform monitoring.
- **Data Governance Team** - Implements data quality, lineage, and catalog infrastructure.
- **Security Team** — Partners on data encryption, access controls, and compliance requirements.
- **Product Teams** — Understands data source needs and ensures event tracking is properly instrumented.

## Regional Nuances
**NA:** Highest compensation globally for data engineering. Strong emphasis on cloud-native architectures and modern data stack (Snowflake, dbt, Airflow). Remote-first culture for data engineering roles. High demand creating talent shortages and competitive recruiting.
**EMEA:** GDPR compliance is a significant consideration in data architecture and pipeline design. Data residency requirements drive multi-region data infrastructure. Strong data engineering communities in London, Berlin, and Amsterdam. Lower salaries than NA but strong work-life balance. EU digital sovereignty initiatives affect cloud provider choices.
**APAC:** India has a large data engineering talent pool serving global companies through remote work and service providers. China data infrastructure must navigate firewall constraints and domestic cloud requirements. Japan data engineering culture emphasizes precision and reliability. Singapore is a regional data infrastructure hub.
**LATAM:** Data engineering is a growing field with increasing specialization. Many data engineers work in near-shore arrangements for US companies. Cloud infrastructure maturity varies by market — Brazil and Mexico lead. Growing data engineering communities and bootcamp programs. Salary arbitrage opportunities with remote US employment.

## Industry Variations
**SaaS:** Data pipelines focus on product event data (behavioral tracking), customer data (CRM), and billing data. Real-time streaming is common for user-facing analytics features. Strong emphasis on self-serve data infrastructure. Data volume scales with user base growth.
**Fintech:** Strict data retention and audit trail requirements. Transaction data pipelines require exactly-once processing semantics. Regulatory reporting pipelines have specific data quality and timeliness requirements. Data encryption and access control are critical across all infrastructure.
**Healthcare:** HIPAA-compliant data infrastructure with PHI handling requirements. Interoperability standards (FHIR, HL7) drive data integration patterns. Clinical data pipelines require rigorous validation and audit trails. Data de-identification and re-identification infrastructure.
**E-commerce:** High-volume transaction data pipelines during peak periods (holidays, promotions). Real-time inventory and order data processing. Product catalog data pipelines with frequent updates. Customer behavioral data pipelines at massive scale.

## Common Challenges
- Managing data quality and reliability across complex pipelines with many upstream dependencies and data sources.
- Scaling data infrastructure cost-effectively as data volume grows exponentially.
- Keeping up with the rapidly evolving data tooling landscape while maintaining production stability.
- Balancing support for self-service analytics with maintaining data governance and quality standards.
- Managing schema evolution and backward compatibility as data sources change over time.
- Bridging the gap between batch and real-time processing for unified data architectures.
- Building data platforms that serve diverse use cases (BI, ML, operational analytics) with conflicting requirements.
- Hiring and retaining experienced data engineers in a competitive talent market with high demand.

## Key Regulations & Compliance
- GDPR — data residency, right to erasure, and data minimization requirements affecting data architecture.
- CCPA — consumer data access and deletion request support through data infrastructure.
- HIPAA — PHI handling, encryption, access controls, and audit trails for healthcare data.
- SOX — data integrity and access controls for financial reporting data pipelines.
- PCI DSS — cardholder data protection in payment processing data pipelines.
- Data governance policies — data classification, retention, and lifecycle management.
- SOC 2 Type II — controls over data processing integrity, security, availability, and confidentiality.
- FedRAMP (US government) — compliance requirements for cloud data infrastructure serving federal agencies.
- Country-specific data localization laws (Russia, China, India) requiring in-country data storage and processing.
