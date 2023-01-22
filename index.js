window.usersData = []

const createUserElement = ({username, email, birthDate, gender, image}) => {
    const userContaienr = document.createElement("div");
    userContaienr.className = 'user';
    const userBody = document.createElement("div");
    userBody.className = 'user__body';

    const userName = document.createElement("div");
    userName.className = "user__username";

    const userEmail = document.createElement("div");
    const userBirthDate = document.createElement("div");
    const userGender = document.createElement("div");
    const userImage = document.createElement("div");
    const img = document.createElement("img");

    userName.innerText = `Name: ${username}`
    userEmail.innerText = `Email: ${email}`
    userBirthDate.innerText = `Birth Date: ${birthDate}`
    userGender.innerText = `Gender: ${gender}`

    img.src = image
    userImage.appendChild(img)
    userImage.className = "user__image"

    userContaienr.appendChild(userName);

    userBody.appendChild(userEmail);
    userBody.appendChild(userBirthDate);
    userBody.appendChild(userGender);
    userBody.appendChild(userImage);

    userContaienr.appendChild(userBody);

    return userContaienr
}
const drawUsers = (usersData = []) => {
    const usersList = document.getElementById("users");

    usersList.innerHTML = ""
    if (!(usersData || []).length) {
        const error = document.createElement("div");
        error.className = 'error-message';
        error.innerText = "Unfortunately, no matching names were discovered."
        usersList.appendChild(error)
    }

    usersData.forEach((user) => {
        usersList.appendChild(createUserElement(user))
    });
}

const getUsersList = async () => {
    try {
      const response = await fetch("https://dummyjson.com/users");
      const {users} = await response.json();
      window.usersData = users
    } catch (error) {
      console.log(error);
      window.usersData = [];
    }

    drawUsers(window.usersData)
}

const searchUsers = () => {
    const searchInput = document.getElementById('search-input').value

    if (!searchInput) {
        drawUsers(window.usersData)
    }

    let filteredUsers = window.usersData.filter(({username}) => username.toLowerCase().includes((searchInput || '').toLowerCase()));

    drawUsers(filteredUsers)
}
