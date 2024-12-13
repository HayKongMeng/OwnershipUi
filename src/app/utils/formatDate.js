export default function formatDate(apiDate) {
    const date = new Date(apiDate);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
}

export function formatDateBC(apiDate) {
    const dateString = apiDate.split(' ')[0];
    const formattedDate = new Date(dateString);

    if (isNaN(formattedDate)) {
        return 'Invalid Date';
    }

    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(formattedDate);
}
