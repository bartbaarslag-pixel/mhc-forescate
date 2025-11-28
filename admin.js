const ADMIN_PASSWORD = "Hockey123"; // aanpasbaar

function loginAdmin() {
    const pw = document.getElementById("admin-password").value;
    if (pw === ADMIN_PASSWORD) {
        document.getElementById("login-section").style.display = "none";
        document.getElementById("app-section").style.display = "block";
    } else {
        document.getElementById("login-error").innerText = "Onjuist wachtwoord";
    }
}
