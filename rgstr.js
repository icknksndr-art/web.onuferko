const form = document.getElementById('userForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const passwordInput = document.getElementById('password');
const saveBtn = document.getElementById('saveBtn');
const clearBtn = document.getElementById('clearBtn');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const authEmail = document.getElementById('authEmail');
const authPassword = document.getElementById('authPassword');
const messageDiv = document.getElementById('message');
const editSection = document.getElementById('editSection');
const editName = document.getElementById('editName');
const editPhone = document.getElementById('editPhone');
const updateBtn = document.getElementById('updateBtn');
let isLoggedIn = false;
let currentUserEmail = null;
document.addEventListener('DOMContentLoaded', function() {
    loadSavedData();
    checkLoginStatus();
});
function showMessage(text, type) {
    messageDiv.innerHTML = `<div class="message ${type}">${text}</div>`;
    setTimeout(() => {
        messageDiv.innerHTML = '';
    }, 3000);
}
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function validatePhone(phone) {
    const phoneRegex = /^[0-9+\-\s]{10,15}$/;
    return phoneRegex.test(phone);
}
function validatePassword(password) {
    return password.length >= 6;
}
function saveUserData(userData) {
    localStorage.setItem('userData', JSON.stringify(userData));
}
function loadSavedData() {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
        try {
            const userData = JSON.parse(savedData);
            nameInput.value = userData.name || '';
            emailInput.value = userData.email || '';
            phoneInput.value = userData.phone || '';
            passwordInput.value = userData.password || '';
            
            showMessage('Дані завантажені зі сховища!', 'success');
        } catch (error) {
            console.error('Помилка завантаження даних:', error);
            showMessage('Помилка загрузки даних', 'error');
        }
    } else {
        console.log('No saved data found');
    }
}
function clearSavedData() {
    if (confirm('Ви точно хочете видалити всі дані?')) {
        localStorage.removeItem('userData');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        form.reset();
        authEmail.value = '';
        authPassword.value = '';
        isLoggedIn = false;
        currentUserEmail = null;
        editSection.style.display = 'none';
        loginBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
        showMessage('Всі дані було успішно видаленко!', 'success');
    }
}
function handleSaveData(event) {
    event.preventDefault();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const password = passwordInput.value;
    if (!name) {
        showMessage('Прошу, введіть своє ім.я', 'error');
        return;
    }
    if (!validateEmail(email)) {
        showMessage('Прошу, введіть справжній емейл', 'error');
        return;
    }
    if (!validatePhone(phone)) {
        showMessage('Прошу, введіть справжній номер телефону (від 10 до 15 чисел)', 'error');
        return;
    }
    if (!validatePassword(password)) {
showMessage('Пароль має мати хоча би 6 символів', 'error');
        return;
    }
    const userData = {
        name: name,
        email: email,
        phone: phone,
        password: password
    };
    saveUserData(userData);
    showMessage('Всі дані успішно збережені!', 'success');
}
function handleLogin() {
    const email = authEmail.value.trim();
    const password = authPassword.value;
    if (!email || !password) {
        showMessage('Прошу.введіть емейл та пароль', 'error');
        return;
    }
    const savedData = localStorage.getItem('userData');
    if (!savedData) {
        showMessage('Цього юзера не знайдено. Прошй, спочатку збережіть свої далі.', 'error');
        return;
    }
    try {
        const userData = JSON.parse(savedData);
        if (userData.email === email && userData.password === password) {
            isLoggedIn = true;
            currentUserEmail = email;
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', email);
            showMessage(`Ласкаво просимо, ${userData.name}!`, 'success');
            editSection.style.display = 'block';
            editName.value = userData.name;
            editPhone.value = userData.phone;
            loginBtn.style.display = 'none';
            logoutBtn.style.display = 'inline-block';
            nameInput.disabled = true;
            emailInput.disabled = true;
            passwordInput.disabled = true;
            saveBtn.disabled = true;
        } else {
            showMessage('Неприйнтний емейл або пароль', 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showMessage('Помилка під час реєстрації', 'error');
    }
}
function handleLogout() {
    isLoggedIn = false;
    currentUserEmail = null;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    showMessage('Успішно вийшли!', 'info');
    editSection.style.display = 'none';
    loginBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
    nameInput.disabled = false;
    emailInput.disabled = false;
    passwordInput.disabled = false;
    saveBtn.disabled = false;
    authEmail.value = '';
    authPassword.value = '';
}
function handleUpdate() {
    if (!isLoggedIn) {
        showMessage('Прошу, спочатку зареєструйтеся щоб змінити інформацію', 'error');
        return;
    }
    const newName = editName.value.trim();
    const newPhone = editPhone.value.trim();
    if (!newName) {
        showMessage('Ім.я не може бути порожнім', 'error');
        return;
    }
    if (!validatePhone(newPhone)) {
        showMessage('Прошу, введіть справжній номер тетлефону', 'error');
        return;
    }
    const savedData = localStorage.getItem('userData');
    if (savedData) {
        try {
            const userData = JSON.parse(savedData);
            userData.name = newName;
            userData.phone = newPhone;
            saveUserData(userData);
            nameInput.value = newName;
            phoneInput.value = newPhone;
            showMessage('Профіль успішно змінений!', 'success');
        } catch (error) {
            console.error('Update error:', error);
            showMessage('Помилка оновлення профіля', 'error');
        }
    }
}
function checkLoginStatus() {
    const loggedIn = localStorage.getItem('isLoggedIn');
    const savedUser = localStorage.
getItem('currentUser');
    if (loggedIn === 'true' && savedUser) {
        const savedData = localStorage.getItem('userData');
        if (savedData) {
            try {
                const userData = JSON.parse(savedData);
                if (userData.email === savedUser) {
                    isLoggedIn = true;
                    currentUserEmail = savedUser;
                    editSection.style.display = 'block';
                    editName.value = userData.name;
                    editPhone.value = userData.phone;
                    loginBtn.style.display = 'none';
                    logoutBtn.style.display = 'inline-block';
                    nameInput.disabled = true;
                    emailInput.disabled = true;
                    passwordInput.disabled = true;
                    saveBtn.disabled = true;
                    showMessage(`Ласкаво просимо, ${userData.name}!`, 'success');
                }
            } catch (error) {
                console.error('Помилка перевірки статусу:', error);
            }
        }
    }
}
function autoSave() {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const password = passwordInput.value;
    if (name && email && phone && password) {
        if (validateEmail(email) && validatePhone(phone) && validatePassword(password)) {
            const userData = {
                name: name,
                email: email,
                phone: phone,
                password: password
            };
            saveUserData(userData);
        }
    }
}
form.addEventListener('submit', handleSaveData);
clearBtn.addEventListener('click', clearSavedData);
loginBtn.addEventListener('click', handleLogin);
logoutBtn.addEventListener('click', handleLogout);
updateBtn.addEventListener('click', handleUpdate);
nameInput.addEventListener('input', autoSave);
emailInput.addEventListener('input', autoSave);
phoneInput.addEventListener('input', autoSave);
passwordInput.addEventListener('input', autoSave);
document.addEventListener('DOMContentLoaded', function() {
    loadSavedData();
    checkLoginStatus();
});
