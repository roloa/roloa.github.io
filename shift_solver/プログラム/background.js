(function () {

    
    let app = document.getElementById("app");

    let choosen_image_index = Math.floor(Math.random() * image_filename_list.length);
    let choosen_image_filename = image_filename_list[choosen_image_index];

    app.style.backgroundImage = "url('../画像/" + choosen_image_filename + "')"

})();