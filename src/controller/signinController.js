document.getElementById('signinForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Ngăn chặn hành động mặc định

    // Lấy dữ liệu từ form
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Kiểm tra dữ liệu
    if (email.trim() === '' || password.trim() === '') {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }

    // Kiểm tra thông tin đăng nhập từ localStorage
    const userString = localStorage.getItem('user');
    
    if (!userString) {
        alert('Tài khoản này chưa được đăng ký. Vui lòng đăng ký trước!');
        return;
    }

    try {
        const user = JSON.parse(userString);

        // Kiểm tra email và password
        if (user.email === email && user.password === password) {
            // Đăng nhập thành công
            alert('Đăng nhập thành công! Chào mừng ' + user.name);

            // Chuyển hướng đến trang home sau 1 giây
            setTimeout(function() {
                window.location.href = 'home.html';
            }, 1000);
        } else {
            // Email hoặc password không chính xác
            alert('Email hoặc mật khẩu không chính xác!');
        }
    } catch (e) {
        console.error('Lỗi khi xác thực thông tin:', e);
        alert('Có lỗi xảy ra. Vui lòng thử lại!');
    }
});
