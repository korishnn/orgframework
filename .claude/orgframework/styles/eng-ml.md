# eng-ml

**Summary:** Machine Learning Engineer designs, trains, deploys, and monitors ML models and inference systems that power intelligent product features and data-driven decision-making.

**Level:** IC
**Reports to:** Engineering Manager
**Region variants:** NA, EMEA, APAC, LATAM

## Responsibilities
- Design, train, evaluate, validate, and deploy machine learning models at scale for production use cases
- Build and maintain ML training pipelines, feature engineering workflows, and experimentation frameworks
- Implement feature engineering, feature selection, model architecture design, and hyperparameter optimization
- Monitor model performance, concept drift, data drift, and fairness metrics in production environments
- Develop and manage ML infrastructure including feature stores, model registries, and model serving infrastructure
- Collaborate with data scientists on data requirements, labeling strategies, and experiment design
- Document model behavior, limitations, assumptions, and maintenance procedures for operational teams
- Optimize inference performance through model quantization, pruning, distillation, and hardware acceleration
- Implement A/B testing frameworks for model evaluation and online experimentation
- Build CI/CD pipelines specific to ML workflows including data validation, training, and deployment stages
- Participate in model reviews focusing on technical soundness, reproducibility, and production readiness
- Stay current with ML research, frameworks, and infrastructure best practices

## Core Competencies
- Strong foundation in machine learning algorithms, statistical methods, and deep learning architectures
- Proficiency with ML frameworks (PyTorch, TensorFlow, JAX, scikit-learn, XGBoost)
- Experience with ML pipeline orchestration (Kubeflow, MLflow, Airflow, TFX, Metaflow)
- Strong programming skills in Python and optionally Go or Rust for performance-critical inference
- Knowledge of model serving and inference optimization (Triton Inference Server, ONNX, TensorRT)
- Understanding of experiment tracking, model versioning, and reproducible ML workflows
- Familiarity with feature stores (Feast, Tecton) and model registries (MLflow Model Registry, Sagemaker)
- Knowledge of distributed training and large-scale data processing (Spark, Ray, Horovod)
- Understanding of MLOps practices including model monitoring, CI/CD for ML, and governance
- Awareness of ML ethics, bias detection, and fairness evaluation methodologies

## Tools & Technology
- Frameworks: PyTorch, TensorFlow, JAX, Keras, scikit-learn, XGBoost, LightGBM
- MLOps: MLflow, Kubeflow, TFX, Metaflow, Weights & Biases, Neptune, DVC
- Serving: Triton Inference Server, TorchServe, BentoML, Seldon Core, KServe
- Infrastructure: Ray, Spark, Apache Beam, Dask, Kubernetes, Docker
- Feature: Feast, Tecton, SageMaker Feature Store
- Monitoring: Evidently, WhyLabs, Arize, NannyML, Grafana
- Languages: Python, R, SQL, Go, Rust
- Cloud: SageMaker, Vertex AI, Azure ML, Databricks

## KPIs & Success Metrics
- Model accuracy, precision, recall, F1, or business-specific evaluation metrics
- Inference latency p50/p95/p99 in production
- Model training time and resource utilization efficiency
- Model deployment frequency and rollback rate
- Data drift and model drift detection rate with time-to-detection
- Experiment velocity (number of experiments run per sprint)
- Production incident rate attributable to model behavior changes

## Career Progression
- Junior (0-2 years): Implements ML features under guidance, runs experiments, assists with data preparation
- Mid (2-4 years): Independently builds and deploys models, owns specific model areas, runs A/B experiments
- Senior (4-7 years): Leads ML project initiatives, designs model architecture, mentors junior engineers
- Staff (7-10 years): Defines ML strategy for product areas, drives ML platform improvements, influences research direction
- Principal (10+ years): Company-wide ML vision, drives ML research-to-production pipeline, industry contributions
- Typical progression: Junior to Mid 1-2 years, Mid to Senior 2-3 years, Senior to Staff 3-4 years

## Day-to-Day Workflow
- Daily standup with the ML/data team for experiment updates and blocker resolution
- Development cycles involve data exploration, feature development, model training, evaluation, and iteration
- Sprint-based work in 1-2 week cycles with ML-specific experimentation alongside feature work
- Code reviews emphasizing reproducibility, data handling, and model evaluation rigor
- Weekly model performance reviews checking production metrics and drift detection
- Collaborative sessions with data scientists on experiment design and results interpretation
- Infrastructure setup and pipeline maintenance for experiment scalability
- Regular knowledge sharing on new ML techniques, papers, and tooling

## Cross-Functional Relationships
- Partners with da-scientist on research-to-production handoffs, experiment design, and model evaluation
- Collaborates with eng-backend on model serving integration, inference API design, and latency requirements
- Works with eng-data on training data pipelines, feature engineering, and data quality validation
- Engages with eng-infrastructure on GPU/resource allocation, model serving infrastructure, and cost optimization
- Coordinates with prd-manager on use case definition, success metrics, and model rollout planning
- Partners with eng-qa on model validation testing, regression testing, and A/B test instrumentation
- Works with sec-grc on model governance, fairness auditing, and compliance documentation
- Engages with lgl-ip on ML patent strategy and intellectual property protection
- Collaborates with dsg-ux on model-driven user experience design and responsible AI presentation

## Regional Nuances
- NA: Largest ML job market with highest compensation; strong focus on deep learning and NLP/CV; FAANG and AI startup concentration; GPU access and research budget expectations
- EMEA: Strong NLP and recommendation systems focus; GDPR impacts ML data practices significantly; growing ML research centers in London, Zurich, Paris; more regulated ML use cases
- APAC: India ML hub focused on applied ML and cost-efficient solutions; Singapore strong in fintech ML; Japan and Korea strong in CV and robotics ML; China has separate ML ecosystem
- LATAM: Emerging ML market; applied ML for business use cases dominates; remote ML roles for US and European companies; strong community in Brazil and Argentina

## Industry Variations
- SaaS: Recommendation systems, personalization models, churn prediction, NLP for customer support automation
- Fintech: Fraud detection models, credit scoring, risk assessment, algorithmic trading, anti-money laundering ML
- Healthcare: Medical imaging diagnosis, drug discovery models, patient outcome prediction, NLP for clinical notes
- E-commerce: Product recommendation, search ranking, demand forecasting, dynamic pricing, customer segmentation
- Manufacturing: Predictive maintenance, quality inspection vision models, supply chain optimization, anomaly detection

## Common Challenges
- Bridging the gap between research-style model development and production engineering requirements
- Managing model reproducibility across different environments and data snapshots
- Handling data labeling quality, cost, and velocity for supervised learning projects
- Monitoring and debugging production models whose behavior degrades over time
- Navigating the tension between model complexity and inference latency/cost requirements
- Keeping up with the rapidly evolving ML framework and infrastructure ecosystem

## Key Regulations & Compliance
- GDPR (right to explanation for automated decisions, data processing consent)
- CCPA for consumer data used in ML training
- EU AI Act for high-risk AI system compliance
- HIPAA for ML models processing healthcare data
- FCRA for credit decisioning models in fintech
- ECOA for fair lending model compliance
- SOX for ML models affecting financial reporting
- Internal model governance standards and fairness auditing requirements
