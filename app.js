let _html = {};
let _request = {};
let _AUTH = "";

_html.login =
  "<h1>Login form</h1><hr/>" +
  "<label for='username'>Fill your username</label><br/>" +
  "<input id='username' type='text'/><br/>" +
  "<label for='password'>Your password</label><br/>" +
  "<input id='password' type='password'/><br/>" +
  "<button id='submitLogin' onclick='goToLogin();'>LOGIN</button><br/><br/>" +
  "<span>OR</span><br/>" +
  "<button id='registration' onclick='goToRegistration();'>Registration form</button>";

_html.logout = "<h2>You are logged out!</h2>" + _html.login;

_html.registration =
  "<h1>Registration form</h1><hr/>" +
  "<label for='username'>Fill your username</label><br/>" +
  "<input id='username' type='text'/><br/>" +
  "<label for='password'>Your password</label><br/>" +
  "<input id='password' type='password'/><br/>" +
  "<label for='confirm-password'>Confirm password</label><br/>" +
  "<input id='confirm-password' type='password'/><br/>" +
  "<button id='submitRegistration'>REGISTRATION</button><br/><br/>" +
  "<span>OR</span><br/>" +
  "<button id='login' onclick='goToLogin();'>Login form</button>";

_html.dashboard =
  "<h1>Dashboard</h1><hr/>" +
  "<table><tr><td>User name: </td><td id='username'>John Doe</td></tr>" +
  "<tr><td>User nik: </td><td id='usernik'>JD</td></tr>" +
  "<tr><td>User ID: </td><td id='userid'>0</td></tr>" +
  "</table><br>" +
  "<br>" +
  "<button id='login' onclick='goLogout();'>Log out</button>";

document.addEventListener("DOMContentLoaded", function () {
  console.log("App js and DOM is ready!");
  /**
   * Start logic
   */
  _appendDOM(_html.login);

  document
    .getElementById("submitLogin")
    .addEventListener("click", function (_el) {
      _request.login(_el);
    });
});

function goToRegistration() {
  _appendDOM(_html.registration);
}

function goToLogin() {
  _appendDOM(_html.login);
}

function goLogout() {
  _appendDOM(_html.logout);
}

function _appendDOM(_obj) {
  document.getElementsByTagName("body")[0].innerHTML = _obj;
}

_request.login = function (_this) {
  let _postObj = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  };
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(_postObj),
  }).then(function () {
    // _AUTH = response.body.toString()
    // _AUTH = "HASH-dchsdfukxyegnfxaueygnfuiwaF"
    //  Добавляем в ДОМ шаблон страницы для отображения данных пользователя
    _appendDOM(_html.dashboard);
    // Запрашиваем из сети данные о пользователе и сохраняем их в локальном хранилище
    _request.getUser();
    // Отображаем данные пользователя из локального хранилища
    _request.dashboard();
  });
};

_request.getUser = function (_this) {
  let _headers = {
    // "AUTH": _AUTH
  };
  fetch("http://jsonplaceholder.typicode.com/users/1", {
    method: "GET",
    headers: _headers,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response;
    })
    .then((response) =>
      response
        .json()
        .then((data) => ({
          data: data,
          status: response.status,
        }))
        .then((res) => {
          // Сохраняем информацию о пользователе в localStorage
          saveToLS("userDeatils", JSON.stringify(res.data));
          // localStorage.setItem('userDeatils', JSON.stringify(res.data))
          // Отображаем, сохраненную в localStorage информацию
          console.log(
            "Saved UserInfo (in the localStorage): ",
            // JSON.parse(getFromLS('userDeatils')) // Почему-то приводит к ошибке!???
            JSON.parse(localStorage.getItem("userDeatils"))
          );
        })
    )
    .catch((err) => console.error(`Fetch problem: ${err.message}`));
};

_request.dashboard = function (_this) {
  // Запрашиваем из локального хранилища данные о пользователе
  let userInfo = JSON.parse(localStorage.getItem("userDeatils"));
  // Отображаем данные пользователя на Dashboard пользователя или заглушки (если нужны)
  let id, name, nik;
  if (Object.keys(userInfo).length != 0) {
    id = userInfo.id;
    name = userInfo.name;
    nik = userInfo.username;
  } else {
    id = "[Used ID]";
    name = "[User name]";
    nik = "[User NIK]";
  }
  document.getElementById("userid").innerText = id;
  document.getElementById("username").innerText = name;
  document.getElementById("usernik").innerText = nik;
};

function saveToLS(_key, _value) {
  localStorage.setItem(_key, _value);
}

function getFromLS(_key) {
  localStorage.getItem(_key);
}
