document.addEventListener("DOMContentLoaded", function () {
    loadTableEntries();
    document.getElementById("userregistrationForm").addEventListener("submit", function(event) {
        event.preventDefault();
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var dob = document.getElementById("dob").value;
        var acceptTerms = document.getElementById("acceptTerms").checked;
        if (!isValidEmail(email) || !isValidAge(dob)) {
            alert("Invalid email or age");
            return;
        }
        var table = document.getElementById("userTable").getElementsByTagName('tbody')[0];
        var newRow = table.insertRow(table.rows.length);
        var cells = [name, email, password, dob, acceptTerms];

        for (var i = 0; i < cells.length; i++) {
            var cell = newRow.insertCell(i);
            cell.innerHTML = cells[i];
        }
        saveTableEntry(name, email, password, dob, acceptTerms);
        document.getElementById("userregistrationForm").reset();
    });

    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidAge(dob) {
        var birthDate = new Date(dob);
        var currentDate = new Date();
        var age = currentDate.getFullYear() - birthDate.getFullYear();
        return age >= 18 && age <= 55;
    }

    function saveTableEntry(name, email, password, dob, acceptTerms) {
        var entry = { name, email, password, dob, acceptTerms };
        var entries = JSON.parse(localStorage.getItem("entries")) || [];
        entries.push(entry);
        localStorage.setItem("entries", JSON.stringify(entries));
    }

    function loadTableEntries() {
        var entries = JSON.parse(localStorage.getItem("entries")) || [];
        var table = document.getElementById("userTable").getElementsByTagName('tbody')[0];

        entries.forEach(function(entry) {
            var newRow = table.insertRow(table.rows.length);
            var cells = [entry.name, entry.email, entry.password, entry.dob, entry.acceptTerms];

            for (var i = 0; i < cells.length; i++) {
                var cell = newRow.insertCell(i);
                cell.innerHTML = cells[i];
            }
        });
    }
});
