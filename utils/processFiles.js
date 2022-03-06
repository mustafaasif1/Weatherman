import path from 'path';
import fs from 'fs';
import readline from 'readline';

/**
 * This function takes in the directory name, scans the entire directory and makes an object storing all the weather information from all the files
 * @param {String} file
 * @returns {Object} allWeatherFiles object containing all the information about the weather.
 * {
      '2010': {
        'Aug': [
          {'Max Temperature': 23, ...},
          {'Object'}
        ]
    }
 */

const processFiles = (file) => {
  const directoryPath = path.join(process.cwd(), file);
  const fileNames = fs.readdirSync(directoryPath);
  const allWeatherFiles = fileNames.reduce((allWeatherFiles, singleFile) => {
    const data = fs
      .readFileSync(`${file}/${singleFile}`, 'UTF-8')
      .split(/\r?\n/);

    const [firstLine, ...restOfTheData] = data;
    const trimSplitFirstLine = firstLine.split(',').map((word) => word.trim());

    const weatherFiles = restOfTheData
      .filter((line) => line !== '')
      .map((line) => {
        const splitOtherLines = line.split(',');
        const singleWeather = trimSplitFirstLine.reduce(
          (singleWeather, value, index) => {
            singleWeather[value] = splitOtherLines[index];
            return singleWeather;
          },
          {}
        );
        return singleWeather;
      });

    const dateAndMonth = singleFile.replace(/Murree_weather_|.txt/gi, '');
    const [year, month] = dateAndMonth.split('_');

    if (!(year in allWeatherFiles)) {
      allWeatherFiles[year] = {};
    }
    allWeatherFiles[year][month] = weatherFiles;
    return allWeatherFiles;
  }, {});
  return allWeatherFiles;
};

export default processFiles;
