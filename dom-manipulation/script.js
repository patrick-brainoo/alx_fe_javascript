document.addEventListener('DOMContentLoaded', () => {

  // Retrieve quotes from local storage or use default
  let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Success is not final, failure is not fatal.", category: "Success" }
  ];

  const quoteDisplay = document.getElementById('quoteDisplay');
  const newQuoteBtn = document.getElementById('newQuote');
  const addQuoteContainer = document.getElementById('addQuoteContainer');
  const exportBtn = document.getElementById('exportBtn');
  const importFileInput = document.getElementById('importFile');

  // Function to save quotes to local storage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }

  // Function to show a random quote using innerHTML
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    quoteDisplay.innerHTML = `<p>"${quote.text}"</p><small>— ${quote.category}</small>`;

    // Optional: save last viewed quote in session storage
    sessionStorage.setItem('lastQuote', JSON.stringify(quote));
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

    form.appendChild(textInput);
    form.appendChild(categoryInput);
    form.appendChild(addBtn);

    addQuoteContainer.appendChild(form);

    addBtn.addEventListener('click', addQuote);
  }

  // Function to add a new quote dynamically
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
    saveQuotes(); // Save to local storage

    textInput.value = '';
    categoryInput.value = '';

    showRandomQuote();
  }

  // Function to export quotes as JSON file
  function exportQuotesToJson() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  // Function to import quotes from JSON file
  function importFromJsonFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const importedQuotes = JSON.parse(e.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
      } catch (err) {
        alert('Invalid JSON file.');
      }
    };
    reader.readAsText(file);
  }

  // Initialize
  showRandomQuote();
  createAddQuoteForm();

  // Event listeners
  newQuoteBtn.addEventListener('click', showRandomQuote);
  exportBtn.addEventListener('click', exportQuotesToJson);
  importFileInput.addEventListener('change', importFromJsonFile);

});

