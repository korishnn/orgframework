# da-etl

**Summary:** Designs and maintains ETL/ELT pipelines, data integration, and transformation logic that power the organization's data infrastructure.

**Level:** IC
**Reports to:** Data Engineering Manager
**Region variants:** NA, EMEA, APAC, LATAM

## Responsibilities
- Design, develop, and maintain ETL/ELT pipelines for ingesting, transforming, and loading data from diverse internal and external sources.
- Build data integration workflows connecting SaaS platforms, databases, APIs, file systems, and streaming sources.
- Implement data validation, cleansing, deduplication, and transformation logic within pipeline workflows.
- Monitor pipeline health, performance, data freshness, and error rates, responding to failures promptly.
- Optimize pipeline execution for cost, speed, and reliability across cloud and on-premise infrastructure.
- Document data lineage, pipeline dependencies, transformation rules, and operational runbooks.
- Manage pipeline orchestration scheduling, dependency management, and retry/alerting logic.
- Develop data transformation logic in SQL, dbt, or equivalent transformation tools.
- Implement incremental loading strategies to minimize processing time and cost.
- Manage data contracts with upstream source owners and downstream data consumers.
- Participate in data architecture reviews and provide input on integration patterns and tool selection.
- Support data consumers (analysts, scientists, BI) with data availability and quality issue resolution.

## Core Competencies
- ETL/ELT pipeline development using both batch and incremental processing patterns.
- Data integration and API connectivity across REST, GraphQL, SOAP, and file-based protocols.
- SQL and data transformation optimization for complex transformation logic in data warehouses.
- Workflow orchestration tools for scheduling, monitoring, and managing pipeline dependencies.
- Data quality validation and monitoring for ensuring pipeline output reliability.
- Cloud data platform expertise (Snowflake, BigQuery, Redshift, Databricks).
- Programming in Python, SQL, and optionally Java/Scala for custom pipeline components.
- Data modeling concepts for designing target schemas (star schema, data vault, 3NF).
- Change data capture (CDC) patterns for real-time and near-real-time data ingestion.
- Error handling, retry logic, and alerting for resilient pipeline design.
- Version control and CI/CD for managing pipeline code and configuration changes.
- Performance troubleshooting and optimization for slow or failing pipelines.

## Tools & Technology
- Data transformation tools (dbt, SQL, Matillion, Dataform)
- Workflow orchestration (Apache Airflow, Dagster, Prefect, Astronomer)
- Cloud data warehouses (Snowflake, BigQuery, Redshift, Databricks SQL)
- ETL platforms (Fivetran, Stitch, Talend, Informatica, SnapLogic)
- Stream processing (Kafka, Confluent, Kinesis, Pulsar, Flink)
- Programming languages (Python, SQL, Java, Scala)
- Source control and CI/CD (Git, GitHub Actions, GitLab CI, Jenkins)
- Data quality frameworks (Great Expectations, dbt tests, SODA)
- Object storage and data lakes (AWS S3, GCP GCS, Azure Blob, Delta Lake)
- Data integration and API tools (Airbyte, Meltano, Singer, Apache NiFi)
- Monitoring and alerting (Datadog, Grafana, PagerDuty, OpsGenie)
- Containerization (Docker, Kubernetes for pipeline execution)

## KPIs & Success Metrics
- Pipeline reliability — percentage of scheduled runs completing successfully without errors.
- Data freshness — time from source data change to availability in target system (SLAs met).
- Pipeline execution cost per GB processed, with cost reduction trends.
- Time to onboard new data sources from request to production pipeline.
- Data quality pass rate — percentage of pipeline runs passing automated quality checks.
- Mean time to detect (MTTD) and mean time to resolve (MTTR) for pipeline failures.
- Code coverage and testing completeness for pipeline transformations.

## Career Progression
ETL developers and data integration engineers typically progress from junior roles (0-2 years) to mid-level (2-5 years), senior (5-8 years), and lead/staff (8+ years). Growth involves expanding from building individual pipelines to designing integration architectures and standards. Senior ETL engineers design complex multi-source pipelines and mentor team members. Lead engineers set integration patterns, evaluate tools, and drive engineering best practices. Career branching includes analytics engineering (transformation-focused with dbt), data platform engineering (infrastructure-focused), or data architecture. The modern data stack has elevated the ETL role from traditional ETL tooling to cloud-native, code-driven approaches. Certifications (dbt, Snowflake, AWS data analytics) support career progression.

## Day-to-Day Workflow
An ETL engineer's week is centered on pipeline development and operational monitoring. Active development involves writing transformation code, configuring data source connectors, building orchestration DAGs, and implementing testing. Morning stand-up reviews pipeline health, recent failures, and prioritized fixes. Operational monitoring checks data freshness, reviews error logs, and addresses alerts. On-call rotation provides off-hours coverage for critical pipeline failures. Sprint planning and refinement coordinate work across the data integration team. Source system changes (API updates, schema changes) trigger pipeline maintenance and adaptation. Performance tuning sessions optimize slow pipelines, reduce cost, and improve reliability. Documentation of pipeline metadata, dependencies, and runbooks is maintained continuously. Technology evaluations and proofs-of-concept assess new integration tools and approaches.

## Cross-Functional Relationships
- **Data Analysts** — Primary consumers of pipeline output; collaborates on data availability, schema design, and quality requirements.
- **Data Scientists** — Supports ML data pipeline needs, feature engineering infrastructure, and training data preparation.
- **Data Warehouse Engineers** — Partners on target schema design and data model evolution.
- **Software Engineers** — Coordinates on application event tracking, API data sources, and database integration.
- **Source System Owners** — Collaborates on data access, schema understanding, and change notifications.
- **BI Team** — Ensures BI data models are supported by reliable pipeline data.
- **DevOps / SRE** - Collaborates on shared infrastructure, CI/CD pipelines, and incident response.
- **Data Governance Team** - Implements data quality rules, lineage tracking, and catalog integration.
- **Security Team** - Ensures secure data handling in pipeline processes and access controls.
- **Procurement / Vendor Management** - Coordinates on data source contracts and API access agreements.

## Regional Nuances
**NA:** Modern data stack adoption is highest — dbt, Fivetran, Airbyte, and cloud warehouses are standard. Strong emphasis on code-driven ETL and version control. High demand and compensation for ETL engineers. Migration from legacy ETL tools (Informatica, Talend) to modern stack is common.
**EMEA:** GDPR data residency requirements affect where data can be processed and stored — multi-region pipeline architectures are common. Strong adoption of dbt and Airflow in European data teams. Lower salaries than NA but strong work-life balance. Focus on data sovereignty and European cloud providers.
**APAC:** India has large ETL engineering talent pool serving global teams. China requires domestic data processing infrastructure and has its own ETL tool ecosystem. Japan values reliability and documentation in pipeline development. Singapore serves as regional data integration hub.
**LATAM:** ETL development is a growing field with talent serving near-shore US needs. Legacy ETL tools (Informatica SSIS, Talend) are still common alongside modern stack adoption. Data infrastructure maturity varies significantly by company. Cost optimization is a major focus given cloud cost sensitivity.

## Industry Variations
**SaaS:** Product event data pipelines (behavioral tracking via Segment, RudderStack, custom instrumentation) are primary. Real-time streaming for user-facing analytics features. Multi-source SaaS API integrations for marketing, sales, and support data. Limited data volume compared to other industries.
**Fintech:** Strict data retention and recovery requirements. Transaction data pipelines require exactly-once semantics and reconciliation. Regulatory reporting pipelines have specific timeliness and accuracy requirements. Audit trail for all data transformations and pipeline changes.
**Healthcare:** HIPAA-compliant pipeline design with PHI handling requirements. EDI (Electronic Data Interchange) integration for healthcare transactions (claims, eligibility, referrals). Clinical data integration from EHR systems. Interoperability standards (FHIR, HL7 v2) drive integration patterns.
**E-commerce:** High-volume transaction data pipelines for order, inventory, and payment data. Real-time inventory synchronization across channels. Product catalog data ingestion with frequent updates from suppliers. Customer behavioral data at massive scale from web and mobile tracking.

## Common Challenges
- Managing pipeline failures and data quality issues from upstream source changes that break downstream transformations.
- Keeping pipelines performant and cost-efficient as data volumes grow exponentially.
- Managing schema evolution across multiple source systems with different change management practices.
- Handling the diversity of data source types, APIs, and formats that need integration.
- Balancing the need for real-time data availability with the cost and complexity of streaming infrastructure.
- Maintaining pipeline documentation and data lineage as the number of pipelines and dependencies grows.
- Testing pipeline changes effectively without representative data volumes in development environments.
- Managing credential rotation, API key expiration, and source system access changes without pipeline downtime.

## Key Regulations & Compliance
- GDPR — data processing records, data retention limits, and data deletion in pipeline design.
- HIPAA — PHI identification, de-identification, and secure handling in healthcare data pipelines.
- CCPA — consumer data access and deletion request processing through data pipelines.
- SOX — data integrity controls, audit trails, and change management for financial reporting data.
- PCI DSS — cardholder data protection in payment processing pipelines.
- Data residency laws — pipeline processing location requirements (Russia, China, India, EU).
- Data retention regulations — automated data purging based on regulatory retention schedules.
- SOC 2 Type II — pipeline data processing integrity, security, availability, and confidentiality controls.
- Data governance policies — data classification handling, access controls, and usage tracking.
