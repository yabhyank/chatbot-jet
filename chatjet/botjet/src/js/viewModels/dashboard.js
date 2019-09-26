/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojlabel',
        'ojs/ojcomposite', 'jet-composites/bot-client/loader', 'ojs/ojoffcanvas',
        'ojs/ojinputnumber', 'ojs/ojswitch', 'ojs/ojmodule'],
 function(oj, ko, $) {

    function DashboardViewModel() {
      var self = this;

      self.centralModule = ko.observable('welcome');
      self.custName = ko.observable('DELL.INC');
	  
      self.handleBot = function(event) {
        var intent = event.detail.botintent;
        var botparams = event.detail.botparams;

        if (intent === 'schedule') {
          self.centralModule('schedule');
		  self.custName('DELL');
        } else if (intent === 'profile') {
          self.centralModule('profile');
        } else if (intent === 'welcome') {
          self.centralModule('welcome');
        }
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new DashboardViewModel();
  }
);
