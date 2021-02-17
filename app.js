const bodySelector = document.querySelector('body');
const nemo = document.querySelector('.nemo');
const nemoContainer = document.querySelector('.nemoContainer');
const sharkContainer = document.querySelector('.sharkContainer');
const formSelector = document.querySelector('form');
const goldieSelector = document.querySelector('.goldie');

// On document ready:
document.addEventListener('mousemove', function (e) {
    const wExtent = window.innerWidth + 300;
    const yDist = Math.abs(e.pageY - goldieSelector.y);

    animateGoldie();

    //function to animate Goldie the goldfish
    function animateGoldie() {
        goldieSelector.animate([
            // Specify keyframes for Goldie animation
            { transform: `scale(1) skewY(0) translate(0px, 0px)` },
            { transform: `scale(1.05) skewY(-7deg) skewX(10deg) rotateZ(-10deg) rotateY(40deg) translate(${(-wExtent / 9) * 2}px, ${(yDist / 9) * 2}px` },
            { transform: `scale(0.95, 1) translate(${(-wExtent / 9) * 3}px, ${(yDist / 9) * 3}px` },
            { transform: `scale(1.05) skewY(-7deg) skewX(-10deg) rotateY(-30deg)translate(${(-wExtent / 9) * 4}px, ${(yDist / 9) * 4}px` },
            { transform: `scale(0.8, 1) skewY(0deg) rotateY(10deg) translate(${(-wExtent / 9) * 7}px, ${(yDist / 9) * 5}px` },
            { transform: `scale(1.05) skewY(-7deg) skewX(-10deg) rotateY(0deg)translate(${(-wExtent / 9) * 7.5}px, ${(yDist / 9) * 7.5}px` },
            { transform: `scale(0.8, 1) skewY(0deg) rotateY(-20deg) translate(${(-wExtent / 9) * 8}px, ${(yDist / 9) * 8}px` },
            { transform: `scale(1.05) skewX(-10deg) skewY(-7deg) rotateY(20deg)translate(${(-wExtent / 9) * 8.5}px, ${(yDist / 9) * 8.5}px` },
            { transform: `scale(0.8, 1) skewY(0deg) rotateY(-20deg) translate(${(-wExtent / 9) * 9}px, ${(yDist / 9) * 8}px` }
        ], {
            // timing options for animation
            duration: 7000,
            iterations: 1,
            fill: "forwards",
            easing: "cubic-bezier(.61,.42,1,.87)"
        });
    }

}, { once: true });

// Add event listener for mouse entering nemo's swimming space
nemoContainer.addEventListener('mouseenter', function (e) {
    nemo.style.transition = "all 0.3s ease";
    // Generate a random number from 0.7 to 0.8;
    let randomNum = (Math.floor(Math.random() * 2) + 7) / 10;
    console.log(`rand: ${randomNum}`);
    // Add event listener to register clicks (knocks) on the aquarium glass
    nemoContainer.addEventListener('click', function (event) {
        nemo.style.transform = `scale(${randomNum}) rotateX(20deg) rotateY(20deg) rotateZ(5deg)`;
        nemo.style.opacity = 0.7;
        nemo.style.transition = "all 0.9s ease";
    });
});

// Set Nemo opacity back to 1 (i.e.: closer to screen) with a smooth transition of 1.3s when the mouse leaves Nemo's fish bowl.
nemoContainer.addEventListener('mouseleave', function (e) {
    nemo.style.opacity = 1;
    nemo.style.transition = "all 1.3s ease"
});

// Add event listener for moving mouse in nemo's fish bowl container
nemoContainer.addEventListener('mousemove', function (e) {
    let xCor = -((e.pageX / 10) - 85);
    let yCor = -((e.pageY / 10) - 175);
    console.log(`${xCor}, ${yCor}`);

    translateFish();

    // Helper function to translate fish on the screen 
    function translateFish() {
        nemo.style.transform = `translate(${xCor}px, ${yCor}px)`;
    }
});

// Add interactive gradient effects when mouse enters shark container
sharkContainer.addEventListener('mousemove', function (e) {

    //page center = page half 
    let pageCenter = window.innerWidth / 2;
    //Defines number of turns of 180 the page's current viewport width maps to
    let gradientRange = window.innerWidth / 180;
    // Expresses the current page X position with respect to the full page width as a fraction of 180
    let spinner = e.pageX / gradientRange;

    updateSpinner();
    updateGradDir();

    // Function to update the current background gradient angle as a function of the current cursor's x position based on the viewport width as mapped through a span from 270 degrees clockwise through to 90 degrees (180 degrees sweep).
    function updateSpinner() {
        if (spinner < 90) {
            spinnerFiltered = Math.abs(-270 - spinner);
        } else if (spinner >= 90) {
            spinnerFiltered = Math.abs(180 - spinner * 2);
        }
    }
    // Function to update the gradient direction as a function of the current mouseX position as mapped to the full width of the screen as a fraction of 180degrees.
    function updateGradDir() {
        sharkContainer.style.backgroundImage = ` linear-gradient(${spinnerFiltered}deg, rgba(2,0,36,0.5) 0%, rgba(52,144,255,0.4) 0%, rgba(10,47,69,0.6) 100%), url("./assets/banner.jpg")`;
    }

});

