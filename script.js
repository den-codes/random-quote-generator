const quote = document.getElementById('text');
const author = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const twitterBtn = document.getElementById('tweet-quote');
const quoteContainer= document.getElementById('quote-container');
const loader = document.getElementById('loader');

let apiQuotes = [];

function loading(){
    //Hide container whle it's loading
    quoteContainer.classList.add('hide-loader')
}
function complete(){
    quoteContainer.classList.remove('hide-loader')
    loader.classList.add('hide-loader')
}
function newQuote() {
    //load first
    loading()
    const getQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]; 
    //if there isn't author return unknown
    if (!getQuote.author) {
        author.textContent = 'Unknown'
    } else {
    author.textContent = getQuote.author
    }
//if quote is too long, apply smaller font size
    if (quote.textContent.length > 80 ){
        quote.classList.add('long-text')
        author.classList.add('author-long-text')
    } else {
        quote.classList.remove('long-text')
        author.classList.remove('author-long-text')
    } 
    quote.textContent = getQuote.text
    complete()
} 
//Fetch Data
 async function getQuotes(){
     //load first
    loading()
     try {
         const res = await fetch('https://type.fit/api/quotes')
            apiQuotes = await res.json();
            newQuote()
     } catch(error){
         alert(error)
     }
    }

function tweetQuote() {
    //Tweet eb intent url
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quote.innerText} - ${author.innerText}`;
    //Open in a ne tab 
    window.open(tweetUrl, '_blank');
}

newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote);
getQuotes()