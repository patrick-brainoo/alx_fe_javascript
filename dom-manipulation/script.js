document.addEventListener('DOMContentLoaded', () => {

  const quotes = [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Success is not final, failure is not fatal.", category: "Success" }
  ];

  const quoteDisplay = document.getElementById('quoteDisplay');
  const newQuoteBtn = document.getElementById('newQuote');
  const addQuoteContainer = document.getElementById('addQuoteContainer');

  // Function to display a random quote using innerHTML
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    quoteDisplay.innerHTML = `
      <p>"${quote.text}"</p>
      <small>— ${quote.category}</small>
    `;
  }

  // Function to dynamically create the add quote form
  function createAddQuoteForm() {
    const form = document.createElement('div');

    const textInput = document.createElement('input');
    textInput.id = 'newQuoteText';
    textInput.type = 'text';
    textInput.placeholder = 'Enter a new quote';

    const categoryInput = document.createElement('input');
    categoryInput.id = 'newQuoteCategory';
    categoryInput.type = 'text';
    categoryInput.placeholder = 'Enter quote category';

    const addBtn = document.createElement('button');
    addBtn.id = 'addQuoteBtn';
    addBtn.textContent = 'Add Quote';

    // Append inputs and button to form
    form.appendChild(textInput);
    form.appendChild(categoryInput);
    form.appendChild(addBtn);

    // Append form to container
    addQuoteContainer.appendChild(form);

    // Add event listener for the button
    addBtn.addEventListener('click', addQuote);
  }

  // Function to add a new quote
  function addQuote() {
    const textInput = document.getElementById('newQuoteText');
    const categoryInput = document.getElementById('newQuoteCategory');

    const quoteText = textInput.value.trim();
    const quoteCategory = categoryInput.value.trim();

    if (!quoteText || !quoteCategory) {
      alert('Please enter both quote and category.');
      return;
    }

    quotes.push({ text: quoteText, category: quoteCategory });

    textInput.value = '';
    categoryInput.value = '';

    showRandomQuote();
  }

  // Initialize
  showRandomQuote();        // Show first quote on page load
  createAddQuoteForm();     // Dynamically create the add-quote form

  newQuoteBtn.addEventListener('click', showRandomQuote);

});
