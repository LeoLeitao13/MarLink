document.getElementById('newsForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var title = document.getElementById('title').value;
    var description = document.getElementById('description').value;
    var link = document.getElementById('link').value;
    var imageInput = document.getElementById('image');
    var image = imageInput.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
        var newsItem = {
            title: title,
            description: description,
            link: link,
            image: image ? e.target.result : null
        };

        var editIndex = imageInput.getAttribute('data-edit-index');
        if (editIndex !== null) {
            updateNewsItem(newsItem, editIndex);
        } else {
            saveNewsItem(newsItem);
            addNewsItem(newsItem);
        }
    };

    if (image) {
        reader.readAsDataURL(image);
    } else {
        reader.onload();
    }
});

function saveNewsItem(newsItem) {
    var newsList = JSON.parse(localStorage.getItem('newsList')) || [];
    newsList.push(newsItem);
    localStorage.setItem('newsList', JSON.stringify(newsList));
}

function addNewsItem(newsItem, index) {
    var newsListDiv = document.getElementById('newsList');
    var newsDiv = document.createElement('div');
    newsDiv.className = 'not1';
    newsDiv.dataset.index = index;

    newsDiv.innerHTML = `
        <img src="${newsItem.image}" alt="${newsItem.title}" class="news-img">
        <div class="txt01">
            <h2>${newsItem.title}</h2>
            <p>${newsItem.description}</p>
            <a href="${newsItem.link}" target="_blank"><button>Saiba mais</button></a>
        </div>
        <div class="news-actions">
            <button onclick="editNewsItem(${index})">Editar</button>
            <button onclick="deleteNewsItem(${index})">Excluir</button>
        </div>
    `;

    if (typeof index === 'number') {
        var existingDiv = document.querySelector(`div[data-index='${index}']`);
        newsListDiv.replaceChild(newsDiv, existingDiv);
    } else {
        newsListDiv.appendChild(newsDiv);
    }
}

function editNewsItem(index) {
    var newsList = JSON.parse(localStorage.getItem('newsList'));
    var newsItem = newsList[index];

    document.getElementById('title').value = newsItem.title;
    document.getElementById('description').value = newsItem.description;
    document.getElementById('link').value = newsItem.link;
    document.getElementById('image').setAttribute('data-edit-index', index);
}

function updateNewsItem(newsItem, index) {
    var newsList = JSON.parse(localStorage.getItem('newsList'));
    newsList[index] = newsItem;
    localStorage.setItem('newsList', JSON.stringify(newsList));
    addNewsItem(newsItem, index);

    document.getElementById('newsForm').reset();
    document.getElementById('image').removeAttribute('data-edit-index');
}

function deleteNewsItem(index) {
    var newsList = JSON.parse(localStorage.getItem('newsList'));
    newsList.splice(index, 1);
    localStorage.setItem('newsList', JSON.stringify(newsList));

    var newsDiv = document.querySelector(`div[data-index='${index}']`);
    newsDiv.remove();
}

window.onload = function() {
    var newsList = JSON.parse(localStorage.getItem('newsList')) || [];
    newsList.forEach((newsItem, index) => addNewsItem(newsItem, index));
}
