export const generateRandomColors = (count: number, startHue: number = 0) => {
    return Array.from({ length: count }, (_, i) => {
        const hue = (startHue + i * (360 / count)) % 360;
        return {
            backgroundColor: `hsla(${hue}, 70%, 60%, 0.6)`,
            borderColor: `hsla(${hue}, 70%, 50%, 1)`
        };
    });
};

export const convertToPercentage = (data: { [key: string]: number }[]) => {
    return data.map(item => {
        const values = Object.values(item);
        const total = values.reduce((acc, curr) => acc + curr, 0);

        const percentageItem: { [key: string]: number } = {};
        Object.keys(item).forEach(key => {
            percentageItem[key] = total === 0 ? 0 : Number(((item[key] / total) * 100).toFixed(1));
        });

        return percentageItem;
    });
};
