sap.ui.define([
    "sap/ui/core/Control",
    "sap/m/Text",
    "sap/m/Input",
    "sap/m/TextArea",
    "sap/m/VBox",
    "sap/m/HBox",
    "sap/m/Button",
    "sap/m/ColorPalettePopover"
], function (
    Control,
    Text,
    Input,
    TextArea,
    VBox,
    HBox,
    Button,
    ColorPalettePopover
) {
    "use strict";

    return Control.extend("zhmc.ux.sticky.controls.StickyNote", {
        metadata: {
            properties: {
                title: { type: "string", defaultValue: "", bindable: true },
                content: { type: "string", defaultValue: "", bindable: true },
                backgroundColor: { type: "string", defaultValue: "#FFF9C4", bindable: true }
            },
            events: {
                delete: {}
            }
        },

        init: function () {
            this._bEdit = false;

            /* ---------- TITLE ---------- */
            this._oTitleText = new Text();

            this._oTitleInput = new Input({
                value: "{/}", // dummy, manuel set edilecek
                liveChange: (e) => {
                    this.setProperty("title", e.getParameter("value"), true);
                }
            });

            /* ---------- CONTENT ---------- */
            this._oContentText = new Text({ wrapping: true });

            this._oContentInput = new TextArea({
                rows: 4,
                liveChange: (e) => {
                    this.setProperty("content", e.getParameter("value"), true);
                }
            });

            /* ---------- COLOR ---------- */
            this._oColorPicker = new ColorPalettePopover({
                colorSelect: (e) => {
                    this.setProperty("backgroundColor", e.getParameter("value"));
                }
            });

            this._oColorBtn = new Button({
                icon: "sap-icon://palette",
                type: "Transparent",
                press: (e) => this._oColorPicker.openBy(e.getSource())
            });

            /* ---------- DELETE ---------- */
            this._oDeleteBtn = new Button({
                icon: "sap-icon://delete",
                type: "Transparent",
                press: () => this.fireDelete()
            });

            this._oActionBox = new VBox({
                alignItems: "End",
                items: [
                    this._oColorBtn,
                    this._oDeleteBtn
                ]
            });

            this._oHeader = new HBox({
                justifyContent: "SpaceBetween",
                items: [
                    new VBox({
                        items: [
                            this._oTitleText,
                            this._oTitleInput
                        ]
                    }),
                    this._oActionBox
                ]
            });

            this._oLayout = new VBox({
                items: [
                    this._oHeader,
                    this._oContentText,
                    this._oContentInput
                ]
            });

            this._syncUI();
        },

        /* ---------- PROPERTY SYNC ---------- */
        setTitle: function (v) {
            this.setProperty("title", v, true);
            this._oTitleText.setText(v);
            this._oTitleInput.setValue(v);
        },

        setContent: function (v) {
            this.setProperty("content", v, true);
            this._oContentText.setText(v);
            this._oContentInput.setValue(v);
        },

        setBackgroundColor: function (v) {
            this.setProperty("backgroundColor", v, true);
            this.invalidate();
        },

        /* ---------- EDIT MODE ---------- */
        _syncUI: function () {
            this._oTitleText.setVisible(!this._bEdit);
            this._oContentText.setVisible(!this._bEdit);

            this._oTitleInput.setVisible(this._bEdit);
            this._oContentInput.setVisible(this._bEdit);
        },

        onclick: function () {
            this._bEdit = true;
            this._syncUI();
        },

        /* ---------- RENDER ---------- */
        renderer: function (oRM, oControl) {
            oRM.openStart("div", oControl)
                .class("stickyNote")
                .style("background-color", oControl.getBackgroundColor())
                .style("padding", "1rem")
                .style("border-radius", "8px")
                .style("width", "220px")
                .openEnd();

            oRM.renderControl(oControl._oLayout);

            oRM.close("div");
        }
    });
});
