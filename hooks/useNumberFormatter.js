export const useNumberFormatter = () => {
<<<<<<< HEAD
  const formatter = new Intl.NumberFormat("en-US");

=======
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 6,
  });
>>>>>>> master
  const formatNumber = (value) => {
    if (!value) {
      return value;
    }
<<<<<<< HEAD
=======
    const splitted = value.toString().split('.');

    if (splitted.length > 1) {
      return formatter.format(Number(splitted[0])) + '.' + splitted[1];
    }
>>>>>>> master

    return formatter.format(value);
  };

  const revertNumberFormat = (value) => {
<<<<<<< HEAD
=======
    console.log(value);
>>>>>>> master
    if (!value) {
      return value;
    }

<<<<<<< HEAD
    return Number(value.replace(/,/g, ""));
=======
    return value.replace(/,/g, '');
>>>>>>> master
  };

  return {
    formatNumber,
<<<<<<< HEAD
    revertNumberFormat
=======
    revertNumberFormat,
>>>>>>> master
  };
};
