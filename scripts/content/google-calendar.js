/*jslint indent: 2 */
/*global $: false, document: false, togglbutton: false*/
'use strict';

togglbutton.render('.eb-root:not(.toggl), .ep:not(.toggl)', {observe: true}, function (elem) {
  var link, description, togglButtonElement, sa, startDate = new Date(), startTime, stopTime, duration;

  if ($('.eb-title', elem) !== null) {
    togglButtonElement = $('.eb-date', elem);
    description = $('.eb-title', elem).textContent;
    sa = togglButtonElement.textContent.split("–");
  	//find startDate & duration
    startDate = new Date (sa[0] + " " + new Date().getFullYear());
    stopTime = sa[1];
    startTime = sa[0].split(",")[2];
	duration = (parseInt(stopTime.split(":")[0])- parseInt(startTime.split(":")[0]))*3600; //hours
	duration += (parseInt(stopTime.split(":")[1])- parseInt(startTime.split(":")[1]))*60; //secs
  
  } else {
    togglButtonElement = $('.ep-dpc .ep-drs', elem);
    description = $('.ep .ep-title input', elem).value;
  }
  var projectID, clientID;
  //lookup id description can help us guess projects
  projectID=11341529; //funkar bara tomvonmom
  //getCookie(description);

  
  
  link = togglbutton.createTimerLink({
    className: 'google-calendar',
    description: description,
	  startDate: startDate.toISOString(),
	  duration: duration,
	  projectId:projectID
  });

  togglButtonElement.appendChild(link);
});


function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}