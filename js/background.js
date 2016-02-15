/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
chrome.app.runtime.onLaunched.addListener(function() {
  var windowWidth = 640;
  var windowHeight = 480;
  chrome.app.window.create('main.html', {
    'outerBounds': {
      'width': Math.round(window.screen.availWidth*0.8),
      'height': Math.round(window.screen.availHeight*0.8)
    }
  });
});


