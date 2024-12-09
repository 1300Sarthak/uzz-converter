let conversionHistory = [];

function manipulateString() {
    let input = document.getElementById("inputString").value.trim();
    if (!input) return;

    let output = '';

    // Split the string by spaces to process each word individually
    let words = input.split(' ');

    // Process each word
    let processedWords = words.map(word => {
        if (word.length <= 3) {
            return word + "uzz"; // For words 3 or fewer characters, append "uzz"
        } else if (word.length === 4) {
            return word.slice(0, -2) + "uzz"; // For words of 4 characters, remove the last 2 characters and append "uzz"
        } else if (word.length >= 5) {
            return word.slice(0, -3) + "uzz"; // For words of 5 or more characters, remove the last 3 characters and append "uzz"
        }
        return word;
    });

    // Join processed words back into a single string
    output = processedWords.join(' ');

    
    const outputDiv = document.getElementById("output");
    outputDiv.style.opacity = "0";
    outputDiv.innerText = output;
    outputDiv.style.opacity = "1";

    addToHistory(input, output);
    document.getElementById("inputString").value = "";
}


function addToHistory(input, output) {
    conversionHistory.unshift({ input, output });
    if (conversionHistory.length > 10) {
        conversionHistory.pop();
    }
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const historyList = document.getElementById("historyList");
    historyList.innerHTML = "";

    conversionHistory.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = "history-item fade-in";
        li.style.animationDelay = `${index * 0.1}s`;
        li.innerHTML = `
            <span>${item.input}</span>
            <span class="arrow">→</span>
            <span>${item.output}</span>
        `;
        historyList.appendChild(li);
    });
}

// Add enter key support
document.getElementById("inputString").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        manipulateString();
    }
});
