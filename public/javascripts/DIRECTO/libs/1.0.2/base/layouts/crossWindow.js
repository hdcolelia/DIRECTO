/* DIRECTO JS Library 1.0.0
* Copyright(c) 2011 - DIRECTO.
* required includes: ext-base.js, ext-all.js
*/
Ext.define(
	'DIRECTO.LIB.base.layouts.crossWindow', 
	{
		/* Begin Definitions */
		alias: ['layout.crossWindow'],
    	extend: 'Ext.layout.container.Fit',
		type: 'crossWindow',
		
		minWidth: 400,
		minHeight: 250,		
		padding: 5,
		manageOverflow: true,
		overflowAdjust: {
			width: 0,
			height: 0	
		},
			
		lastWidthProcessed: 0,
		lastHeightProcessed: 0,
		    
    	percentRe: /^\d+(?:\.\d+)?\%$/,

    	itemCls: Ext.baseCSSPrefix + 'center-layout-item',

	    childEls: [
	        'targetEl'
	    ],

	    renderTpl: [
	        '<div id="{ownerId}-targetEl" data-ref="targetEl" class="{targetElCls}" role="presentation">' +
	            '{%this.renderBody(out, values)%}' +
	        '</div>'
	    ],
		
	   initLayout: function() {
	        var me = this,
	            scrollbarSize = Ext.getScrollbarSize(),
	            owner = me.owner;

	        me.callParent();

	        // Create a default lastOverflowAdjust based upon scrolling configuration.
	        // If the Container is to overflow, or we *always* reserve space for a scrollbar
	        // then reserve space for a vertical scrollbar
	        if (me.manageOverflow && scrollbarSize) {
	            if (owner.scrollable) {
	                me.overflowAdjust = {
	                    width: scrollbarSize.width,
	                    height: scrollbarSize.height
	                };
	            }
	        }
	    },		
		
	    targetElCls: Ext.baseCSSPrefix + 'center-target',
	    
	    getRenderData: function() {
	        var data = this.callParent();

	        data.targetElCls = this.targetElCls;

	        return data;
	    },

	    getRenderTarget: function() {
	        return this.targetEl;
	    },

	    getItemSizePolicy: function (item, ownerSizeModel) {
	        var me = this,
	            sizeModel = ownerSizeModel || me.owner.getSizeModel(),
	            percentRe = me.percentRe,
	            mode = ((sizeModel.width.shrinkWrap || !percentRe.test(item.width)) ? 0 : 1) | // jshint ignore:line
	                  ((sizeModel.height.shrinkWrap || !percentRe.test(item.height)) ? 0 : 2);

	        return me.sizePolicies[0];
	    },

	    isItemBoxParent: function (itemContext) {
	        return true;
	    },

	    isItemShrinkWrap: function(item) {
	        return true;
	    },

	    calculate: function(ownerContext) {
	    	var me = this;
	        var targetElContext = ownerContext.targetElContext,
	            info;
        
			if(!ownerContext.state.horzDone || !ownerContext.state.vertDone ){
				me.done = false;
				return;
			}
			//Calculate items references
	        var currWidth = ownerContext.state.horzDone.end - ownerContext.state.horzDone.begin;
	        var currHeight = ownerContext.state.vertDone.end - ownerContext.state.vertDone.begin; 
			if(	me.lastWidthProcessed != currWidth || me.lastHeightProcessed != currHeight) {
				me.calculateItems(ownerContext);
				me.lastWidthProcessed == currWidth;
				me.lastHeightProcessed == currHeight;
			}
	        me.callParent([ownerContext]);
  
	    },

	    getPos: function (itemContext, info, dimension) {
	        var modelName = dimension + 'Model',
	            size = itemContext.props[dimension],
	            pos = 0;

	        if (!itemContext[modelName].calculated) {
	             size += info.margins[dimension];
	        }

	        if (!info.ownerContext[modelName].shrinkWrap) {
	            pos = Math.round((info.targetSize[dimension] - size) / 2);
	            if (isNaN(pos)) {
	                this.done = false;
	            }
	        }
	        return Math.max(pos, 0);
	    },

	    positionItemX: function (itemContext, info) {
	    	var me = this;
	        itemContext.setProp('x', itemContext.target.layoutDef.left);
			itemContext.target.setWidth(itemContext.target.layoutDef.width);	        
	    },

	    positionItemY: function (itemContext, info) {
	    	var me = this;
	        itemContext.setProp('y', itemContext.target.layoutDef.top);
	        itemContext.target.setHeight(itemContext.target.layoutDef.height);	        
	    },
		
		//Calculate items references
		calculateItems: function(ownerContext, scrollWidth){
			var me = this, 
				currItemTop, currItemLeft, currItemWidth, curItemHeight,
				prevItem, prevItemBottom, prevItemLeft, 
				currWidth, currHeight,
				refTopBack,	childItems = ownerContext.childItems;
			var itemContext, 
				item;
			var lastHeight;

			currWidth = ownerContext.state.horzDone.end - ownerContext.state.horzDone.begin;
			currHeight = ownerContext.state.vertDone.end - ownerContext.state.vertDone.begin;
			
			refTopBack = 2;
	        
	        //Init the scrool with
	        scrollWidth = scrollWidth || 0;
	        //adjustin width
	        currWidth -= scrollWidth;	                
	        currItemWidth = Math.floor(((currWidth - me.padding) / 2) - me.padding);
			
			//Definning columns and widths	        
	        if(currWidth < me.minWidth){
				refTopBack = 1;
				currItemWidth = currWidth - ( me.padding * 2);
			}
			
	        currItemHeight = Math.floor((currHeight / 2) - (me.padding * 2));
			
			//Definning columns and widths	 
	        if(currItemHeight < me.minHeight){
				currItemHeight = me.minHeight - me.padding;
			}			
			prevItemBottom = 0;
			prevItemLeft = me.padding;
						
	        for (i = 0, len = childItems.length; i < len; ++i) {
	            itemContext = childItems[i];
	            item = itemContext.target;
				
				if(i>=refTopBack){
					prevItem = childItems[i - refTopBack].target;
					prevItemBottom = prevItem.layoutDef.top + currItemHeight;
					prevItemLeft = prevItem.layoutDef.left;
				}else{
					prevItemLeft = ((currItemWidth + me.padding) * i) + me.padding;
				}
				
				currItemTop = prevItemBottom + me.padding; 
				
				item.layoutDef = {
					top: currItemTop,
					left: prevItemLeft,
					width: currItemWidth,
					height : currItemHeight 
				};
        	
	        	lastHeight = currItemTop + currItemHeight + me.padding;	        	
	        	
	        	if(	
	        		(lastHeight > currHeight) 
	        		&& scrollWidth == 0
	        		&& me.overflowAdjust.width != 0 
	        	){
	        		//me.targetEl.setHeight(lastHeight);	
					return me.calculateItems(ownerContext, me.overflowAdjust.width);	
	        	}		        	
			}
			me.targetEl.setHeight(lastHeight);	
		}	    
	}
);