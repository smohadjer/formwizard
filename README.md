# formWizard | A Boilerplate for multi-step forms
This is a boilerplate for building multi-step forms. It is implemented in away that if javascript is not available form works by loading pages from server, but if javascript is enabled it communicates with server via ajax. It provides users with structure and basis for building their own multi-step forms, but implementation details is left to them. This boilerplate shows you how to break a large form into a multi-step structure that works with or without js, that can support list/add item pattern, review pattern, decision tree all from a centralized code base (so you don't repeat code on both server-side and client-side). 

Navigating through form steps by default is sequential, meaning that you can only access steps whose previous steps have been completed. However you can bypass this restriction by setting data-navigation="random" on the form element.

# Demo
- http://saeidmohadjer.com/formwizard/form.php?step=1

# Requirements
- It should work even if javascript is disabled.
- It should work on IE11.
- It should NOT break browser back button.
- It should be possible to add/remove steps without changes to javascript.
- Form should have a navigation that allows accessing form steps. 
- If javascript is enabled, no page reload should happen.

# Features
- No use of jQuery or any 3rd party js/css frameworks.
- Client-side validation is done by [HTML5 validation attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation) and without javascript. 
- Random or sequential access to form steps via form navigation

# Dependencies
- PHP
- JavaScript (optional)

# Phase II
- Support for sub-steps
- Handling server-side validation errors. If some form fields show error messages inserted by server, javascript should remove these errors as soon as the user corrects them, possibly by calling a server-side validator endpoint using ajax to figure out if the new value is valid or not.
- Add caching of steps on client side so when user clicks next button in a step, we don't need to wait for markup to be fetched from server via ajax. For steps with decision-tree we skip caching as what markup is returned depends on choices user makes in current step. Whether a step has decision-tree or not should be indicated using a data attribute on step container.

