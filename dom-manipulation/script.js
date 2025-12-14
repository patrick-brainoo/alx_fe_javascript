document.addEventListener('DOMContentLoaded', () => {

  // Array of quote objects
  const quotes = [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Success is not final, failure is not fatal.", category: "Success" }
  ];

  const quoteDisplay = document.getElementById('quoteDisplay');
  const newQuoteBtn = document.getElementById('newQuote');
  const addQuoteBtn = document.getElementById('addQuoteBtn');

  // Function to display a random quote using innerHTML
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    // Display with innerHTML
    quoteDisplay.innerHTML = `
      <p>"${quote.text}"</p>
      <small>— ${quote.category}</small>
    `;
  }

  // Function to add a new quote dynamically
  function addQuote() {
    const textInput = document.getElementById('newQuoteText');
    const categoryInput = document.getElementById('newQuoteCategory');

    const quoteText = textInput.value.trim();
    const quoteCategory = categoryInput.value.trim();

    if (quoteText === "" || quoteCategory === "") {
      alert("Please enter both quote and category.");
      return;
    }

    // Add new quote to the array
    quotes.push({
      text: quoteText,
      category: quoteCategory
    });

    // Clear input fields
    textInput.value = "";
    categoryInput.value = "";

    // Show the newly added quote
    showRandomQuote();
  }

  // Event listeners
  newQuoteBtn.addEventListener('click', showRandomQuote);
  addQuoteBtn.addEventListener('click', addQuote);

});
