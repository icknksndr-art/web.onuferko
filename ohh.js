const userslist=document.getElementById('userslist');
fetch('https://jsonplaceholder.typicode.com/users').then(response => {
    if (!response.ok) {
        throw new Error('Помилка з.єднання');
    }
    return response.json();
})
.then(users => {
    users.forEach(user =>)
const userDiv = document.createElement('div');
userDiv.className='user';
userDiv.innerHTML=`
<b>Ім.я:</b> ${user.name}
<br>
<b>Електронна аошта:</b> ${user.gmail}`;
userslist.appendChild(userDiv);
});
.catch(console.error( => {
    usersList.innerHTML = `<div class="error">Error loading data</div>`;
});
)
console.error=('Помилка:', error)