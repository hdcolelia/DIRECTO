/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: ext-base.js, ext-all.js
*/
Ext.define(
	'DIRECTO.LIB.base.layouts.crossWindow', 
	{
		/* Begin Definitions */
		alias: ['layout.crossWindow'],
    	extend: 'Ext.layout.container.Column',
		type: 'crossWindow',
  
    
		isItemShrinkWrap: function(item) {
        	return true;
    	},

	    getItemSizePolicy: function (item, ownerSizeModel) {
	        if (item.columnWidth) {
	            if (!ownerSizeModel) {
	                ownerSizeModel = this.owner.getSizeModel();
	            }

	            if (!ownerSizeModel.width.shrinkWrap) {
	                return this.columnWidthSizePolicy;
	            }
	        }
	        return this.autoSizePolicy;
	    },

    calculateItems: function (ownerContext, containerSize) {
        var me = this,
            columnCount = me.columnCount,
            targetContext = ownerContext.targetContext,
            items = ownerContext.childItems,
            len = items.length,
            contentWidth = 0,
            gotWidth = containerSize.gotWidth,
            blocked, availableWidth, i, itemContext, itemMarginWidth, itemWidth;

        // No parallel measurement, cannot lay out boxes.
        if (gotWidth === false) { //\\ TODO: Deal with target padding width
            // TODO: only block if we have items with columnWidth
            targetContext.domBlock(me, 'width');
            blocked = true;
        } else if (gotWidth) {
            availableWidth = containerSize.width;
        } else {
            // gotWidth is undefined, which means we must be width shrink wrap.
            // cannot calculate columnWidths if we're shrink wrapping.
            return true;
        }

        // we need the widths of the columns we don't manage to proceed so we block on them
        // if they are not ready...
        for (i = 0; i < len; ++i) {
            itemContext = items[i];

            // Ensure that each row start clears to start of row.
            // Tall items would block it as below.
            // "Item 4" requires clear:left to begin at column zero.
            // +------------------------------- +
            // |+--------+ +--------+ +--------+|
            // ||        | |        | |        ||
            // || Item 1 | | Item 2 | | Item 3 ||
            // ||        | +--------+ +--------+|
            // ||        | +--------+           |
            // |+--------+ |        |           |
            // |           | Item 4 |           |
            // |           |        |           |
            // |           +--------+           |
            // +--------------------------------+
            if (columnCount) {
                if (i % columnCount) {
                    itemContext.setProp('clear', null);
                } else {
                    itemContext.setProp('clear', me.clearSide);
                }
            }

            // this is needed below for non-calculated columns, but is also needed in the
            // next loop for calculated columns... this way we only call getMarginInfo in
            // this loop and use the marginInfo property in the next...
            itemMarginWidth = itemContext.getMarginInfo().width;

            if (!itemContext.widthModel.calculated) {
                itemWidth = itemContext.getProp('width');
                if (typeof itemWidth !== 'number') {
                    itemContext.block(me, 'width');
                    blocked = true;
                }
                contentWidth += itemWidth + itemMarginWidth;
            }
        }

        if (!blocked) {
            availableWidth = (availableWidth < contentWidth) ? 0 : availableWidth - contentWidth;

            for (i = 0; i < len; ++i) {
                itemContext = items[i];

                if (itemContext.widthModel.calculated) {
                    itemMarginWidth = itemContext.marginInfo.width; // always set by above loop
                    itemWidth = itemContext.target.columnWidth;
                    itemWidth = Math.floor(itemWidth * availableWidth) - itemMarginWidth;
                    itemWidth = itemContext.setWidth(itemWidth); // constrains to min/maxWidth
                    contentWidth += itemWidth + itemMarginWidth;
                }
            }

            ownerContext.setContentWidth(contentWidth + ownerContext.paddingContext.getPaddingInfo().width);
        }

        // we registered all the values that block this calculation, so abort now if blocked...
        return !blocked;
    }
});