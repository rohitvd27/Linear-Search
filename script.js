let array = [];
let searchValue = 0;
let currentIteration = 0;
let intervalId;

function startSearch() {
  // Clear previous results
  document.getElementById("searchResult").textContent = "";
  document.getElementById("timeComplexity").textContent = "";
  document.getElementById("spaceComplexity").textContent = "";
  clearInterval(intervalId); // clear any ongoing animation

  // Get array and search value input
  array = document.getElementById("arrayInput").value.split(",").map(Number);
  searchValue = parseInt(document.getElementById("searchValue").value);

  if (isNaN(searchValue) || array.length === 0) {
    alert("Please provide a valid array and search value");
    return;
  }

  // Build the table
  buildTable();

  // Reset iteration and start search animation
  currentIteration = 0;
  intervalId = setInterval(animateSearch, 1000); // 1-second delay for each iteration

  // Calculate and show time complexity
  showComplexity();
}

function buildTable() {
  const table = document.getElementById("arrayTable");
  table.innerHTML = ""; // Clear previous table

  // Create a single row for the array elements
  const row = table.insertRow();

  array.forEach((value, index) => {
    const cell = row.insertCell();
    cell.textContent = value;
    cell.setAttribute("id", `cell-${index}`);
  });
}

function animateSearch() {
    if (currentIteration > 0) {
      // Remove highlight from the previous cell
      document.getElementById(`cell-${currentIteration - 1}`).classList.remove('highlight');
    }
  
    if (currentIteration < array.length) {
      const currentCell = document.getElementById(`cell-${currentIteration}`);
      currentCell.classList.add('highlight'); // Highlight the current cell
      
      if (array[currentIteration] === searchValue) {
        currentCell.classList.add('found'); // Mark the cell as found
        
        // Add blink class to make it blink 3 times
        currentCell.classList.add('blink');
        
        document.getElementById('searchResult').textContent = `Value ${searchValue} found at index ${currentIteration}!`;
        
        // Stop the search after the value is found
        clearInterval(intervalId);
        return;
      }
    }
  
    currentIteration++;
  
    if (currentIteration >= array.length) {
      document.getElementById('searchResult').textContent = `Value ${searchValue} not found in the array.`;
      clearInterval(intervalId); // Stop the search
    }
  }
  

function showComplexity() {
  const n = array.length;

  // Time complexity
  let timeComplexity;
  if (n === 0) {
    timeComplexity = "O(1) - No elements to search";
  } else if (array.indexOf(searchValue) === 0) {
    timeComplexity = "Best Case: O(1) - Found in the first iteration.";
  } else if (
    array.indexOf(searchValue) === -1 ||
    array.indexOf(searchValue) === array.length - 1
  ) {
    timeComplexity = `Worst Case: O(n) - Found in the last iteration or not found.`;
  } else {
    timeComplexity = `Average Case: O(n/2) - Found around the middle of the array.`;
  }

  // Space complexity
  const spaceComplexity = "Space Complexity: O(1) - No extra space required.";

  // Display results
  document.getElementById("timeComplexity").textContent = timeComplexity;
  document.getElementById("spaceComplexity").textContent = spaceComplexity;
}
