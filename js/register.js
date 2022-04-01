class register {
    constructor(form) {
        this.form = form;
        this.submit();
    }

    submit() {
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.register();
        })
    }

    register() {
        var user = {
            user_info: {
                Firstname: document.getElementById('txtFname').value,
                Lastname: document.getElementById('txtLname').value,
                Username: document.getElementById('txtUser').value,
                Password: document.getElementById('txtPwd').value,
                email: document.getElementById('txtEmail').value,
                role: "user",
            }

        };
        fetch("http://localhost:3030/User_info", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify(user)
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.code == 'ER_DUP_ENTRY') {
                    window.alert('This username is already used');
                } else {
                    window.location.href = '/succ.html';
                }
            })
            .catch((error) => {
                console.log(error)
            });


    }
}
const form = document.querySelector(".login-form");
const newuser = new register(form);


/*function registerr() {
    var data = {
        Firstname: document.getElementById('txtFname').value,
        Lastname: document.getElementById('txtLname').value,
        Username: document.getElementById('txtUser').value,
        email: document.getElementById('txtEmail').value,
        Password: document.getElementById('txtpwd').value
    };
    fetch("http://localhost:3030/user-register", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
            },

        })
        .then((response) => reponse.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error("Error:", error.message);
        })



}*/