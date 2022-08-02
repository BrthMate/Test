const EmailInput=document.querySelector("#floatingEmail");
const EmailMsg=document.querySelector("#email-msg");
const NameInput=document.querySelector("#floatingName");
const NameMsg=document.querySelector("#name-msg");
const TextInput=document.querySelector("#floatingTextarea2");
const TextMsg=document.querySelector("#text-msg");
const Button=document.querySelector("#btn");
const form = document.querySelector("form");

const content=document.querySelector(".modal-body")
const modal = document.querySelector(".modal")

let emailBoolean = false;
let nameBoolean = false;
let textBoolean = false;


document.getElementById("toggle").addEventListener("change",function() {

    if(this.checked){
        TextInput.addEventListener("keyup", ()=>{handleText(TextInput,TextMsg)})
        EmailInput.addEventListener("keyup", ()=>{handleEmail(EmailInput,EmailMsg)})
        NameInput.addEventListener("keyup", ()=>{handleName(NameInput,NameMsg)})
        Button.addEventListener("click", (e)=>{handleLogin(e)})
    }
    else{
        location.reload();
    }

});




handleEmail = (Input,Msg) =>{

    Input.classList.remove("is-valid","is-invalid")
    Msg.classList.remove("valid-feedback","invalid-feedback")

    regex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    emailBoolean = false;

    if(Input.value==""){
        Msg.innerHTML="Empty field"
    }
    else if(!regex.test(Input.value)){
        Msg.innerHTML="Inappropriate format"
    }
    else{
        Msg.innerHTML="Correct"
        emailBoolean = true;
    }

    if(!emailBoolean){
        Input.classList.add("is-invalid")
        Msg.classList.add("invalid-feedback")
    }else{
        Input.classList.add("is-valid")
        Msg.classList.add("valid-feedback")
    }

}

handleText = (Input,Msg) =>{

    Input.classList.remove("is-valid","is-invalid")
    Msg.classList.remove("valid-feedback","invalid-feedback")

    textBoolean = false;

    if(Input.value==""){
        Msg.innerHTML="Empty field"
    }else{
        Msg.innerHTML="Correct"
        textBoolean = true;
    }

    if(!textBoolean){
        Input.classList.add("is-invalid")
        Msg.classList.add("invalid-feedback")
    }else{
        Input.classList.add("is-valid")
        Msg.classList.add("valid-feedback")
    }

}

handleName = (Input,Msg) =>{

    Input.classList.remove("is-valid","is-invalid")
    Msg.classList.remove("valid-feedback","invalid-feedback")

    nameBoolean = false;

    if(NameInput.value==""){
        NameMsg.innerHTML="Empty field"
    }
    else{
        NameMsg.innerHTML="Correct"
        nameBoolean = true;
    }

    if(!nameBoolean){
        Input.classList.add("is-invalid")
        Msg.classList.add("invalid-feedback")
    }else{
        Input.classList.add("is-valid")
        Msg.classList.add("valid-feedback")
    }
}

handleLogin = (e) =>{
    e.preventDefault();
    handleEmail(EmailInput,EmailMsg)
    handleName(NameInput,NameMsg)
    handleText(TextInput,TextMsg)
    if(emailBoolean && nameBoolean && textBoolean){
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/send", true);
        xhr.onload = ()=>{
          if(xhr.readyState === XMLHttpRequest.DONE){
              if(xhr.status === 200){
                  let data = xhr.response;
                  JSONdata = JSON.parse(data);
                  dialogMessage(JSONdata.success);
              }
          }
        }
        let formData = new FormData(form);
        xhr.send(formData);
    }
}

dialogMessage = (text) =>{
    content.innerHTML=text
    $(".modal").modal('show');  
}