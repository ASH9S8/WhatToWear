document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');
    const signupForm = document.querySelector('.signup-form');
    const weatherSection = document.querySelector('.weather-section');
    const toSignup = document.getElementById('toSignup');
    const toLogin = document.getElementById('toLogin');
    const logoutBtn = document.getElementById('logoutBtn');

    const userSession = sessionStorage.getItem('currentUser');

    if (userSession) {
        loginForm.style.display = 'none';
        signupForm.style.display = 'none';
        weatherSection.style.display = 'block';
    } else {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        weatherSection.style.display = 'none';
    }

    toSignup.addEventListener('click', () => {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    });

    toLogin.addEventListener('click', () => {
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
    });

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;

        try {
            const res = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (res.ok) {
                alert(data.message);
                signupForm.reset();
                loginForm.style.display = 'block';
                signupForm.style.display = 'none';
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert('Signup failed');
        }
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const res = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (res.ok) {
                sessionStorage.setItem('currentUser', JSON.stringify(data.user));
                loginForm.style.display = 'none';
                signupForm.style.display = 'none';
                weatherSection.style.display = 'block';
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert('Login failed');
        }
    });

    logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('currentUser');
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        weatherSection.style.display = 'none';
    });
});