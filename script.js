document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMobileMenu();
    initNavigation();
    initScrollAnimations();
    initSkillExplorer();
    initContactForm();
    initCertificateModal();
});

function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    const body = document.body;
    const saved = localStorage.getItem('theme') || 'dark';
    const setThemeIcon = () => {
        const light = body.classList.contains('light-theme');
        toggle.innerHTML = light ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    };

    if (saved === 'light') {
        body.classList.add('light-theme');
    }
    setThemeIcon();

    toggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        localStorage.setItem('theme', body.classList.contains('light-theme') ? 'light' : 'dark');
        setThemeIcon();
    });
}

function initMobileMenu() {
    const menu = document.getElementById('nav-menu');
    const button = document.getElementById('mobile-menu-toggle');
    if (!menu || !button) return;

    const icon = button.querySelector('i');
    const closeMenu = () => {
        menu.classList.remove('active');
        button.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        if (icon) icon.className = 'fas fa-bars';
    };

    button.setAttribute('aria-expanded', 'false');

    button.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('active');
        button.setAttribute('aria-expanded', String(isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
        if (icon) icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
    });

    document.addEventListener('click', (event) => {
        const target = event.target;
        if (!menu.contains(target) && !button.contains(target)) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
    });
}

function initNavigation() {
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    if (!links.length || !sections.length) return;

    links.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            const menu = document.getElementById('nav-menu');
            if (!target) return;

            const top = target.getBoundingClientRect().top + window.scrollY - 70;
            window.scrollTo({ top, behavior: 'smooth' });
            if (menu) menu.classList.remove('active');
            const menuToggle = document.getElementById('mobile-menu-toggle');
            const menuIcon = menuToggle ? menuToggle.querySelector('i') : null;
            if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
            if (menuIcon) menuIcon.className = 'fas fa-bars';
            document.body.style.overflow = '';
        });
    });

    const activateOnScroll = () => {
        const offset = window.scrollY + 120;
        let current = '#header';

        sections.forEach((section) => {
            if (offset >= section.offsetTop) {
                current = `#${section.id}`;
            }
        });

        links.forEach((link) => {
            const active = link.getAttribute('href') === current;
            link.classList.toggle('active', active);
        });
    };

    window.addEventListener('scroll', activateOnScroll);
    activateOnScroll();
}

function initScrollAnimations() {
    const elements = document.querySelectorAll('.intro-grid, .page-layout, .skills-layout, .timeline-item, .exp-stack, .project-card, .education-card, .cert-card, .contact-page-body');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    elements.forEach((element) => {
        element.classList.add('loading');
        observer.observe(element);
    });
}

const SKILL_GRAPH = {
    python: {
        label: 'Python',
        icon: 'fab fa-python',
        owned: true,
        children: ['pytorch', 'fastapi', 'pandas']
    },
    sql: {
        label: 'SQL',
        icon: 'fas fa-database',
        owned: true,
        children: ['postgresql', 'snowflake', 'spark']
    },
    docker: {
        label: 'Docker',
        icon: 'fab fa-docker',
        owned: true,
        children: ['fastapi', 'sagemaker', 'kubernetes']
    },
    aws: {
        label: 'AWS',
        icon: 'fab fa-aws',
        owned: true,
        children: ['sagemaker', 'quicksight', 'lambda']
    },
    nlp: {
        label: 'NLP',
        icon: 'fas fa-robot',
        owned: true,
        children: ['langchain', 'huggingface', 'bert']
    },
    'computer-vision': {
        label: 'Computer Vision',
        icon: 'fas fa-eye',
        owned: true,
        children: ['pytorch', 'ocr', 'yolo']
    },
    pytorch: {
        label: 'PyTorch',
        icon: 'fas fa-fire',
        owned: true,
        children: ['huggingface', 'object-detection', 'onnx']
    },
    tensorflow: {
        label: 'TensorFlow',
        icon: 'fas fa-brain',
        owned: true,
        children: ['lstm', 'computer-vision', 'tflite']
    },
    langchain: {
        label: 'LangChain',
        icon: 'fas fa-link',
        owned: true,
        children: ['langgraph', 'rag', 'agents']
    },
    fastapi: {
        label: 'FastAPI',
        icon: 'fas fa-bolt',
        owned: true,
        children: ['docker', 'postgresql', 'graphql']
    },
    postgresql: {
        label: 'PostgreSQL',
        icon: 'fas fa-server',
        owned: true,
        children: ['etl', 'sql', 'mongodb']
    },
    snowflake: {
        label: 'Snowflake',
        icon: 'fas fa-snowflake',
        owned: true,
        children: ['tableau', 'etl', 'dbt']
    },
    pandas: {
        label: 'Pandas',
        icon: 'fas fa-table',
        owned: true,
        children: ['scikit', 'etl', 'polars']
    },
    scikit: {
        label: 'Scikit-learn',
        icon: 'fas fa-chart-line',
        owned: true,
        children: ['feature-eng', 'xgboost', 'mlflow']
    },
    huggingface: {
        label: 'Hugging Face',
        icon: 'fas fa-face-smile',
        owned: true,
        children: ['bert', 'llm-finetune', 'transformers-js']
    },
    bert: {
        label: 'BERT',
        icon: 'fas fa-font',
        owned: true,
        children: ['nlp', 'classification', 'gpt4']
    },
    rag: {
        label: 'RAG',
        icon: 'fas fa-magnifying-glass',
        owned: true,
        children: ['faiss', 'langchain', 'pinecone']
    },
    faiss: {
        label: 'FAISS',
        icon: 'fas fa-vector-square',
        owned: true,
        children: ['rag', 'embeddings', 'weaviate']
    },
    agents: {
        label: 'Agentic AI',
        icon: 'fas fa-people-arrows',
        owned: true,
        children: ['langgraph', 'tool-calling', 'autogpt']
    },
    langgraph: {
        label: 'LangGraph',
        icon: 'fas fa-diagram-project',
        owned: true,
        children: ['agents', 'langchain', 'crewai']
    },
    etl: {
        label: 'ETL',
        icon: 'fas fa-arrows-rotate',
        owned: true,
        children: ['feature-eng', 'airflow', 'kafka']
    },
    'feature-eng': {
        label: 'Feature Engineering',
        icon: 'fas fa-sliders',
        owned: true,
        children: ['scikit', 'model-deploy', 'feast']
    },
    'model-deploy': {
        label: 'Model Deployment',
        icon: 'fas fa-rocket',
        owned: true,
        children: ['docker', 'sagemaker', 'triton']
    },
    sagemaker: {
        label: 'SageMaker',
        icon: 'fas fa-cloud',
        owned: true,
        children: ['model-deploy', 'aws', 'vertex-ai']
    },
    ocr: {
        label: 'OCR',
        icon: 'fas fa-file-lines',
        owned: true,
        children: ['computer-vision', 'document-ai', 'tesseract-only']
    },
    'object-detection': {
        label: 'Object Detection',
        icon: 'fas fa-crosshairs',
        owned: true,
        children: ['computer-vision', 'yolo', 'detectron']
    },
    tableau: {
        label: 'Tableau',
        icon: 'fas fa-chart-pie',
        owned: true,
        children: ['quicksight', 'power-bi', 'looker']
    },
    quicksight: {
        label: 'QuickSight',
        icon: 'fas fa-chart-column',
        owned: true,
        children: ['aws', 'tableau', 'superset']
    },
    lstm: {
        label: 'LSTM',
        icon: 'fas fa-wave-square',
        owned: true,
        children: ['tensorflow', 'deep-learning', 'gru-only']
    },
    java: {
        label: 'Java',
        icon: 'fab fa-java',
        owned: true,
        children: ['spring', 'kotlin', 'spark']
    },
    r: {
        label: 'R',
        icon: 'fab fa-r-project',
        owned: true,
        children: ['statistics', 'ggplot', 'julia']
    },
    spark: {
        label: 'Apache Spark',
        icon: 'fas fa-bolt-lightning',
        owned: false,
        children: []
    },
    kubernetes: {
        label: 'Kubernetes',
        icon: 'fas fa-dharmachakra',
        owned: false,
        children: []
    },
    lambda: {
        label: 'AWS Lambda',
        icon: 'fas fa-bolt',
        owned: false,
        children: []
    },
    yolo: {
        label: 'YOLO v8+',
        icon: 'fas fa-bullseye',
        owned: false,
        children: []
    },
    onnx: {
        label: 'ONNX',
        icon: 'fas fa-exchange-alt',
        owned: false,
        children: []
    },
    tflite: {
        label: 'TensorFlow Lite',
        icon: 'fas fa-mobile',
        owned: false,
        children: []
    },
    graphql: {
        label: 'GraphQL',
        icon: 'fas fa-project-diagram',
        owned: false,
        children: []
    },
    mongodb: {
        label: 'MongoDB',
        icon: 'fas fa-leaf',
        owned: false,
        children: []
    },
    dbt: {
        label: 'dbt',
        icon: 'fas fa-cubes',
        owned: false,
        children: []
    },
    polars: {
        label: 'Polars',
        icon: 'fas fa-gauge-high',
        owned: false,
        children: []
    },
    xgboost: {
        label: 'XGBoost',
        icon: 'fas fa-tree',
        owned: false,
        children: []
    },
    mlflow: {
        label: 'MLflow',
        icon: 'fas fa-flask',
        owned: false,
        children: []
    },
    'llm-finetune': {
        label: 'LLM Fine-tuning',
        icon: 'fas fa-wrench',
        owned: true,
        children: ['huggingface', 'lora', 'rlhf']
    },
    'transformers-js': {
        label: 'Transformers.js',
        icon: 'fas fa-code-branch',
        owned: false,
        children: []
    },
    gpt4: {
        label: 'GPT-4 API',
        icon: 'fas fa-star',
        owned: false,
        children: []
    },
    pinecone: {
        label: 'Pinecone',
        icon: 'fas fa-database',
        owned: false,
        children: []
    },
    weaviate: {
        label: 'Weaviate',
        icon: 'fas fa-network-wired',
        owned: false,
        children: []
    },
    autogpt: {
        label: 'AutoGPT',
        icon: 'fas fa-robot',
        owned: false,
        children: []
    },
    crewai: {
        label: 'CrewAI',
        icon: 'fas fa-users',
        owned: false,
        children: []
    },
    airflow: {
        label: 'Airflow',
        icon: 'fas fa-wind',
        owned: false,
        children: []
    },
    kafka: {
        label: 'Kafka',
        icon: 'fas fa-stream',
        owned: false,
        children: []
    },
    feast: {
        label: 'Feast',
        icon: 'fas fa-utensils',
        owned: false,
        children: []
    },
    triton: {
        label: 'NVIDIA Triton',
        icon: 'fas fa-server',
        owned: false,
        children: []
    },
    'vertex-ai': {
        label: 'Vertex AI',
        icon: 'fab fa-google',
        owned: false,
        children: []
    },
    'document-ai': {
        label: 'Document AI',
        icon: 'fas fa-file-invoice',
        owned: true,
        children: ['ocr', 'rag', 'docling']
    },
    'tesseract-only': {
        label: 'Tesseract OCR',
        icon: 'fas fa-font',
        owned: false,
        children: []
    },
    detectron: {
        label: 'Detectron2',
        icon: 'fas fa-crosshairs',
        owned: false,
        children: []
    },
    looker: {
        label: 'Looker',
        icon: 'fas fa-chart-bar',
        owned: false,
        children: []
    },
    'power-bi': {
        label: 'Power BI',
        icon: 'fas fa-chart-area',
        owned: true,
        children: ['tableau', 'quicksight', 'excel-vba']
    },
    superset: {
        label: 'Apache Superset',
        icon: 'fas fa-chart-line',
        owned: false,
        children: []
    },
    'deep-learning': {
        label: 'Deep Learning',
        icon: 'fas fa-layer-group',
        owned: true,
        children: ['pytorch', 'tensorflow', 'jax']
    },
    'gru-only': {
        label: 'GRU Networks',
        icon: 'fas fa-wave-square',
        owned: false,
        children: []
    },
    spring: {
        label: 'Spring Boot',
        icon: 'fas fa-leaf',
        owned: false,
        children: []
    },
    kotlin: {
        label: 'Kotlin',
        icon: 'fas fa-code',
        owned: false,
        children: []
    },
    statistics: {
        label: 'Statistics',
        icon: 'fas fa-square-root-variable',
        owned: true,
        children: ['r', 'scikit', 'sas']
    },
    ggplot: {
        label: 'ggplot2',
        icon: 'fas fa-palette',
        owned: false,
        children: []
    },
    julia: {
        label: 'Julia',
        icon: 'fas fa-code',
        owned: false,
        children: []
    },
    classification: {
        label: 'Text Classification',
        icon: 'fas fa-tags',
        owned: true,
        children: ['bert', 'nlp', 'zero-shot-only']
    },
    embeddings: {
        label: 'Embeddings',
        icon: 'fas fa-circle-nodes',
        owned: true,
        children: ['faiss', 'huggingface', 'openai-embed']
    },
    'tool-calling': {
        label: 'Tool Calling',
        icon: 'fas fa-screwdriver-wrench',
        owned: true,
        children: ['langchain', 'agents', 'mcp-only']
    },
    lora: {
        label: 'LoRA',
        icon: 'fas fa-compress',
        owned: true,
        children: ['llm-finetune', 'huggingface', 'qlora-only']
    },
    rlhf: {
        label: 'RLHF',
        icon: 'fas fa-trophy',
        owned: false,
        children: []
    },
    'openai-embed': {
        label: 'OpenAI Embeddings',
        icon: 'fas fa-circle',
        owned: false,
        children: []
    },
    'zero-shot-only': {
        label: 'Zero-shot LLM',
        icon: 'fas fa-magic',
        owned: false,
        children: []
    },
    'mcp-only': {
        label: 'MCP Protocol',
        icon: 'fas fa-plug',
        owned: false,
        children: []
    },
    'qlora-only': {
        label: 'QLoRA',
        icon: 'fas fa-compress-arrows-alt',
        owned: false,
        children: []
    },
    docling: {
        label: 'Docling',
        icon: 'fas fa-file',
        owned: false,
        children: []
    },
    'excel-vba': {
        label: 'Excel VBA',
        icon: 'fas fa-file-excel',
        owned: false,
        children: []
    },
    jax: {
        label: 'JAX',
        icon: 'fas fa-x',
        owned: false,
        children: []
    },
    sas: {
        label: 'SAS',
        icon: 'fas fa-chart-simple',
        owned: false,
        children: []
    }
};

const SKILL_ROOTS = ['python', 'sql', 'docker', 'aws', 'nlp', 'computer-vision'];

const SKILL_PROOF = {
    python: [
        { type: 'experience', link: '#exp-grazen', title: 'Grazen AI', meta: 'Data Scientist, since Oct 2025', detail: 'Day-to-day language for CV work, FastAPI backends, and LLM workflows.' },
        { type: 'experience', link: '#exp-iqm', title: 'IQM Corporation', meta: 'Data Scientist, 2022-2023', detail: 'Built BERT classifiers and URL mapping pipelines at 100K+ scale.' },
        { type: 'education', link: '#education', title: 'DePaul University', meta: 'MS in Computer Science', detail: 'ML, AI, data mining, and database systems.' }
    ],
    sql: [
        { type: 'experience', link: '#exp-iqm-intern', title: 'IQM Corporation', meta: 'Data Intern, Summer 2024', detail: 'Built a chatbot that generated SQL for people who did not write queries themselves. Scored 88+ BLEU.' },
        { type: 'experience', link: '#exp-orbe360', title: 'Orbe360', meta: 'Data Scientist, 2025', detail: 'Scraped financial docs and loaded structured data into PostgreSQL.' }
    ],
    docker: [
        { type: 'experience', link: '#exp-grazen', title: 'Grazen AI', meta: 'Data Scientist, since Oct 2025', detail: 'Ran the FastAPI SaaS and streaming inference services in containers.' }
    ],
    aws: [
        { type: 'experience', link: '#exp-iqm-intern', title: 'IQM Corporation', meta: 'Data Intern, Summer 2024', detail: 'QuickSight plus LangChain chatbot so BI users could ask questions in plain English.' },
        { type: 'education', link: '#education', title: 'Google Cloud Big Data & ML', meta: 'Certification', detail: 'Cloud data and ML fundamentals.' }
    ],
    nlp: [
        { type: 'experience', link: '#exp-iqm', title: 'IQM Corporation', meta: 'Data Scientist, 2022-2023', detail: 'BERT classifier for URLs, roughly 6.5K every 12 hours.' },
        { type: 'project', link: '#proj-youtube-qa', title: 'YouTube QA System', meta: 'Side project', detail: 'Q&A over YouTube transcripts with RAG and tool calling.' }
    ],
    'computer-vision': [
        { type: 'experience', link: '#exp-grazen', title: 'Grazen AI', meta: 'Data Scientist, since Oct 2025', detail: 'Object detection, vision LMs, and OCR from labeling through deployment.' }
    ],
    pytorch: [
        { type: 'experience', link: '#exp-grazen', title: 'Grazen AI', meta: 'Data Scientist, since Oct 2025', detail: 'Fine-tuned vision models for detection and document understanding.' }
    ],
    tensorflow: [
        { type: 'project', link: '#proj-molecular', title: 'Molecular Communication', meta: 'Research project', detail: 'LSTM got 99.27% accuracy predicting binary codes in a fluid medium.' }
    ],
    langchain: [
        { type: 'experience', link: '#exp-iqm-intern', title: 'IQM Corporation', meta: 'Data Intern, Summer 2024', detail: 'Query resolver hooked into QuickSight.' },
        { type: 'project', link: '#proj-youtube-qa', title: 'YouTube QA System', meta: 'Side project', detail: 'Tool-calling agent with FAISS search over transcripts.' }
    ],
    fastapi: [
        { type: 'experience', link: '#exp-grazen', title: 'Grazen AI', meta: 'Data Scientist, since Oct 2025', detail: 'Production SaaS backend with RTSP/RTMP streaming.' }
    ],
    postgresql: [
        { type: 'experience', link: '#exp-orbe360', title: 'Orbe360', meta: 'Data Scientist, 2025', detail: 'ETL from scraped financial docs into Postgres.' }
    ],
    snowflake: [
        { type: 'experience', link: '#exp-orbe360', title: 'Orbe360', meta: 'Data Scientist, 2025', detail: 'Warehouse layer for analytics-ready financial data.' }
    ],
    pandas: [
        { type: 'experience', link: '#exp-orbe360', title: 'Orbe360', meta: 'Data Scientist, 2025', detail: 'Most of the wrangling and feature prep in the pipelines.' }
    ],
    scikit: [
        { type: 'education', link: '#education', title: 'Stanford ML Certificate', meta: 'Coursera', detail: 'Supervised learning, evaluation, and the usual ML workflow basics.' }
    ],
    huggingface: [
        { type: 'experience', link: '#exp-orbe360', title: 'Orbe360', meta: 'Data Scientist, 2025', detail: 'Fine-tuned in-house LLMs on financial text.' },
        { type: 'experience', link: '#exp-grazen', title: 'Grazen AI', meta: 'Data Scientist, since Oct 2025', detail: 'Vision-language fine-tuning for OCR and detection.' }
    ],
    bert: [
        { type: 'experience', link: '#exp-iqm', title: 'IQM Corporation', meta: 'Data Scientist, 2022-2023', detail: 'URL classifier with keyword APIs, running in production.' }
    ],
    rag: [
        { type: 'project', link: '#proj-youtube-qa', title: 'YouTube QA System', meta: 'Side project', detail: 'GPT-3.5 with FAISS retrieval for transcript Q&A.' }
    ],
    faiss: [
        { type: 'project', link: '#proj-youtube-qa', title: 'YouTube QA System', meta: 'Side project', detail: 'Vector search for multilingual transcript retrieval.' }
    ],
    agents: [
        { type: 'experience', link: '#exp-grazen', title: 'Grazen AI', meta: 'Data Scientist, since Oct 2025', detail: 'LLM agent workflows tied into the vision stack.' },
        { type: 'experience', link: '#exp-orbe360', title: 'Orbe360', meta: 'Data Scientist, 2025', detail: 'Agentic chatbot flows on the ORBE platform.' }
    ],
    langgraph: [
        { type: 'experience', link: '#exp-orbe360', title: 'Orbe360', meta: 'Data Scientist, 2025', detail: 'Multi-step agent graphs for the in-house financial chatbot.' }
    ],
    etl: [
        { type: 'experience', link: '#exp-orbe360', title: 'Orbe360', meta: 'Data Scientist, 2025', detail: 'Pipelines from mined sources and doc scraping into Postgres.' }
    ],
    'feature-eng': [
        { type: 'experience', link: '#exp-iqm', title: 'IQM Corporation', meta: 'Data Scientist, 2022-2023', detail: 'Cosine similarity features to map 100K-150K URL views to viewer IDs.' }
    ],
    'model-deploy': [
        { type: 'experience', link: '#exp-grazen', title: 'Grazen AI', meta: 'Data Scientist, since Oct 2025', detail: 'Shipped detection and OCR models in Dockerized SaaS.' }
    ],
    sagemaker: [
        { type: 'education', link: '#education', title: 'Google Cloud Big Data & ML', meta: 'Certification', detail: 'Cloud ML deployment coursework. Same general space as SageMaker.' }
    ],
    ocr: [
        { type: 'experience', link: '#exp-grazen', title: 'Grazen AI', meta: 'Data Scientist, since Oct 2025', detail: 'OCR pipelines paired with vision LMs for documents.' }
    ],
    'object-detection': [
        { type: 'experience', link: '#exp-grazen', title: 'Grazen AI', meta: 'Data Scientist, since Oct 2025', detail: 'Detection models from labeling through fine-tuning to deploy.' }
    ],
    tableau: [
        { type: 'experience', link: '#exp-orbe360', title: 'Orbe360', meta: 'Data Scientist, 2025', detail: 'Dashboards over Snowflake-modeled financial data.' }
    ],
    quicksight: [
        { type: 'experience', link: '#exp-iqm-intern', title: 'IQM Corporation', meta: 'Data Intern, Summer 2024', detail: 'Let non-technical users query QuickSight data without writing SQL.' }
    ],
    lstm: [
        { type: 'project', link: '#proj-molecular', title: 'Molecular Communication', meta: 'Research project', detail: '99.27% accuracy. Beat the ANN baseline by a wide margin.' }
    ],
    'llm-finetune': [
        { type: 'experience', link: '#exp-orbe360', title: 'Orbe360', meta: 'Data Scientist, 2025', detail: 'Fine-tuned domain LLMs for in-house financial use.' }
    ],
    'document-ai': [
        { type: 'experience', link: '#exp-orbe360', title: 'Orbe360', meta: 'Data Scientist, 2025', detail: 'Scraping and extracting structure from financial documents.' }
    ],
    'power-bi': [
        { type: 'experience', link: '#exp-orbe360', title: 'Orbe360', meta: 'Data Scientist, 2025', detail: 'Executive dashboards alongside the Snowflake pipelines.' }
    ],
    'deep-learning': [
        { type: 'project', link: '#proj-molecular', title: 'Molecular Communication', meta: 'Research project', detail: 'Compared ANN vs LSTM for signal prediction in a fluid medium.' },
        { type: 'education', link: '#education', title: 'DePaul University', meta: 'MS in Computer Science', detail: 'Deep learning and computer vision coursework.' }
    ],
    classification: [
        { type: 'experience', link: '#exp-iqm', title: 'IQM Corporation', meta: 'Data Scientist, 2022-2023', detail: 'BERT text classification at production throughput.' }
    ],
    embeddings: [
        { type: 'project', link: '#proj-youtube-qa', title: 'YouTube QA System', meta: 'Side project', detail: 'Embeddings plus FAISS index for transcript search.' }
    ],
    'tool-calling': [
        { type: 'project', link: '#proj-youtube-qa', title: 'YouTube QA System', meta: 'Side project', detail: 'LangChain agent that calls tools for retrieval and answers.' }
    ],
    lora: [
        { type: 'experience', link: '#exp-orbe360', title: 'Orbe360', meta: 'Data Scientist, 2025', detail: 'Parameter-efficient fine-tuning for domain LLMs.' }
    ],
    statistics: [
        { type: 'education', link: '#education', title: 'Ahmedabad University', meta: 'Bachelor in ICT', detail: 'Probabilistic modelling and statistics.' },
        { type: 'experience', link: '#exp-depaul', title: 'DePaul University', meta: 'Research Assistant, 2024', detail: 'RL work with statistical analysis on throughput.' }
    ],
    r: [
        { type: 'education', link: '#education', title: 'Ahmedabad University', meta: 'Bachelor in ICT', detail: 'Stats and analytics coursework in R.' }
    ],
    java: [
        { type: 'education', link: '#education', title: 'DePaul University', meta: 'MS in Computer Science', detail: 'Systems and OOP in Java.' }
    ]
};

const PROOF_TYPE_META = {
    experience: { icon: 'fas fa-briefcase', label: 'Experience' },
    project: { icon: 'fas fa-folder-open', label: 'Project' },
    education: { icon: 'fas fa-graduation-cap', label: 'Education' }
};

function initSkillExplorer() {
    const explorer = document.getElementById('skills-explorer');
    const tree = document.getElementById('skill-tree');
    const lines = document.getElementById('skill-lines');
    const status = document.getElementById('skill-status');
    const resetBtn = document.getElementById('skill-reset');
    const proofPanel = document.getElementById('skill-proof-panel');
    const domainNav = document.querySelector('.skills-domains');

    if (!explorer || !tree || !lines || !status || !resetBtn || !proofPanel) return;

    const state = {
        expanded: new Map(),
        activeId: null,
        path: []
    };

    const getSkill = (id) => SKILL_GRAPH[id] || null;

    const setStatus = (text, tone = 'neutral') => {
        status.textContent = text;
        status.dataset.tone = tone;
    };

    const hasProof = (id) => Boolean(SKILL_PROOF[id]?.length);

    const setActiveDomain = (rootId) => {
        if (!domainNav) return;
        domainNav.querySelectorAll('.skills-domain').forEach((btn) => {
            btn.classList.toggle('skills-domain--active', btn.dataset.root === rootId);
        });
    };

    const scrollToAnchor = (href) => {
        const target = document.querySelector(href);
        if (!target) return;
        const top = target.getBoundingClientRect().top + window.scrollY - 86;
        window.scrollTo({ top, behavior: 'smooth' });
        target.classList.remove('proof-highlight');
        void target.offsetWidth;
        target.classList.add('proof-highlight');
        setTimeout(() => target.classList.remove('proof-highlight'), 1600);
    };

    const initDomainNav = () => {
        if (!domainNav) return;
        domainNav.querySelectorAll('.skills-domain[data-root]').forEach((btn) => {
            btn.addEventListener('click', () => {
                const rootId = btn.dataset.root;
                if (!rootId || !getSkill(rootId)) return;
                renderRoots();
                const node = tree.querySelector(`.skill-node[data-skill-id="${rootId}"][data-depth="0"]`);
                if (node) handleNodeClick(rootId, node);
                setActiveDomain(rootId);
            });
        });
    };

    initDomainNav();

    const renderProofPlaceholder = () => {
        proofPanel.innerHTML = `
            <div class="skill-proof-placeholder">
                <span class="skill-proof-placeholder-icon" aria-hidden="true"><i class="fas fa-route"></i></span>
                <h3>Where did I pick this up?</h3>
                <p>Click a skill on the map. If it ties to a job, project, or class, you'll see it here.</p>
                <ul class="skill-proof-hints">
                    <li><i class="fas fa-briefcase"></i> Experience</li>
                    <li><i class="fas fa-folder-open"></i> Projects</li>
                    <li><i class="fas fa-graduation-cap"></i> Education</li>
                </ul>
            </div>
        `;
    };

    const renderProofPanel = (id) => {
        const skill = getSkill(id);
        if (!skill) return;

        if (!skill.owned) {
            proofPanel.innerHTML = `
                <div class="skill-proof-content">
                    <div class="skill-proof-header">
                        <span class="skill-proof-header-icon skill-proof-header-icon--dead"><i class="${skill.icon}" aria-hidden="true"></i></span>
                        <div class="skill-proof-header-text">
                            <h3>${skill.label}</h3>
                            <p>Haven't used this one in production.</p>
                            <span class="skill-proof-tag skill-proof-tag--dead"><i class="fas fa-ban"></i> Not in my stack</span>
                        </div>
                    </div>
                    <p class="skill-proof-empty">It's on the map because it's related to things I do use. Just not something I'd put on a resume.</p>
                    ${renderPathTrail()}
                </div>
            `;
            bindProofLinks();
            return;
        }

        const proofs = SKILL_PROOF[id] || [];
        const cardsHtml = proofs.length
            ? proofs.map((proof) => {
                const meta = PROOF_TYPE_META[proof.type] || PROOF_TYPE_META.experience;
                return `
                    <a class="skill-proof-card" href="${proof.link}">
                        <span class="skill-proof-card-type"><i class="${meta.icon}"></i> ${meta.label}</span>
                        <h4>${proof.title}</h4>
                        <p class="skill-proof-card-meta">${proof.meta}</p>
                        <p>${proof.detail}</p>
                        <span class="skill-proof-card-link">Go to source <i class="fas fa-arrow-right"></i></span>
                    </a>
                `;
            }).join('')
            : `<p class="skill-proof-empty">Shows up across a few roles. Click around the map to find a specific example.</p>`;

        proofPanel.innerHTML = `
            <div class="skill-proof-content">
                <div class="skill-proof-header">
                    <span class="skill-proof-header-icon"><i class="${skill.icon}" aria-hidden="true"></i></span>
                    <div class="skill-proof-header-text">
                        <h3>${skill.label}</h3>
                        <p>${proofs.length ? 'Here is where I have actually used it.' : 'Part of my regular toolkit.'}</p>
                        <span class="skill-proof-tag skill-proof-tag--owned"><i class="fas fa-check"></i> I use this</span>
                    </div>
                </div>
                ${proofs.length ? '<p class="skill-proof-section-label">Where I picked it up</p>' : ''}
                <div class="skill-proof-cards">${cardsHtml}</div>
                ${renderPathTrail()}
            </div>
        `;
        bindProofLinks();
    };

    const scrollProofIntoView = () => {
        if (window.matchMedia('(max-width: 920px)').matches) {
            proofPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    };

    const renderPathTrail = () => {
        if (state.path.length < 2) return '';
        const crumbs = state.path.map((id) => getSkill(id)?.label || id);
        return `
            <div class="skill-proof-path">
                <p class="skill-proof-path-label">Path so far</p>
                <div class="skill-proof-path-trail">
                    ${crumbs.map((label, i) => `${i > 0 ? '<i class="fas fa-chevron-right"></i>' : ''}<span>${label}</span>`).join('')}
                </div>
            </div>
        `;
    };

    const bindProofLinks = () => {
        proofPanel.querySelectorAll('.skill-proof-card').forEach((link) => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                scrollToAnchor(link.getAttribute('href'));
            });
        });
    };

    const createNode = (id, depth) => {
        const skill = getSkill(id);
        if (!skill) return null;

        const node = document.createElement('button');
        node.type = 'button';
        node.className = 'skill-node';
        node.dataset.skillId = id;
        node.dataset.depth = String(depth);
        node.dataset.owned = skill.owned ? 'true' : 'false';
        node.setAttribute('aria-expanded', 'false');

        if (skill.owned) {
            node.classList.add('skill-node--owned');
            if (hasProof(id)) node.classList.add('skill-node--proven');
        } else {
            node.classList.add('skill-node--dead');
        }

        node.innerHTML = `
            <span class="skill-node-icon"><i class="${skill.icon}" aria-hidden="true"></i></span>
            <span class="skill-node-label">${skill.label}</span>
            ${skill.owned ? '<span class="skill-node-badge">+</span>' : '<span class="skill-node-badge skill-node-badge--dead"><i class="fas fa-ban" aria-hidden="true"></i></span>'}
        `;

        node.addEventListener('click', () => handleNodeClick(id, node));
        return node;
    };

    const renderLevel = (parentId, childIds, depth) => {
        const level = document.createElement('div');
        level.className = 'skill-level';
        level.dataset.depth = String(depth);
        if (parentId) level.dataset.parent = parentId;

        childIds.forEach((childId) => {
            const node = createNode(childId, depth);
            if (node) level.appendChild(node);
        });

        return level;
    };

    const renderRoots = () => {
        tree.innerHTML = '';
        state.expanded.clear();
        state.activeId = null;
        state.path = [];
        resetBtn.hidden = true;

        const roots = renderLevel(null, SKILL_ROOTS, 0);
        tree.appendChild(roots);
        setStatus('Click a skill to start. Work details show up on the right.');
        renderProofPlaceholder();
        setActiveDomain(null);
        requestAnimationFrame(drawLines);
    };

    const collapseAfter = (depth) => {
        tree.querySelectorAll('.skill-level').forEach((level) => {
            if (Number(level.dataset.depth) > depth) level.remove();
        });

        state.expanded.forEach((_, key) => {
            const [, keyDepth] = key.split(':');
            if (Number(keyDepth) >= depth) state.expanded.delete(key);
        });

        tree.querySelectorAll('.skill-node').forEach((node) => {
            if (Number(node.dataset.depth) >= depth) {
                node.classList.remove('skill-node--active', 'skill-node--expanded');
                node.setAttribute('aria-expanded', 'false');
            }
        });
    };

    const handleNodeClick = (id, nodeEl) => {
        const skill = getSkill(id);
        if (!skill) return;

        const depth = Number(nodeEl.dataset.depth);
        state.activeId = id;
        state.path = state.path.slice(0, depth);
        state.path.push(id);

        tree.querySelectorAll('.skill-node').forEach((n) => n.classList.remove('skill-node--active'));
        nodeEl.classList.add('skill-node--active');
        resetBtn.hidden = false;
        renderProofPanel(id);
        if (state.path[0]) setActiveDomain(state.path[0]);
        scrollProofIntoView();

        if (!skill.owned) {
            nodeEl.classList.add('skill-node--shake');
            setTimeout(() => nodeEl.classList.remove('skill-node--shake'), 520);
            setStatus(`${skill.label}: haven't used this one.`, 'dead');
            collapseAfter(depth + 1);
            requestAnimationFrame(drawLines);
            return;
        }

        const expandKey = `${id}:${depth}`;
        const isExpanded = state.expanded.get(expandKey);

        if (isExpanded) {
            nodeEl.classList.remove('skill-node--expanded');
            nodeEl.setAttribute('aria-expanded', 'false');
            state.expanded.delete(expandKey);
            collapseAfter(depth + 1);
            setStatus(`Closed ${skill.label}.`, 'neutral');
            renderProofPanel(id);
        } else {
            collapseAfter(depth + 1);
            state.expanded.set(expandKey, true);
            nodeEl.classList.add('skill-node--expanded');
            nodeEl.setAttribute('aria-expanded', 'true');

            const children = (skill.children || []).slice(0, 3);
            if (children.length) {
                const childLevel = renderLevel(id, children, depth + 1);
                tree.appendChild(childLevel);
                setStatus(`Next: ${children.map((c) => getSkill(c)?.label).filter(Boolean).join(', ')}`, 'branch');
            } else {
                setStatus(`That is as far as ${skill.label} goes.`, 'leaf');
            }
        }

        requestAnimationFrame(drawLines);
    };

    const drawLines = () => {
        const rect = explorer.getBoundingClientRect();
        lines.setAttribute('width', String(explorer.clientWidth));
        lines.setAttribute('height', String(explorer.scrollHeight));
        lines.innerHTML = '';

        tree.querySelectorAll('.skill-level[data-parent]').forEach((level) => {
            const parentId = level.dataset.parent;
            const parentNode = tree.querySelector(`.skill-node[data-skill-id="${parentId}"][data-depth="${Number(level.dataset.depth) - 1}"]`);
            if (!parentNode) return;

            level.querySelectorAll('.skill-node').forEach((childNode) => {
                const p = centerPoint(parentNode, rect);
                const c = centerPoint(childNode, rect);
                const owned = childNode.dataset.owned === 'true';
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                const midY = (p.y + c.y) / 2;
                path.setAttribute('d', `M ${p.x} ${p.y} C ${p.x} ${midY}, ${c.x} ${midY}, ${c.x} ${c.y}`);
                path.setAttribute('class', owned ? 'skill-line skill-line--live' : 'skill-line skill-line--dead');
                lines.appendChild(path);
            });
        });
    };

    const centerPoint = (el, explorerRect) => {
        const r = el.getBoundingClientRect();
        return {
            x: r.left + r.width / 2 - explorerRect.left,
            y: r.top + r.height / 2 - explorerRect.top + explorer.scrollTop
        };
    };

    resetBtn.addEventListener('click', renderRoots);
    window.addEventListener('resize', () => requestAnimationFrame(drawLines));

    renderRoots();
}

function initCertificateModal() {
    const modal = document.getElementById('cert-modal');
    const image = document.getElementById('cert-modal-image');
    const title = document.getElementById('cert-modal-title');
    const sourceLine = document.getElementById('cert-modal-source-line');
    const sourceLink = document.getElementById('cert-modal-source');
    const closeBtn = document.getElementById('cert-modal-close');
    const closeBackdrop = document.querySelector('[data-close-cert-modal]');

    if (!modal || !image || !title || !sourceLine || !sourceLink || !closeBtn || !closeBackdrop) {
        return;
    }

    const openModal = (card) => {
        const src = card.dataset.certImage;
        const certTitle = card.dataset.certTitle || 'Certificate';
        const source = card.dataset.certSource || '';

        image.src = src;
        image.alt = certTitle;
        title.textContent = certTitle;

        if (source) {
            sourceLine.classList.remove('no-source');
            sourceLink.href = source;
            sourceLink.textContent = source;
        } else {
            sourceLine.classList.add('no-source');
            sourceLink.href = '#';
            sourceLink.textContent = '';
        }

        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    document.addEventListener('click', (event) => {
        const card = event.target.closest('.cert-card[data-cert-image]');
        if (!card) return;
        event.preventDefault();
        openModal(card);
    });

    closeBtn.addEventListener('click', closeModal);
    closeBackdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('is-open')) {
            closeModal();
        }
    });
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    const message = document.getElementById('form-message');
    if (!form || !message) return;

    const scriptURL = 'https://script.google.com/macros/s/AKfycbyKCv-36sYD4WW4MP3TCCuD6XFLLmopY_Sy5MdyNy-qCyuRi8ZVhIYCT-NJqRHK3tbpHQ/exec';

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const button = form.querySelector('button[type="submit"]');
        if (!button) return;

        const originalLabel = button.textContent;
        button.disabled = true;
        button.textContent = 'Sending...';

        try {
            const response = await fetch(scriptURL, {
                method: 'POST',
                body: new FormData(form)
            });

            if (!response.ok) throw new Error('Submission failed');

            form.reset();
            showMessage('Message sent successfully. Thank you for reaching out.', 'success');
        } catch (error) {
            showMessage('Could not send message right now. Please try again.', 'error');
        } finally {
            button.disabled = false;
            button.textContent = originalLabel;
        }
    });

    function showMessage(text, type) {
        message.textContent = text;
        message.className = `message ${type}`;
        setTimeout(() => {
            message.textContent = '';
            message.className = '';
        }, 5000);
    }
}