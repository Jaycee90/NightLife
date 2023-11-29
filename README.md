# VibeTrack 
> A nightclub tracker web app that aims to provide an enhanced experience for customers, helping them discover nearby clubs that cater to their preferences and interests.
 > Live demo [here] https://vibetrack.vercel.app/ 

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Project Status](#project-status)
* [Sprint 2](#sprint-2)
* [Sprint 1](#sprint-1)
* [Room for Improvement](#room-for-improvement)
* [Contact](#contact)
<!-- * [Setup](#setup) -->
<!-- * [Usage](#usage) -->
<!-- * [Acknowledgements](#acknowledgements) -->
<!-- * [License](#license) -->

<a name="general-information"></a>
## General Information 
- We are creating a web app that aims to provide an enhanced experience for nightlife enthusiasts, helping them discover nearby clubs that cater to their preferences and interests within their vicinity.
- Through our web app, our goal is to promote an elevated quality of the nightlife experience itself, providing a convenient way to discover and access nightlife venues while fostering a safe and responsible community.
- Due to the nature of our web app, we are required to restrict access to individuals aged 18 and above, ensuring compliance with state laws regarding age requirements.
<!-- You don't have to answer all the questions - just the ones relevant to your project. -->

<a name="technologies-used"></a>
## Technologies Used
* React - version 18.2.0
* MongoDB - version 7.0
	* Realm Java SDK - 
* Language
	* JavaScript
	* HTML, CSS
	* Python
* TBA

<a name="features"></a>
## Features 
* **Listing**: (1st Sprint) Ensuring an aesthetically pleasing and user-friendly interface that is easy to navigate, and includes key details such as special events, operating hours, location, and menu. (User Story 1, 2 and 3)
* **Searching**: Providing seamless search and filter function within the app, enabling users to effortlessly discover nearby clubs with distinctive features that match with their preferences. (User Story 1, 2 and 3)
* **Sign-in**: Allowing users to sign up/in with their mobile number or email. By signing up, users will have access to exclusive features such as Invite Friends, Safety Alert, Review, etc.  (User Story 3 and 4)
	* When registering, users will input essential details including their name, phone number, email, age, and two emergency contacts. Accessing their account is as easy as a single tap, linking the app directly to their email or phone number. 
	* In the future, we plan to introduce a Merchant sign-in feature, enabling club business owners to update their venue's information and access statistics about their customers' visits, among other capabilities.
* **Special Events**: Consistently providing updates on upcoming special events such as music concerts, sporting games, festivals, etc., to nearby clubs and venues. (User Story 1, 2, 3 and 5)
* **Location Sharing**: Provide users with exclusive access to 2 features: Invite Friends and Safety Alert (User Story 6 and 7)
	* Invite Friends: Enable users to directly send event invitations via SMS to their friends.
					* Safety Alert: Empower users to share their location and send an SOS alert to their emergency contacts or local police department.

<a name="screenshots"></a>
## Screenshots 
![Example screenshot](https://i.imgur.com/SoHE2tO.png)
Example screenshot TBA...
<!-- If you have screenshots you'd like to share, include them here. -->

<a name="project-status"></a>
## Project Status
This project is currently _in progress_. [Jira SCRUM Board](https://cs3398f23romulans1.atlassian.net/jira/software/projects/SCRUM/boards/1) 

## Setup
### Requirements
* Node.js and npm [Donwload](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* Java [Downoad](https://www.oracle.com/java/technologies/downloads/)
* Source-code editor of choice 
### How to Run
* Clone VibeTrack repo (branch: development) [BitBucket repo](https://bitbucket.org/cs3398f23romulans/vibetrack/src/development/)
* Install all the necessary dependencies from the main package.json. Clean cache if needed.
```
cd VibeTrack
npm cache clean --force
npm install
```
* Create the file `/server/config.env` with your Atlas URI and the server port:
```
ATLAS_URI=mongodb+srv://<username>:<password>@sandbox.jadwj.mongodb.net/
```
* Start Backend server (on a seperate terminal):
```
cd VibeTrack/server
npm install
npm start
```
![Output](https://i.imgur.com/zhlm4wW.png)
* Start Client server (on another seperate terminal):
```
cd VibeTrack/client
npm install 
npm start
```
![Output](https://i.imgur.com/Uznj5Rz.png)

* Note: Run ```npm i @material-ui/core --legacy-peer-deps``` on client server if needed (to resolve conflict in dependencies version).

- - - -
<a name="sprint-2"></a>
## Sprint 2 Review
### Review and Retrospective
* For this sprint, our primary goal is to implement the our major planned features, such as login/signup, search, safety alert/invitation. We also implemented additional functions that aim to enhance the user experience (rating, feedback, recommendation).
* [Sprint 2 Retrospective](https://bitbucket.org/cs3398f23romulans/vibetrack/src/development/Document/Sprint2_Retrospective.md)
* Burnup report
![Burnup Chart](https://i.imgur.com/GnqQ1Yi.png)

### Screenshots
* __Homepage__ and __Discover__ and __Special Event__ 
![Homepage, Discover and Special Event](https://i.imgur.com/vV0zUhs.png)

* __Signup__ and __Password Reset__ 
![Signup and Password Reset](https://i.imgur.com/iqKOYVT.png)

* __Venue__,  __Search__, __User Profile__, and __Emergency Contact__ 
![Venue, Search, User Profile and Emergency Contact](https://i.imgur.com/slPczc9.png)

* __Invitation__ and __Safety__ 
![Invitation and Safety](https://i.imgur.com/2fbKizV.png)

### Contributions
* __Isaiah__: Implemented a feature to send an email to an emergency contact
	* [Jira task documentation](https://bitbucket.org/cs3398f23romulans/vibetrack/src/development/Document/Sprint2_Jira.md#isaiah) 
* __Benu__: Implemented functions that aim to enhance and personalize user experiences, such as rating venue, getting recommendation, sending feedback, etc.
	* [Jira task documentation](https://bitbucket.org/cs3398f23romulans/vibetrack/src/development/Document/Sprint2_Jira.md#benu) 
* __Michelle__: Implemented login and signup feature. Further expanded the database and worked on the interface for a more professional design.
	* [Jira task documentation](https://bitbucket.org/cs3398f23romulans/vibetrack/src/development/Document/Sprint2_Jira.md#michelle) 
* __Nilu__: Implemented a feature of sending email to friends or families to join clubs & added CSS style to the page. Also, I successfully added the data from web scraping inside the container of my special event. 
	* [Jira task documentation](https://bitbucket.org/cs3398f23romulans/vibetrack/src/development/Document/Sprint2_Jira.md#nilu) 
* __Jayce__: Implemented a search feature where we have a function to sort the top 10 nearest clubs to the user, a function to search a deserted club by name and I incorporated the clubs marker on map. Also worked on css to stylize our search feature.
	* [Jira task documentation](https://bitbucket.org/cs3398f23romulans/vibetrack/src/development/Document/Sprint2_Jira.md#jayce) 

### Next Steps
* __Isaiah__: 
	* Implement mini Alert button into each Venue page
	* Deploy application to Firebase/Heroku/etc.

* __Benu__:
	* Further modify the favorites to show current ratings of venues
	* Finish the feedback function
	* Implement more functions to enhance user experience.

* __Michelle__: 
	* Work with Jayce to combine the Discover and Search feature together. 
	* Improve on user-related features to enhance security.
	* Patch up Benu�s user experience enhancing functions into assigned component
	* Look into using OpenAI for chatbox as customer support.

* __Nilu__:
	* Connect Special Event feature with react-calendar for each venue page
	* Implement mini Invite button into Special Event page
 
* __Jayce__:
	* Implement filter by tag feature
	* Further implement search feature
	* Implement SimpleGMap into application (if free) to show route


### Issues to Resolve
* Database: Reformat venue.address so that it can be trimmed and look nicer in Search/Discover function
* Data: Data page changes parameter when clicking on other feature (e..g go to Safety), need to consider path restriction
- - - -
<a name="sprint-1"></a>

## Sprint 1 Review
### Review and Retrospective
* For this sprint, our primary goal is to set up a web application for our nightclub tracker project with basic interface and features (Map, Calendar, Special Events). We are also working on the Database feature but will focus more onto that in Sprint 2.
* [Sprint 1 Retrospective](https://bitbucket.org/cs3398f23romulans/vibetrack/src/development/Document/Sprint1_Retrospective.md)
* Burnup report
![Burnup Chart](https://i.imgur.com/33S2DqW.png)

### Screenshots
* __Homepage__ and __Discover__ (displaying all venue entries in our database)
![Homepage and Discover](https://i.imgur.com/T4wKCAL.png)
* __Record__ and __Data__ (displaying all venue entries in table form and displaying specific venue following a template)
![Database record and specific venue listing](https://i.imgur.com/xyoETic.png)
* __Special Event__ and __Create/Edit/Login/Safety__ (displaying upcoming events and prompting to edit/create new documents)
![Special event and create/edit component](https://i.imgur.com/ZVCOVVj.png)

### Contributions
* __Isaiah__: Designed basic app sketeton and web scraped data for special event page
	* [Jira task documentation](https://bitbucket.org/cs3398f23romulans/vibetrack/src/development/Document/Sprint1_Jira.md#isaiah) 
* __Benu__: Research webscraping and how to make a MongoDB database, created basic database for venues using Excel.
	* [Jira task documentation](https://bitbucket.org/cs3398f23romulans/vibetrack/src/development/Document/Sprint1_Jira.md#benu) 
* __Michelle__: Stylize interface, create a client/server connection and integrate database from MongoDB into project.
	* [Jira task documentation](https://bitbucket.org/cs3398f23romulans/vibetrack/src/development/Document/Sprint1_Jira.md#michelle) 
* __Nilu__:Designed Special Event Page using HTML, CSS & javascript & added it to our Vibetrack
	* [Jira task documentation](https://bitbucket.org/cs3398f23romulans/vibetrack/src/development/Document/Sprint1_Jira.md#nilu) 
* __Jayce__: Incorporated Map API into web app, customized and adjusted Map (marker, view, and default coordination),
			Implemented function to convert address to coordinate.
	* [Jira task documentation](https://bitbucket.org/cs3398f23romulans/vibetrack/src/development/Document/Sprint1_Jira.md#jayce) 

### Next Steps
* __Isaiah__: 
	* Create safety page with user options allowing them to choose what clubs they will visit that night
	* Create option to add and invite friends to clubs that night
* __Benu__:
	* Create a database for the user information
	* Possible favorite feature
	* Possible review feature 
	* created a test app for the basic star ratings function.
* __Michelle__: 
	* Continue expanding and integrating database into application (opening hours, social Media, image gallery)
	* Continue improving interface to be more user-friendly and easy-to-navigate 
	* Research and implement user authenthication (sign-in/-up) along with Benu
* __Nilu__:
	* I will continue to integrate database to the special event & add some more style to my Special event page. 
* __Jayce__:
	* Develop a search feature that allows users to find nightclubs by entering keywords 
	* Integrate Location-Based Search
	* Implement a feature to indicate whether a nightclub is currently open or closed.

### Issues to Resolve
* Data: Map's marker not display correctly: Wrong center even when assigned argument is coordinates retrieve from DB
* Data: Need to resize images to be more uniform in dimension. Window.toScroll not working properly.
* Route: If on localhost:3000/data/ and then click on Record List/Create/etc. on navigation bar, route will redirect to localhost:3000/data/recordList, etc.

- - - -
<a name="room-for-improvement"></a>
## Room for Improvement <!-- Include areas you believe need improvement / could be improved. Also add TODOs for future development. -->
- Given that this is a course project, we have limited time to develop it to our full vision. Nevertheless, our goal is to develop a functional, user-friendly web app that offers information about nightclubs in the Austin area. If we choose to pursue this project beyond the classroom, we aspire to broaden its reach, potentially extending the database across the country for a more expansive impact.
- Additionally, if we were to continue working on this project beyond the classroom, we will try to find additional resources like more time, expertise in specific areas, and potentially additional developers could help in expanding its scope statewide.
- User feedback and engagement would be crucial in fine-tuning and enhancing the app's features and functionalities. Therefore, we also would like to gather feedback from fellow Texas State students through beta testing. 

Room for improvement: TBA...
To do: TBA...

<a name="contact"></a>
## Contact Team
* Isaiah Gage (frb32@txstate.edu)
* Benu Liburd (bjl98@txstate.edu)
* Michelle Nguyen (rnb90@txstate.edu)
* Nilu Sah (zys5@txstate.edu)
* Jayce Turambe (jnn56@txstate.edu)

	<!--<a name="acknowledgements"></a> -->
	<!--## Acknowledgements -->
	<!--- This project was inspired by... Give credit here. TBA -->

	<!-- <a name="setup"></a> -->
	<!-- ## Setup -->
	<!-- What are the project requirements/dependencies? Where are they listed? A requirements.txt or a Pipfile.lock file perhaps? Where is it located?-->
	<!-- Proceed to describe how to install / setup one's local environment / get started with the project. TBA....-->

	<!-- <a name="usage"></a> -->
	<!-- ## Usage -->
	<!-- How does one go about using it? TBA.... -->
	<!-- Provide various use cases and code examples here-->
	<!-- `write-your-code-here`-->
	<!-- <a name="acknowledgements"></a> -->
	<!-- ## Acknowledgements -->
	<!-- - This project was inspired by... Give credit here. TBA-->

	<!-- Optional -->
	<!-- ## License -->
	<!-- This project is open source and available under the [... License](). -->
	<!-- You don't have to include all sections - just the one's relevant to your project -->

