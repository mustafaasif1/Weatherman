# the-lab

The purpose of this repo is to help the team lead and his team member in training and evaluating newly hired developers especially fresh grads. Code written by newbies for training/practice will be checked in here and reviewed by their respective team leads. All feedback must be in written on gitlab.

The lab repo contains the weather files for Murree. This is an application that generates some reports. The user can specify more than one report at the same time.

The program should be designed as follows:

1. Define a data structure for holding each weather reading.
2. Define a class for parsing the files and populating the readings data structure with correct data types.
3. Define a data structure for holding the calculations results.
4. Define a class for computing the calculations given the readings data structure. 
5. Define a class for creating the reports given the results data structure.
6. Define main for assembling the above and running the program.
7. ES6 and airbnb conventions should be followed in the code.

## Getting Started

1. First of all clone the project through ssh or http
2. Next extract weatherfiles.zip into the same folder
3. After that open the command line in the same directory and run the command <em> npm install </em> to install the required dependencies
4. We are now ready to run the main file.

### Tasks that were assigned

1. For a given year display the highest temperature and day, lowest temperature and day, most humid day and humidity.

   ```diff
   npm start -- -e 2006
   ```

   Highest: 45C on June 23 <br />
   Lowest: 01C on December 22 <br />
   Humidity: 95% on August 14 <br />

2. For a given month display the average highest temperature, average lowest temperature, average mean humidity.

   ```diff
   npm start -- -a 2005/6
   ```

   Highest Average: 39C\n <br />
   Lowest Average: 18C <br />
   Average Mean Humidity: 71% <br />

3. For a given month draw two horizontal bar charts on the console for the highest and lowest temperature on each day. Highest in red and lowest in blue.

   ```diff
   npm start -- -c 2011/03
   ```

   March 2011 <br />
   01 +++++++++++++++++++++++++ 25C <br />
   01 +++++++++++ 11C <br />
   02 ++++++++++++++++++++++ 22C <br />
   02 ++++++++ 08C <br />

4. Multiple Reports

   ```diff 
   npm start -- -c 2011/03 -a 2011/3 -e 2011
   ```

5. BONUS TASK. For a given month draw one horizontal bar chart on the console for the highest and lowest temperature on each day. Highest in red and lowest in blue.

   ```diff 
   npm start -- -c 2011/3
   ```

   March 2011 <br />
   01 ++++++++++++++++++++++++++++++++++++ 11C - 25C <br />
   02 ++++++++++++++++++++++++++++++ 08C - 22Cw <br />

**This code was written by Muhammad Mustafa Asif**.


