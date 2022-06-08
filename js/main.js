/**
    * Template Name: Vex Fitness - Dashboard
    * Version: 1.0.0
    * Author: Zohurul
    * Author URL: https://www.zohirs.com/
    * Email: zohurul01@gmail.com
 */


!function($) {
    "use strict";

    var Components = function() {};

    //initializing tooltip
    Components.prototype.initTooltipPlugin = function() {
        $.fn.tooltip && $('[data-toggle="tooltip"]').tooltip()
    },

    //initializing popover
    Components.prototype.initPopoverPlugin = function() {
        $.fn.popover && $('[data-toggle="popover"]').popover()
    },

    //initializing Custom Select
    Components.prototype.initCustomSelect = function() {
        $('[data-plugin="customselect"]').niceSelect();
    },

    //initializing Slimscroll
    Components.prototype.initSlimScrollPlugin = function() {
        //You can change the color of scroll bar here
        $.fn.slimScroll && $(".slimscroll").slimScroll({
            height: 'auto',
            position: 'right',
            size: "8px",
            touchScrollStep: 20,
            color: '#9ea5ab'});
    },


    //initilizing
    Components.prototype.init = function() {
        var $this = this;
        this.initTooltipPlugin(),
        this.initPopoverPlugin(),
        this.initCustomSelect(),
        this.initSlimScrollPlugin();
    },

    $.Components = new Components, $.Components.Constructor = Components

}(window.jQuery),

function ($) {
    'use strict';

    var App = function () {
        this.$body = $('body'),
            this.$window = $(window)
    };


    /** 
     * Initlizes the menu - top and sidebar
    */
    App.prototype.initMenu = function () {
        var $this = this;

        // Left menu collapse
        $('.button-menu-mobile').on('click', function (event) {
            event.preventDefault();
            if ($this.$window.width() < 768) {
                $this.$body.toggleClass('sidebar-enable');
            }

            // sidebar - scroll container
            $('.slimscroll-menu').slimscroll({
                height: 'auto',
                position: 'right',
                size: "8px",
                color: '#9ea5ab',
                wheelStep: 5,
                touchScrollStep: 20
            });
        });

        // sidebar - main menu
        $("#side-menu").metisMenu();

        // sidebar - scroll container
        $('.slimscroll-menu').slimscroll({
            height: 'auto',
            position: 'right',
            size: "8px",
            color: '#9ea5ab',
            wheelStep: 5,
            touchScrollStep: 20
        });

        // right side-bar toggle
        $('.right-bar-toggle').on('click', function (e) {
            $('body').toggleClass('right-bar-enabled');
        });

        $(document).on('click', 'body', function (e) {
            if ($(e.target).closest('.right-bar-toggle, .right-bar').length > 0) {
                return;
            }

            if ($(e.target).closest('.left-side-menu, #sidebar-menu').length > 0 || $(e.target).hasClass('button-menu-mobile') 
                || $(e.target).closest('.button-menu-mobile').length > 0) {
                return;
            }

            $('body').removeClass('right-bar-enabled');
            $('body').removeClass('sidebar-enable');
            return;
        });

        // activate the menu in left side bar based on url
        $("#sidebar-menu a").each(function () {
            var pageUrl = window.location.href.split(/[?#]/)[0];
            if (this.href == pageUrl) {
                $(this).addClass("active");
                $(this).parent().addClass("active"); // add active to li of the current link
                $(this).parent().parent().addClass("in");
                $(this).parent().parent().prev().addClass("active"); // add active class to an anchor
                $(this).parent().parent().parent().addClass("active");
                $(this).parent().parent().parent().parent().addClass("in"); // add active to li of the current link
                $(this).parent().parent().parent().parent().parent().addClass("active");
            }
        });

        this.$window.on('resize', function(e) {
            e.preventDefault();
            location.reload(true);
        });
    },

        /** 
         * Init the layout - with broad sidebar or compact side bar
        */
        App.prototype.initLayout = function () {
            // in case of small size, add class enlarge to have minimal menu
            if (this.$window.width() >= 768 && this.$window.width() <= 1028) {
                this.$body.addClass('enlarged');
            } else {
                if (this.$body.data('keep-enlarged') != true) {
                    this.$body.removeClass('enlarged');
                }
            }
        },

        //initilizing
        App.prototype.init = function () {
            var $this = this;
            this.initLayout();
            this.initMenu();
            //creating portles
            $.AdvanceFormApp.init();
            $.Components.init();

            // on window resize, make menu flipped automatically
            $this.$window.on('resize', function(e) {
                e.preventDefault();
                console.log("resized");
                $this.initLayout();
            });
        },

        $.App = new App, $.App.Constructor = App


}(window.jQuery),
    //initializing main application module
    function ($) {
        "use strict";
        $.App.init();
    }(window.jQuery);