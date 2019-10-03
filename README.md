# formWizard | A boilerplate for multi-step single-page forms
This is a boilerplate for building multi-step forms as a single page app. The approach used allows the forms to work even if javascript is disabled, but if javascript is enabled steps are fetched and posted via ajax allowing user to go back and forward through steps without a page reload. 

This boilerplate shows you how to break a large form into a multi-step structure that works with or without js, that can support list/add item pattern, review pattern, decision tree all from a centralized code base (so you don't repeat code on both server-side and client-side). Navigating through form steps by default is sequential, meaning that you can only access steps whose previous steps have been completed. However you can bypass this restriction by setting data-navigation="random" on the form element.

# Demo
- http://sandbox.saeidmohadjer.com/formwizard/form.php

# Features
- Form remains functional even if javascript is disabled or throws errors
- It does NOT break browser back button 
- Form steps can be added or removed without changes to javascript
- If javascript is enabled, no page reload happens (SPA)
- No use of jQuery or other frameworks
- No required stylesheets
- Supports server-side validation
- Client-side validation relies on [HTML5 validation attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation) or you can im

# Features (not implemented yet)
- Support for IE11

# Dependencies
No dependencies. The demo page uses PHP for server-side scripting, but you are free to use any server-side language.
