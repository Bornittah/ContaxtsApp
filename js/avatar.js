let userdata=JSON.parse(localStorage.getItem('user'));
function generateAvatar(text, foregroundColor, backgroundColor) {
  
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = 200;
    canvas.height = 200;

    // Draw background
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw text
    context.font = "bold 100px Assistant";
    context.fillStyle = foregroundColor;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(userdata.username, canvas.width / 2, canvas.height / 2);

    return canvas.toDataURL("image/png");
}
document.getElementById("avatar").src = generateAvatar("", "white", "#0baa88");
document.querySelector('#caption').innerHTML=userdata.username;