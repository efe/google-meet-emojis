let lastKeyTime = {};

function handleKeyPress(event) {
    handleDoublePress(event.key, 'u', findThumbsUpImage);
    handleDoublePress(event.key, 'd', findThumbsDownImage);
    handleDoublePress(event.key, 'a', findClapImage);
    handleDoublePress(event.key, 'p', findPartyImage);
    handleDoublePress(event.key, 'h', findHeartImage);
    handleDoublePress(event.key, 'l', copyUrlToClipboard);
}

// Generic function to handle double key presses
function handleDoublePress(pressedKey, targetKey, findImageFn) {
    const currentTime = new Date().getTime();

    // Initialize last key press time for the target key
    if (!lastKeyTime[targetKey]) {
        lastKeyTime[targetKey] = 0;
    }

    // Check if the pressed key matches the target key (case-insensitive)
    if (pressedKey.toLowerCase() === targetKey) {
        if (currentTime - lastKeyTime[targetKey] < 500) {
            // If it's a double press within the time frame, call clickImageOf
            clickImageOf(findImageFn);
        }
        // Update the last key press time for the target key
        lastKeyTime[targetKey] = currentTime;
    }
}

// Add event listener for keydown
document.addEventListener('keydown', handleKeyPress);

// Method to find the thumbs-up image (for any skin tone)
function findThumbsUpImage() {
    const thumbsUpVariants = [
        '👍', '👍🏻', '👍🏼', '👍🏽', '👍🏾', '👍🏿'
    ];
    return findEmojiImage(thumbsUpVariants);
}

// Method to find the thumbs-down image (for any skin tone)
function findThumbsDownImage() {
    const thumbsDownVariants = [
        '👎', '👎🏻', '👎🏼', '👎🏽', '👎🏾', '👎🏿'
    ];
    return findEmojiImage(thumbsDownVariants);
}

// Method to find the clap emoji (for any skin tone)
function findClapImage() {
    const clapVariants = [
        '👏', '👏🏻', '👏🏼', '👏🏽', '👏🏾', '👏🏿'
    ];
    return findEmojiImage(clapVariants);
}

// Method to find the party emoji
function findPartyImage() {
    const partyVariants = ['🎉'];
    return findEmojiImage(partyVariants);
}

// Method to find the heart emoji
function findHeartImage() {
    const heartVariants = ['💖'];
    return findEmojiImage(heartVariants);
}

// Utility method to find the emoji image based on a list of variants
function findEmojiImage(emojiVariants) {
    return emojiVariants
        .map(variant => document.querySelector(`img[alt="${variant}"]`))
        .find(image => image !== null);
}

// Generic function to click the image (e.g., thumbs up, thumbs down, etc.) and retry after clicking the mood icon
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

// Function to copy the current URL to the clipboard
function copyUrlToClipboard() {
    const url = window.location.href; // Get the current URL
    navigator.clipboard.writeText(url).then(() => {
        console.log('URL copied to clipboard:', url);
    }).catch(err => {
        console.error('Failed to copy URL to clipboard:', err);
    });
}
