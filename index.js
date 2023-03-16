const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const searchResults = document.getElementById('search-results');

const baseUrl = 'https://api.github.com/search/repositories';

const searchRepositories = (e) => {
  e.preventDefault();

  const inputValue = searchInput.value.trim();

  if (inputValue.length < 2) {
    searchResults.innerHTML =
      '<p>Поисковый запрос должен содержать больше одного символа.</p>';

    return;
  }

  searchResults.innerHTML = '<p>Поиск...</p>';

  fetch(`${baseUrl}?q=${inputValue}&per_page=10`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    })
    .then((data) => {
      if (data.items.length === 0) {
        searchResults.innerHTML = '<p>Ничего не найдено.</p>';
        return;
      }

      searchResults.innerHTML = '';
      const repolist = document.createElement('ul');

      data.items.forEach((item) => {
        const repoListItem = `
          <li class="repo-list-item">
            <h2 class="repo-title">            
              <a href="${item.html_url}" target="_blank">${item.name}</a>
            </h2>
            ${
              item.description
                ? `<div class="repo-description">
                    <h3 class="repo-description-title">описание:</h3>
                    <p class="repo-description-text">${item.description}</p>
                  </div>`
                : ''
            }              
            ${
              item.language
                ? `<div class="repo-language">
                    <h3 class="repo-language-title">язык/технология:</h3>
                    <p class="repo-language-text">${item.language}</p>
                  </div>`
                : ''
            }      
          </li>`;

        repolist.innerHTML += repoListItem;
      });

      searchResults.appendChild(repolist);
    })
    .catch((error) => {
      searchResults.innerHTML = `
        <p>Произошла ошибка: ${error}.</p>
        <p>Проверьте подключение и попробуйте ещё раз.</p>`;

      console.error('Произошла ошибка:', error);
    });
};

searchBtn.addEventListener('click', searchRepositories);
