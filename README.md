# SOEN-487-Galactus

A Weather App built with Vue.js and Node.js as the final project by "L'equipe" for SOEN 487 - Web Services and Applications at Concordia University in Montreal

## Approach

It works utilizing 4 Services:

1) Data Retrieval Service -> Data Demon

2) Notification Service -> Notify Nexus

3) Visualization/Pre-Render Service -> Visual Voyager

4) UI + Authentication Service -> Sky Siren

## Setup for the Services and UI
Please ensure that you have Node.js already installed on your machine, you can download it at [Node Download](https://nodejs.org/en/download)

If you have node installed, ignore the previous sentence. Navigate to the directory that you are working on and open a CLI window at that location (can use the integrated terminal in vscode or simply navigate manually in a newly opened terminal)

When you are in the directory, run the ``npm install`` command first. This makes sure you are up-to-date on all the packages

When you the previous command finishes, then you can edit as you want. If you want to see the result and test it out then run the ``npm start`` command. It will output in the terminal the port at which it can be reached and you may navigate to it by visiting localhost:PORT.

## Development in the backend service
To see your code changes live while running a service, run the service with ``npm run live-reload`` instead of ``npm start``. Edit code and save the file, and the changes will apply to the server live.