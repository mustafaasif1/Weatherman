import colors from '../node_modules/colors/lib/index.js';
import {
  tempAndHumidityCalculations,
  avgTempAndHumidityCalculations,
  checkYearAndMonthinStorage,
  checkYearinStorage,
  logExtremeClimate,
  logAverageClimate,
  logMultiTempBars,
  logSingleTempBars,
} from './helperFunctions.js';

export default class Weather {
  constructor(weatherData) {
    this.weatherData = weatherData;
  }

  /**
   * For a given year this function display the highest temperature and day, lowest temperature and day, most humid day and humidity.
   * @param {String} year
   * @prints the highest temperature and day, lowest temperature and day, most humid day and humidity.
   */
  tempAndHumidityExtremes(year) {
    try {
      const updatedYear = checkYearinStorage(year, this.weatherData);

      const { temperature, humidity } = tempAndHumidityCalculations(
        this.weatherData[updatedYear]
      );

      logExtremeClimate(temperature, humidity);
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * For a given month this function display the average highest temperature, average lowest temperature, average mean humidity.
   * @param {String} dateAndMonth
   * @prints the average highest temperature, average lowest temperature, average mean humidity.
   */
  averageClimate(dateAndMonth) {
    try {
      const { year, month } = checkYearAndMonthinStorage(
        dateAndMonth,
        this.weatherData
      );

      const tempWeatherData = this.weatherData[year][month];

      const { averageTemperature, averageHumidity } =
        avgTempAndHumidityCalculations(tempWeatherData);

      logAverageClimate(averageTemperature, averageHumidity);
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * For a given month this function displays two horizontal bar charts on the console for
   * the highest and lowest temperature on each day. Highest in red and lowest in blue.
   * @param {String} dateAndMonth
   * @prints two horizontal bar charts for the highest and lowest temperature on each day.
   */
  multiLineBarsOfTemperature(dateAndMonth) {
    try {
      const { year, month } = checkYearAndMonthinStorage(
        dateAndMonth,
        this.weatherData
      );

      const tempWeatherData = this.weatherData[year][month];

      logMultiTempBars(tempWeatherData);
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * For a given month this function draws one horizontal bar chart on the console for
   * the highest and lowest temperature on each day. Highest in red and lowest in blue
   * @param {String} dateAndMonth
   * @prints one horizontal bar chart for the highest and lowest temperature on each day
   */
  singleLineBarsOfTemperature(dateAndMonth) {
    try {
      const { year, month } = checkYearAndMonthinStorage(
        dateAndMonth,
        this.weatherData
      );

      const tempWeatherData = this.weatherData[year][month];

      console.log(`\n${year}_${month}\n`);
      logSingleTempBars(tempWeatherData);
    } catch (e) {
      console.log(e);
    }
  }
}
