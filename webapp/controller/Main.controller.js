sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("zhcm.ux.sticky.controller.Main", {

		onInit: function () {
			this.getView().setModel(new JSONModel({
				notes: [
					{
						title: "Toplantı",
						content: "Saat 14:00",
						backgroundColor: "#FFF9C4"
					}
				]
			}), "notes");
		},

		onAddNote: function () {
			var oModel = this.getView().getModel("notes");
			var aNotes = oModel.getProperty("/notes");

			aNotes.push({
				title: "Yeni Not",
				content: "",
				backgroundColor: "#E1F5FE"
			});

			oModel.setProperty("/notes", aNotes);
		},
		onNoteDelete: function (oEvent) {
			var oCtx = oEvent.getSource().getBindingContext("notes");
			if (!oCtx) return;

			var iIndex = Number(oCtx.getPath().split("/").pop());
			var oModel = this.getView().getModel("notes");
			var aNotes = oModel.getProperty("/notes");

			aNotes.splice(iIndex, 1);
			oModel.setProperty("/notes", aNotes);
		}

	});
});
