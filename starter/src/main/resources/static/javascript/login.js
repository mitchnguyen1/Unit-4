const form = document.getElementById("login-form")
const username = document.getElementById("login-username")
const password = document.getElementById("login-password")
const headers = {
    'Content-Type':'application/json'
}

const baseUrl = 'http://localhost:8080/api/v1/users'

const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
        username: username.value,
        password: password.value
    }
    const response = await fetch(`${baseUrl}/login`,{
        method:"POST",
        body: JSON.stringify(body),
        headers: headers
    })
    .catch(err => console.log(err.message))

    const responseArr = await response.json()
    console.log(responseArr)
    if(response.status === 200){
        document.cookie = `userId=${responseArr[1]}`
        window.location.replace(responseArr[0])
    }

}

form.addEventListener("submit",handleSubmit)