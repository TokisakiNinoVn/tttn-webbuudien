document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    fetch("/api/public/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === "Login successful") {
        alert("Đăng nhập thành công!");
        window.location.href = "/customerList.html"; // Điều hướng đến trang danh sách khách hàng
      } else {
        alert("Tên đăng nhập hoặc mật khẩu không đúng!");
      }
    })
    .catch(error => console.error("Error:", error));
  });
  