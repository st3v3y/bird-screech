# Organization Message Chrome Extension

## About the Project

This Chrome extension displays organization-wide messages from an admin to users. It provides a seamless way for organizations to communicate important information directly within the browser interface.

<img width="316" alt="birdscreechUI" src="https://github.com/user-attachments/assets/9c68e49e-0ef7-40db-8645-d1582dec50c5">

## Project Objective

The main goal of this project is to create a user-friendly and efficient communication channel between organization admins and users through a Chrome extension. This tool aims to enhance internal communication by providing real-time message updates and easy message management.

## Tech Stack

- Vue 3
- Vue Router
- TypeScript
- Vitest
- Pinia
- Chrome Extension Manifest V3
- Tailwind CSS
- ESLint
- Prettier

## The Backend (Mock)

The backend for this extension is implemented as a mock server in a separate repository. It simulates an API that provides message data to the extension. The mock server allows for testing and development of the extension without the need for a full-fledged backend infrastructure.

[Visit Bird Screech Backend Mock Repository](https://github.com/st3v3y/bird-screech-mock-api)

## Setup Instructions

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/st3v3y/bird-screech
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Build the extension:
   ```
   npm run build
   ```
4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist` folder from the project

### Development

For development, you can use the following command to build the project on each change:

```
npm run dev-build
```

This command uses Vite to build the project in watch mode, allowing you to quickly test changes by updating the extension in Chrome.

### Testing

Run the `vitest` tests using:

```
npm run test
```

## User Interface

The extension features:
- A badge icon showing a bird mascot with a red badge indicating the number of new messages
- A start page displaying the bird mascot in the header with a speech bubble showing the number of new messages
- A cog icon in the top right corner for accessing the options page
- A menu with "Messages" and "Archive" sections
- A list of latest unread messages with a category filter dropdown
- An archive page showing all read messages
- An options page for setting the message server URL, audio notification preferences and a button to delete all local messages

### UI Screenshots

Homescreen/Unread messages:

<img width="298" alt="birdscreech_messages" src="https://github.com/user-attachments/assets/a1ce21f4-cc6d-4033-a575-bd1680d88672">


Filter by categories:

<img width="297" alt="birdscreech_messagefilter" src="https://github.com/user-attachments/assets/2a6a210d-20de-43f1-ac33-b1b9c7f17820">


Page of read/archived messages:

<img width="299" alt="birdscreech_archive" src="https://github.com/user-attachments/assets/5bea4906-f798-4dd6-a695-580e3203fd4d">


Options screen within Extension:

<img width="298" alt="birdscreech_options" src="https://github.com/user-attachments/assets/1f91a576-4912-4955-a75d-8726888549cf">


Options screen within via chrome options dropdown:

<img width="243" alt="birdscreech_options_dropdown" src="https://github.com/user-attachments/assets/d5422b0c-e4b6-4f32-9899-5c5dacf786a8">
<img width="497" alt="birdscreech_optionspage" src="https://github.com/user-attachments/assets/5611082e-1b9a-426b-a3ef-8fe593dfe7cf">

## Assumptions

1. The backend server is secure, as no additional security layers, error handling, or logging have been implemented in the extension.
2. Users have a stable internet connection to receive real-time updates.
3. The extension will be used primarily in a professional setting.
4. Message volume will be manageable and not overwhelm users.
5. The mock backend accurately represents the expected API structure of a real backend.
6. Users have the necessary permissions to install and use Chrome extensions in their organization.
7. The extension's storage usage falls within Chrome's limits for local storage.
8. The organization has a process for admins to create and send messages through the backend system.

## Architectural Decisions

This project was structured using a Vue project template, with Chrome extension-specific files (manifest.json, background.js, etc.) added to this structure. This approach offers several benefits:

1. Leverages Vue's robust development ecosystem and tooling
2. Allows for easier integration of Vue-specific features and libraries
3. Provides a familiar structure for Vue developers, improving maintainability
4. Enables the use of Vue's build system for optimized production builds
5. Facilitates easier testing and component isolation

Compared to the approach described in the exercise document, this structure allows for better separation of concerns and more scalable development as the extension grows in complexity.

## Ideas for Future Improvements

1. Give the UI a more structured and professional look, reducing the playful or childish elements. ;-)
2. Implement real-time message updates using WebSockets
3. Add user authentication and personalized message targeting
4. Add a list of categories to the options page a user can subscribe to
5. Integrate with popular productivity tools (e.g., Slack, Microsoft Teams)
6. Implement message search functionality
7. Add support for rich media content in messages (images, videos, audios)
8. Create an admin interface for message management
9. Implement message analytics to track read rates and engagement
10. Add support for multiple languages and localization
11. Implement a message scheduling system for time-sensitive communications
12. Add button to safe an event to the user's calendar
13. Add a voting message type where the message includes a question and a set of options for users to vote on.
14. Create a mobile version of the extension for cross-device synchronization
15. Add support for Dark Mode
16. Automate the creation of release packages for the Chrome Web Store.
17. Use tools like ChromeDriver for automated browser testing.
18. Implement code coverage reporting and set minimum coverage thresholds.
19. Automate the generation and updating of documentation.

## Current Limitations

- Audio notifications can only be played when the extension popup is open due to Manifest V3 restrictions
- Limited offline functionality
- No built-in encryption for message storage
- Limited customization options for user interface
- Limited to Chrome browser, not cross-browser compatible
- No built-in accessibility features for users with disabilities
