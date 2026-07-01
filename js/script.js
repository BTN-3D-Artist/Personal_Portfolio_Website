// JavaScript code for "Back to Top" button functionality
const backToTopButton = document.getElementById("backToTop");

// 1. Lắng nghe sự kiện cuộn chuột của người dùng
window.addEventListener("scroll", () => {
    // Nếu cuộn xuống quá 400px thì hiện nút, ngược lại thì ẩn đi
    if (window.scrollY > 400) {
        backToTopButton.classList.add("show");
    } else {
        backToTopButton.classList.remove("show");
    }
});

// 2. Xử lý sự kiện click để cuộn mượt lên đầu trang
backToTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // Cuộn mượt mà không bị giật khựng
    });
});

// --- XỬ LÝ ĐÓNG MỞ MENU MOBILE ---
const navBar = document.getElementById("navBar");
const menuOpen = document.getElementById("menuOpen");
const menuClose = document.getElementById("menuClose");
const navLinks = document.querySelectorAll(".nav-link");

// 1. Khi Click vào nút 3 gạch -> Mở menu trượt ra
if (menuOpen) {
    menuOpen.addEventListener("click", () => {
        navBar.classList.add("active");
        document.body.classList.add("menu-open"); // Khóa cuộn trang nền
    });
}

// Hàm dùng chung để đóng menu
const closeMenu = () => {
    navBar.classList.remove("active");
    document.body.classList.remove("menu-open"); // Mở lại cuộn trang
};

// 2. Khi Click vào nút dấu X -> Đóng menu
if (menuClose) {
    menuClose.addEventListener("click", closeMenu);
}

// 3. Khi bấm vào các mục điều hướng (Home, About...) -> Tự động đóng menu và cuộn xuống
navLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
});

// --- XỬ LÝ GỬI FORM LIÊN HỆ QUA EMAIL ---
const form = document.getElementById('contactForm');

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Chặn không cho trang web bị reload lại
        
        const formData = new FormData(form);
        const submitBtn = form.querySelector('.btn-submit');
        const originalBtnText = submitBtn.innerHTML;
        
        // Thay đổi trạng thái nút bấm trong lúc đợi gửi
        submitBtn.innerHTML = "<span>Sending...</span>";
        submitBtn.style.opacity = "0.7";
        submitBtn.disabled = true;

        // Gửi dữ liệu lên hệ thống Web3Forms
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
        // THÊM CHỮ async VÀO NGAY TRƯỚC (response) DƯỚI ĐÂY:
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                // Nếu gửi thành công
                submitBtn.innerHTML = "<span>Message Sent! ✓</span>";
                submitBtn.style.background = "#22c55e"; // Đổi nút sang màu xanh lá
                form.reset(); // Xóa sạch chữ vừa nhập trong form
            } else {
                // Nếu có lỗi hệ thống
                console.log(response);
                submitBtn.innerHTML = "<span>Error! Try again</span>";
                submitBtn.style.background = "#ef4444"; // Đổi nút sang màu đỏ
            }
        })
        .catch(error => {
            console.log(error);
            submitBtn.innerHTML = "<span>Network Error</span>";
        })
        .then(() => {
            // Sau 4 giây đưa nút bấm trở lại trạng thái ban đầu
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.style.background = ""; // Trả lại màu CSS cũ
                submitBtn.style.opacity = "1";
                submitBtn.disabled = false;
            }, 4000);
        });
    });
}