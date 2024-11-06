document.addEventListener("DOMContentLoaded", function () {
    // Function to save selected checkboxes to chrome.storage.local
    function saveCheckboxes() {
        // Get all checked checkboxes
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const selectedValues = Array.from(checkboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.id);

        // Store selected checkboxes in chrome.storage.local
        chrome.storage.local.set({ selectedOptions: selectedValues }, function () {
            console.log("Selected options saved to storage:", selectedValues);
            document.getElementById("result").textContent = "Selected options saved!";

            setTimeout(() => {
                document.getElementById("result").textContent = "Reload to see your changes!";
            }, 3000);


        });
    }

    // Function to load checkbox states from chrome.storage.local
    function loadCheckboxes() {
        chrome.storage.local.get(["selectedOptions"], function (result) {
            const savedValues = result.selectedOptions || [];

            // Uncheck all checkboxes first
            document.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
                checkbox.checked = false;
            });

            // Check the saved checkboxes
            savedValues.forEach(id => {
                const checkbox = document.getElementById(id);
                if (checkbox) {
                    checkbox.checked = true;
                }
            });

            console.log("Loaded options from storage:", savedValues);
            document.getElementById("result").textContent = "Selected options loaded!";
        });
    }

    // Add change event listeners to all checkboxes
    document.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
        checkbox.addEventListener("change", saveCheckboxes);
    });
    const musicCheckboxes = document.querySelectorAll('#musicHolder input[type="checkbox"]');

    musicCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                musicCheckboxes.forEach((otherCheckbox) => {
                    if (otherCheckbox !== checkbox) {
                        otherCheckbox.checked = false;
                    }
                });
                saveCheckboxes();
            }
        });
    });

    // Load checkboxes from storage when the page loads
    loadCheckboxes();
});