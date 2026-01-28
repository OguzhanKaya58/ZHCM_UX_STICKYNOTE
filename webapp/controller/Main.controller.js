sap.ui.define([
	"zhcm/ux/sticky/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("zhcm.ux.sticky.controller.Main", {

		onInit: function () {
			var storedNotes = localStorage.getItem("stickyNotes");
			var notesData;

			if (storedNotes) {
				notesData = JSON.parse(storedNotes);
			} else {
				notesData = {
					activeIndex: -1,
					notes: [
						{
							title: "Toplantı",
							content: "Saat 14:00",
							backgroundColor: "#FFF9C4"
						}
					]
				};
				localStorage.setItem("stickyNotes", JSON.stringify(notesData));
			}

			this.getView().setModel(new JSONModel(notesData), "notes");
		},

		_onUpdateLocalStorage: function () {
			var oModel = this.getView().getModel("notes");
			localStorage.setItem("stickyNotes", JSON.stringify(oModel.getData()));
		},

		onAddNote: function () {
			var oModel = this.getView().getModel("notes");
			var aNotes = oModel.getProperty("/notes");

			aNotes.push({
				title: "",
				content: "",
				backgroundColor: "#FFF9C4"
			});

			oModel.setProperty("/notes", aNotes);
			this._onUpdateLocalStorage();
		},

		onExit: function () {
			this._onUpdateLocalStorage();
		},

		onNoteDelete: function (oEvent) {
			var oCtx = oEvent.getSource().getBindingContext("notes");
			if (!oCtx) return;

			var iIndex = Number(oCtx.getPath().split("/").pop());
			var oModel = this.getView().getModel("notes");
			var aNotes = oModel.getProperty("/notes");

			aNotes.splice(iIndex, 1);
			oModel.setProperty("/notes", aNotes);
			this._onUpdateLocalStorage();

			this._sweetToast(this.getText("DELETE", [iIndex + 1]), "S");
		},

		onGetConffetti: function () {
			this._getConfetti(-1);
		},
		onDetail:function(oEvent){
			
		},

	});
});
