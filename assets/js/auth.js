const USERS_KEY = "thuhien_users";
const LEGACY_USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";
const LOGIN_STATUS_KEY = "thuhien_dang_nhap";
const DISPLAY_NAME_KEY = "thuhien_ten";
const REMEMBERED_EMAIL_KEY = "thuhien_remembered_email";

function getUsers() {
    try {
        const rawUsers = localStorage.getItem(USERS_KEY) || localStorage.getItem(LEGACY_USERS_KEY);
        const users = rawUsers ? JSON.parse(rawUsers) : [];

        if (!Array.isArray(users)) return [];

        if (!localStorage.getItem(USERS_KEY) && users.length > 0) {
            saveUsers(users);
        }

        return users;
    } catch (error) {
        console.error("Lỗi đọc danh sách tài khoản:", error);
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.removeItem(LEGACY_USERS_KEY);
}

// Tạo sẵn tài khoản admin nếu chưa có
function initAdminAccount() {
    const users = getUsers();
    const adminEmail = "admin@thuhien.vn";
    const hasAdmin = users.some(u => u.email === adminEmail && u.role === "admin");
    if (!hasAdmin) {
        users.push({
            id: "admin_" + Date.now(),
            name: "Quản trị viên",
            email: adminEmail,
            phone: "0901234567",
            password: "admin123",
            role: "admin",
            createdAt: new Date().toISOString()
        });
        saveUsers(users);
    }
}

function clearCurrentUserSession() {
    [sessionStorage, localStorage].forEach(storage => {
        storage.removeItem(CURRENT_USER_KEY);
        storage.removeItem(LOGIN_STATUS_KEY);
        storage.removeItem(DISPLAY_NAME_KEY);
    });
}

function saveCurrentUser(user, rememberLogin) {
    clearCurrentUserSession();

    const storage = rememberLogin ? localStorage : sessionStorage;
    storage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    storage.setItem(LOGIN_STATUS_KEY, "true");
    storage.setItem(DISPLAY_NAME_KEY, user.name || "");

    if (rememberLogin) {
        localStorage.setItem(REMEMBERED_EMAIL_KEY, user.email || "");
    } else {
        localStorage.removeItem(REMEMBERED_EMAIL_KEY);
    }
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
    const rememberInput = document.getElementById("remember-login");

    const emailValue = normalizeEmail(emailInput.value);
    const passwordValue = passwordInput.value;
    const rememberLogin = Boolean(rememberInput && rememberInput.checked);

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

    saveCurrentUser(currentUser, rememberLogin);

    // Nếu là admin thì set thêm flag để hiện link "Quản lý" ở header
    if (foundUser.role === "admin") {
        localStorage.setItem("thuhien_admin_da_dang_nhap", "true");
    }

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
    const rememberedEmail = localStorage.getItem(REMEMBERED_EMAIL_KEY);

    if (lastEmail) {
        emailInput.value = lastEmail;
        sessionStorage.removeItem("lastRegisteredEmail");
    } else if (rememberedEmail) {
        emailInput.value = rememberedEmail;
    }

    const rememberInput = document.getElementById("remember-login");
    if (rememberInput && rememberedEmail) {
        rememberInput.checked = true;
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

const RESET_EMAIL_KEY = "resetEmail";
const RESET_CODE_KEY = "resetCode";
const RESET_EXPIRE_KEY = "resetExpireAt";

const DEFAULT_EMAILJS_CONFIG = {
    publicKey: "",
    serviceId: "",
    templateId: "",
    enableDemoCode: false
};

function generateResetCode() {
    return String(Math.floor(100000 + Math.random() * 900000));
}

function saveResetCode(email, code) {
    const expireAt = Date.now() + 5 * 60 * 1000;

    sessionStorage.setItem(RESET_EMAIL_KEY, email);
    sessionStorage.setItem(RESET_CODE_KEY, code);
    sessionStorage.setItem(RESET_EXPIRE_KEY, String(expireAt));
}

function clearResetCode() {
    sessionStorage.removeItem(RESET_EMAIL_KEY);
    sessionStorage.removeItem(RESET_CODE_KEY);
    sessionStorage.removeItem(RESET_EXPIRE_KEY);
}

function getResetData() {
    return {
        email: sessionStorage.getItem(RESET_EMAIL_KEY),
        code: sessionStorage.getItem(RESET_CODE_KEY),
        expireAt: Number(sessionStorage.getItem(RESET_EXPIRE_KEY) || 0)
    };
}

function getEmailJSConfig() {
    return {
        ...DEFAULT_EMAILJS_CONFIG,
        ...(window.THUIEN_EMAILJS_CONFIG || {})
    };
}

function isEmailJSConfigured(config) {
    return Boolean(
        config.publicKey
        && config.serviceId
        && config.templateId
        && !String(config.publicKey).startsWith("YOUR_")
        && !String(config.serviceId).startsWith("YOUR_")
        && !String(config.templateId).startsWith("YOUR_")
    );
}

function initEmailJS(config) {
    if (typeof emailjs === "undefined") {
        console.error("EmailJS chưa được nhúng vào trang.");
        return false;
    }

    if (!isEmailJSConfigured(config)) {
        console.error("Bạn chưa cấu hình đầy đủ EmailJS.");
        return false;
    }

    emailjs.init({
        publicKey: config.publicKey
    });

    return true;
}

function sendResetCodeToEmail(email, code) {
    const config = getEmailJSConfig();

    if (!initEmailJS(config)) {
        if (config.enableDemoCode) {
            return Promise.resolve({ demo: true });
        }

        return Promise.reject({
            type: "missing_config",
            message: "Chưa cấu hình đầy đủ EmailJS."
        });
    }

    const templateParams = {
        to_email: email,
        user_email: email,
        email: email,
        reset_code: code,
        code: code,
        website_name: "Thư Hiên",
        time_limit: "5 phút",
        message: `Mã xác thực khôi phục mật khẩu Thư Hiên của bạn là ${code}. Mã có hiệu lực trong 5 phút.`
    };

    return emailjs.send(
        config.serviceId,
        config.templateId,
        templateParams
    );
}

function goToResetPasswordPage(delay = 900) {
    setTimeout(function () {
        window.location.href = "reset_password.html";
    }, delay);
}

function validateForgotEmail() {
    const emailInput = document.getElementById("forgot-email");

    if (!emailInput) return false;

    clearInputError(emailInput);

    const emailValue = normalizeEmail(emailInput.value);

    if (!emailValue) {
        setInputError(emailInput, "Vui lòng nhập email.");
        return false;
    }

    if (!isValidEmail(emailValue)) {
        setInputError(emailInput, "Email chưa đúng định dạng.");
        return false;
    }

    const users = getUsers();
    const existedUser = users.find(user => normalizeEmail(user.email) === emailValue);

    if (!existedUser) {
        setInputError(emailInput, "Email này chưa được đăng ký.");
        return false;
    }

    return true;
}

function handleForgotPassword(event) {
    event.preventDefault();

    const emailInput = document.getElementById("forgot-email");

    if (!validateForgotEmail()) return;

    const emailValue = normalizeEmail(emailInput.value);
    const resetCode = generateResetCode();

    setMessage("forgot-message", "Đang gửi mã xác thực đến email của bạn...", "success");

    sendResetCodeToEmail(emailValue, resetCode)
        .then(function (result) {
            saveResetCode(emailValue, resetCode);

            if (result && result.demo) {
                setMessage(
                    "forgot-message",
                    `Chưa cấu hình EmailJS nên đang dùng mã kiểm thử: ${resetCode}. Đang chuyển sang trang đặt lại mật khẩu...`,
                    "success"
                );
                goToResetPasswordPage(1600);
            } else {
                setMessage(
                    "forgot-message",
                    "Mã xác thực đã được gửi. Đang chuyển sang trang đặt lại mật khẩu...",
                    "success"
                );
                goToResetPasswordPage();
            }
        })
        .catch(function (error) {
            console.error("Lỗi gửi email:", error);

            if (error && error.type === "missing_config") {
                setMessage(
                    "forgot-message",
                    "Chưa cấu hình EmailJS để gửi mail thật. Hãy điền publicKey, serviceId và templateId trong assets/js/emailjs-config.js.",
                    "error"
                );

                return;
            }

            setMessage(
                "forgot-message",
                "Chưa gửi được email. Hãy kiểm tra Service ID, Template ID hoặc quyền gửi của EmailJS.",
                "error"
            );
        });
}

function validateResetPasswordForm() {
    const codeInput = document.getElementById("verify-code");
    const newPasswordInput = document.getElementById("new-password");
    const confirmNewPasswordInput = document.getElementById("confirm-new-password");

    let isValid = true;

    [codeInput, newPasswordInput, confirmNewPasswordInput].forEach(input => {
        if (input) clearInputError(input);
    });

    const resetData = getResetData();
    const inputCode = codeInput.value.trim();
    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmNewPasswordInput.value;

    if (!inputCode) {
        setInputError(codeInput, "Vui lòng nhập mã xác thực.");
        isValid = false;
    } else if (inputCode !== resetData.code) {
        setInputError(codeInput, "Mã xác thực không đúng.");
        isValid = false;
    }

    if (!resetData.expireAt || Date.now() > resetData.expireAt) {
        setInputError(codeInput, "Mã xác thực đã hết hạn. Vui lòng gửi lại mã.");
        isValid = false;
    }

    if (!newPassword) {
        setInputError(newPasswordInput, "Vui lòng nhập mật khẩu mới.");
        isValid = false;
    } else if (newPassword.length < 6) {
        setInputError(newPasswordInput, "Mật khẩu cần tối thiểu 6 ký tự.");
        isValid = false;
    }

    if (!confirmPassword) {
        setInputError(confirmNewPasswordInput, "Vui lòng nhập lại mật khẩu mới.");
        isValid = false;
    } else if (confirmPassword !== newPassword) {
        setInputError(confirmNewPasswordInput, "Mật khẩu nhập lại không khớp.");
        isValid = false;
    }

    return isValid;
}

function handleResetPassword(event) {
    event.preventDefault();

    if (!validateResetPasswordForm()) return;

    const resetData = getResetData();
    const newPasswordInput = document.getElementById("new-password");

    const users = getUsers();
    const userIndex = users.findIndex(user => {
        return normalizeEmail(user.email) === normalizeEmail(resetData.email);
    });

    if (userIndex === -1) {
        setMessage("reset-message", "Không tìm thấy tài khoản cần đặt lại mật khẩu.", "error");
        return;
    }

    users[userIndex].password = newPasswordInput.value;
    users[userIndex].updatedAt = new Date().toISOString();

    saveUsers(users);
    clearResetCode();

    setMessage(
        "reset-message",
        "Đặt lại mật khẩu thành công. Đang chuyển sang trang đăng nhập...",
        "success"
    );

    setTimeout(function () {
        window.location.href = "login.html";
    }, 1000);
}

function initForgotPasswordPage() {
    const forgotForm = document.getElementById("forgot-form");

    if (forgotForm) {
        forgotForm.addEventListener("submit", handleForgotPassword);
    }
}

function initResetPasswordPage() {
    const verifyForm = document.getElementById("verify-form");
    if (verifyForm) {
        verifyForm.addEventListener("submit", handleResetPassword);

        const resetData = getResetData();
        if (!resetData.email || !resetData.code) {
            setMessage(
                "reset-message",
                "Vui lòng gửi mã xác thực trước khi đặt lại mật khẩu.",
                "error"
            );
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    initAdminAccount();
    initPasswordToggle();
    initAuthForms();
    initForgotPasswordPage();
    initResetPasswordPage();
});
