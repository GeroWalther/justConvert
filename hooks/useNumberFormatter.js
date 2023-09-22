export const useNumberFormatter = () => {
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 6,
  });
  const formatNumber = (value) => {
    if (!value) {
      return value;
    }
    const splitted = value.toString().split('.');

    if (splitted.length > 1) {
      return formatter.format(Number(splitted[0])) + '.' + splitted[1];
    }

    return formatter.format(value);
  };

  const revertNumberFormat = (value) => {
    console.log(value);
    if (!value) {
      return value;
    }

    return value.replace(/,/g, '');
  };

  return {
    formatNumber,
    revertNumberFormat,
  };
};
