// JavaScript to handle the fade-in effect on scroll
document.addEventListener("DOMContentLoaded", function () {
    const fadeElements = document.querySelectorAll(".fade-in");

    function checkFade() {
      fadeElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
          element.style.opacity = "1";
        }
      });
    }

    // Initial check on page load
    checkFade();

    // Check on scroll
    window.addEventListener("scroll", checkFade);
});


// Function to handle continent selection
simplemaps_worldmap.hooks.click_region = function(id){
    openNewWindow(simplemaps_worldmap_mapdata.regions[id].name)
}
