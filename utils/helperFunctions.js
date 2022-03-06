import {
  SHORT_MONTH_NAMES,
  LONG_MONTH_NAMES,
  MAX_TEMP,
  MIN_TEMP,
  MAX_HUMID,
  MEAN_HUMID,
  PATTERN_FOR_DATE_MONTH,
  PATTERN_FOR_MONTH,
} from './consts.js';

/**
 * This function converts date and month from numbers to a more suitable format (2004/08 --> 2004_Aug) so it could be used to reference the object
 * @param {String} dateAndMonth
 * @returns {String} Formatted version of the date
 */
export const getFileName = (dateAndMonth) => {
  const [year, month] = dateAndMonth.split('/');
  const output = `${year}_${SHORT_MONTH_NAMES[parseInt(month, 10)]}`;
  return output;
};

/**
 * This function calculates the average by ignoring the null values
 * @param {Object} data
 * @param {Number} length
 * @returns {Number} result
 */
export const takeAverage = (data, length) => {
  const result = (data.value / (length - data.countNull)).toFixed(2);
  return result;
};

/**
 * This function takes in the number of '+' signs to be made and then displays them accordingly
 * @param {Number} number
 * @returns {String} A string comprising of '+' signs
 */
export const makeSymbols = (number) => {
  let outputString = '';
  for (let i = 0; i < number; i += 1) {
    outputString += '+';
  }
  return outputString;
};

/**
 * This function takes in the date and displays them in a more readable way (2004-6-12 --> June 12)
 * @param {String} date
 * @returns {String} Formatted version of the date
 */
export const getDateFromString = (date) => {
  try {
    const [, month, day] = date.split('-');
    return `${LONG_MONTH_NAMES[parseInt(month, 10)]} ${day}`;
  } catch (e) {
    throw e;
  }
};

/**
 * This function takes temperature and humidity and displays them in a neat fashion
 * @param {Object} temperature
 * @param {Object} humidity
 * @prints the temperature and humidity
 */
export const logExtremeClimate = (temperature, humidity) => {
  try {
    console.log(
      `\nHighest: ${temperature.highest.value}C on ${getDateFromString(
        temperature.highest.date
      )}`
    );
    console.log(
      `Lowest: ${temperature.lowest.value}C on ${getDateFromString(
        temperature.lowest.date
      )}`
    );
    console.log(
      `Humidity: ${humidity.highest.value}% on ${getDateFromString(
        humidity.highest.date
      )}\n`
    );
  } catch (e) {
    throw e;
  }
};

/**
 * This function takes average temperature and humidity and displays them in a neat fashion
 * @param {Object} temperature
 * @param {Object} humidity
 * @prints the average temperature and humidity
 */
export const logAverageClimate = (temperature, humidity) => {
  console.log(`\nHighest Average: ${temperature.highest.value}C`);
  console.log(`Lowest Average: ${temperature.lowest.value}C`);
  console.log(`Average Mean Humidity: ${humidity.highest.value}%\n`);
};

/**
 * This function checks if the year and month is available in the weatherData object
 * @param {Object} weatherData
 * @param {String} year
 * @param {String} month
 */
export const checkAvailableYearAndMonth = (weatherData, year, month) => {
  try {
    if (!(year in weatherData)) {
      throw '\nThe data for this year is not available\n';
    }

    if (!(month in weatherData[year])) {
      throw '\nThe data for this month is not available\n';
    }
  } catch (e) {
    throw e;
  }
};

/**
 * This function checks if a pattern exists in the string
 * @param {String} dateAndMonth
 * @param {String} patternForDateMonth
 */
export const checkPattern = (input, constantPattern) => {
  try {
    if (!constantPattern.test(input)) {
      throw '\nInvalid Input\n';
    }
  } catch (e) {
    throw e;
  }
};

/**
 * This function returns the highest and lowest temperature and highest humidity after calculations
 * @param {Object} weatherData
 * @returns {Object} { temperature, humidity }
 */
export const tempAndHumidityCalculations = (weatherData) => {
  const temperature = {
    highest: { date: '', value: Number.NEGATIVE_INFINITY },
    lowest: { date: '', value: Number.POSITIVE_INFINITY },
  };
  const humidity = { highest: { date: '', value: Number.NEGATIVE_INFINITY } };

  for (const [key] of Object.entries(weatherData)) {
    const tempWeatherData = weatherData[key];

    for (const singleData of tempWeatherData) {
      if (parseInt(singleData[MAX_TEMP]) > temperature.highest.value) {
        temperature.highest.value = parseInt(singleData[MAX_TEMP]);
        temperature.highest.date = singleData.PKT;
      }

      if (parseInt(singleData[MIN_TEMP]) < temperature.lowest.value) {
        temperature.lowest.value = parseInt(singleData[MIN_TEMP]);
        temperature.lowest.date = singleData.PKT;
      }

      if (parseInt(singleData[MAX_HUMID]) > humidity.highest.value) {
        humidity.highest.value = parseInt(singleData[MAX_HUMID]);
        humidity.highest.date = singleData.PKT;
      }
    }
  }
  return { temperature, humidity };
};

/**
 * This function returns the average highest and lowest temperature and average mean humidity after calculations
 * @param {Object} weatherData
 * @returns {Object} { averageTemperature, averageHumidity }
 */
export const avgTempAndHumidityCalculations = (weatherData) => {
  const averageTemperature = {
    highest: { value: 0, countNull: 0 },
    lowest: { value: 0, countNull: 0 },
  };

  const averageHumidity = { highest: { value: 0, countNull: 0 } };

  for (const singleData of weatherData) {
    if (singleData[MAX_TEMP] !== '') {
      averageTemperature.highest.value += parseInt(singleData[MAX_TEMP], 10);
    } else {
      averageTemperature.highest.countNull += 1;
    }
    if (singleData[MIN_TEMP] !== '') {
      averageTemperature.lowest.value += parseInt(singleData[MIN_TEMP], 10);
    } else {
      averageTemperature.lowest.countNull += 1;
    }
    if (singleData[MEAN_HUMID] !== '') {
      averageHumidity.highest.value += parseInt(singleData[MEAN_HUMID], 10);
    } else {
      averageHumidity.highest.countNull += 1;
    }
  }

  averageTemperature.highest.value = takeAverage(
    averageTemperature.highest,
    weatherData.length
  );
  averageTemperature.lowest.value = takeAverage(
    averageTemperature.lowest,
    weatherData.length
  );
  averageHumidity.highest.value = takeAverage(
    averageHumidity.highest,
    weatherData.length
  );

  return { averageTemperature, averageHumidity };
};

/**
 * This function prints single bars of the lowest and highest temperatures
 * @param {Object} tempWeatherData
 * @prints Single Bars for temperatures
 */
export const logSingleTempBars = (weatherData) => {
  for (const [index, singleData] of weatherData.entries()) {
    if (singleData[MIN_TEMP] === '' && singleData[MAX_TEMP] === '') {
      console.log(`${index + 1} Data not available`);
    } else {
      console.log(
        `${index + 1} ${makeSymbols(singleData[MIN_TEMP]).blue}${
          makeSymbols(singleData[MAX_TEMP]).red
        } ${singleData[MIN_TEMP]}C - ${singleData[MAX_TEMP]}C`
      );
    }
  }
  console.log('\n');
};

/**
 * This function prints multi bars of the lowest and highest temperatures
 * @param {Object} tempWeatherData
 * @prints Multi Bars for temperatures
 */
export const logMultiTempBars = (weatherData) => {
  for (const [index, singleData] of weatherData.entries()) {
    if (singleData[MAX_TEMP] === '') {
      console.log(`${index + 1} Data not available`);
    } else {
      console.log(
        `${index + 1} ${makeSymbols(singleData[MAX_TEMP]).red} ${
          singleData[MAX_TEMP]
        }C`
      );
    }

    if (singleData[MIN_TEMP] === '') {
      console.log(`${index + 1} Data not available`);
    } else {
      console.log(
        `${index + 1} ${makeSymbols(singleData[MIN_TEMP]).blue} ${
          singleData[MIN_TEMP]
        }C`
      );
    }
  }
  console.log('\n');
};

/**
 * Extract the year and month from input and checks if the year and month are present in the weather data structure
 * @param {String} dateAndMonth
 * @param {Object} weatherData
 * @returns {Object} { year, month }
 */
export const checkYearAndMonthinStorage = (dateAndMonth, weatherData) => {
  try {
    checkPattern(dateAndMonth, PATTERN_FOR_DATE_MONTH);

    const [result] = dateAndMonth.match(PATTERN_FOR_DATE_MONTH);
    const updatedDateAndMonth = getFileName(result);
    const [year, month] = updatedDateAndMonth.split('_');

    checkAvailableYearAndMonth(weatherData, year, month);

    return { year, month };
  } catch (e) {
    throw e;
  }
};

/**
 * Extract the year from input and checks if the year is present in the weather data structure
 * @param {String} year
 * @param {Object} weatherData
 * @returns {Number} result
 */
export const checkYearinStorage = (year, weatherData) => {
  try {
    checkPattern(year, PATTERN_FOR_MONTH);
    const [result] = year.match(PATTERN_FOR_MONTH);

    if (!(result in weatherData)) {
      throw '\nInformation about this year is not present\n';
    }

    return result;
  } catch (e) {
    throw e;
  }
};
