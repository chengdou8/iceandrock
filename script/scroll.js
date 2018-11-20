  var DivScroll = function( layerNode ){
      //如果没有这个元素的话，那么将不再执行下去
      if ( !document.querySelector( layerNode ) ) return ;

      this.popupLayer = document.querySelector( layerNode ) ;
      this.startX = 0 ;
      this.startY = 0 ;

      this.popupLayer.addEventListener('touchstart', function (e) {
          this.startX = e.changedTouches[0].pageX;
          this.startY = e.changedTouches[0].pageY;
      }, false);

      // 仿innerScroll方法
      this.popupLayer.addEventListener('touchmove', function (e) {

          e.stopPropagation();

          var deltaX = e.changedTouches[0].pageX - this.startX;
          var deltaY = e.changedTouches[0].pageY - this.startY;

          // 只能纵向滚
          if(Math.abs(deltaY) < Math.abs(deltaX)){
              e.preventDefault();
              return false;
          }

          if( this.offsetHeight + this.scrollTop >= this.scrollHeight){
              if(deltaY < 0) {
                  e.preventDefault();
                  return false;
              }
          }
          if(this.scrollTop === 0){
              if(deltaY > 0) {
                  e.preventDefault();
                  return false;
              }
          }
          // 会阻止原生滚动
          // return false;
      },false);

  }
