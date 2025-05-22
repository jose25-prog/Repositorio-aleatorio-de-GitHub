const searchBtn = document.getElementById("searchBtn");
const refreshBtn = document.getElementById("refreshBtn");
const repoInfo = document.getElementById("repoInfo");
const status = document.getElementById("status");
const languageSelect = document.getElementById("language");

async function fetchRandomRepo(language) {
  try {
    repoInfo.innerHTML = "";
    status.textContent = "Cargando...";
    refreshBtn.style.display = "none";

    const query = `language:${language}`;
    const response = await fetch(`https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&per_page=100`);

    if (!response.ok) throw new Error("Error al obtener los datos");

    const data = await response.json();

    if (data.total_count === 0) {
      status.textContent = "No se encontraron repositorios.";
      return;
    }

    const randomIndex = Math.floor(Math.random() * data.items.length);
    const repo = data.items[randomIndex];

    renderRepo(repo);
    status.textContent = "";
    refreshBtn.style.display = "inline-block";
  } catch (error) {
    console.error(error);
    status.textContent = "Ocurrió un error. Inténtalo nuevamente.";
  }
}

function renderRepo(repo) {
  repoInfo.innerHTML = `
    <h2><a href="${repo.html_url}" target="_blank">${repo.full_name}</a></h2>
    <p>${repo.description || "Sin descripción disponible"}</p>
    <ul>
      <li><strong>⭐ Estrellas:</strong> ${repo.stargazers_count}</li>
      <li><strong>🍴 Bifurcaciones:</strong> ${repo.forks_count}</li>
      <li><strong>🐞 Issues abiertas:</strong> ${repo.open_issues_count}</li>
    </ul>
  `;
}

searchBtn.addEventListener("click", () => {
  const language = languageSelect.value;
  if (!language) {
    status.textContent = "Por favor selecciona un lenguaje.";
    return;
  }
  fetchRandomRepo(language);
});

refreshBtn.addEventListener("click", () => {
  const language = languageSelect.value;
  fetchRandomRepo(language);
});
