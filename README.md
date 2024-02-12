# Github Jobs API App
This project is a GitHub Jobs API UI derived from the Frontend Mentor challenge. It is constructed in React with the SASS pre-processor. 

#### Note:

GitHub Jobs is officially deprecated as of May 2021. The current version of the project uses some old static data that I saved. As a result I am currently in the process of modifying some functionality to work with array filtering methods instead of using a dynamic API call. As I spent a lot of time on the project, I wanted to maintain it as much as I could even if the API is deprecated. The static version is very close to being like how the live version was. 

## UI Features

* Searching functionality with additional filter options (currently being modified into static versions, see above note)
* Theme switching (Light and Dark modes available)
* Listings can be viewed in greater detail with information on how to apply
* If more listings are available, the user can click to load more (only functional in previous code, see above note)

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
Initial design and images from Frontend Mentor
