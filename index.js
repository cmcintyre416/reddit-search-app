import reddit from './redditApi';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', e => {
    //we need to get the search term
    const searchTerm = searchInput.value;
    // we need to get the sort
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;
    //we need to get the limit
    const searchLimit = document.getElementById('limit').value;

    //see if anything is checked
    if(searchTerm === ''){
        showMessage('Please Make Sure You Added Search Term', 'alert-danger');
    }

    searchInput.value = '';

    reddit.search(searchTerm, searchLimit, sortBy).then(results => {
        let output = '<div class="card-columns">';
        results.forEach(post => {
            const image = post.preview ? post.preview.images[0].source.url : 'https://vignette.wikia.nocookie.net/roosterteeth/images/1/10/Reddit.png/revision/latest?cb=20171218051745';
            output += `
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="${image}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${makeTextSmaller(post.selftext, 100)}</p>
                    <a href="${post.url}" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
            `;
        });
        output += '</div>';
        document.getElementById('results').innerHTML = output;
    });

    e.preventDefault();
});

//The function we need to create for the show message
function showMessage(message, className) {

    const div = document.createElement('div');

    div.className = `alert ${className}`;

    div.appendChild(document.createTextNode(message));

    const searchContainer = document.getElementById('search-container');

    const search = document.getElementById('search');

    //call insert before to insert before seatch element
    searchContainer.insertBefore(div, search);

    //need to timeout alert
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

function makeTextSmaller(text, limit) {
    const shortText = text.indexOf(' ', limit);

    if (shortText == -1) return text;

    return text.substring(0, shortText);
}