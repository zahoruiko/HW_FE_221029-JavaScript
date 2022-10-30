let _html       = {};
let _request    = {};
let _AUTH       = "";

_html.login = "<h1>Login form</h1><hr/>"
    + "<label for='username'>Fill your username</label><br/>"
    + "<input id='username' type='text'/><br/>"
    + "<label for='password'>Your password</label><br/>"
    + "<input id='password' type='password'/><br/>"
    + "<button id='submitLogin'>LOGIN</button><br/><br/>"
    + "<span>OR</span><br/>"
    + "<button id='registration' onclick='goToRegistration();'>Registration</button>";

_html.registration = "<h1>Registration form</h1><hr/>"
    + "<label for='username'>Fill your username</label><br/>"
    + "<input id='username' type='text'/><br/>"
    + "<label for='password'>Your password</label><br/>"
    + "<input id='password' type='password'/><br/>"
    + "<label for='confirm-password'>Confirm password</label><br/>"
    + "<input id='confirm-password' type='password'/><br/>"
    + "<button id='submitRegistration'>REGISTRATION</button><br/><br/>"
    + "<span>OR</span><br/>"
    + "<button id='login' onclick='goToLogin();'>Login</button>";

_html.dashboard = "<h1>Dashboard</h1><hr/>";

document.addEventListener('DOMContentLoaded', function(){
    console.log("App js and DOM is ready!");
    /**
     * Start logic
     */
    _appendDOM(_html.login);

    document.getElementById("submitLogin").addEventListener("click", function (_el) {
        _request.login(_el);
    });
});

function goToRegistration() {
    _appendDOM(_html.registration);
}

function goToLogin() {
    _appendDOM(_html.login);
}

function _appendDOM(_obj) {
    document.getElementsByTagName("body")[0].innerHTML = _obj;
}

_request.login = function (_this) {

    let _postObj = {
        username : document.getElementById("username").value,
        password : document.getElementById("password").value
    };

    fetch('https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body : JSON.stringify(_postObj)
        })
        .then(function (response) {
            // _AUTH = response.body.toString();
            // _AUTH = "HASH-dchsdfukxyegnfxaueygnfuiwaF";
            _appendDOM(_html.dashboard);
            _request.getUser();
        });
};

_request.getUser = function(_this) {
    let _headers = {
        // "AUTH": _AUTH
      }
    fetch('http://jsonplaceholder.typicode.com/users/1', { 
        method: 'GET',
        headers: _headers
    }).then(response => 
        response.json().then(data => ({
            data: data,
            status: response.status
        })
    ).then(res => {
        // Сохраняем информацию о пользователе в localStorage
        localStorage.setItem('userDeatils', JSON.stringify(res.data));
        // Для проверки успешности предыдущей операции - отображаем в консоль информацию, сохраненную в localStorage
        console.log("UserInfo in the localStorage: ", JSON.parse(localStorage.getItem('userDeatils')));
    }));
}

function saveToLS(_key, _value) {
    localStorage.setItem(_key, _value);
}

function getFromLS(_key) {
    localStorage.getItem(_key);
}

function saveUserIdToLS(userId) {
    localStorage.setItem('userid', userId);
}


function getUserIdFromLS() {
    localStorage.getItem('userid');
}
