let lastKeyTime = 0;

function handleKeyPress(event) {
    // Check if the pressed key is 'u' or 'U'
    if (event.key === 'u' || event.key === 'U') {
        const currentTime = new Date().getTime();

        // Check if the time between key presses is less than 500 milliseconds
        if (currentTime - lastKeyTime < 500) {
            // If it's a double press within the time frame, call the function
            clickThumbsUpImage();
        }

        // Update the last key press time
        lastKeyTime = currentTime;
    }
}

// Add event listener for keydown
document.addEventListener('keydown', handleKeyPress);

// Your clickThumbsUpImage function
function clickThumbsUpImage() {
    // Array of possible thumbs-up emoji with different skin tones
    const thumbsUpVariants = [
        '👍',  // default
        '👍🏻', // light skin tone
        '👍🏼', // medium-light skin tone
        '👍🏽', // medium skin tone
        '👍🏾', // medium-dark skin tone
        '👍🏿'  // dark skin tone
    ];

    // Find the thumbs-up image by iterating over the possible alt values
    let thumbsUpImage = thumbsUpVariants
        .map(variant => document.querySelector(`img[alt="${variant}"]`))
        .find(image => image !== null);  // Find the first non-null image
    
    if (thumbsUpImage) {
        thumbsUpImage.click();
    } else {
        let moodIcon = Array.from(document.querySelectorAll('i.google-material-icons-filled'))
            .find(icon => icon.textContent.trim() === "mood");

        if (moodIcon) {
            moodIcon.click();

            setTimeout(() => {
                let thumbsUpImage = thumbsUpVariants
                .map(variant => document.querySelector(`img[alt="${variant}"]`))
                .find(image => image !== null);  // Find the first non-null image
                if (thumbsUpImage) {
                    thumbsUpImage.click();
                } else {
                    console.error('Thumbs up image not found even after clicking mood icon.');
                }
            }, 500);
        } else {
            console.error('Mood icon not found.');
        }
    }
}
