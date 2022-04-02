class login {
    constructor(form) {
        this.form = form;
        this.submit();
    }

    submit() {
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.authenticate();
        })
    }

    authenticate() {
        var username = document.getElementById("txtLogin").value;
        if (username.includes("@") == true && username.includes("@") == true) {
            console.log("Login type: Email");
            fetch("http://localhost:3030/User_info/email/" + username, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data[0].role);
                    if (data.length > 0) {
                        if (data[0].Password.localeCompare(document.getElementById("txtPwd").value) == 0) {
                            var login_info = {
                                Username: data[0].Username
                            }
                            if (data[0].role.localeCompare("admin") == 0) {
                                window.alert("Welcome Admin!");
                            }
                            fetch("http://localhost:3030/Login_info", {
                                    method: "POST",
                                    headers: {
                                        "content-type": "application/json",
                                        "accept": "application/json"
                                    },
                                    body: JSON.stringify(login_info)
                                })
                                .then((response) => {
                                    response.json()
                                    window.alert("Login successful");
                                    window.location.href = "/index.html";
                                })
                                .catch((error) => {
                                    console.log(error)
                                });

                        } else {
                            window.alert("Invalid password");
                        }
                    } else {
                        window.alert("User not found");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            console.log("Login type: Username");
            fetch("http://localhost:3030/User_info/Username/" + username, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    if (data.length > 0) {
                        if (data[0].Password.localeCompare(document.getElementById("txtPwd").value) == 0) {
                            var login_info = {
                                Username: data[0].Username
                            }
                            if (data[0].role.localeCompare("admin") == 0) {
                                window.alert("Welcome Admin!");
                            }
                            fetch("http://localhost:3030/Login_info", {
                                    method: "POST",
                                    headers: {
                                        "content-type": "application/json",
                                        "accept": "application/json"
                                    },
                                    body: JSON.stringify(login_info)
                                })
                                .then((response) => {
                                    response.json()
                                    window.alert("Login successful");
                                    window.location.href = "/index.html";
                                })
                                .catch((error) => {
                                    console.log(error)
                                });

                        } else {
                            window.alert("Invalid password");
                        }
                    } else {
                        window.alert("User not found");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }



}

const form = document.querySelector(".login-form");
const loginform = new login(form);