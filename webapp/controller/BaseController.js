/*global _*/
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"zhcm/ux/sticky/utils/swal",
	"zhcm/ux/sticky/utils/confetti",
], function (Controller, swalJs, confetti) {
	"use strict";

	return Controller.extend("zhcm.ux.sticky.controller.BaseController", {
		/**
		 * Convenience method for accessing the router.
		 * @public
		 * @returns {sap.ui.core.routing.Router} the router for this component
		 */
		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		/**
		 * Convenience method for getting the view model by name.
		 * @public
		 * @param {string} [sName] the model name
		 * @returns {sap.ui.model.Model} the model instance
		 */
		getModel: function (sName) {
			return this.getView().getModel(sName);
		},
		/**
		 * Convenience method for setting the view model.
		 * @public
		 * @param {sap.ui.model.Model} oModel the model instance
		 * @param {string} sName the model name
		 * @returns {sap.ui.mvc.View} the view instance
		 */
		setModel: function (oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},

		/**
		 * Getter for the resource bundle.
		 * @public
		 * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
		 */
		getResourceBundle: function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},

		getText: function (sTextCode, aParam) {
			var aTextParam = aParam;
			if (!aTextParam) {
				aTextParam = [];
			}
			return this.getResourceBundle().getText(sTextCode, aTextParam);
		},

		openBusyFragment: function (sTextCode, aMessageParameters) {
			var oDialog = this._getBusyFragment();

			if (sTextCode) {
				oDialog.setText(this.getText(sTextCode, aMessageParameters));
			} else {
				oDialog.setText(this.getText("PLEASE_WAIT"));
			}

			oDialog.open();
		},

		closeBusyFragment: function () {
			var oDialog = this._getBusyFragment();
			oDialog.close();
		},

		_getBusyFragment: function () {
			if (!this._oBusyDialog) {
				this._oBusyDialog = sap.ui.xmlfragment("zhcm.ux.sticky.fragment.GenericBusyDialog", this);
				this.getView().addDependent(this.oBusyDialog);
			} else {
				this._oBusyDialog.close();
			}

			return this._oBusyDialog;
		},

		_getConfetti: function (caseNumber) {
			function randomInRange(min, max) {
				return Math.random() * (max - min) + min;
			}
			if (!caseNumber || caseNumber === -1) {
				// Rastgele bir sayı üret
				let randomNumber = Math.floor(Math.random() * 100); // 0 ile 99 arasında bir sayı

				// Mod işlemi ile 10'a bölünen sonucu al
				caseNumber = randomNumber % 10;
			}
			const end = Date.now() + 15 * 150;
			// go Buckeyes!
			const colors = ["#bb0000", "#ffffff"];

			// Canvas'ın arkaya alınması için stil ekleyelim
			if (!document.getElementById("confetti-style")) {
				const style = document.createElement("style");
				style.id = "confetti-style";
				style.innerHTML = `
            canvas.confetti-canvas {
                position: fixed !important;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                z-index: -1 !important;
                pointer-events: none !important;
            }
        `;
				document.head.appendChild(style);
			}
			switch (caseNumber) {
				case 0:
					(function frame() {
						window.confetti({
							particleCount: 2,
							angle: 60,
							spread: 55,
							origin: { x: 0 },
							colors: colors,
						});

						window.confetti({
							particleCount: 2,
							angle: 120,
							spread: 55,
							origin: { x: 1 },
							colors: colors,
						});

						if (Date.now() < end) {
							requestAnimationFrame(frame);
						}
					})();
					break;
				case 1:
					window.confetti({
						angle: randomInRange(55, 125),
						spread: randomInRange(50, 70),
						particleCount: randomInRange(50, 100),
						origin: { y: 0.6 },
					});
					break;
				case 2:
					const count = 200,
						defaults = {
							origin: { y: 0.7 },
						};

					function fire(particleRatio, opts) {
						window.confetti(
							Object.assign({}, defaults, opts, {
								particleCount: Math.floor(count * particleRatio),
							})
						);
					}

					fire(0.25, {
						spread: 26,
						startVelocity: 55,
					});

					fire(0.2, {
						spread: 60,
					});

					fire(0.35, {
						spread: 100,
						decay: 0.91,
						scalar: 0.8,
					});

					fire(0.1, {
						spread: 120,
						startVelocity: 25,
						decay: 0.92,
						scalar: 1.2,
					});

					fire(0.1, {
						spread: 120,
						startVelocity: 45,
					});
					break;
				case 3:
					const defaults2 = {
						spread: 360,
						ticks: 100,
						gravity: 0,
						decay: 0.94,
						startVelocity: 30,
						shapes: ["heart"],
						colors: ["FFC0CB", "FF69B4", "FF1493", "C71585"],
					};

					window.confetti({
						...defaults2,
						particleCount: 50,
						scalar: 2,
					});

					window.confetti({
						...defaults2,
						particleCount: 25,
						scalar: 3,
					});

					window.confetti({
						...defaults2,
						particleCount: 10,
						scalar: 4,
					});
					break;
				case 4:
					const defaults3 = {
						spread: 360,
						ticks: 50,
						gravity: 0,
						decay: 0.94,
						startVelocity: 30,
						shapes: ["star"],
						colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
					};

					function shoot1() {
						window.confetti({
							...defaults3,
							particleCount: 40,
							scalar: 1.2,
							shapes: ["star"],
						});

						window.confetti({
							...defaults3,
							particleCount: 10,
							scalar: 0.75,
							shapes: ["circle"],
						});
					}

					setTimeout(shoot1, 0);
					setTimeout(shoot1, 100);
					setTimeout(shoot1, 200);
					break;
				case 5:
					const defaults4 = {
						spread: 360,
						ticks: 100,
						gravity: 0,
						decay: 0.94,
						startVelocity: 30,
					};

					function shoot2() {
						window.confetti({
							...defaults4,
							particleCount: 30,
							scalar: 1.2,
							shapes: ["circle", "square"],
							colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
						});

						window.confetti({
							...defaults4,
							particleCount: 20,
							scalar: 2,
							shapes: ["emoji"],
							shapeOptions: {
								emoji: {
									value: [
										"🦄",
										"🔥",
										"🚀",
										"💎",
										"🎉",
										"🌟",
										"💖",
										"⚡",
										"🍀",
									],
								},
							},
						});
					}

					setTimeout(shoot2, 0);
					setTimeout(shoot2, 100);
					setTimeout(shoot2, 200);
					break;
				case 6:
					var defaults5 = {
						scalar: 2,
						spread: 270,
						particleCount: 25,
						origin: { y: 0.4 },
						startVelocity: 35,
					};

					window.confetti({
						...defaults5,
						shapes: ["image"],
						shapeOptions: {
							image: {
								src: "https://particles.js.org/images/pumpkin.svg",
								replaceColor: true,
								width: 32,
								height: 40,
							},
						},
						colors: ["#ff9a00", "#ff7400", "#ff4d00"],
					});
					window.confetti({
						...defaults5,
						shapes: ["image"],
						shapeOptions: {
							image: {
								src: "https://particles.js.org/images/pine-tree.svg",
								replaceColor: true,
								width: 271,
								height: 351.5,
							},
						},
						colors: ["#8d960f", "#be0f10", "#445404"],
					});
					window.confetti({
						...defaults5,
						shapes: ["heart"],
						colors: ["#f93963", "#a10864", "#ee0b93"],
					});
					break;
				case 7:
					const duration = 15 * 1000,
						animationEnd = Date.now() + duration,
						defaults6 = {
							startVelocity: 30,
							spread: 360,
							ticks: 60,
							zIndex: 0,
						};

					const interval = setInterval(function () {
						const timeLeft = animationEnd - Date.now();

						if (timeLeft <= 0) {
							return clearInterval(interval);
						}

						const particleCount = 50 * (timeLeft / duration);

						// since particles fall down, start a bit higher than random
						window.confetti(
							Object.assign({}, defaults6, {
								particleCount,
								origin: {
									x: randomInRange(0.1, 0.3),
									y: Math.random() - 0.2,
								},
							})
						);
						window.confetti(
							Object.assign({}, defaults6, {
								particleCount,
								origin: {
									x: randomInRange(0.7, 0.9),
									y: Math.random() - 0.2,
								},
							})
						);
					}, 250);
					break;
				case 8:
					window.confetti({
						spread: 360,
						ticks: 200,
						gravity: 1,
						decay: 0.94,
						startVelocity: 30,
						particleCount: 100,
						scalar: 3,
						shapes: ["image"],
						shapeOptions: {
							image: [
								{
									src: "https://particles.js.org/images/fruits/apple.png",
									width: 32,
									height: 32,
								},
								{
									src: "https://particles.js.org/images/fruits/avocado.png",
									width: 32,
									height: 32,
								},
								{
									src: "https://particles.js.org/images/fruits/banana.png",
									width: 32,
									height: 32,
								},
								{
									src: "https://particles.js.org/images/fruits/berries.png",
									width: 32,
									height: 32,
								},
								{
									src: "https://particles.js.org/images/fruits/cherry.png",
									width: 32,
									height: 32,
								},
								{
									src: "https://particles.js.org/images/fruits/grapes.png",
									width: 32,
									height: 32,
								},
								{
									src: "https://particles.js.org/images/fruits/lemon.png",
									width: 32,
									height: 32,
								},
								{
									src: "https://particles.js.org/images/fruits/orange.png",
									width: 32,
									height: 32,
								},
								{
									src: "https://particles.js.org/images/fruits/peach.png",
									width: 32,
									height: 32,
								},
								{
									src: "https://particles.js.org/images/fruits/pear.png",
									width: 32,
									height: 32,
								},
								{
									src: "https://particles.js.org/images/fruits/pepper.png",
									width: 32,
									height: 32,
								},
								{
									src: "https://particles.js.org/images/fruits/plum.png",
									width: 32,
									height: 32,
								},
								{
									src: "https://particles.js.org/images/fruits/star.png",
									width: 32,
									height: 32,
								},
								{
									src: "https://particles.js.org/images/fruits/strawberry.png",
									width: 32,
									height: 32,
								},
								{
									src: "https://particles.js.org/images/fruits/watermelon.png",
									width: 32,
									height: 32,
								},
								{
									src: "https://particles.js.org/images/fruits/watermelon_slice.png",
									width: 32,
									height: 32,
								},
							],
						},
					});
					break;
				case 9:
					const duration2 = 15 * 1000,
						animationEnd2 = Date.now() + duration2;

					let skew = 1;

					function randomInRange(min, max) {
						return Math.random() * (max - min) + min;
					}

					(function frame2() {
						const timeLeft2 = animationEnd2 - Date.now(),
							ticks = Math.max(200, 500 * (timeLeft2 / duration2));

						skew = Math.max(0.8, skew - 0.001);

						window.confetti({
							particleCount: 1,
							startVelocity: 0,
							ticks: ticks,
							origin: {
								x: Math.random(),
								// since particles fall down, skew start toward the top
								y: Math.random() * skew - 0.2,
							},
							colors: ["#ffffff"],
							shapes: ["circle"],
							gravity: randomInRange(0.4, 0.6),
							scalar: randomInRange(0.4, 1),
							drift: randomInRange(-0.4, 0.4),
						});

						if (timeLeft2 > 0) {
							requestAnimationFrame(frame2);
						}
					})();
					break;
				default:
					window.confetti({
						particleCount: 100,
						spread: 70,
						origin: { y: 0.6 },
					});
			}
		},

		_sweetToast: function (sMessage, sMessageType) {
			var sTitle, sText, sIcon;
			var sI18n = this.getView().getModel("i18n").getResourceBundle();
			switch (sMessageType) {
				case "S":
					sTitle = sI18n.getText("SUCCESS_TEXT");
					sText = sMessage;
					sIcon = "success";
					break;
				case "W":
					sTitle = sI18n.getText("WARNING_TEXT");
					sText = sMessage;
					sIcon = "warning";
					break;
				case "E":
					sTitle = sI18n.getText("ERROR");
					sText = sMessage;
					sIcon = "error";
					break;
				case "I":
					sTitle = sI18n.getText("INFO_TEXT");
					sText = sMessage;
					sIcon = "info";
					break;
				default:
					sText = sMessage;
					sIcon = "info";
			}
			var Toast = Swal.mixin({
				toast: true,
				position: "bottom-end",
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
				didOpen: (toast) => {
					toast.onmouseenter = Swal.stopTimer;
					toast.onmouseleave = Swal.resumeTimer;
				},
				customClass: {
					popup: "swal2-custom-zindex", // CSS ile z-index artırılabilir,
					popup: "swal2-custom-popup",
					title: "swal2-custom-title",
					confirmButton: "swal2-custom-confirm",
					cancelButton: "swal2-custom-cancel",
				},
			});
			Toast.fire({
				icon: sIcon,
				title: sText,
			});
		},

		addHistoryEntry: (function () {
			var aHistoryEntries = [];

			return function (oEntry, bReset) {
				if (bReset) {
					aHistoryEntries = [];
				}

				var bInHistory = aHistoryEntries.some(function (entry) {
					return entry.intent === oEntry.intent;
				});

				if (!bInHistory) {
					aHistoryEntries.push(oEntry);
					this.getOwnerComponent().getService("ShellUIService").then(function (oService) {
						oService.setHierarchy(aHistoryEntries);
					});
				}
			};
		})()
	});

});