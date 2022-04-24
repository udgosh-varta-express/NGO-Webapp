function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// function bodyBackground() {
//   let body = document.body;
//   let title = document.title.toLowerCase();
  
//   if (title == "join us") {
//     body.className += "body-background-work"
//   } else if (title == "home") {
//   } else{
//     body.className += "body-background-donate"
//   }

// }

// bodyBackground()