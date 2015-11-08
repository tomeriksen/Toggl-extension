/*jslint indent: 2 */
/*global $: false, document: false, togglbutton: false*/
'use strict';

togglbutton.render('.eb-root:not(.toggl), .ep:not(.toggl)', {observe: true}, function (elem) {
  var link, description, togglButtonElement, sa, startDate = new Date(), startTime, stopTime, duration;

  if ($('.eb-title', elem) !== null) {
    togglButtonElement = $('.eb-date', elem);
    description = $('.eb-title', elem).textContent;
    sa = togglButtonElement.textContent.split("–");
  
    startDate = new Date (sa[0] + " " + new Date().getFullYear());
    stopTime = sa[1];
    startTime = sa[0].split(",")[2];
	duration = (parseInt(stopTime.split(":")[0])- parseInt(startTime.split(":")[0]))*3600; //hours
	duration += (parseInt(stopTime.split(":")[1])- parseInt(startTime.split(":")[1]))*60; //secs
   
  
  } else {
    togglButtonElement = $('.ep-dpc .ep-drs', elem);
    description = $('.ep .ep-title input', elem).value;
  }
  
  
  
  
  link = togglbutton.createTimerLink({
    className: 'google-calendar',
    description: description,
	  startDate: startDate.toISOString(),
	  duration: duration
  });

  togglButtonElement.appendChild(link);
});