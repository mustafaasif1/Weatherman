import fs from 'fs';
import Weather from './utils/weather.js';
import processFiles from './utils/processFiles.js';
import {
  AVERAGE_CLIMATE,
  LINEBAR_TEMPERATURE,
  TEMP_AND_HUMIDITY_EXTREMES,
} from './utils/consts.js';

import { performance, PerformanceObserver } from 'perf_hooks';

const showPerformance = true;

(function mainController() {
  const observer = new PerformanceObserver((list) =>
    list.getEntries().map((entry) => console.info(entry))
  );
  observer.observe({ buffered: true, entryTypes: ['measure'] });
  performance.mark('start');

  const directoryName = process.argv.slice(2)[0];
  if (fs.existsSync(directoryName)) {
    const terminalArguments = {
      a: [],
      c: [],
      e: [],
    };
    const allArguments = process.argv.slice(2);

    for (const [index, singleArgument] of allArguments.entries()) {
      switch (singleArgument) {
        case AVERAGE_CLIMATE:
          terminalArguments.a.push(allArguments[index + 1]);
          break;
        case LINEBAR_TEMPERATURE:
          terminalArguments.c.push(allArguments[index + 1]);
          break;
        case TEMP_AND_HUMIDITY_EXTREMES:
          terminalArguments.e.push(allArguments[index + 1]);
          break;
        default:
          break;
      }
    }
    performance.mark('File Processing Start');
    const entireWeatherData = processFiles(directoryName);
    performance.mark('File Processing Stop');

    const weather = new Weather(entireWeatherData);

    performance.mark('Climate Extremes Start');
    if (terminalArguments.e) {
      terminalArguments.e.map((element) =>
        weather.tempAndHumidityExtremes(element)
      );
    }
    performance.mark('Climate Extremes Stop');

    performance.mark('Climate Average Start');
    if (terminalArguments.a) {
      terminalArguments.a.map((element) => weather.averageClimate(element));
    }
    performance.mark('Climate Average Stop');

    performance.mark('Print Bars Start');
    if (terminalArguments.c) {
      terminalArguments.c.map((element) =>
        weather.singleLineBarsOfTemperature(element)
      );
    }
    performance.mark('Print Bars Stop');
  } else {
    console.log('Please supply a valid directory');
  }

  performance.mark('stop');

  if (showPerformance) {
    performance.measure('Runtime for the entire application', 'start', 'stop');
    performance.measure(
      'Runtime for reading the files and object creation',
      'File Processing Start',
      'File Processing Stop'
    );
    performance.measure(
      'Runtime to calculate the Temperature and Humidity Extremes',
      'Climate Extremes Start',
      'Climate Extremes Stop'
    );
    performance.measure(
      'Runtime to calculate the Average Climate',
      'Climate Average Start',
      'Climate Average Stop'
    );
    performance.measure(
      'Runtime to display the bars for lowest and highest temperatures',
      'Print Bars Start',
      'Print Bars Stop'
    );
  }
})();
