$(function(){


  initAside();
  initInputSelect();
  initScore();  
  initCheckbox();
  initRatioBlock();
  initEditSmPop();
  initEnterpriseAside();
  initSwitchChange();
  //注册关于document的点击事件位置
  $(document).on("click",function(e){

    var $temp = $(e.target);
    
    //下拉菜单区域外点击隐藏
    if( ! $temp.hasClass("js-input-select-title") ){
      $(".js-input-select").css("display","none");      
    }
    
    
  }); 
});




function initSwitchChange(){
   var $temp = $(".js-switch");
  
    $temp.each(function(){
        $("#"+$(this).attr("data-tabFor")).css("display","none");
    });
    $temp.off("click");
    $temp.on("click", function(){
        var $cur = $(this),
             $curS =  $("#"+$(this).attr("data-tabFor"));
            
        if( $curS.get(0).hasAttribute("style") ){
           $curS.removeAttr("style");
           
           var $bq = $cur.find("[data-tabImg]");           
           $bq.addClass($bq.attr("data-tabImg"));
           
           var $msg = $cur.find("[data-tabMsg]");
           var imsg = $msg.attr("data-tabMsg");
           $msg.attr("data-tabMsg",$msg.html());           
           $msg.html(imsg);
        }else{
          
           $curS.css("display","none");
           
           var $bq = $cur.find("[data-tabImg]");           
           $bq.removeClass($bq.attr("data-tabImg"));
           
           
           var $msg = $cur.find("[data-tabMsg]");
           var imsg = $msg.attr("data-tabMsg");
           $msg.attr("data-tabMsg",$msg.html());           
           $msg.html(imsg);
        }
    });
  
}


function initEnterpriseAside() {
  var $temp = $(".js-enterprise-aside-btn");
  $temp.off("click");
  $temp.on("click",function(){
   
    var $cur = $(this);
    var $curNext = $cur.next(".nav");
    if($curNext.hasClass("hide")){
         $cur.find("i").addClass("arrow-b1");
        $curNext.removeClass("hide");
       
    }else{
      $cur.find("i").removeClass("arrow-b1");
        $curNext.addClass("hide");
    }
    
  })
  
}

/**
  * 说明：系数修改控制件事件及对应输入框验证wish_validator.js
  * @method initCheckbox
  * @param undefined
  * @return undefined
  */
function initRatioBlock(){
    var $tempObj = $(".js-ratio input[type='checkbox']");
    $tempObj.off("click");
    
    var ivalidator = {};
    var i = 0;
    $.each( $(".js-ratio-input"), function (){ //对每一个输入框进行申请独立的格式验证器
        $(this).attr("data-validatorID","valId"+i);
        ivalidator["valId"+i] = new Validator();
        ivalidator["valId"+i].setSimpleInput(this); //wish_validator.js
        i++;
    });
    
  
        
    //事件嵌套绑定
    $tempObj.on("click",function(){       

        var $curParent = $(this).parent(); 
        var $block = $curParent.parent(".js-ratio");
        var $temp =  $curParent.siblings(".js-ratio-bottom").eq(0);
        var $curInput = $temp.find("input[type='text']").eq(0);
        var $curBtnModify =  $temp.find(".js-ratio-modify").eq(0);
        var $curBtnLink = $temp.eq(0).find(".js-ratio-link").eq(0);
        //var $curValueShow = $temp.eq(0).find(".js-input-value").eq(0);    
        
        if(this.checked){ 
          $block.removeClass("ratio-null");  
          $curInput.removeAttr("readonly");
        }else{
          
          //$curBtnModify.unbind("click");
          //$curBtnLink.unbind("click");
          
          $block.removeClass("ratio-complete");
          $block.addClass("ratio-null");
          $curInput.val("");
          $curInput.attr("readonly","readonly")
        }
    });  
    
     $tempObj = $(".js-ratio-modify");
     $tempObj.off("click");
     $tempObj.on("click", function() {//对应确定按钮的事件绑定
                var $curObj = $(this);
                var $input = $curObj.parent(".js-ratio-bottom").find("input[type='text']").eq(0);
                var iindex =  $input.attr("data-validatorID");
                //对应各自的验证器进行判断
                ivalidator[iindex].validateInput(function(vmod){
                    if(vmod.getResult() != 1){ //验证不通过
                        alert(vmod.getResult());                    
                    }else{
                       
                       if( $input.val() === "" ){
                         $input.val(0);                     
                       }                       
                      
                       $curObj.parent().parent(".js-ratio").addClass("ratio-complete");
                       $curObj.siblings(".js-input-value").eq(0).html($input.val());
 
                    }                   
               });    
      });
      
      $tempObj = $(".js-ratio-link")
      $tempObj.off("click");
      $tempObj .on("click", function(){//对应修改系数按钮事件绑定            
          $(this).parent().parent(".js-ratio").removeClass("ratio-complete");
          //$curBtnLink.unbind("click");
       });
      
      
    //全部修改的事件    
    var aValidator = {}, i = 0;
    $.each( $(".js-ratio-all-input"), function (){ //对每一个输入框进行申请独立的格式验证器
        $(this).attr("data-validatorID","valIdAll"+i);
        aValidator["valIdAll"+i] = new Validator();
        aValidator["valIdAll"+i].setSimpleInput(this); //wish_validator.js
        i++;
    });
    $tempObj = $(".js-setRatioGroups");
    $tempObj.off("click","a");
    $tempObj.on("click","a",function(){ 
        var iindex =  $(this).parent(".js-setRatioGroups").find(".js-ratio-all-input").attr("data-validatorID");
        var $cur = $(this);
          //对应各自的验证器进行判断
          aValidator[iindex].validateInput(function(vmod){
             if(vmod.getResult() != 1){ //验证不通过
                  alert(vmod.getResult());
              }else{
                 setRatioGroups(  $cur.siblings("div").find("input").eq(0).val(),    $cur.parent(".js-setRatioGroups").attr("data-name") );                      
              }
          })
    })
      
    
}
function setRatioGroups (value, groupName){
 
  if( value != "" ){
    var $objs =  $(".js-ratio");
    var tempName = "";
    var $cur;
    $.each($objs ,function(){
          tempName = $(this).attr("data-name");
          
          if( tempName == groupName ){
              $cur = $(this);
              $cur.find("input[type='checkbox']").get(0).checked = true;
              $cur.find("input[type='text']").eq(0).val(value);
              $cur.find("input[type='text']").eq(0).removeAttr("readonly");
              
              $cur.removeClass("ratio-null");  
              $cur.addClass("ratio-complete");    
              $cur.find(".js-input-value").eq(0).html(value); 
/*
              $cur.find(".js-ratio-link").eq(0).click(function(){//对应修改系数按钮事件绑定            
                    $cur.removeClass("ratio-complete");                   
              });*/
          }
    });
  }else{
    var $objs =  $(".js-ratio");
    $objs.find("input[type='text']").eq(0).val('');
    $objs.removeClass("ratio-complete");    
    $objs.find(".js-input-value").eq(0).html('');     
  }
}


/**
  * 说明：原形checkbox事件加载
  * @method initCheckbox
  * @param undefined
  * @return undefined
  */
function initCheckbox(){
  $temp = $(".js-checkbox");
  $temp.unbind("click");
  $temp.click(function(){
    var $cur = $(this);
    var sameRadio = $cur.attr("name");
    if( $cur.hasClass("selected") ){    
      $cur.removeClass("selected");    
      $cur.siblings("input[type='checkbox']").get(0).checked = false;  
      
    }else{
      
      if(sameRadio != undefined && sameRadio != ""){
        $.each($(".js-checkbox[name='"+sameRadio+"']"), function(){
          var _i = $(this);
          _i.siblings("input[type='checkbox']").get(0).checked = false;             
          _i.removeClass("selected");    
        });
      } 
      $cur.addClass("selected");
      $cur.siblings("input[type='checkbox']").get(0).checked = true;    
   
    }

  })  
}


/**
  * 说明：侧边栏模板的展开收缩事件加载
  * @method initAside
  * @param undefined
  * @return undefined
  */
function initAside(){
  $.each($(".aside ul"), function(){
    $(this).attr("data-height",  $(this).height() );
    $(this).height(0);
  });
  $temp = $(".js-hasChild");
  $temp.unbind("click");
  
  $temp.click(function () {
    var $cur = $(this);
    var $iul = $cur.next("ul");
    if( $cur.hasClass("more-out") ) {    
      $iul.height(0);
      $cur.removeClass("more-out");
    }else{
      $iul.height($iul.attr("data-height"));
      $cur.addClass("more-out");  
    }  
    return false;
  });  
}

/**
  * 说明：初始化所有 js-input-select 的自定义下拉菜单
  * @method initInputSelect
  * @param undefined
  * @return undefined
  */
function initInputSelect(){
  //默认值赋值
  $.each($(".js-input-select-title"),function(){
    $(this).html($(this).attr("data-placeholder"));
  }) 
  
  var $temp = $(".js-input-select-title");
  $temp.unbind("click");  
  
  $temp.click(function(event){
      event.preventDefault();
      if (event.stopPropagation) { 
      // this code is for Mozilla and Opera 
      event.stopPropagation(); 
      } 
      else if (window.event) { 
      // this code is for IE 
      window.event.cancelBubble = true; 
      }
      
     var $iul = $(this).next("ul");
    
     if( $iul.get(0).hasAttribute("style")  ){
        $(".js-input-select-title").next("ul").css("display","none");
        $iul.removeAttr("style");
        
     } else{
       $iul.css("display","none");
     }
  });
  
  var $temp2 = $(".js-input-select>li");
  $temp2.unbind("click");  
  
  $temp2.click(function(event){
      event.preventDefault();
      if (event.stopPropagation) { 
      // this code is for Mozilla and Opera 
      event.stopPropagation(); 
      } 
      else if (window.event) { 
      // this code is for IE 
      window.event.cancelBubble = true; 
      }
      
      $(this).parent().prev().html($(this).text());
      $(this).parent().css("display","none");
      var $saveInput = $(this).parent().next(); 
      $saveInput.val($(this).attr("id"));
      
  });
 
}

/**
  * 说明：下拉菜单动态联动时 事件重新加载
  * @method optionBindById
  * @param {string} id 对应下拉菜单的ul ID
  * @return undefined
  */
function optionBindById(id){
  
  var $h1 = $("#"+id).prev("h1").eq(0);
    
   $h1.html( $h1.attr("data-placeholder") );
  
  $("#"+id+">li").click(function(event){
      event.preventDefault();
      if (event.stopPropagation) { 
      // this code is for Mozilla and Opera 
      event.stopPropagation(); 
      } 
      else if (window.event) { 
      // this code is for IE 
      window.event.cancelBubble = true; 
      }
      
      $(this).parent().prev().html($(this).text());
      $(this).parent().css("display","none");
      var $saveInput = $(this).parent().next(); 
      $saveInput.val($(this).attr("id"));      
  });  
}

/**
  * 说明：星评分事件加载
  * @method initScore
  * @param undefined
  * @return undefined
  */
function initScore(){
  var $temp = $(".js-setting-score a");
  $temp.unbind("mouseover");
  
  $temp.mouseover(function(){
    var $cur = $(this);
    $cur.addClass("selected");
    $cur.prevAll("a").addClass("selected");
    $cur.nextAll("a").removeClass("selected"); 
    try{
      // 返回函数，第一传参是选择的星数，第二个是当前选星的js-setting-score 原始js元素对象
      scoreMouseoverHandler( $(this).parent().find("a.selected").length, $(this).parent(".js-setting-score").get(0) );      
    }catch(e){}    
  });    
}


/**
* 说明：编辑弹窗，该弹窗负责返回对应的事件 并返回相应元素的信息
* 
*
*/
function initEditSmPop(){
  var ihtml , idkey ,popConfig,$cur, $smpops = $(".js-editsmpop");
  $.each( $smpops  ,function(){
    
    ihtml = '<div class="editsmpop js-smpopblock" style="display:none" ><ul>';
    $cur = $(this);
    idkey = $cur.attr("data-id");
    popConfig = ( new Function( "return " +$cur.attr("data-smpop") ) )();
    
    if(popConfig){
      
      $.each( popConfig, function(i, value){        
        ihtml+='<li data-id="'+idkey +'" data-optype="'+i+'">'+value+'</li>' ;
      });
      
      ihtml += '</ul></div>'
      $(ihtml).insertAfter($cur);

    }    
  }) 
  
  
  var $ipop = $(".js-smpopblock");  
  
  $smpops .off("click");
  $smpops .on("click" , function(e){
     
      $ipop.removeClass("hover");
      $ipop.css("display","none");
      
      $ulpop = $(this).siblings(".js-smpopblock").eq(0);
      //$ulpop.removeClass("hover");
      $ulpop.css("display","block");
      
    
      $ulpop.on("mouseover",function(){
       
        if(!$(this).hasClass("hover")){           
          $ulpop.addClass("hover"); 
          $ulpop.removeAttr("style");
        }
        
      });    
     
  });
  
  
  $ipop.off("click","li");
  $ipop.on("click","li",function(){
    $cur = $(this);
    smpopHandler($cur.attr("data-id"),  $cur.attr("data-optype"));    
  });
  
}




/**
  * 说明：获取URI地址参数，注：如果存在类似重定向页面地址的参数则写在所有参数的最后，用reurl取名并仅限一条地址传参
  * @method getURIData
  * @param undefined
  * @return {json} 将传参组成JSON格式返回 可以用hasdata属性判断是否有参数
  */
function getURIData(){
   var urlAgument = {"hasdata":false};  
   
   if( location.href.indexOf('?') < 0  ){
     return urlAgument;     
   }
      
   try{
       var hrefStr = location.href.substring( location.href.indexOf('?')+1 );
       
       if( hrefStr  == "" ){
         return urlAgument;     
       }
       var tempList = [];
       
       //var myAddress = hrefStr.subString
       if ( hrefStr.indexOf("reurl") >= 0){
          var oldStr = hrefStr;
          hrefStr = hrefStr.substring(0, hrefStr.indexOf("reurl") -1 );
          tempList = hrefStr.split('&');    
          tempList.push( oldStr.substring(oldStr.indexOf("reurl")) );
       }else{
          tempList = hrefStr.split('&');    
       }               
      
       
       for( var i = 0; i < tempList.length ; i++ ){  
          var tempName = tempList[i].split('=')[0];
          if( tempName == "reurl" ) {
            urlAgument[tempName] = tempList[i].substring( tempList[i].indexOf('=')+1 );
          
          }else{
            urlAgument[tempName] = tempList[i].split('=')[1];
          }
       }
       urlAgument.hasdata = true;
   }catch(e){ throw new Error(e.message) }
  return urlAgument;  
}

function formatStr (source, params) {
    if (arguments.length == 1)
        return function () {
            var args = $.makeArray(arguments);
            args.unshift(source);
            return $.format.apply(this, args);
        };
    if (arguments.length > 2 && params.constructor != Array) {
        params = $.makeArray(arguments).slice(1);
    }
    if (params.constructor != Array) {
        params = [params];
    }
    $.each(params, function (i, n) {
        source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
    });
    return source;
}

/*头部菜单点击切换*/
    $(".navTabs li").click(function(){
        $(".navTabs li").removeClass("selected");
        $(this).addClass("selected");
    })
    /*分页*/
    $(".pagination a").click(function(){
        $(".pagination a").removeClass("selected");
        $(this).addClass("selected");
    })


