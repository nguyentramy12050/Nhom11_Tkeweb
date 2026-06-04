const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

function getUsers() {
    try {
        const rawUsers = localStorage.getItem(USERS_KEY);
        const users = rawUsers ? JSON.parse(rawUsers) : [];

        if (!Array.isArray(users)) return [];

        return users;
    } catch (error) {
        console.error("Lỗi đọc danh sách tài khoản:", error);
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function saveCurrentUser(user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    localStorage.setItem("thuhien_dang_nhap", "true");
    localStorage.setItem("thuhien_ten", user.name || "");
}

function normalizeEmail(email) {
    return String(email || "").trim().toLowerCase();
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
    return phoneRegex.test(phone);
}

function createUserId() {
    return "user_" + Date.now() + "_" + Math.floor(1000 + Math.random() * 9000);
}

function setInputError(input, message) {
    const group = input.closest(".form-group");
    const errorText = group ? group.querySelector(".form-error") : null;

    input.classList.add("error");

    if (errorText) {
        errorText.textContent = message;
    }
}

function clearInputError(input) {
    const group = input.closest(".form-group");
    const errorText = group ? group.querySelector(".form-error") : null;

    input.classList.remove("error");

    if (errorText) {
        errorText.textContent = "";
    }
}

function setMessage(elementId, message, type) {
    const messageBox = document.getElementById(elementId);
    if (!messageBox) return;

    messageBox.textContent = message;
    messageBox.classList.remove("success", "error");

    if (type) {
        messageBox.classList.add(type);
    }
}

function clearMessage(elementId) {
    const messageBox = document.getElementById(elementId);
    if (!messageBox) return;

    messageBox.textContent = "";
    messageBox.classList.remove("success", "error");
}

function validateRegisterForm() {
    const nameInput = document.getElementById("register-name");
    const emailInput = document.getElementById("register-email");
    const phoneInput = document.getElementById("register-phone");
    const passwordInput = document.getElementById("register-password");
    const confirmPasswordInput = document.getElementById("register-confirm-password");
    const agreePolicy = document.getElementById("agree-policy");
    const policyError = document.getElementById("policy-error");

    let isValid = true;

    [nameInput, emailInput, phoneInput, passwordInput, confirmPasswordInput].forEach(input => {
        if (input) clearInputError(input);
    });

    if (policyError) {
        policyError.textContent = "";
    }

    const nameValue = nameInput.value.trim();
    const emailValue = normalizeEmail(emailInput.value);
    const phoneValue = phoneInput.value.trim();
    const passwordValue = passwordInput.value;
    const confirmPasswordValue = confirmPasswordInput.value;

    if (!nameValue) {
        setInputError(nameInput, "Vui lòng nhập họ tên.");
        isValid = false;
    }

    if (!emailValue) {
        setInputError(emailInput, "Vui lòng nhập email.");
        isValid = false;
    } else if (!isValidEmail(emailValue)) {
        setInputError(emailInput, "Email chưa đúng định dạng.");
        isValid = false;
    }

    if (!phoneValue) {
        setInputError(phoneInput, "Vui lòng nhập số điện thoại.");
        isValid = false;
    } else if (!isValidPhone(phoneValue)) {
        setInputError(phoneInput, "Số điện thoại chưa đúng định dạng.");
        isValid = false;
    }

    if (!passwordValue) {
        setInputError(passwordInput, "Vui lòng nhập mật khẩu.");
        isValid = false;
    } else if (passwordValue.length < 6) {
        setInputError(passwordInput, "Mật khẩu cần tối thiểu 6 ký tự.");
        isValid = false;
    }

    if (!confirmPasswordValue) {
        setInputError(confirmPasswordInput, "Vui lòng nhập lại mật khẩu.");
        isValid = false;
    } else if (confirmPasswordValue !== passwordValue) {
        setInputError(confirmPasswordInput, "Mật khẩu nhập lại không khớp.");
        isValid = false;
    }

    if (!agreePolicy.checked) {
        if (policyError) {
            policyError.textContent = "Vui lòng đồng ý với chính sách của Thư Hiên.";
        }
        isValid = false;
    }

    return isValid;
}

function handleRegister(event) {
    event.preventDefault();
    clearMessage("register-message");

    if (!validateRegisterForm()) return;

    const nameInput = document.getElementById("register-name");
    const emailInput = document.getElementById("register-email");
    const phoneInput = document.getElementById("register-phone");
    const passwordInput = document.getElementById("register-password");

    const users = getUsers();
    const emailValue = normalizeEmail(emailInput.value);

    const existedUser = users.find(user => normalizeEmail(user.email) === emailValue);

    if (existedUser) {
        setInputError(emailInput, "Email này đã được đăng ký.");
        setMessage("register-message", "Email đã tồn tại. Vui lòng đăng nhập hoặc dùng email khác.", "error");
        return;
    }

    const newUser = {
        id: createUserId(),
        name: nameInput.value.trim(),
        email: emailValue,
        phone: phoneInput.value.trim(),
        password: passwordInput.value,
        role: "customer",
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);

    sessionStorage.setItem("lastRegisteredEmail", emailValue);

    setMessage("register-message", "Đăng ký thành công. Đang chuyển sang đăng nhập...", "success");

    setTimeout(() => {
        window.location.href = "login.html";
    }, 900);
}

function validateLoginForm() {
    const emailInput = document.getElementById("login-email");
    const passwordInput = document.getElementById("login-password");

    let isValid = true;

    [emailInput, passwordInput].forEach(input => {
        if (input) clearInputError(input);
    });

    const emailValue = normalizeEmail(emailInput.value);
    const passwordValue = passwordInput.value;

    if (!emailValue) {
        setInputError(emailInput, "Vui lòng nhập email.");
        isValid = false;
    } else if (!isValidEmail(emailValue)) {
        setInputError(emailInput, "Email chưa đúng định dạng.");
        isValid = false;
    }

    if (!passwordValue) {
        setInputError(passwordInput, "Vui lòng nhập mật khẩu.");
        isValid = false;
    }

    return isValid;
}

function handleLogin(event) {
    event.preventDefault();
    clearMessage("login-message");

    if (!validateLoginForm()) return;

    const emailInput = document.getElementById("login-email");
    const passwordInput = document.getElementById("login-password");

    const emailValue = normalizeEmail(emailInput.value);
    const passwordValue = passwordInput.value;

    const users = getUsers();

    const foundUser = users.find(user => {
        return normalizeEmail(user.email) === emailValue && user.password === passwordValue;
    });

    if (!foundUser) {
        setMessage("login-message", "Email hoặc mật khẩu không chính xác.", "error");
        return;
    }

    const currentUser = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        phone: foundUser.phone,
        role: foundUser.role || "customer",
        loggedInAt: new Date().toISOString()
    };

    saveCurrentUser(currentUser);

    setMessage("login-message", "Đăng nhập thành công. Đang chuyển trang...", "success");

    setTimeout(() => {
        window.location.href = "index.html";
    }, 800);
}

function initPasswordToggle() {
    document.querySelectorAll(".toggle-password").forEach(button => {
        button.addEventListener("click", function () {
            const targetId = button.dataset.target;
            const input = document.getElementById(targetId);
            const icon = button.querySelector("i");

            if (!input || !icon) return;

            if (input.type === "password") {
                input.type = "text";
                icon.classList.remove("fa-eye");
                icon.classList.add("fa-eye-slash");
            } else {
                input.type = "password";
                icon.classList.remove("fa-eye-slash");
                icon.classList.add("fa-eye");
            }
        });
    });
}

function fillLoginEmailFromStorage() {
    const emailInput = document.getElementById("login-email");
    if (!emailInput) return;

    const lastEmail = sessionStorage.getItem("lastRegisteredEmail");

    if (lastEmail) {
        emailInput.value = lastEmail;
        sessionStorage.removeItem("lastRegisteredEmail");
    }
}

function initAuthForms() {
    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");

    if (registerForm) {
        registerForm.addEventListener("submit", handleRegister);
    }

    if (loginForm) {
        loginForm.addEventListener("submit", handleLogin);
        fillLoginEmailFromStorage();
    }

    document.querySelectorAll(".form-group input").forEach(input => {
        input.addEventListener("input", function () {
            clearInputError(input);
        });
    });

    const agreePolicy = document.getElementById("agree-policy");
    const policyError = document.getElementById("policy-error");

    if (agreePolicy && policyError) {
        agreePolicy.addEventListener("change", function () {
            if (agreePolicy.checked) {
                policyError.textContent = "";
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    initPasswordToggle();
    initAuthForms();
});
