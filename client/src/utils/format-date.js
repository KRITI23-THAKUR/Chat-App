/**
 * Converts a Date object or timestamp to a human-readable "time ago" string.
 * @param {Date | number | string} date
 * @returns {string}
 */
function formatDateInWords(date) {
    const now = new Date();
    const inputDate = new Date(date);
    const diffMs = now - inputDate;
    const diffSec = Math.floor(diffMs / 1000);

    if (diffSec < 60) return 'just now';
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)} minutes ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} hours ago`;
    if (diffSec < 604800) return `${Math.floor(diffSec / 86400)} days ago`;

    // For older dates, show formatted date
    return inputDate.toLocaleDateString();
}

export default formatDateInWords;