The project uses Selenium to demonstrate web scraping, API integration, and cross-browser testing. The script scrapes the first five articles from the Opinion section of El País, saves their  cover images if it exists, and translates the titles to English using a translation API. It also analyzes the translated titles to identify any words that are repeated more than twice across all headers combined. Finally, the solution is tested locally and executed on BrowserStack with 5 parallel threads across various desktop and mobile browsers.
Install & Run
Clone the repository
 git clone git@github.com:Adnan-Ali-007/BrowserStack--Assignment
 Install dependencies
cd browserstack-assignment # navigate to project directory
npm i # install dependencies
Run test locally
npm run local-test
Run test on Browserstack
npm run browserstack-test
Output:
The downloaded cover images are stored in assets folder
The expected output should be like this interminal
----------------- Article Start ---------------------
**Title**: Mi nuevo mejor amigo: Alberto
**Content**: Pedro, muchacho que está pasando por malos momentos en la escuela, ya tiene un amigo. Incluso un mejor amigo. Se llama Alberto y en el examen de fin de curso, el pleno extraordinario de esta semana en el Congreso de los Diputados, le echó una mano infinita que le salvó de lo que pudo ser una hecatombe....
Suscríbete para seguir leyendo
Lee sin límites
SEGUIR LEYENDO
Ya soy suscriptor
----------------- Article End -----------------------
Cover image saved: C:\Users\1azha\OneDrive\Desktop\assigmentbrwsr\assets\Mi-nuevo-mejor-amigo-Alberto.jpg
----------------- Articles Section End ------------------
----------------- Translated Titles ---------------------
1. Less Schengen, less Europe
2. In the interest of minors
3. Singularity
4. The sea is no longer eternal
5. My new best friend: Alberto
--------------------------------------------------------
----------- Words Repeated More than twice -------------
---------------------------------------------------------
