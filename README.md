# Github Jobs API App
This project is a GitHub Jobs API UI derived from the Frontend Mentor challenge. It is constructed in React with the SASS pre-processor. 

#### Note:

I am aware that GitHub Jobs is shutting down soon. I am working on a variation of this project that will allow for the app to be used with static data for display purposes. I worked very hard on this project and don't want to see it go to waste. 

## UI Features

* Searching functionality with additional filter options
* Theme switching (Light and Dark modes available)
* Listings can be viewed in greater detail with information on how to apply
* If more listings are available, the user can click to load more

## Code Features

* Pages are handled via react router
* Makes API calls using Fetch with parameter functionality 
* Website loads preferred browser/system theme automatically
* Page information is loaded dynamically through JSON data
* HTML from JSON data is sanitized to promote security

## My Notes

One of the biggest challenges I've faced and my first major API project. Turning JSON data into components in React is one challenge, but fetching that data via an HTTP request was a learning experience. Namely, GitHub has a CORS policy, which meant that I had to learn how request headers worked. Additionally, I had to code functions for managing different types of queries to the GitHub Jobs API, and learn how to code asynchronously for the loading of additional listings that meet the search criteria. I also had to learn how to handle errors appropriately if the call was met with an error. As the raw data contained HTML in some of its fields, I was met with another challenge of determining how to handle it. Ultimately, I went with an approach that targeted certain elements through DOM fragments, and I also used a sanitization library to make sure it was clean HTML to put into the component.

This is also my first time handling theme management on a large scale. I used a data-theme attribute method which allowed me to handle the theme's state in React, and define how it should look in CSS by targeting objects with certain values for that attribute. It also made use of the "use media predicate" hook to load the user's preferred theme, available as part of lessmess' "react-media-hook" library. I used transitions to make the theme switching feel smoother for the user. Overall, I'm happy with how it turned out. 

### Credits
Initial design and images purchased from Frontend Mentor
