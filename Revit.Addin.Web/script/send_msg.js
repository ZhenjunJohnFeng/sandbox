function createXmlObj() {
    var signatures = ["Msxml2.DOMDocument.5.0", "Msxml2.DOMDocument.4.0", "Msxml2.DOMDocument.3.0", "Msxml2.DOMDocument", "Microsoft.XmlDom"];
    for (var i = 0; i < signatures.length; i++) {
        try {
            var xmlDom = new ActiveXObject(signatures[i]);
        } catch (e) {
            //忽略错误,继续测试下一个版本
        }
    }

    return xmlDom.xml;
}

/*
创建XMLHttpRequest请求对象
*/
function createXMLhttp() {
    var xmlhttp;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
            try {
                xmlhttp = new XMLHttpRequest();
            } catch (e) { }
        }
    }
    return xmlhttp;
}

function sendInfor() {

    var XmlObj = createXmlObj();
    //alert(XmlObj);
    //根据不同的浏览器创建不同的XMLHttpRequest对象
    var xmlhttp = createXMLhttp();

    //alert(url);
    //创建一个请求

    xmlhttp.open("post", url, false);

    //设置请求的HTTP头
    //xmlhttp.setRequestHeader("Content-Type"," application/utf-8 ");   
    xmlhttp.setRequestHeader("Content-Type", "text/xml;charset=UTF-8");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            //alert("发送成功!");
        }
    }
    //发送请求
    xmlhttp.send(XmlObj);
    var aa = xmlhttp.ResponseText; //得到后台传递过来的text文本信息
    //var test =xmlhttp.responseStream;//得到后台传递过来的输入流信息--一般不用
    //alert(aa);
    //把后台传递过来的信息aa用js放到页面中指定的位置
}

