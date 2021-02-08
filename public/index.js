
const userName = document.querySelector('#name');
const form = document.querySelector('#enter');
const validate = document.querySelector('small')



//logga in
console.log(userName);
form.addEventListener('submit', (e) => {
  if(userName.value.trim().length < 1){
    e.preventDefault()
    validate.innerText = 'Enter your name please'
    userName.focus();

  }else {
    // e.preventDefault();
    // console.log(userName.value);
    // document.cookie = `form/title=testar; expires=Tue, 29 Aug 2021 12:00:01 UTC`;
    // document.cookie = `Cookiecutter; expires=Tue, 29 Aug 2021 12:00:01 UT`;
    // setTimeout(function(){
    //     window.location = "./chat.html";
    // }, 1000);
    document.cookie = `${userName.value}; expires=Tue, 29 Aug 2021 12:00:01 UTC`
    window.location = "./chat.html";
 
    
    
  }
  e.preventDefault()
})


userName.addEventListener('keyup', () =>{
  validate.innerText = ''
})