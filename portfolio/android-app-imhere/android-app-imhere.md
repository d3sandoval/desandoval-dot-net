title: ImHere
description: Location-aware personal messaging for Android
date: December 2014
tags: Design, Android, Mobile, AIT, Parse, Java, TripIt, API
category: Programming
topImage: ![IMAGE](resources/FF1BCDD8EE6A1465BFE89FF06346B1C5.jpg =571x1013)
content:

Location-aware messaging to automatically notify those closest to you that you’ve made it somewhere safely

_What is it? How does it work?_

When you arrive somewhere (like when you finish a plane, train, or long car ride), it’s important to tell the ones that care about you that you have made it there safely. This app will make this process easier by asking to send an update to various important people via text, email, facebook message, etc.

For more information, see the design specification here: [http://1drv.ms/1FqmfVF](http://1drv.ms/1FqmfVF)

Source code available here: [https://github.com/d3sandoval/Android/tree/master/ImHereFinal](https://github.com/d3sandoval/Android/tree/master/ImHereFinal)

# Features and Specification

_Implementation Details_

Upon arrival in a certain location ([TripIt integration](https://www.tripit.com/developer)), a push notification will ask the user if they would like to send a message telling others that they have arrived there safely. If the user clicks it, the application will appear – showing a list of people ordered from most important to least important (algorithm pending – most likely will depend on Facebook integration and/or Recent Contacts). People who the user has sent previous messages to will already be checked and others may be selected as well. There will be options available for how the message should be sent (FB message, sms, etc.) and what data should be included in the message (GPS location, pre-filled text, location typed out, etc.). Default values for these options will be friendly enough to send with just a few clicks.

# Design and Use

The application consists of three components:

*   Trigger-location management
*   ImHere group management
*   Location-triggered services

To use the application, simply click on the icon after it has been installed:

![Android home screen](resources/9554E4CCC16FF4CCDB203FF4CEB433F7.jpg =572x1012)

The application will open up to the main screen:

![ImHere Main Screen](resources/FF1BCDD8EE6A1465BFE89FF06346B1C5.jpg =571x1013)

From here, the user can tap “Edit Group” to add contacts to a list that will appear when a user has reached a certain location or travelled over 100 miles between GPS-checkins:

![A screen with a search field on it and a prompt "These people will get a text upon your arrival"](resources/DBC5330F4198F836527E913E33A2B1F2.jpg =572x1012)

Contacts can be added to the list by name or by number. One can also tap to remove the contact from this list:

![Typing a number into the search field](resources/14F9954A14FD5F95CA6434684161A52B.jpg =572x1013)

![Typing "Mom" into the search field](resources/18CD5A4ADE5D27E6F18A81035815A0D3.jpg =570x972)

!["Mom" and "Spouse" appear on the list below the text field](resources/2F6522605402113F52BE977B84483475.jpg =571x1015)

!["Spouse has been removed from the list](resources/29C1FAC03A30FEC0D3C7EB0EDE12E196.jpg =570x1014)

Clicking on Add/Edit Locations brings the user to the “Edit Custom Locations” screen. This screen allows them to set a spot where they would like ImHere to be aware of:

![Edit custom locations screen 1](resources/C46F98A08964A942786A67CB2A3CA7DB.jpg =569x1016)

![Edit custom locations screen 2](resources/0C659BC10E14D7287B05F1A2EBE9AE5E.jpg =567x1013)

![Edit custom locations screen 3](resources/06B5D1AD5826C07508DFF975329B036F.jpg =568x1014)

Upon arriving at a custom location **or after traveling over 100 miles between check-ins**, the user will receive a notification from ImHere:

![Push notification saying "You've traveled quite far! Click here to notify your "ImHere" group](resources/52DC8BBAEFEF4091F241811869BEEB9D.jpg =571x1011)

Clicking on the notification brings the user to the following screen, which shows a preview of the ImHere message and the group that it will be sent to:

![Message customization screen](resources/93302D468465606DC2B3C3AED927B3F4.jpg =569x1010)

Clicking “Send via SMS” takes the user to their messaging application, the message already written out:

![Android SMS screen with text from previous screen in the message field](resources/93E8C6C967BB99F54C602664E1698A4A.jpg =569x1016)

![Group text with message sent](resources/5B67A98A3D5BEF46F472E3AF072B9E5F.jpg =570x1013)

# Future Integrations

_To be implemented if I have time, otherwise, will be developed outside the class_

* Automatic check-in at locations (for posts on various social networking sights)
* Other messaging integrations (WhatsApp, Viber, etc.)
* Various other toggles for the push notification – like GoogleNow integration for telling people you showed up for work late.
* Changing the default recipient list depending on type of travel (not sure how to do this. Define: type of travel)

The entire specification is located here: [http://1drv.ms/1FqmfVF](http://1drv.ms/1FqmfVF)

For source code and package, head to my Android github: [https://github.com/d3sandoval/Android/tree/master/ImHereFinal](https://github.com/d3sandoval/Android/tree/master/ImHereFinal)

