# Call Management App
Here is the deployed link -  [https://speertechnologies-frontend.vercel.app/](#).
## Overview
This ReactJS application is designed to manage call activities. It features an activity feed, detailed call view, archiving functionality, and more. The app focuses on providing a user-friendly interface with efficient navigation and interaction for managing call records.

## Features
- **Activity Feed:** Displays a list of all call activities.
- **Activity Detail:** Shows detailed information for each call.
- **Archiving:** Users can archive and unarchive calls. Archived calls are moved to a separate tab and don't appear in the main activity feed.
- **Bulk Actions:** Includes functionality to archive all calls and unarchive all calls in respective tabs.

## Design and Best Practices
- Emphasis on UI/UX with smooth transitions and intuitive layouts.
- Implements best React practices for efficient and maintainable code.
- Responsive design ensuring accessibility across various devices.

## Installation
This project uses yarn for dependency management. To set up the project:

## API Integration
The application integrates with a backend API for call data management.

- **API Base URL:** `https://cerulean-marlin-wig.cyclic.app/`

### Endpoints
- `GET /activities`: Retrieve all call activities.
- `GET /activities/:call_id`: Retrieve details for a specific call.
- `PATCH /activities/:call_id`: Update the archive status of a call.
- `PATCH /reset`: Reset all calls to their initial state.

## Usage
- Navigate through the tabs to view all calls or archived calls.
- Click on a call entry to view its details.
- Use the archive and unarchive buttons to manage call records.

## Deployment
The app is deployed at [https://speertechnologies-frontend.vercel.app/](#). Visit the link to interact with the live version.
