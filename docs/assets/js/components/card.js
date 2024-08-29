const createOptionMarkup = (options) =>
    options.map(option => (
        `<div class="card-data-item">
            <input readonly class="card-data-value" value="${option.value}" />
            <p class="card-data-description">${option.description}</p>
        </div>`
    )
).join('');

const createCardMarkup = ({ title, description, example, documentation, options }) => (
    `<div class="card">
        <h2 class="card-title">${title}</h2>
        <p class="card-description">${description}</p>
        <div class="input-container">
            <input readonly type="text" value="${example}">
            <button id="copy-button" onclick="copyText()">
                <i class="fa-solid fa-copy"></i> Copier
            </button>
        </div>
        ${options ? `<div class="card-data">
            <h4 class="card-data-options">Options :</h4>
            ${createOptionMarkup(options)}
        </div>` : ''}
        <div class="card-btns">
            <a class="doc-button" title="Voir la documentation" href="${documentation}" target="_blank">
                <i class="fa-solid fa-book"></i> Voir la documentation
            </a>
        </div>
    </div>`
);

const cardContainer = (data) => (
    `<div class="card-container">
        ${data.map(createCardMarkup).join('')}
    </div>`
);