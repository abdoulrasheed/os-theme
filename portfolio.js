const disciplines = [{"name": "Systems", "code": "01", "stack": "Python / Rust / C / PostgreSQL", "title": "The parts everything depends on.", "text": "Backend architecture, services, and the infrastructure that keeps them running. From network access control at Isofy to the core services and AWS infrastructure at MyHives.", "projects": ["MyHives", "Isofy", "Zarttech"]}, {"name": "Intelligence", "code": "02", "stack": "Ray / PySpark / LLM finetuning", "title": "From models to working software.", "text": "Distributed computation, model finetuning, and tools for developers. At FoundryAI, I worked on the Agent Web Engine and its Python package, including LinkedIn and Salesforce integrations.", "projects": ["FoundryAI", "Agent Web Engine", "Python tooling"]}, {"name": "Robotics", "code": "03", "stack": "ROS 2 / MuJoCo / Webots / VLA", "title": "Software meets the physical world.", "text": "My practice extends into robot simulation, ROS 2, and vision language action models. A place to bring systems engineering, machine learning, and physical behaviour together.", "projects": ["Simulation", "Robot middleware", "Vision language action"]}, {"name": "Products", "code": "04", "stack": "React / React Native / TypeScript", "title": "The part people actually touch.", "text": "Web and mobile applications backed by carefully designed services. I have built bidding platforms, mobile identity verification, and real time communication systems.", "projects": ["Carilo", "KYC mobile", "WebRTC"]}];
const nodes = [...document.querySelectorAll('.node')];
const detail = document.querySelector('.discipline-detail');
nodes.forEach((node, index) => node.addEventListener('click', () => {
  nodes.forEach((button, i) => {
    button.classList.toggle('selected', i === index);
    button.setAttribute('aria-pressed', String(i === index));
  });
  const item = disciplines[index];
  detail.querySelector('.eyebrow').textContent = `${item.code} / ${item.name}`;
  detail.querySelector('h2').textContent = item.title;
  detail.querySelector('p').textContent = item.text;
  detail.querySelector('.stack').textContent = item.stack;
  detail.querySelector('.related').replaceChildren(...item.projects.map(name => {
    const span = document.createElement('span'); span.textContent = name; return span;
  }));
}));
document.querySelectorAll('.work-trigger').forEach(button => button.addEventListener('click', () => {
  const open = button.getAttribute('aria-expanded') !== 'true';
  document.querySelectorAll('.work-trigger').forEach(trigger => {
    const expanded = trigger === button && open;
    trigger.setAttribute('aria-expanded', String(expanded));
    document.getElementById(trigger.getAttribute('aria-controls')).hidden = !expanded;
    trigger.closest('article').classList.toggle('is-open', expanded);
    trigger.querySelector('.expand-icon').textContent = expanded ? '−' : '+';
  });
}));
