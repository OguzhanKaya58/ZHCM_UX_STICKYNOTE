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

        /* =========================================================== */
        /* INIT                                                        */
        /* =========================================================== */
        init: function () {
            this._bEdit = false;

            this._fnDocumentClick = this._onDocumentClick.bind(this);
            document.addEventListener("click", this._fnDocumentClick, false); // ❗️FIX

            /* ---------- TITLE ---------- */
            this._oTitleText = new Text();

            this._oTitleInput = new Input({
                liveChange: (e) => {
                    this.setTitle(e.getParameter("value"));
                }
            });

            /* ---------- CONTENT ---------- */
            this._oContentText = new Text({ wrapping: true });

            this._oContentInput = new TextArea({
                rows: 4,
                liveChange: (e) => {
                    this.setContent(e.getParameter("value"));
                }
            });

            /* ---------- COLOR ---------- */
            this._oColorPicker = new ColorPalettePopover({
                colorSelect: (e) => {
                    this.setBackgroundColor(e.getParameter("value"));
                }
            });

            this._oColorBtn = new Button({
                icon: "sap-icon://palette",
                type: "Transparent",
                press: (e) => {
                    this._oColorPicker.openBy(e.getSource());
                }
            });

            /* ---------- DELETE ---------- */
            this._oDeleteBtn = new Button({
                icon: "sap-icon://delete",
                type: "Transparent",
                press: () => this.fireDelete()
            });

            this._oActionBox = new VBox({
                alignItems: "End",
                items: [this._oColorBtn, this._oDeleteBtn]
            });

            this._oHeader = new HBox({
                justifyContent: "SpaceBetween",
                items: [
                    new VBox({
                        items: [this._oTitleText, this._oTitleInput]
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

        /* =========================================================== */
        /* BINDING / SETTERS                                           */
        /* =========================================================== */
        setTitle: function (v) {
            this.setProperty("title", v, true);
            this._oTitleText.setText(v);
            this._oTitleInput.setValue(v);
            return this;
        },

        setContent: function (v) {
            this.setProperty("content", v, true);
            this._oContentText.setText(v);
            this._oContentInput.setValue(v);
            return this;
        },

        setBackgroundColor: function (v) {
            this.setProperty("backgroundColor", v, true);
            this.invalidate();
            return this;
        },

        onBeforeRendering: function () {
            this._oTitleText.setText(this.getTitle());
            this._oTitleInput.setValue(this.getTitle());

            this._oContentText.setText(this.getContent());
            this._oContentInput.setValue(this.getContent());
        },

        /* =========================================================== */
        /* EDIT MODE                                                   */
        /* =========================================================== */
        _syncUI: function () {
            this._oTitleText.setVisible(!this._bEdit);
            this._oContentText.setVisible(!this._bEdit);

            this._oTitleInput.setVisible(this._bEdit);
            this._oContentInput.setVisible(this._bEdit);
        },

        _setEditMode: function (bEdit) {
            if (this._bEdit === bEdit) {
                return;
            }

            this._bEdit = bEdit;
            this._syncUI();
            this.invalidate();

            if (bEdit) {
                setTimeout(() => this._oTitleInput.focus(), 0);
            }
        },

        /* =========================================================== */
        /* CLICK HANDLING                                              */
        /* =========================================================== */
        onclick: function () {
            this._setEditMode(true);
        },

        _onDocumentClick: function (oEvent) {
            if (!this._bEdit) {
                return;
            }

            var oDomRef = this.getDomRef();
            if (!oDomRef) {
                return;
            }

            if (oDomRef.contains(oEvent.target)) {
                return;
            }

            this._setEditMode(false);
        },

        /* =========================================================== */
        /* CLEANUP                                                     */
        /* =========================================================== */
        exit: function () {
            if (this._fnDocumentClick) {
                document.removeEventListener("click", this._fnDocumentClick, false);
                this._fnDocumentClick = null;
            }
        },

        /* =========================================================== */
        /* RENDERER                                                    */
        /* =========================================================== */
        renderer: function (oRM, oControl) {
            oRM.openStart("div", oControl)
                .class("stickyNote")
                .class(oControl._bEdit ? "stickyNoteSelected" : "")
                .style("background-color", oControl.getBackgroundColor())
                .style("padding", "1rem")
                .style("border-radius", "8px")
                .style("width", "220px")
                .style("border", oControl._bEdit ? "2px solid #1976d2" : "2px solid transparent")
                .openEnd();

            oRM.renderControl(oControl._oLayout);
            oRM.close("div");
        }
    });
});
