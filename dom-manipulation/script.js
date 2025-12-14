document.addEventListener('DOMContentLoaded', () => {

  // Load quotes from local storage or use default
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
  const categoryFilter = document.getElementById('categoryFilter');

  // Save quotes to local storage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }

  // Show a random quote (filtered)
  function showRandomQuote() {
    let filteredQuotes = quotes;
    const selectedCategory = categoryFilter.value;
    if (selectedCategory !== "all") {
      filteredQuotes = quotes.filter(q => q.category === selectedCategory);
    }
    if (filteredQuotes.length === 0) {
      quoteDisplay.innerHTML = "<p>No quotes in this category yet.</p>";
      return;
    }

    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];
    quoteDisplay.innerHTML = `<p>"${quote.text}"</p><small>— ${quote.category}</small>`;

    // Optional session storage for last quote
    sessionStorage.setItem('lastQuote', JSON.stringify(quote));
  }

  // Dynamically create the add quote form
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

  // Add a new quote
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
    saveQuotes();
    populateCategories(); // update dropdown
    textInput.value = '';
    categoryInput.value = '';
    showRandomQuote();
  }

  // Populate category dropdown dynamically
  function populateCategories() {
    const lastCategory = categoryFilter.value;
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    const categories = [...new Set(quotes.map(q => q.category))];
    categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      categoryFilter.appendChild(option);
    });

    if (categories.includes(lastCategory)) {
      categoryFilter.value = lastCategory;
    } else {
      categoryFilter.value = localStorage.getItem('lastSelectedCategory') || 'all';
    }

    localStorage.setItem('lastSelectedCategory', categoryFilter.value);
  }

  // Filter quotes based on dropdown selection
  function filterQuotes() {
    localStorage.setItem('lastSelectedCategory', categoryFilter.value);
    showRandomQuote();
  }

  // Export quotes to JSON
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

  // Import quotes from JSON
  function importFromJsonFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const importedQuotes = JSON.parse(e.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories();
        alert('Quotes imported successfully!');
      } catch (err) {
        alert('Invalid JSON file.');
      }
    };
    reader.readAsText(file);
  }

  // INITIALIZATION
  populateCategories();
  showRandomQuote();
  createAddQuoteForm();

  // Event listeners
  newQuoteBtn.addEventListener('click', showRandomQuote);
  categoryFilter.addEventListener('change', filterQuotes);
  exportBtn.addEventListener('click', exportQuotesToJson);
  importFileInput.addEventListener('change', importFromJsonFile);

});
