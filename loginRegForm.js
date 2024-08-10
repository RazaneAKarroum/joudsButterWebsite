const loginBtn = document.querySelector("#loginBtn");
const regBtn = document.getElementsByClassName("submitReginBtn");


loginBtn.addEventListener("click", () => {
  console.log("login btn 2 is clicked");
  window.open("/userAccount.html");
});

//show hidden password
const showHiddenPass = () => {
  const passInput = document.getElementById("loginPassword");
  const eyeIcon = document.getElementById("loginEye");
  console.log(`this is passInput: ${passInput}`);
  console.log(`this is eyeIcon: ${eyeIcon}`);

  eyeIcon.addEventListener("click", () => {
    console.log(`${eyeIcon} is clicked`);
    //change password to text
    if (passInput.type === "password") {
      //switch to text
      passInput.type = "text";
      //icon change
      eyeIcon.classList.add("fa-eye");
      eyeIcon.classList.remove("fa-eye-slash");
    } else {
      //change to password
      passInput.type = "password";
      //icon change
      eyeIcon.classList.add("fa-eye-slash");
      eyeIcon.classList.remove("fa-eye");
    }
  });
};

showHiddenPass();
//end login and registration form
