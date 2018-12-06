# IronGR-CRUD App

Technologies used:
HTML
CSS
Javascript
NodeJS
Mongoose
Express


Approach taken:

I began by creating some wireframes for my website and planning out certain models. I then began to work on the signup/login authentication of a user and checking if the username/password are empty & if they match on login.

Once the login/signup feature was working I began working on the routes to connect my users, with their reviews and their comments. Connecting their relationship wasn't difficult but ensuring I was calling the right path was.

After my users, reviews, and comments were all populating and rendering in the right place, I then began to connect my API to the website to pull information on games. Ideally, users could browse various games, and if they felt a need to leave a review, all they had to do would be click on it and it would lead them directly to a personal review of their own. As time was becoming a factor, I ultimately decided to leave that feature out for now, show a similiar review form, and revisit this after bootcamp.  

Lastly, I worked on adding styling and responsiveness.

Unsolved problems:
- Having hidden form to submit Game review automatically from API. Need to create hidden form on "click to review on page"
- auto login implementation wasn't working, so corrected error message to present a validation
- clean up youtube video to make it responsive (maybe using jquery @media to make it disappear totally?)


Things to add:
- Connect/chain the API with .then's to capture Game picture
- Way more styling/animations


Issues resolved:
- Added Cloudinary for profile pic upload. Thinking of adding for game cover but who really keeps a picture of game covers on their computer?


