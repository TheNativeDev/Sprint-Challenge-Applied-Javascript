// STEP 3: Create Article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-backend.herokuapp.com/articles
// Stduy the response data you get back, closely.
// You will be creating a component for each 'article' in the list.
// This won't be as easy as just iterating over an array though.
// Create a function that will programmatically create the following DOM component:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {authors name}</span>
//   </div>
// </div>
//
// Create a card for each of the articles and add the card to the DOM.

const cardsContainer = document.querySelector(".cards-container");

axios
  .get("https://lambda-times-backend.herokuapp.com/articles")
  .then(res => {
    Object.keys(res.data.articles)
      .sort()
      .forEach(key =>
        res.data.articles[key].forEach(article =>
          cardsContainer.append(Card(article, key))
        )
      );
  })
  .catch(err => console.error(err));

function Card(data, key) {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  cardDiv.dataset.topic = key;

  const headlineDiv = document.createElement("div");
  headlineDiv.classList.add("headline");
  headlineDiv.textContent = data.headline;

  const authorDiv = document.createElement("div");
  authorDiv.classList.add("author");

  const imgDiv = document.createElement("div");
  imgDiv.classList.add("img-container");

  const authorImg = document.createElement("img");
  authorImg.src = data.authorPhoto;

  const authorSpan = document.createElement("span");
  authorSpan.textContent = `By ${data.authorName}`;

  cardDiv.append(headlineDiv, authorDiv);
  authorDiv.append(imgDiv, authorSpan);
  imgDiv.append(authorImg);

  return cardDiv;
}