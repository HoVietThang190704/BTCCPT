// Hiển thị thông tin người dùng từ localStorage
document.addEventListener('DOMContentLoaded', function() {
    const userString = localStorage.getItem('user');
    
    if (userString) {
        try {
            const user = JSON.parse(userString);
            const userInfo = document.getElementById('userInfo');
            
            userInfo.innerHTML = `
                <p><strong>Tên:</strong> ${user.name}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Ngày Đăng Ký:</strong> ${user.registeredAt}</p>
            `;
        } catch (e) {
            console.error('Lỗi khi đọc thông tin người dùng:', e);
        }
    } else {
        const userInfo = document.getElementById('userInfo');
        userInfo.innerHTML = '<p style="color: #999;">Chưa có thông tin người dùng</p>';
    }
});

// Xử lý nút đăng xuất
document.getElementById('logoutBtn').addEventListener('click', function() {
    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
        localStorage.removeItem('user');
        alert('Bạn đã đăng xuất thành công!');
        window.location.href = 'signup.html';
    }
});
