# formWizard | A Boilerplate for multi-step forms
This is a boilerplate for building multi-step forms as a single page app. The approach used allows the forms to work even if javascript is disabled, but if javascript is enabled steps are fetched and posted via ajax allowing user to go back and forward through steps without a page reload. 

This boilerplate shows you how to break a large form into a multi-step structure that works with or without js, that can support list/add item pattern, review pattern, decision tree all from a centralized code base (so you don't repeat code on both server-side and client-side). Navigating through form steps by default is sequential, meaning that you can only access steps whose previous steps have been completed. However you can bypass this restriction by setting data-navigation="random" on the form element.

# Demo
- http://saeidmohadjer.com/formwizard/form.php?step=1

# Requirements
- Form should still work if javascript is disabled or if it throws an error.
- It should NOT break browser back button 
- It should be possible to add or remove form steps without changes to javascript.
- If javascript is enabled, no page reload should happen.
- Form should have a navigation that allows accessing form steps. 
- Support for IE11.

# Features
- No use of jQuery or any 3rd party javascript rameworks.
- No styling.
- Client-side validation is done by [HTML5 validation attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation) and without javascript. 
- Random or sequential access to form steps via form navigation

# Dependencies
No dependencies. The demo page uses PHP for server-side scripting, but you are free to use any language that runs on your server.
