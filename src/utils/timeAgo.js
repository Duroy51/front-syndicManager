// src/utils/timeAgo.js
export default function timeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    const intervals = [
        { label: 'année', seconds: 31536000 },
        { label: 'mois', seconds: 2592000 },
        { label: 'jour', seconds: 86400 },
        { label: 'heure', seconds: 3600 },
        { label: 'minute', seconds: 60 },
    ];
    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count > 1) {
            return `Il y a ${count} ${interval.label}s`;
        } else if (count === 1) {
            return `Il y a ${count} ${interval.label}`;
        }
    }
    return 'À l\'instant';
}
