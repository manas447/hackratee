const API_URL = "http://localhost:5000";

async function fetchProjects() {
  const res = await fetch(${API_URL}/projects);
  const projects = await res.json();
  const container = document.getElementById("projectsList");
  container.innerHTML = "";

  projects.forEach((p) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <button onclick="rateProject('${p.id}')">Rate</button>
      <ul>
        ${p.ratings.map(r => <li>⭐ ${r.score}/5 - ${r.pros} | ${r.cons}</li>).join("")}
      </ul>
    `;
    container.appendChild(div);
  });
}

async function addProject() {
  const name = document.getElementById("projectName").value;
  const description = document.getElementById("projectDesc").value;

  await fetch(${API_URL}/projects, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description })
  });

  fetchProjects();
}

async function rateProject(id) {
  const pros = prompt("Enter Pros:");
  const cons = prompt("Enter Cons:");
  const score = prompt("Rate out of 5:");

  await fetch(${API_URL}/projects/${id}/rate, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pros, cons, score })
  });

  fetchProjects();
}

fetchProjects();
