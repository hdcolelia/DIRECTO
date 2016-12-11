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
		
		minWidth: 600,
		minHeight: 250,		
		padding: 5,
		manageOverflow: true,
		
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

        // Cyadrants definitions squema
        // +---------------------+
        // |+--------+ +--------+|
        // ||        | |        ||
        // ||   a    | |   b    ||
        // ||        | |        ||
        // |+--------+ +--------+|
        // |+--------+ +--------+|
        // ||        | |        ||
        // ||   c    | |   d    ||
        // ||        | |        ||
        // |+--------+ +--------+|
        // +---------------------+


		//Cuadrants sizes
		cuadrantsSizes: {
			a: {
				top: 1,
				left: 1,
				height: 100,
				width: 100
			},
			b: {
				top: 1,
				left: 110,
				height: 100,
				width: 100
			},
			c: {
				top: 110,
				left: 1,
				height: 100,
				width: 100
			},
			d: {
				top: 110,
				left: 110,
				height: 100,
				width: 100
			}			
		},
		
		
	   initLayout: function() {
	        var me = this,
	            scrollbarWidth = Ext.getScrollbarSize().width,
	            owner = me.owner;

	        me.callParent();

			//Setting padding of owner
//			//me.owner.setConfig({margin: 25});
//			me.targetEl.dom.style.setProperty('padding', me.padding, 'important');
			
//			//me.owner.getEl().setStyle({padding : '10px'});
//			//me.owner.doLayout();
			

	        // Create a default lastOverflowAdjust based upon scrolling configuration.
	        // If the Container is to overflow, or we *always* reserve space for a scrollbar
	        // then reserve space for a vertical scrollbar
	        if (scrollbarWidth && me.manageOverflow) {
	            if (owner.scrollable || me.reserveScrollbar) {
	                me.lastOverflowAdjust = {
	                    width: scrollbarWidth,
	                    height: 0
	                };
	            }
	        }
	    },		
		
		
	    targetElCls: Ext.baseCSSPrefix + 'center-target',

	    xxxbeginLayout: function(ownerContext) {
	        var me = this,
	            percentRe = me.percentRe,
	            childItems, len, i, itemContext, item,
	            widthModel, heightModel;

	        me.callParent([ownerContext]);
	        
	        childItems = ownerContext.childItems;
	        for (i = 0, len = childItems.length; i < len; ++i) {
	            itemContext = childItems[i];
	            item = itemContext.target;
	            widthModel = itemContext.widthModel;
	            heightModel = itemContext.heightModel;
	            if (percentRe.test(item.width)) {
	                item.getEl().setStyle('width', '');
	            }
	            if (percentRe.test(item.height)) {
	                item.getEl().setStyle('height', '');
	            }
	        }

	        ownerContext.targetElContext = ownerContext.getEl('targetEl', me);
	    },

	    xxxbeginLayoutCycle: function(ownerContext, firstCycle) {
	        var me = this;
	        
	        var targetEl = this.targetEl;
	        me.callParent([ownerContext, firstCycle]);
	    
	        //targetEl.setStyle('width', '');
	        //targetEl.setStyle('height', '');
			if(!firstCycle) {
				//me.done = true;
			}			
			
	    },
	    
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

	        return me.sizePolicies[mode];
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
	        
//	        me.callParent([ownerContext]);
	        
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
		
			return;
			
	        var currentWidth = ownerContext.state.horzDone.end - ownerContext.state.horzDone.begin;
	        var currentHeight = ownerContext.state.vertDone.end - ownerContext.state.vertDone.begin; 
			
//	        if(
//	        	me.lastWidth != currentWidth
//	        	|| me.lastHeight != currentHeight
//	        ){
//				me.lastWidth = currentWidth;
//				me.lastHeight = currentHeight;
//				me.done = false;
//				return;	
//			}	        
	        
	        var middleWidth = currentWidth / 2;
	        var middleHeight = currentHeight / 2;
	        if(middleHeight<me.minHeight){
				middleHeight = me.minHeight;	
			}
	        var middlePadding = me.padding / 2;
	        var sizes = me.cuadrantsSizes;
	        
	        //Setting cuadranst positions a sizes	        
	        //a
	        sizes.a.top   	= middlePadding;
			sizes.a.left  	= middlePadding;	        
	        sizes.a.width   = middleWidth - me.padding;
			sizes.a.height  = middleHeight - me.padding;	        
			
	        //b
	        sizes.b.top   	= middlePadding;
			sizes.b.left  	= sizes.a.left + sizes.a.width + middlePadding;	        
	        sizes.b.width   = middleWidth - me.padding;
			sizes.b.height  = middleHeight - me.padding;	        

	        //c
	        sizes.c.top   	= sizes.a.top + sizes.a.height + middlePadding;
			sizes.c.left  	= middlePadding;	        
	        sizes.c.width   = middleWidth - me.padding;
			sizes.c.height  = middleHeight - me.padding;	        

	        //d
	        sizes.d.top   	= sizes.b.top + sizes.b.height + middlePadding;
			sizes.d.left  	= sizes.c.left + sizes.c.width + middlePadding;	        
	        sizes.d.width   = middleWidth - me.padding;
			sizes.d.height  = middleHeight - me.padding;	        	        

	        me.callParent([ownerContext]);
//	        me.done = false;	        
//	        return;
	        
	        var lastHeight = sizes.d.top + sizes.d.height + (me.padding / 2);
	        
	        if(lastHeight > currentHeight){
				me.targetEl.setHeight(lastHeight);	
			}
	        
	        
//	        info = ownerContext.state.info;
//	        if (ownerContext.widthModel.shrinkWrap) {
//	            targetElContext.setWidth(info.contentWidth);
//	        }

//	        if (ownerContext.heightModel.shrinkWrap) {
//	            targetElContext.setHeight(info.contentHeight);
//	        }  
  
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

	    xxxsetItemHeight: function (itemContext, info) {
	    	//var me = this;
	        //var def = me.cuadrantDefs[itemContext.target.cwPos];
	        //itemContext.setHeight(def.height());
	    	var me = this;
	        var def = me.cuadrantsSizes[itemContext.target.cwPos];
	        itemContext.setProp('y', def.top);
	        itemContext.target.setHeight(def.height);		        
	    },

	    xxxsetItemWidth: function (itemContext, info) {
	    	var me = this;
	        var def = me.cuadrantsSizes[itemContext.target.cwPos];
	        itemContext.setProp('x', def.left);
			itemContext.target.setWidth(def.width);	        
	    },
	    
	    getItemTop: function(prParentContext, prPart){
			var me = this;
			
		},
		
		//Calculate items references
		calculateItems: function(ownerContext, scrollWidth){
			var me = this, 
				currItemTop, currItemLeft, currItemWidth, curItemHeight,
				prevItem, prevItemBottom, prevItemLeft, 
				currWidth, currHeight,
				refTopBack = 2,
				childItems = ownerContext.childItems;
			var itemContext, 
				item;
			var lastHeight;

			currWidth = ownerContext.state.horzDone.end - ownerContext.state.horzDone.begin;
			currHeight = ownerContext.state.vertDone.end - ownerContext.state.vertDone.begin;

			Ext.log('warn','Entranding calculate items' );							
	        
	        //Init the scrool with
	        scrollWidth = scrollWidth || 0;
	        //adjustin width
	        currWidth -= scrollWidth;	                
	        currItemWidth = (currWidth / 2) - ( me.padding * 2);
			
			//Definning columns and widths	        
	        if(currWidth < me.minWidth){
				refTopBack = 1;
				currItemWidth = currWidth - ( me.padding * 2);
			}
			
	        currItemHeight = (currHeight / 2) - ( me.padding * 2);
			
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
				
				//itemContext.target.layoutDef('y', currItemTop);
				//itemContext.setProp('x', prevItemLeft);
				
				//itemContext.target.setWidth(currItemWidth);	
	        	//itemContext.target.setHeight(currItemHeight);
	        	
	        	lastHeight = currItemTop + currItemHeight + me.padding;	        	
	        	
	        	if((lastHeight > currHeight) && scrollWidth == 0 ){
	        		me.targetEl.setHeight(lastHeight);	
					return me.calculateItems(ownerContext, me.lastOverflowAdjust.width);	
	        	}		        	
	        	Ext.log('warn','SW: ' + scrollWidth + ' -- Current ' + i + ' - Top: ' + currItemTop + ' - Left: ' + prevItemLeft + ' - Width: ' + currItemWidth + ' - Height: ' + currItemHeight );			
			}
			
			me.targetEl.setHeight(lastHeight);	
		},

		//Define minWidth
		calculateMinWidth: function(ownerContext){
			var me = this;
	        var curWidth = ownerContext.state.horzDone.end - ownerContext.state.horzDone.begin;
	        var curHeight = ownerContext.state.vertDone.end - ownerContext.state.vertDone.begin;
	        var refTopBack = 2;
	        if(curWidth < me.minWidth){
				refTopBack = 1;
			}
			
			var childItems = ownerContext.childItems, itemContext, item;
	        for (i = 0, len = childItems.length; i < len; ++i) {
	            itemContext = childItems[i];
	            item = itemContext.target;
			}		            
						
		},
		
		//Gets the scroollbar size			
		getScrollBarSize: function(){
			var me = this;
			
			var div = me.targetEl.dom;
			var scrollbarSize = {
                width: div.offsetWidth - div.clientWidth,
                height: div.offsetHeight - div.clientHeight
            };
            return scrollbarSize;			
		}	    
	}
);