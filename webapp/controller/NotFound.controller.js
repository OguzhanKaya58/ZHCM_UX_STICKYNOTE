sap.ui.define([
	"zhcm/ux/sticky/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("zhcm.ux.sticky.controller.NotFound", {

		/**
		 * Navigates to the worklist when the link is pressed
		 * @public
		 */
		onLinkPressed: function () {
			this.getRouter().navTo("myovertimerequest");
		}

	});

});