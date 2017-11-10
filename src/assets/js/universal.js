/**
 * Created by leibo on 17/11/10.
 */
export const POST = function (url,data,fn,err) {
  var xhr = null;
  if (window.XMLHttpRequest){
    xhr=new XMLHttpRequest();
  }else{// code for IE6, IE5
    xhr=new ActiveXObject("Microsoft.XMLHTTP");
  }
  if (xhr==null){
    alert('您的浏览器不支持AJAX！');
    return;
  }
  let oStr = '';
  for(var key in data){
    oStr += key+"="+data[key]+"&";
  };
  xhr.open("POST",url,true);
  xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhr.send(oStr);
  xhr.onreadystatechange=function () {
    if (xhr.readyState == 1 || xhr.readyState == 2 || xhr.readyState == 3) {
// 本地提示：加载中/处理中
    }
    if (xhr.readyState == 4 && xhr.status == 200) {
      fn&&fn(xhr.responseText)
    }else{
      err&&err(xhr.status);
    }
  }
}
