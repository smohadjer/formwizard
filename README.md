# formWizard
This is a boilerplate for building multi-step forms. It is implemented in away that if javascript is not available form works by loading pages from server, but if javascript is enabled it communicates with server via ajax. It provides users with structure and basis for building their own multi-step forms, but implementation details is left to them (how server generates each form screen).

This boilerplate shows you how to break a large form into a multi-step structure that works with or without js, that can support list/add item pattern, review pattern, decision tree all from a centralized code base (so you don't repeat code on both server-side and client-side)

# Demo
- https://smohadjer.github.io/formwizard/index.html

# Requirements
- It should work even if javascript is disabled.
- It should work on IE11.
- It should NOT break browser back button.
- It should be possible to add/remove steps without changes to javascript.
- Form should have a navigation that allows accessing form steps. 
- A form step is only accessible if previous steps have been submitted.
- If javascript is enabled, no page reload should happen.

# Features
- No use of jQuery or any 3rd party js/css frameworks.
- Client-side validation is done by [HTML5 validation attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation) and without javascript. 

# Dependencies
- PHP
- JavaScript (optional)

