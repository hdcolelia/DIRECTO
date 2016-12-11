/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: ext-base.js, ext-all.js
*/
Ext.define(
	'DIRECTO.APP.views.viewportMain',
	{
	    extend: 'Ext.container.Viewport', 
//      controller: 'MainController',
//		viewModel: "main",
		cls: "sencha-dash-viewport",
		itemId: "mainView",
		layout: {
		    type: "vbox",
		    align: "stretch"
		},

	    //Components
		headerToolbar: null,
		navigatorPanel: null,
		mainPanel: null,

	    //init
		initComponent: function () {
		    var me = this;
		    me.callParent();
		},

		buildPage: function () {
            /*
		    items: [{
		        xtype: "toolbar",
		        cls: "sencha-dash-dash-headerbar shadow",
		        height: 64,
		        itemId: "headerBar",
		        items: [{
		            xtype: "component",
		            reference: "senchaLogo",
		            cls: "sencha-logo",
		            html: '<div class="main-logo"><img src="resources/images/company-logo.png">Sencha</div>',
		            width: 250
		        }, {
		            margin: "0 0 0 8",
		            ui: "header",
		            iconCls: "x-fa fa-navicon",
		            id: "main-navigation-btn",
		            handler: "onToggleNavigationSize"
		        }, "->", {
		            xtype: "segmentedbutton",
		            margin: "0 16 0 0",
		            platformConfig: {
		                ie9m: {
		                    hidden: true
		                }
		            },
		            items: [{
		                iconCls: "x-fa fa-desktop",
		                pressed: true
		            }, {
		                iconCls: "x-fa fa-tablet",
		                handler: "onSwitchToModern"
		            }]
		        }, {
		            iconCls: "x-fa fa-search",
		            ui: "header",
		            href: "#searchresults",
		            hrefTarget: "_self",
		            tooltip: "See latest search"
		        }, {
		            iconCls: "x-fa fa-envelope",
		            ui: "header",
		            href: "#email",
		            hrefTarget: "_self",
		            tooltip: "Check your email"
		        }, {
		            iconCls: "x-fa fa-question",
		            ui: "header",
		            href: "#faq",
		            hrefTarget: "_self",
		            tooltip: "Help / FAQ's"
		        }, {
		            iconCls: "x-fa fa-th-large",
		            ui: "header",
		            href: "#profile",
		            hrefTarget: "_self",
		            tooltip: "See your profile"
		        }, {
		            xtype: "tbtext",
		            text: "Goff Smith",
		            cls: "top-user-name"
		        }, {
		            xtype: "image",
		            cls: "header-right-profile-image",
		            height: 35,
		            width: 35,
		            alt: "current user image",
		            src: "resources/images/user-profile/2.png"
		        }]
		    }, {
		        xtype: "maincontainerwrap",
		        id: "main-view-detail-wrap",
		        reference: "mainContainerWrap",
		        flex: 1,
		        items: [{
		            xtype: "treelist",
		            reference: "navigationTreeList",
		            itemId: "navigationTreeList",
		            ui: "navigation",
		            store: "NavigationTree",
		            width: 250,
		            expanderFirst: false,
		            expanderOnly: false,
		            listeners: {
		                selectionchange: "onNavigationTreeSelectionChange"
		            }
		        }, {
		            xtype: "container",
		            flex: 1,
		            reference: "mainCardPanel",
		            cls: "sencha-dash-right-main-container",
		            itemId: "contentPanel",
		            layout: {
		                type: "card",
		                anchor: "100%"
		            }
		        }]
		    }]
            */
		}

	}
);

Ext.define(
	'DIRECTO.APP.views.MainContainerWrap',
	{
	    extend: 'Ext.container.Container',
	    xtype: 'maincontainerwrap',
        scrollable: "y",
        layout: {
            type: "hbox",
            align: "stretchmax",
            animate: true,
            animatePolicy: {
                x: true,
                width: true
            }
        },
        beforeLayout: function() {
            var d = this,
                e = Ext.Element.getViewportHeight() - 64,
                f = d.getComponent("navigationTreeList");
            d.minHeight = e;
            f.setStyle({
                "min-height": e + "px"
            });
            Ext.container.Container.prototype.beforeLayout.apply(this, arguments)
        }
	}
 );
/*
Ext.define(
	'DIRECTO.APP.views.MainController',
	{
	    extend: 'Ext.container.Container',
	    xtype: 'MainController',
        listen: {
            controller: {
                "#": {
                    unmatchedroute: "onRouteChange"
                }
            }
        },
        routes: {
            ":node": "onRouteChange"
        },
        lastView: null,
        setCurrentView: function(x) {
            x = (x || "").toLowerCase();
            var p = this,
                n = p.getReferences(),
                v = n.mainCardPanel,
                r = v.getLayout(),
                u = n.navigationTreeList,
                m = u.getStore(),
                t = m.findNode("routeId", x) || m.findNode("viewType", x),
                o = (t && t.get("viewType")) || "page404",
                q = p.lastView,
                w = v.child("component[routeId=" + x + "]"),
                s;
            if (q && q.isWindow) {
                q.destroy()
            }
            q = r.getActiveItem();
            if (!w) {
                s = Ext.create({
                    xtype: o,
                    routeId: x,
                    hideMode: "offsets"
                })
            }
            if (!s || !s.isWindow) {
                if (w) {
                    if (w !== q) {
                        r.setActiveItem(w)
                    }
                    s = w
                } else {
                    Ext.suspendLayouts();
                    r.setActiveItem(v.add(s));
                    Ext.resumeLayouts(true)
                }
            }
            u.setSelection(t);
            if (s.isFocusable(true)) {
                s.focus()
            }
            p.lastView = s
        },
        onNavigationTreeSelectionChange: function(e, d) {
            var f = d && (d.get("routeId") || d.get("viewType"));
            if (f) {
                this.redirectTo(f)
            }
        },
        onToggleNavigationSize: function() {
            var j = this,
                k = j.getReferences(),
                i = k.navigationTreeList,
                l = k.mainContainerWrap,
                h = !i.getMicro(),
                g = h ? 64 : 250;
            if (Ext.isIE9m || !Ext.os.is.Desktop) {
                Ext.suspendLayouts();
                k.senchaLogo.setWidth(g);
                i.setWidth(g);
                i.setMicro(h);
                Ext.resumeLayouts();
                l.layout.animatePolicy = l.layout.animate = null;
                l.updateLayout()
            } else {
                if (!h) {
                    i.setMicro(false)
                }
                k.senchaLogo.animate({
                    dynamic: true,
                    to: {
                        width: g
                    }
                });
                i.width = g;
                l.updateLayout({
                    isRoot: true
                });
                i.el.addCls("nav-tree-animating");
                if (h) {
                    i.on({
                        afterlayoutanimation: function() {
                            i.setMicro(true);
                            i.el.removeCls("nav-tree-animating")
                        },
                        single: true
                    })
                }
            }
        },
        onMainViewRender: function() {
            if (!window.location.hash) {
                this.redirectTo("dashboard")
            }
        },
        onRouteChange: function(b) {
            this.setCurrentView(b)
        },
        onSearchRouteChange: function() {
            this.setCurrentView("searchresults")
        },
        onSwitchToModern: function() {
            Ext.Msg.confirm("Switch to Modern", "Are you sure you want to switch toolkits?", this.onSwitchToModernConfirmed, this)
        },
        onSwitchToModernConfirmed: function(d) {
            if (d === "yes") {
                var c = location.search;
                c = c.replace(/(^\?|&)classic($|&)/, "").replace(/^\?/, "");
                location.search = ("?modern&" + c).replace(/&$/, "")
            }
        },
        onEmailRouteChange: function() {
            this.setCurrentView("email")
        }
	}
 );
 */
/**
* End
*/
