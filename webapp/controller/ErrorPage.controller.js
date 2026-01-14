sap.ui.define([
	"zhcm/ux/sticky/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("zhcm.ux.sticky.controller.ErrorPage", {

		/**
		 * Navigates to the worklist when the link is pressed
		 * @public
		 */
		onLinkPressed: function () {
			this.getRouter().navTo("myovertimerequest");
		}

	});

});