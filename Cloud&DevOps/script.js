const projects = {
  cicd: {
    title: 'CI/CD Automation Pipeline', subtitle: 'Hands-on implementation',
    text: 'Hands-on CI/CD and GitOps implementations covering AWS-native pipelines and Jenkins-based automation. The work represents technologies I configured and practiced, including Jenkins, Docker, SonarQube, ArgoCD and Kubernetes workflows.',
    steps: ['Git Push','CI Trigger','Build','Test','Containerize','Deploy'],
    tags: ['Jenkins','ArgoCD','Docker','SonarQube','AWS','Kubernetes'],
    links: [
      ['GitHub Implementation','https://github.com/Husnain-Nadeem/aws-devops-zero-to-hero/tree/main/day-14'],
      ['AWS CodePipeline Project','https://www.linkedin.com/posts/husnain-nadeem-81046a287_aws-cicd-codepipeline-activity-7487470553570656258-ecq6'],
      ['Jenkins + ArgoCD Project','https://www.linkedin.com/posts/husnain-nadeem-81046a287_cicd-jenkins-argocd-activity-7484883892894851072-b9kB']
    ]
  },
  terraform: {
    title: 'Infrastructure as Code', subtitle: 'CloudFormation • Terraform learning',
    text: 'Hands-on Infrastructure as Code work using AWS CloudFormation YAML templates to provision cloud resources, with Terraform as an expanding part of my infrastructure engineering journey.',
    steps: ['Write IaC','Validate','Plan','Provision','Audit'], tags: ['CloudFormation','YAML','AWS','Terraform'],
    links: [['CloudFormation Project','https://www.linkedin.com/posts/husnain-nadeem-81046a287_aws-cloudformation-iac-activity-7480590100247146497-h9Sj']]
  },
  kubernetes: {
    title: 'Kubernetes & Amazon EKS Deployment', subtitle: 'Hands-on implementation',
    text: 'Hands-on Kubernetes and Amazon EKS work covering application deployment, manifests, services, ingress, Helm and cloud-native orchestration.',
    steps: ['Container','Manifest','Deploy','Service','Ingress','EKS'], tags: ['Kubernetes','EKS','Helm','Ingress','ArgoCD'],
    links: [['GitHub Implementation','https://github.com/Husnain-Nadeem/aws-devops-zero-to-hero/tree/main/day-22']]
  },
  docker: {
    title: 'Containerized Applications', subtitle: 'Hands-on container workflows',
    text: 'Container workflows focused on packaging applications consistently across environments and preparing them for automated delivery pipelines.',
    steps: ['Source','Dockerfile','Build Image','Registry','Run Container'], tags: ['Docker','Linux','Containers','CI/CD'], links: []
  },
  iot: {
    title: 'Smart IoT Automation', subtitle: 'Academic project',
    text: 'An end-to-end smart home automation project using ESP32 hardware, sensors, relays and MQTT communication for monitoring and automation.',
    steps: ['Sensors','ESP32','MQTT','Automation','Dashboard'], tags: ['ESP32','MQTT','IoT','Sensors'],
    links: [['GitHub Repository','https://github.com/Husnain-Nadeem/Embedded-IOT-Fall-2025-/tree/main/Final-Project']]
  }
};

const modal = document.getElementById('projectModal');
const modalContent = document.getElementById('modalContent');
const closeModal = () => modal.classList.remove('show');

document.querySelectorAll('.project-card[data-project]').forEach(card => {
  card.addEventListener('click', () => {
    const p = projects[card.dataset.project];
    const steps = p.steps.map((s,i)=>`<div class="pipeline-step"><b>${String(i+1).padStart(2,'0')}</b><span>${s}</span></div>`).join('<div class="pipeline-arrow">↓</div>');
    const tags = p.tags.map(t=>`<span>${t}</span>`).join('');
    const links = p.links.length ? `<div class="project-links"><small>PROJECT LINKS</small>${p.links.map(([label,url])=>`<a href="${url}" target="_blank" rel="noopener noreferrer">${label} <span>↗</span></a>`).join('')}</div>` : '';
    modalContent.innerHTML = `<p class="eyebrow">// PROJECT INSPECTOR</p><h3>${p.title}</h3><div class="modal-subtitle">${p.subtitle}</div><p>${p.text}</p><div class="pipeline-flow">${steps}</div><div class="modal-tags">${tags}</div>${links}`;
    modal.classList.add('show');
  });
});
document.querySelector('.close-modal').addEventListener('click', closeModal);
document.querySelector('.modal-backdrop').addEventListener('click', closeModal);
document.addEventListener('keydown', e=>{if(e.key==='Escape') closeModal();});
