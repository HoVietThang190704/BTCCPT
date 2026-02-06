document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Ngăn chặn hành động mặc định

    // Lấy dữ liệu từ form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Kiểm tra dữ liệu
    if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }

    // Lưu thông tin đăng ký (tùy chọn - có thể lưu vào localStorage)
    const signupData = {
        name: name,
        email: email,
        password: password,
        registeredAt: new Date().toLocaleString('vi-VN')
    };

    localStorage.setItem('user', JSON.stringify(signupData));

    // Hiển thị thông báo thành công
    alert('Đăng ký thành công! Chào mừng ' + name);

    // Chuyển hướng đến trang home sau 1 giây
    setTimeout(function() {
        window.location.href = 'home.html';
    }, 1000);
});
