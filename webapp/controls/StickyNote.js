sap.ui.define([
    "sap/ui/core/Control",
    "sap/m/Text",
    "sap/m/Input",
    "sap/m/TextArea",
    "sap/m/VBox",
    "sap/m/HBox",
    "sap/m/Button",
    "sap/m/ColorPalettePopover",
    "sap/m/MessageToast"
], function (
    Control,
    Text,
    Input,
    TextArea,
    VBox,
    HBox,
    Button,
    ColorPalettePopover,
    MessageToast
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
                delete: {},
                detail: {}
            }
        },

        /* =========================================================== */
        /* INIT                                                        */
        /* =========================================================== */
        init: function () {
            this._bEdit = false;

            // Document click ile edit mod kapatma
            this._fnDocumentClick = this._onDocumentClick.bind(this);
            document.addEventListener("click", this._fnDocumentClick, false);

            /* ---------- LABELS ---------- */
            this._oTitleLabel = new Text({ text: "Başlık", design: "Bold" });
            this._oContentLabel = new Text({ text: "Not", design: "Bold" });

            /* ---------- TITLE ---------- */
            this._oTitleText = new Text();
            this._oTitleInput = new TextArea({
                width: "100%",
                rows: 3,
                placeholder: "Lütfen başlık giriniz...",
                liveChange: (e) => {
                    this.setTitle(e.getParameter("value"));
                },
                submit: () => this._setEditMode(false)
            });

            /* ---------- CONTENT ---------- */
            this._oContentText = new Text({ wrapping: true });
            this._oContentInput = new TextArea({
                width: "100%",
                rows: 10,
                placeholder: "Lütfen not giriniz...",
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
                press: (e) => this._oColorPicker.openBy(e.getSource())
            });

            /* ---------- DELETE ---------- */
            this._oDeleteBtn = new Button({
                icon: "sap-icon://delete",
                type: "Transparent",
                press: () => this.fireDelete()
            });

            /* ---------- DETAIL ---------- */
            this._oDetailBtn = new Button({
                icon: "sap-icon://tag",
                type: "Transparent",
                press: () => {
                    if (this._bDetailMode) {
                        // Kaydetme modu: Confetti ve normal moda dön
                        this._bDetailMode = false;
                        this._syncUI();
                        this.setBackgroundColor("#FFF9C4"); // kart rengi değişiyor
                        // this._runConfetti();
                    } else {
                        // Detail modunu aç
                        this._bDetailMode = true;
                        this._syncUI();
                        this.setBackgroundColor("#15680048"); // kart rengi değişiyor
                    }
                }
            });



            /* ---------- ACTION BOX ---------- */
            this._oActionBox = new VBox({
                alignItems: "End",
                items: [this._oColorBtn, this._oDeleteBtn, this._oDetailBtn],
                class: "stickyActionBox"
            });

            /* ---------- HEADER ---------- */
            this._oHeader = new HBox({
                justifyContent: "SpaceBetween",
                alignItems: "Start",
                items: [
                    new VBox({
                        items: [this._oTitleLabel, this._oTitleText, this._oTitleInput],
                        fitContainer: false,
                        width: "calc(100% - 50px)",
                        class: "stickyHeaderVBox"
                    }),
                    this._oActionBox
                ],
                class: "stickyHeaderHBox"
            });

            /* ---------- LAYOUT ---------- */
            this._oLayout = new VBox({
                items: [this._oHeader, this._oContentLabel, this._oContentText, this._oContentInput],
                justifyContent: "Start",
                alignItems: "Stretch",
                class: "stickyLayoutVBox"
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
            var bEdit = this._bEdit;
            this._oTitleText.setVisible(!bEdit);
            this._oContentText.setVisible(!bEdit);
            this._oTitleInput.setVisible(bEdit);
            this._oContentInput.setVisible(bEdit);
            this._oTitleLabel.setVisible(true);
            this._oContentLabel.setVisible(true);
        },

        _setEditMode: function (bEdit) {
            if (this._bEdit === bEdit) return;
            this._bEdit = bEdit;
            this._syncUI();
            this.invalidate();
            if (bEdit) setTimeout(() => this._oTitleInput.focus(), 0);
        },

        /* =========================================================== */
        /* CLICK HANDLING                                              */
        /* =========================================================== */
        onclick: function () {
            this._setEditMode(true);
        },

        _onDocumentClick: function (oEvent) {
            if (!this._bEdit) return;
            var oDomRef = this.getDomRef();
            if (!oDomRef || oDomRef.contains(oEvent.target)) return;
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
                .style("border-radius", "30px")
                .style("width", "440px")
                .style("height", "320px")
                .style("box-shadow", "0 4px 12px rgba(0,0,0,0.1)")
                .style("border", oControl._bEdit ? "2px solid #1976d2" : "2px solid transparent")
                .style("transition", "transform 0.2s, box-shadow 0.2s")
                .openEnd();

            oRM.renderControl(oControl._oLayout);
            oRM.close("div");
        }
    });
});
