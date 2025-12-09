// Function to add the "navbarDark" class to the navbar on scroll
function handleNavbarScroll() {
    const header = document.querySelector(".navbar");
    const hero = document.querySelector("#home");
    if (!header || !hero) return;
    function updateNavbar() {
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        const scrollPosition = window.scrollY + header.offsetHeight;
        if (scrollPosition >= heroBottom) {
            header.classList.add("navbarDark");
        } else {
            header.classList.remove("navbarDark");
        }
    };
    updateNavbar();
    window.addEventListener("scroll", updateNavbar);
    window.addEventListener("resize", updateNavbar);
}

// Function to handle navbar collapse on small devices after a click
function handleNavbarCollapse() {
    const navLinks = document.querySelectorAll(".nav-item");
    const menuToggle = document.getElementById("navbarSupportedContent");

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            new bootstrap.Collapse(menuToggle).toggle();
        });
    });
}
// function that handles typewriting the title in the hero banner
document.addEventListener("DOMContentLoaded", () => {
    const titleEl = document.querySelector(".hero_title");
    const descEl = document.querySelector(".hero_desc");

    if (!titleEl || !descEl) return;

    const speed = 45;
    const pauseBetween = 250;

    function typeText(el, text, done) {
        el.textContent = "";
        el.classList.remove("type-hidden");
        let i = 0;

        function tick() {
            if (i < text.length) {
                el.textContent += text[i++];
                setTimeout(tick, speed);
            } else if (done) {
                setTimeout(done, pauseBetween);
            }
        }
        tick();
    }
    typeText(titleEl, titleEl.textContent.trim(), () => {
        typeText(descEl, descEl.textContent.trim());
    });
});


// Function to dynamically create HTML elements from the JSON file
function createSkillsFromJSON() {
    const container = document.querySelector("#skills .container");

    // Load the JSON file
    fetch("data/skills.json")
        .then((response) => response.json())
        .then((data) => {

            let row = document.createElement("div");
            row.classList.add("row");
            // Iterate through the JSON data and create HTML elements
            data.forEach((item, index) => {
                const card = document.createElement("div");
                card.classList.add("col-lg-4", "mt-4");
                const linkAttr = item.lien ? `data-link="${item.lien}"` : "";
                card.innerHTML = ` 
                    <div 
                    class="card skillsText ${item.lien ? "is-clickable" : ""}" 
                    ${linkAttr}
                    role="${item.link ? "link" : "group"}"
                    tabindex="${item.link ? "0" : "-1"}">
                        <div class="card-body">
                            <img 
                             src="./images/${item.image}"
                             class="skill-img"
                             alt= "skill-image" 
                             width="382"
                             height="150"/>
                            <h3 class="card-title mt-3">${item.title}</h3>
                            <p class="card-text mt-3">${item.text}</p>
                        </div>
                    </div>
                `;

                // Append the card to the current row
                row.appendChild(card);

                // If the index is a multiple of 3 or it's the last element, create a new row
                if ((index + 1) % 3 === 0 || index === data.length - 1) {
                    container.appendChild(row);
                    row = document.createElement("div");
                    row.classList.add("row");
                }
            });
            container.querySelectorAll(".skillsText.is-clickable").forEach((card) => {
                const url = card.dataset.link;
                if (!url) return;

                card.addEventListener("click", () => {
                    window.open(url, "_blank", "noopener");
                });

                // Access clavier
                card.addEventListener("keydown", (e) => {
                    if (e.key === "Enter") {
                        window.open(url, "_blank", "noopener");
                    }
                });
            });
        });
}
// Iterate through the JSON data and create HTML elements
function createPortfolioFromJSON() {
    const carouselInner = document.getElementById("portfolioCarouselInner");
    function getItemsPerSlide() {
        // resize the display of slide's number of cards according to screen size
        if (window.matchMedia("(max-width: 767.98px)").matches) {
            return 1
        }
        if (window.matchMedia("(max-width: 991.98px)").matches) {
            return 1
        }
        return 3
    }
    function render(data) {
        const itemsPerSlide = getItemsPerSlide();

        carouselInner.innerHTML = "";
        let slide;
        let row;
        // create a slide for the cards
        data.forEach((item, index) => {
            if (index % itemsPerSlide === 0) {
                slide = document.createElement("div");
                slide.classList.add("carousel-item");
                if (index === 0) slide.classList.add("active");

                row = document.createElement("div");
                row.classList.add("row", "justify-content-center");
                slide.appendChild(row);

                carouselInner.appendChild(slide);
            }
            // card creation 
            const card = document.createElement("div");
            card.classList.add("col-12", "col-lg-4", "mt-4");
            card.innerHTML = `
                    <div class="card portfolioContent">
                    <img class="card-img-top" src="images/${item.image}" style="width:100%" alt="project image">
                    <div class="card-body h-100">
                        <h3 class="card-title">${item.title}</h3>
                        <p class="card-text">${item.text}</p>
                        <div class="text-center">
                            <a href="${item.link}" class="btn btn-success" target="_blank" rel="noopener">Lien</a>
                        </div>
                    </div>
                </div>
                `;

            // Append the card to the current row
            row.appendChild(card);
        });
    }
    fetch("data/portfolio.json")
        .then((response) => response.json())
        .then((data) => {
            render(data);

            // Re-render if the size/ orientation changes
            window.addEventListener("resize", () => render(data));
        });
}


// Call the functions to execute the code

handleNavbarScroll();
handleNavbarCollapse();
createSkillsFromJSON();
createPortfolioFromJSON();
