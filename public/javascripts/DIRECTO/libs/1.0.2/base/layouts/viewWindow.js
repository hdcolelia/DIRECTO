/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: ext-base.js, ext-all.js
*/
Ext.define(
	'DIRECTO.LIB.base.layouts.viewWindow',
	{
	    /* Begin Definitions */
	    alias: ['layout.viewWindow'],
	    extend: 'Ext.layout.container.Fit',
	    type: 'viewWindow',

	    //Define maximun columns 
	    maxColumns: 2,
	    minItemsWidth: 250,
	    minItemsHeight: 350,
	    maxItemsHeight: 450,

	    splitterSize: 10,

	    privates: {
	        currentColumns: 0,
	        itemsWidth: 0,
	        itemsHeight: 250,

	        //Calculate items size
	        calculateItemsSize: function (info) {
	            var me = this;
	            me.currentColumns = me.maxColumns;
	            me.calculateItemsWidth(info);
	            me.calculateItemsHeight(info);
	        },
	        //calculate items width
	        calculateItemsWidth: function (info) {
	            var me = this;
	            if (!me.currentColumns) {
	                me.currentColumns = 1;
	                me.itemsWidth = info.targetSize.width - info.margins.width - (me.splitterSize * 2);
	                if (me.itemsWidth < me.minItemsWidth) {
	                    me.itemsWidth = me.minItemsWidth;
	                }
	                return;
	            }

	            var width = info.targetSize.width - info.margins.width - me.splitterSize;
	            me.itemsWidth = Math.floor(width / me.currentColumns) - me.splitterSize;
	            if (me.itemsWidth < me.minItemsWidth) {
	                me.currentColumns -= 1;
	                me.calculateItemsWidth(info);
	            }
	        },
	        //calculate items height
	        calculateItemsHeight: function (info) {
	            var me = this;
	            var height = info.targetSize.height - info.margins.height;
	            me.itemsHeight = height;
	            if (me.itemsHeight > me.maxItemsHeight) {
	                me.itemsHeight = me.maxItemsHeight;
	            }
	            if (me.itemsHeight < me.minItemsHeight) {
	                me.itemsHeight = me.minItemsHeight;
	            }
	        }

	    },

	    itemCls: Ext.baseCSSPrefix + 'fit-item',

	    calculate: function (ownerContext) {
	        var me = this,
                childItems = ownerContext.childItems,
                length = childItems.length,
                containerSize = me.getContainerSize(ownerContext),
                info = {
                    length: length,
                    ownerContext: ownerContext,
                    targetSize: containerSize
                },
                shrinkWrapWidth = ownerContext.widthModel.shrinkWrap,
                shrinkWrapHeight = ownerContext.heightModel.shrinkWrap,
                overflowX = ownerContext.overflowX,
                overflowY = ownerContext.overflowY,
                scrollbars, scrollbarSize, padding, i, contentWidth, contentHeight;
	        ownerContext.state.info = info;
	        if (overflowX || overflowY) {
	            // If we have children that have minHeight/Width, we may be forced to overflow
	            // and gain scrollbars. If so, we want to remove their space from the other
	            // axis so that we fit things inside the scrollbars rather than under them.
	            scrollbars = me.getScrollbarsNeeded(overflowX && containerSize.width, overflowY && containerSize.height, ownerContext.maxChildMinWidth, ownerContext.maxChildMinHeight);
	            if (scrollbars) {
	                scrollbarSize = Ext.getScrollbarSize();
	                if (scrollbars & 1) {
	                    // jshint ignore:line
	                    // if we need the hscrollbar, remove its height
	                    containerSize.height -= scrollbarSize.height;
	                }
	                if (scrollbars & 2) {
	                    // jshint ignore:line
	                    // if we need the vscrollbar, remove its width
	                    containerSize.width -= scrollbarSize.width;
	                }
	            }
	        }
	        // If length === 0, it means we either have no child items, or the children are hidden
	        Ext.log('Cantidad de Items:' + length );
	        if (length > 0) {
	            // Size the child items to the container (if non-shrinkWrap):
	            for (i = 0; i < length; ++i) {
	                info.index = i;
	                me.fitItem(childItems[i], info);
	            }
	        } else {
	            info.contentWidth = info.contentHeight = 0;
	        }
	        if (shrinkWrapHeight || shrinkWrapWidth) {
	            padding = ownerContext.targetContext.getPaddingInfo();
	            if (shrinkWrapWidth) {
	                if (overflowY && !containerSize.gotHeight) {
	                    // if we might overflow vertically and don't have the container height,
	                    // we don't know if we will need a vscrollbar or not, so we must wait
	                    // for that height so that we can determine the contentWidth...
	                    me.done = false;
	                } else {
	                    contentWidth = info.contentWidth + padding.width;
	                    // the scrollbar flag (if set) will indicate that an overflow exists on
	                    // the horz(1) or vert(2) axis... if not set, then there could never be
	                    // an overflow...
	                    if (scrollbars & 2) {
	                        // jshint ignore:line
	                        // if we need the vscrollbar, add its width
	                        contentWidth += scrollbarSize.width;
	                    }
	                    if (!ownerContext.setContentWidth(contentWidth)) {
	                        me.done = false;
	                    }
	                }
	            }
	            if (shrinkWrapHeight) {
	                if (overflowX && !containerSize.gotWidth) {
	                    // if we might overflow horizontally and don't have the container width,
	                    // we don't know if we will need a hscrollbar or not, so we must wait
	                    // for that width so that we can determine the contentHeight...
	                    me.done = false;
	                } else {
	                    contentHeight = info.contentHeight + padding.height;
	                    // the scrollbar flag (if set) will indicate that an overflow exists on
	                    // the horz(1) or vert(2) axis... if not set, then there could never be
	                    // an overflow...
	                    if (scrollbars & 1) {
	                        // jshint ignore:line
	                        // if we need the hscrollbar, add its height
	                        contentHeight += scrollbarSize.height;
	                    }
	                    if (!ownerContext.setContentHeight(contentHeight)) {
	                        me.done = false;
	                    }
	                }
	            }
	        }
	    },



	    fitItem: function (itemContext, info) {
	        var me = this;
	        if (itemContext.invalid) {
	            me.done = false;
	            return;
	        }
	        info.margins = itemContext.getMarginInfo();

	        me.calculateItemsSize(info);

	        info.needed = info.got = 0;
	        me.fitItemWidth(itemContext, info);
	        me.fitItemHeight(itemContext, info);
	        // If not all required dimensions have been satisfied, we're not done.
	        if (info.got !== info.needed) {
	            me.done = false;
	        }
	    },

	    fitItemWidth: function (itemContext, info) {
	        //if not calculated then exit
	        // Too early to position
	        if (!itemContext.widthModel.calculated) { return; }

	        var contentWidth, width;
	        // Attempt to set only dimensions that are being controlled, not shrinkWrap dimensions
	        if (info.ownerContext.widthModel.shrinkWrap) {
	            // contentWidth must include the margins to be consistent with setItemWidth
	            width = itemContext.getProp('width') + info.margins.width;
	            // because we add margins, width will be NaN or a number (not undefined)
	            contentWidth = info.contentWidth;
	            if (contentWidth === undefined) {
	                info.contentWidth = width;
	            } else {
	                info.contentWidth = Math.max(contentWidth, width);
	            }
	        } else if (itemContext.widthModel.calculated) {
	            ++info.needed;
	            if (info.targetSize.gotWidth) {
	                ++info.got;
	                this.setItemWidth(itemContext, info);
	            } else {
	                // Too early to position
	                return;
	            }
	        }
	        this.positionItemX(itemContext, info);
	    },

	    fitItemHeight: function (itemContext, info) {
	        var contentHeight, height;
	        if (info.ownerContext.heightModel.shrinkWrap) {
	            // contentHeight must include the margins to be consistent with setItemHeight
	            height = itemContext.getProp('height') + info.margins.height;
	            // because we add margins, height will be NaN or a number (not undefined)
	            contentHeight = info.contentHeight;
	            if (contentHeight === undefined) {
	                info.contentHeight = height;
	            } else {
	                info.contentHeight = Math.max(contentHeight, height);
	            }
	        } else if (itemContext.heightModel.calculated) {
	            ++info.needed;
	            if (info.targetSize.gotHeight) {
	                ++info.got;
	                this.setItemHeight(itemContext, info);
	            } else {
	                // Too early to position
	                return;
	            }
	        }
	        this.positionItemY(itemContext, info);
	    },

	    positionItemX: function (itemContext, info) {
	        var me = this;
	        var margins = info.margins;
	        //calculate left for item
	        var column = (info.index - (Math.floor(info.index / me.currentColumns) * me.currentColumns) + 1);

	        var left = (me.splitterSize * column) + margins.width + (me.itemsWidth * (column - 1));
	        itemContext.setProp('x', left);
	        //Ext.log('SetX:' + info.index + ' value:' + left);
	        return;


	        // Adjust position to account for configured margins or if we have multiple items
	        // (all items should overlap):
	        if (info.index || margins.left) {
	            itemContext.setProp('x', margins.left);
	        }
	        if (margins.width && info.ownerContext.widthModel.shrinkWrap) {
	            // Need the margins for shrink-wrapping but old IE sometimes collapses the left margin into the padding
	            itemContext.setProp('margin-right', margins.width);
	        }
	    },
	    positionItemY: function (itemContext, info) {
	        var me = this;
	        var margins = info.margins;
	        //calculate left for item
	        var row = (Math.floor(info.index / me.currentColumns) + 1);

	        var top = (me.splitterSize * row) + (margins.width * row) + (me.itemsHeight * (row - 1));

	        itemContext.setProp('y', top);
	        //Ext.log('SetY:' + info.index + ' value:' + top);
	        return;

	        var margins = info.margins;
	        if (info.index || margins.top) {
	            itemContext.setProp('y', margins.top);
	        }
	        if (margins.height && info.ownerContext.heightModel.shrinkWrap) {
	            // Need the margins for shrink-wrapping but old IE sometimes collapses the top margin into the padding
	            itemContext.setProp('margin-bottom', margins.height);
	        }
	    },
	    setItemHeight: function (itemContext, info) {
	        var me = this;
	        itemContext.setHeight(me.itemsHeight);
	        //		    Ext.log('SetH:' + info.index + ' value:' + me.itemsHeight);
	    },

	    setItemWidth: function (itemContext, info) {
	        var me = this;
	        //if (info.index + 1 == info.length) {
	        //    itemContext.setWidth(info.targetSize.width - (me.splitterSize * 2));
	        //    return;
	        //}
	        itemContext.setWidth(me.itemsWidth);
	        //		    Ext.log('SetW:' + info.index + ' value:' + me.itemsWidth);
	    }
	});