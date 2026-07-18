# eng-data

**Summary:** Data Engineer builds and maintains scalable data pipelines, warehouses, and ETL/ELT workflows that enable data-driven decision-making across the organization.

**Level:** IC
**Reports to:** Engineering Manager
**Region variants:** NA, EMEA, APAC, LATAM

## Responsibilities
- Design, build, test, and maintain scalable data pipelines and ETL/ELT workflows for structured and unstructured data
- Manage data warehousing infrastructure including dimensional modeling, schema design, and partitioning strategies
- Ensure data quality, integrity, freshness, and consistency across all pipeline stages with monitoring and alerting
- Optimize query performance and data storage costs through partitioning, clustering, compression, and lifecycle management
- Implement data governance frameworks including access controls, data cataloging, lineage tracking, and classification
- Develop real-time streaming data solutions using Kafka, Kinesis, or equivalent stream processing technologies
- Support analytics teams, data scientists, and business stakeholders with reliable, well-documented data foundations
- Build and maintain data transformation logic using dbt, SQL, or Python-based frameworks
- Orchestrate complex data workflows with scheduling, dependency management, retry, and alerting
- Document data models, pipelines, and system architecture for cross-team consumption
- Participate in data architecture reviews and contribute to the data platform roadmap
- Implement monitoring, observability, and SLAs for data pipeline health and freshness

## Core Competencies
- Expert proficiency in SQL for complex query writing, optimization, and analytical transformations
- Extensive experience with data pipeline orchestration (Airflow, Dagster, Prefect)
- Deep knowledge of cloud data warehouses (Snowflake, BigQuery, Redshift, Databricks)
- Familiarity with streaming technologies (Kafka, Kinesis, Flink, Spark Structured Streaming)
- Strong programming skills in Python, Scala, or Java for data processing
- Understanding of data governance, data cataloging, and metadata management practices
- Experience with dbt and analytics engineering approaches for transformation workflows
- Knowledge of data modeling techniques (Kimball, Inmon, Data Vault)
- Proficiency with containerization and infrastructure-as-code for data environments
- Understanding of cost optimization strategies for data storage and compute

## Tools & Technology
- Orchestration: Apache Airflow, Dagster, Prefect, AWS Step Functions
- Warehouses: Snowflake, BigQuery, Redshift, Databricks, ClickHouse
- Streaming: Apache Kafka, Kinesis, Apache Flink, Spark Streaming
- Transformation: dbt, SQLMesh, custom Python/Scala pipelines
- Storage: S3, GCS, ADLS, Parquet, Avro, Delta Lake, Iceberg
- Languages: SQL, Python, Scala, Java, Spark, PySpark
- Infrastructure: Terraform, Docker, Kubernetes, Helm
- Monitoring: DataDog, Monte Carlo, Great Expectations, Soda, dbt tests

## KPIs & Success Metrics
- Data pipeline freshness and SLA attainment percentage
- Pipeline run success rate and mean time to recovery on failures
- Query performance (p50/p95 latency) on key warehouse tables
- Storage cost per TB and compute cost per query
- Data quality score (percentage of tables passing automated quality checks)
- Data catalog coverage (percentage of datasets documented and governed)
- Time from data generation to availability (latency)

## Career Progression
- Junior (0-2 years): Assists with pipeline maintenance, writes SQL transformations, fixes data quality issues
- Mid (2-4 years): Independently builds and owns pipelines, optimizes warehouse performance, documents data models
- Senior (4-7 years): Architects data platform components, establishes data engineering standards, mentors team members
- Staff (7-10 years): Leads data platform strategy, drives data governance programs, influences cross-team data practices
- Principal (10+ years): Company-wide data architecture leadership, drives data-as-a-product strategy
- Typical progression: Junior to Mid 1-2 years, Mid to Senior 2-3 years, Senior to Staff 3-4 years

## Day-to-Day Workflow
- Daily standup with the data engineering team and linked analytics stakeholders
- Sprint-based work in 1-2 week cycles with regular backlog refinement
- Pipeline monitoring review first thing to catch overnight failures or delays
- Development cycle: design data model, implement pipeline, write tests (dbt, Great Expectations), deploy
- Frequent pairing with data analysts and data scientists on new data requirements
- Weekly 1:1 with engineering manager for career development and priorities
- On-call rotation for pipeline failures (typically 1 week rotation per month)
- Regular documentation updates as data models and pipelines evolve

## Cross-Functional Relationships
- Partners with da-analyst on reporting requirements, data model design, and dashboard performance optimization
- Collaborates with eng-backend on event schemas, API data extraction, and database replication strategy
- Works with da-scientist on feature engineering pipelines, training data preparation, and experiment data tracking
- Engages with da-governance on data cataloging, lineage, classification, and access control policies
- Coordinates with eng-platform on data infrastructure shared services and compute resource allocation
- Partners with mkt-analytics on marketing data integration, attribution modeling, and campaign performance data
- Works with sls-revenue-ops on CRM data pipelines, revenue reporting, and sales analytics data marts
- Engages with fin-fpa on financial data integration, budgeting data pipelines, and forecast models
- Collaborates with da-bi on semantic layer design and curated data marts for self-service analytics

## Regional Nuances
- NA: Mature data engineering market with high compensation; strong dbt and Snowflake ecosystem; emphasis on data mesh and data product thinking; large-scale data environments common
- EMEA: Strong GDPR compliance focus affecting data pipeline design; growing DataBricks adoption; competitive markets in London, Berlin, Amsterdam; more multi-cloud data strategies
- APAC: Rapidly growing demand in India and Singapore; strong open-source community adoption; cost optimization drives architecture decisions; Spark and Kafka skills in high demand
- LATAM: Growing remote data engineering talent pool; cost-sensitive cloud architecture choices; strong Python and SQL focus; serving US-based companies as nearshore partners

## Industry Variations
- SaaS: Extensive product analytics and user behavior pipelines; multi-tenant data isolation; real-time dashboards for customers
- Fintech: Strict audit trail requirements, regulatory reporting pipelines, reconciliation data flows, fraud detection data feeds
- Healthcare: HIPAA-compliant data handling, PHI de-identification pipelines, clinical data integration (HL7/FHIR)
- E-commerce: High-volume clickstream processing, inventory data pipelines, personalization feature engineering
- Manufacturing: IoT sensor data ingestion, SCADA system integration, batch processing for supply chain optimization

## Common Challenges
- Balancing data freshness SLAs with cost and pipeline complexity
- Managing schema evolution across dozens of upstream data sources
- Debugging data quality issues that cascade across downstream dependencies
- Scaling pipeline performance as data volume grows exponentially
- Navigating the build-vs-buy decision for data platform components
- Ensuring data discoverability and documentation keeps pace with pipeline growth

## Key Regulations & Compliance
- GDPR for EMEA personal data processing and data subject access requests
- CCPA for California consumer data rights
- HIPAA for healthcare data pipelines and PHI handling
- SOX for financial data integrity and audit trail requirements
- SOC 2 for data security controls in service organization contexts
- PCI-DSS for payment data pipelines
- Data residency laws in specific countries (Russia, China, Brazil, India)
