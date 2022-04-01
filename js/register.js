class register {
    constructor(form, fields) {
        this.form = form;
        this.fields = fields;
        this.createUser();
    }

    submit() {
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            console.log(this.fields);
        })
    }

    validate(fields) {
        fetch("http://localhost:3030/User_info"), {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
            }
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });

    }

    const form = document.querySelector(".login-form");
    if (form) {
        const fields = ["txtFname", "txtLname", "txtUser", "txtEmail", "txtPwd"];
        const newuser = new register(form, fields);
    }

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