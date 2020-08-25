# turf-gis

## Browser Side
The index.html finds the midpoint between two user entries using Turf.
After the user enters the first address on the bottom right, the map will pan to it and prompt another entry.
Upon submission of the second address, the map will pan out to display both addresses as well as the midpoint.

## Server Side
Similar to the example in the lesson, this script takes the Antarctica data and filters it using Node.
In my script specifically, I chose to filter out the listed glaciers from the csv, taking along information such as latlong and elevation.