let data = []; // To store data fetched from the server
const rowsPerPage = 5;
let currentPage = 1;

// Function to fetch data from the backend
async function fetchData(searchTerm = "") {
    try {
        const response = await fetch(`http://localhost:3002/api/clients?name=${searchTerm}`);
        data = await response.json();
        currentPage = 1; // Reset to the first page
        displayTable();
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch data from the server.");
    }
}

// Function to display the table rows
function displayTable() {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    const dataToDisplay = data.slice(start, end);

    if (dataToDisplay.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='9'>No results found</td></tr>";
        return;
    }

    dataToDisplay.forEach(item => {
        const row = `
            <tr>
                <td>${item.name || 'N/A'}</td>
                <td>${item.Marital_Status || 'N/A'}</td>
                <td>${item.occupation || 'N/A'}</td>
                <td>${item.Age_Group || 'N/A'}</td>
                <td>${item.Income_Group || 'N/A'}</td>
                <td>${item.sip || 'N/A'}</td>
                <td>${item.swp || 'N/A'}</td>
                <td>${item.aum || 'N/A'}</td>
                <td>${item.health || 'N/A'}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    document.getElementById("page-info").innerText =
        `Page ${currentPage} of ${Math.ceil(data.length / rowsPerPage)}`;
}

// Pagination Handlers
document.getElementById("prev-btn").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        displayTable();
    }
});

document.getElementById("next-btn").addEventListener("click", () => {
    if (currentPage < Math.ceil(data.length / rowsPerPage)) {
        currentPage++;
        displayTable();
    }
});

// Search Handler
document.getElementById("search-input").addEventListener("input", (e) => {
    const searchTerm = e.target.value.trim();
    fetchData(searchTerm);
});

// Initial Table Render
fetchData();
