function getGithubInfo(user) {
  //1. Create an instance of XMLHttpRequest class and send a GET request using it.
  // The function should finally return the object(it now contains the response!)

  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "https://api.github.com/users/" + user, true);
  xhttp.send();
  return xhttp;
}

function showUser(user) {
  //2. set the contents of the h2 and the two div elements in the div '#profile' with the user content
  $("#profile").show();
  $("#profile").addClass("profile");
  $(".errorMessage").hide();
  $("#profile").find("h2").text(user.name);
  $(".avatar").html(`<img class="img img-fluid" src=${user.avatar_url} />`);
  $(".information").html(`<span>Number of Repos :</span> ${user.public_repos}`);
  $(".information").append(
    `<div><a href=${user["repos_url"]}>Repos</a></li></div>`
  );
  $(".information").append(
    `<div><a href=${user["html_url"]}>User Profile</a></li></div>`
  );
}

function noSuchUser(username) {
  //3. set the elements such that a suitable message is displayed
  $("#profile").hide(); // Hiding the profile div
  $(".errorMessage").html(`No user found with UserName "${username}"`);
  $(".errorMessage").show(); // Showing the Error message
}

$(document).ready(function () {
  $(document).on("keypress", "#username", function (e) {
    //check if the enter(i.e return) key is pressed
    $("#profile").removeClass("profile");
    $("#profile").hide();
    if (e.which == 13) {
      //get what the user enters
      username = $(this).val();
      //reset the text typed in the input
      $(this).val("");
      //get the user's information and store the respsonse
      response = getGithubInfo(username);
      response.onreadystatechange = function (resp) {
        if (this.readyState == 4) {
          if (this.status == 200) {
            showUser(JSON.parse(this.responseText));
            //else display suitable message
          } else {
            noSuchUser(username);
          }
        }
      };
    }
  });
});
