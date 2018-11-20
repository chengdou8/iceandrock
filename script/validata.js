$(function(){

  // $.validator.setDefaults({
  //    submitHandler: function(form) {
  //     form.submit();
  //    }
  // });
  // 字符验证
  jQuery.validator.addMethod("stringCheck", function(value, element) {
     return this.optional(element) || /^[\u0391-\uFFE5\w]+$/.test(value);
  }, "只能包括中文字、英文字母、数字和下划线");
  // 中文字两个字节
  jQuery.validator.addMethod("byteRangeLength", function(value, element, param) {
     var length = value.length;
    for(var i = 0; i < value.length; i++){
  if(value.charCodeAt(i) > 127){
  length++;
  }
  }
  return this.optional(element) || ( length >= param[0] && length <= param[1] );
}, "请确保输入的值在3-8个字节之间");

// 身份证号码验证
jQuery.validator.addMethod("isIdCardNo", function(value, element) {
  return this.optional(element) || idCardNoUtil.checkIdCardNo(value);
}, "请正确输入您的身份证号码");
//护照编号验证
 jQuery.validator.addMethod("passport", function(value, element) {
  return this.optional(element) || checknumber(value);
}, "请正确输入您的护照编号");

// 手机号码验证
jQuery.validator.addMethod("isMobile", function(value, element) {
  var length = value.length;
  var mobile = /^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/;
  return this.optional(element) || (length == 11 && mobile.test(value));
}, "请正确填写您的手机号码");

//开始验证
$('#commentForm').validate({

  rules: {
  username: {
  required:true,
  stringCheck:true,
  byteRangeLength:[3,8]
  },
  phone:{
  required:true,
  isMobile:true
  },
  card:{
   required:true,
   isIdCardNo:true
  },
   passport:{
   required:true,
   passport:true
  }
  },

  messages:{
  username: {
  required: "请填写用户名",
  stringCheck: "用户名只能包括中文字、英文字母、数字和下划线",
  byteRangeLength: "用户名必须在3-8个字符之间"
  },
  phone:{
  required: "请输入您的联系电话",
  isPhone: "请输入一个有效的联系电话"
  },
  card:{
  required:"请输入身份证号",
  isIdCardNo:"请输入正确的身份证号"
  },
  passport:{
  required:"请输入护照编号",
  passport:"请输入正确的护照编号"
  }
  },


  focusInvalid: false,
  onkeyup: false,


  errorPlacement:function(error, element) {
  error.appendTo(element.parent());
  },
  errorElement:"em",
  error:function(label){label.text("").addClass("error");}
  });
})
