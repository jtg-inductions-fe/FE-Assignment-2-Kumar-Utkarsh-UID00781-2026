export const normalizeTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const meridian = parseInt(hours) >= 12 ? 'PM' : 'AM';
    const numericHours = parseInt(hours) === 0 ? 12 : parseInt(hours);

    const normalizedHours =
        numericHours > 12 ? numericHours - 12 : numericHours;

    return `${normalizedHours}:${minutes} ${meridian}`;
};
