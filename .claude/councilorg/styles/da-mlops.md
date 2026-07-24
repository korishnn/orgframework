# da-mlops

**Summary:** Manages ML model deployment, monitoring, and ML infrastructure, ensuring reliable, scalable, and maintainable machine learning systems in production.

**Level:** IC
**Reports to:** Data Engineering / ML Director
**Region variants:** NA, EMEA, APAC, LATAM

## Responsibilities
- Deploy, manage, and monitor machine learning models in production environments across batch and real-time serving.
- Build and maintain ML infrastructure including feature stores, model registries, and deployment pipelines.
- Implement CI/CD pipelines specifically designed for machine learning workflows including data validation, model training, testing, and deployment.
- Monitor model performance, data drift, concept drift, and data quality in production systems.
- Automate model retraining pipelines, deployment processes, and rollback procedures.
- Establish ML observability, alerting, and incident response procedures for production ML systems.
- Develop and maintain infrastructure as code for ML environments and data processing.
- Manage model versioning, experiment tracking, and reproducibility across the ML lifecycle.
- Implement model governance including access controls, audit logging, and compliance documentation.
- Optimize model serving infrastructure for latency, throughput, and cost efficiency.
- Collaborate with data scientists on model packaging, dependency management, and production readiness.
- Design and implement A/B testing and canary deployment infrastructure for model evaluation.

## Core Competencies
- ML model deployment and serving across online (real-time API) and offline (batch) inference patterns.
- MLOps infrastructure and tooling for managing the full ML lifecycle including experimentation, training, deployment, monitoring, and retraining.
- CI/CD for machine learning pipelines including automated testing, validation, and deployment gates.
- Model monitoring and observability for detecting drift, performance degradation, and data quality issues.
- Containerization and orchestration (Docker, Kubernetes) for ML workload management and scaling.
- Cloud platform expertise and infrastructure as code for provisioning ML environments.
- Feature store management for consistent feature computation and serving across training and inference.
- Experiment tracking and reproducibility using MLflow, Weights and Biases, or custom frameworks.
- Model governance including versioning, lineage, access control, and auditability.
- Programming proficiency in Python, SQL, and Go for ML infrastructure development.
- Data pipeline integration for connecting ML systems to upstream data sources and downstream applications.
- Cost optimization for ML training and inference infrastructure across cloud and on-premise environments.

## Tools & Technology
- ML platforms and frameworks (MLflow, Kubeflow, Sagemaker, Vertex AI, Azure ML)
- Model serving infrastructure (Triton Inference Server, TorchServe, TensorFlow Serving, Seldon Core, BentoML)
- Feature stores (Feast, Tecton, Databricks Feature Store, SageMaker Feature Store)
- Experiment tracking (MLflow Tracking, Weights and Biases, Neptune, Comet, DVC)
- Model registries (MLflow Model Registry, SageMaker Model Registry, custom solutions)
- Container orchestration (Docker, Kubernetes, EKS, GKE, AKS)
- CI/CD pipelines (GitHub Actions, GitLab CI, Jenkins, ArgoCD, CircleCI)
- Monitoring and observability (Prometheus, Grafana, Datadog, Evidently AI, Arize AI, WhyLabs)
- Infrastructure as code (Terraform, Pulumi, CloudFormation, Helm Charts)
- Data versioning (DVC, LakeFS, Pachyderm)
- Feature engineering (Spark, dbt, Tecton, Feast)
- Model testing tools (Great Expectations, DeepChecks, TFX Model Validation)

## KPIs & Success Metrics
- Model deployment velocity — time from model development completion to production deployment.
- Model serving latency P50, P95, and P99 for real-time inference endpoints.
- Model uptime and availability percentage against SLA targets.
- ML infrastructure cost per prediction or per training run.
- Drift detection time — time from model drift onset to detection and alert.
- Deployment success rate — percentage of deployments succeeding without rollback.
- Model downtime and incident frequency from ML infrastructure issues.
- Experiment reproducibility rate — percentage of experiments that can be fully reproduced.

## Career Progression
MLOps engineers typically come from data engineering, DevOps, or ML engineering backgrounds. Career progression starts as junior ML engineer or MLOps engineer (0-2 years), mid-level (2-5 years), senior MLOps engineer (5-8 years), and MLOps lead/architect (8+ years). Growth involves expanding from pipeline building to ML platform architecture and team leadership. Senior MLOps engineers design ML infrastructure strategy and set standards. MLOps architects design organization-wide ML platforms serving multiple teams and use cases. The MLOps field is rapidly evolving with growing demand. MLOps is recognized as a distinct discipline at the intersection of ML engineering and platform engineering. Certifications (AWS ML Specialty, GCP ML Engineer, Kubeflow certifications) can support career growth.

## Day-to-Day Workflow
An MLOps engineer's week combines platform development, operational support, and collaboration. Platform development includes building deployment pipelines, feature store infrastructure, monitoring systems, and automation tools. Operational work involves monitoring production models, responding to incidents, investigating drift alerts, and managing ML infrastructure resources. Collaboration with data scientists occurs during model handoff, production readiness reviews, and troubleshooting. Sprint planning and stand-ups coordinate work across the ML platform team. On-call rotation handles production ML incidents and urgent deployment needs. Documentation of ML systems, runbooks, and best practices is ongoing. Technology evaluation for new MLOps tools and platforms requires research, proof-of-concept testing, and recommendations. Cost analysis and optimization for ML compute resources is a recurring activity.

## Cross-Functional Relationships
- **Data Scientists** — Primary partner for model handoff, production readiness, and deployment support.
- **Data Engineers** — Collaborates on feature pipeline integration, data access for ML, and data quality monitoring.
- **DevOps / Platform Engineering** — Partners on shared infrastructure, CI/CD standards, and platform architecture.
- **Software Engineers** — Integrates ML predictions into applications and product features.
- **Infrastructure / SRE** — Coordinates on reliability, scaling, and incident response for ML systems.
- **Data Analysts** — Supports ML-driven analytical models and reporting infrastructure.
- **Security Team** — Ensures ML infrastructure security, access controls, and compliance.
- **Product Managers** - Aligns ML infrastructure roadmap with product ML feature needs.
- **Finance** - Partners on ML infrastructure cost tracking and budget planning.
- **Compliance / Legal** - Ensures model governance and regulatory requirements are met in ML infrastructure.

## Regional Nuances
**NA:** MLOps is most mature in NA, especially in big tech and well-funded startups. High demand and compensation for MLOps talent. Strong emphasis on platform engineering and infrastructure at scale. Cloud-native MLOps is standard.
**EMEA:** GDPR affects ML data handling and model governance requirements. EU AI Act creates new compliance requirements for MLOps processes. Lower MLOps salaries than NA but strong ML research culture. Growing MLOps communities in London, Berlin, and Amsterdam.
**APAC:** MLOps talent is concentrated in India's tech hubs serving global companies. China has its own ML tooling ecosystem (Alibaba PAIC, Baidu PaddlePaddle) and MLOps practices. Japan's MLOps adoption is growing. Singapore has emerging MLOps community and startup ecosystem.
**LATAM:** MLOps is an emerging specialization with limited experienced talent. Many MLOps engineers are self-taught or transitioning from data engineering. Remote work enables global employment. Growing cloud adoption is creating ML infrastructure opportunities.

## Industry Variations
**SaaS:** MLOps focuses on recommendation systems, personalization models, and real-time prediction APIs. Traffic variability requires auto-scaling ML infrastructure. Feature stores serve both real-time and batch use cases. ML platform that serves multiple product teams.
**Fintech:** Model governance (SR 11-7) creates strict requirements for model validation, documentation, and monitoring. Compliance requirements for model audit trails and explainability. Fraud detection models require low-latency real-time inference. Credit model retraining and monitoring cycles.
**Healthcare:** HIPAA-compliant ML infrastructure with PHI handling requirements. FDA validation for clinical ML models. Patient data privacy affects data pipelines and feature computation. Longer model validation cycles with regulatory review.
**E-commerce:** High-volume real-time inference for recommendations, search, and personalization. Seasonal traffic patterns require elastic ML infrastructure. Model freshness matters for changing consumer preferences. A/B testing infrastructure is critical for model evaluation.

## Common Challenges
- Managing the gap between research environments (Jupyter notebooks, local GPUs) and production infrastructure requirements.
- Ensuring reproducibility of ML experiments and model training across environments and team members.
- Monitoring model drift and performance degradation when ground truth labels have significant delay.
- Managing model dependency hell — conflicting Python package versions, CUDA compatibility, and OS dependencies.
- Balancing infrastructure cost with model performance requirements for GPU and compute-intensive workloads.
- Building ML platforms that serve diverse use cases across different teams with varying requirements.
- Handling data pipeline failures that affect model freshness and retraining schedules.
- Navigating organizational maturity — MLOps practices work best when data science and engineering collaboration is strong.

## Key Regulations & Compliance
- GDPR — right to explanation for automated decisions, data processing for model training, and model output subject to data subject rights.
- EU AI Act — risk classification, transparency, human oversight requirements, and conformity assessment for ML systems.
- SR 11-7 / OCC 2011-12 — model validation, governance, and documentation for ML in financial services.
- HIPAA — PHI handling in ML training data and inference, patient data de-identification for model development.
- CCPA — consumer rights related to automated decision-making and profiling using ML models.
- FDA regulations for ML-based medical devices (SaMD) including validation and change control.
- ISO/IEC 42001 — AI management system standard for ML governance and processes.
- Model explainability requirements (XAI) for regulated ML applications — SHAP, LIME, or similar methods.
- Data provenance and lineage requirements for model audit trails.
