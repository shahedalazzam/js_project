const clientID = '7c552e8aae380ca7bff3';
const clientSecret = '367a5efeb7f98beefbfc1e1067aee7ff166566ac';

let button1 = document.getElementById("button1");
let input1 = document.getElementById("input1");

button1.onclick = function () {
    console.log(input1.value);
    search(input1.value, "user1");
};

let button2 = document.getElementById("button2");
let input2 = document.getElementById("input2");

button2.onclick = function () {
    console.log(input2.value);
    search(input2.value, "user2");
};

function search(username, user) {
    const URL = `https://api.github.com/users/${username}`;

    const headers = new Headers();
    headers.append('Authorization', `Basic ${btoa(`${clientID}:${clientSecret}`)}`);
    headers.append('Accept', 'application/vnd.github.v3+json');

    fetch(URL, {
        headers: headers
    })
        .then((response) => response.json())
        .then((repo) => {
            console.log(repo);
            let img = document.getElementById(`image${user}`);
            img.src = repo.avatar_url;
            let login = document.getElementById(`full_name${user}`);
            login.innerText = repo.login;
            let repos = document.getElementById(`public_repos${user}`);
            repos.innerText = repo.public_repos;
        })
        .catch((error) => {
            console.error(error);
        });
}

function compareRepo() {
    let user1Repo = document.getElementById("public_reposuser1").innerText;
    let user2Repo = document.getElementById("public_reposuser2").innerText;

    let resultElement = document.getElementById("comparisonResult");

    if (user1Repo > user2Repo) {
        resultElement.innerText = "User1 has more repositories";
    } else if (user1Repo < user2Repo) {
        resultElement.innerText = "User2 has more repositories";
    } else {
        resultElement.innerText = "Both users have an equal number of repositories";
    }
}