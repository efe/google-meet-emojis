let lastKeyTimeU = 0;
let lastKeyTimeD = 0;

function handleKeyPress(event) {
    const currentTime = new Date().getTime();

    // Check if the pressed key is 'u' or 'U' for thumbs up
    if (event.key === 'u' || event.key === 'U') {
        if (currentTime - lastKeyTimeU < 500) {
            clickImageOf(findThumbsUpImage);
        }
        lastKeyTimeU = currentTime;
    }

    // Check if the pressed key is 'd' or 'D' for thumbs down
    if (event.key === 'd' || event.key === 'D') {
        if (currentTime - lastKeyTimeD < 500) {
            clickImageOf(findThumbsDownImage);
        }
        lastKeyTimeD = currentTime;
    }
}

// Add event listener for keydown
document.addEventListener('keydown', handleKeyPress);

// Method to find the thumbs-up image (for any skin tone)
function findThumbsUpImage() {
    const thumbsUpVariants = [
        '👍',  // default
        '👍🏻', // light skin tone
        '👍🏼', // medium-light skin tone
        '👍🏽', // medium skin tone
        '👍🏾', // medium-dark skin tone
        '👍🏿'  // dark skin tone
    ];

    return thumbsUpVariants
        .map(variant => document.querySelector(`img[alt="${variant}"]`))
        .find(image => image !== null);
}

// Method to find the thumbs-down image (for any skin tone)
function findThumbsDownImage() {
    const thumbsDownVariants = [
        '👎',  // default
        '👎🏻', // light skin tone
        '👎🏼', // medium-light skin tone
        '👎🏽', // medium skin tone
        '👎🏾', // medium-dark skin tone
        '👎🏿'  // dark skin tone
    ];

    return thumbsDownVariants
        .map(variant => document.querySelector(`img[alt="${variant}"]`))
        .find(image => image !== null);
}

// Generic function to click the image (e.g., thumbs up or down) and retry after clicking the mood icon
function clickImageOf(findImageFn) {
    let image = findImageFn();

    if (image) {
        image.click();
    } else {
        let moodIcon = Array.from(document.querySelectorAll('i.google-material-icons-filled'))
            .find(icon => icon.textContent.trim() === "mood");

        if (moodIcon) {
            moodIcon.click();

            // Retry after clicking the mood icon
            setTimeout(() => {
                image = findImageFn();
                if (image) {
                    image.click();
                } else {
                    console.error('Image not found even after clicking mood icon.');
                }
            }, 1000); // wait for the DOM to update after clicking
        } else {
            console.error('Mood icon not found.');
        }
    }
}
