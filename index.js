const baseEndpoint = 'https://www.googleapis.com/books/v1/volumes';
const ul = document.querySelector('ul');
const form = document.querySelector('form ');
const queryValue = document.querySelector('form input');
const results = document.querySelector('.results');
const loader = document.querySelector('.loader');

const handleSubmit = (e) =>{
    e.preventDefault();
    try {
        displayBooks(queryValue.value);
    } catch(er){
        console.log(er)
    }
}



const findBook = async (query) => {
    // turn loader on
  loader.classList.remove('hide');
  results.classList.add('hide');
    const res = await fetch(`${baseEndpoint}?q=${query}`);
    const data = await res.json();
    loader.classList.add('hide');
    results.classList.remove('hide');
    return data.items
}




const displayBooks = async (query) => {
    const x = await findBook(query);
  
    const html = x.map(item =>
        `<li> 
            <a href="${item.volumeInfo.previewLink}">
            ${item.volumeInfo.imageLinks? `<img src="${item.volumeInfo.imageLinks.smallThumbnail}" alt="${item.volumeInfo.title}">` : `<div class="filler"></div>`}</a>
            <h4>${item.volumeInfo.title}</h4>
            ${item.volumeInfo.subtitle? ` <h5>${item.volumeInfo.subtitle}</h5>`: ''}
            ${item.volumeInfo.authors ? `<p>By: ${item.volumeInfo.authors}</p>` : '' }
            <p>Published: ${item.volumeInfo.publishedDate}</p>
        </li>`
    );

  
    ul.innerHTML = html.join('')
    
}

form.addEventListener('submit', handleSubmit);