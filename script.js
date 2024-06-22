document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById("video");
    const components = document.querySelectorAll(".component");
    const componentTimes = [3, 6, 9, 12, 17, 22, 26]; // updated times in seconds for each component
    const scrollDuration = 2.0; // More smooth and slower scroll duration
    const scrollPause = 1000; // Increased pause duration to ensure stopping

    video.addEventListener("loadedmetadata", () => {
        video.pause();
    });

    let options = {
        threshold: 0.5
    };

    let observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let index = Array.from(components).indexOf(entry.target);
                gsap.to(video, {
                    currentTime: componentTimes[index],
                    duration: 1,
                    onUpdate: function() {
                        if (video.currentTime >= componentTimes[index]) {
                            video.pause();
                        }
                    }
                });
                entry.target.classList.add("visible");
            }
        });
    }, options);

    components.forEach(component => {
        observer.observe(component);
    });

    let currentComponentIndex = 0;

    document.getElementById("scroll-up").addEventListener("click", () => {
        if (currentComponentIndex > 0) {
            currentComponentIndex--;
            scrollToComponent(currentComponentIndex);
        } else {
            scrollToTop();
        }
    });

    document.getElementById("scroll-down").addEventListener("click", () => {
        if (currentComponentIndex < components.length - 1) {
            currentComponentIndex++;
            scrollToComponent(currentComponentIndex);
        }
    });

    function scrollToComponent(index) {
        gsap.to(window, {
            scrollTo: components[index],
            duration: scrollDuration,
            onComplete: function() {
                setTimeout(() => {
                    isScrolling = false;
                }, scrollPause);
            }
        });
    }

    function scrollToTop() {
        gsap.to(window, {
            scrollTo: { y: 0 },
            duration: scrollDuration,
            onComplete: function() {
                setTimeout(() => {
                    isScrolling = false;
                }, scrollPause);
            }
        });
    }
    document.addEventListener("DOMContentLoaded", function() {
        const dropdown = document.querySelector(".dropdown");
        dropdown.addEventListener("mouseover", function() {
            this.querySelector(".dropdown-content").style.display = "block";
        });
        dropdown.addEventListener("mouseout", function() {
            this.querySelector(".dropdown-content").style.display = "none";
        });
    });
});
