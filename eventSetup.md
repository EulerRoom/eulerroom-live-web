# Streaming Event setup

Documents how to setup a new streaming event using muxy admin and this repo.

## Requirements

* access to muxy admin: https://muxy.eulerroom.com/admin/
* write access to Environment Variables and running workflows in this repo

## Overview / key features

Muxy provides a way to manage registration for streaming events. It also provides a mechanism to manage the timing and access rights for rtmp streaming connections. These come from individual clients, usually via OBS streaming software.

* Events have start and end times
* Streams are assigned to a specific event, and also have start and end times
* The registration website builds the stream slots for an event based on the slot duration setting. It also displays event header information and the slot registration progress bar.
* Stream slots can be claimed by users. They can also be created in Muxy admin. Slots created there are not constrained by the slot duration.
* Stream keys are generated every time a stream slot is created. An automated email is generated with the stream key along with event information.
* During the event, muxy uses the stream key to determine if an rtmp connection is allowed.

## Create an Event - muxy admin

* **event name**: keep it descriptive, no spaces. This will be used for the event "slug" needed to link the event to the webpage display.
* set event start / end times
* **url**: use https://eulerroom.com
* **Active** flag
    * used to determine whether the "event not active yet" heading will be displayed
    * used to control whether stream connections can go to Live. With the active flag unchecked all stream connections will go to test, even during the actual time of a slot. This means that you can't test a Live stream while this is unchecked.
* **Preparation time**: time during which a connection to the live rtmp endpoint is accepted by Muxy. Usually 15 mins.
* **rtmp** endpoints: these are set by default and shouldn't be changed
* **Event stream URLs**: These are where the Live and Test streams are viewed.
    * https://live.eulerroom.com/
    * https://test.eulerroom.com/
* **Event support URLs**: links to user documentation and support. These can be copied from previous events.
    * User Guide
    * Discord Invite for TOPLAP Live coding > stream-help
    * OBS settings: https://github.com/EulerRoom/eulerroom-live-web/blob/main/obsSettings.md

## Event Options - GitHub

* **Slot duration**: sets default slot duration for event. Generally set to 15 or 20 mins, but it can be any length.
    * `src/app/components/PerformanceList.tsx`
    * `const SLOT_DURATION_MIN = 15`
* Event page: Sets the HTML for the top part of the event page (https://eulerroom.com/ or whatever url is set in event url)
    * `src/components/EventHeader.tsx`
    * TOPLAP Presents ...
    * Event title
    * Text for event not open for registration yet.
    * Top image
        * set image location: `import logo from "../assets/images/longestnight-sunset-2.0.svg";`
        * replace logo file as needed

## Set Event Page - environment variable and workflow
The Environment Variable "VITE_EVENT_SLUG" needs to be set to the event slug from Muxy admin. This will tell the web page which event to use in generating the stream slots. The workflow needs to be run to push this change to the host server.
* GitHub (this repo): Settings : Environments : github-pages : Environment variables
* Set `VITE_EVENT_SLUG`
* Run GitHub Workflow:
    * Actions : Workflows: Deploy static content to Pages -> `Run Workflow`
        * [Link to Workflow](https://github.com/EulerRoom/eulerroom-live-web/actions/workflows/deploy.yml)

## Slot management
Using Muxy admin, you can add, delete and modify stream slots. Using the admin UI, stream duration is not constrained to the SLOT_DURATION_MIN setting used by the slot registration web page. This is useful for having some slots be longer for groups or other performances. In this case, a group or multiple performers can share a stream key and stream for a longer period.
* **Timezone**: Requires use of the [County/City format](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) of the [tz database timezones](https://en.wikipedia.org/wiki/Tz_database)
* **Description**: will be used during the archive process to populate the Description value for YouTube and Internet Archive.
* **Time zone displays**: Muxy Admin uses start/end time in UTC. The registration web page displays your local time zone. This can be confusing and takes getting used to. 


