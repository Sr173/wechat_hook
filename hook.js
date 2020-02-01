
function toHexString(bytes) {
    if (bytes == null){
        return "";
    }
    var string = "";
    for (var i = 0; i < bytes.length; i++) {
        var s = (bytes[i] & 0xFF) <= 0xF ? ('0' + (bytes[i] & 0xFF).toString(16)) : (bytes[i] & 0xFF).toString(16);
        if (s.length != 2) {
            console.log("error", s);
        }
        string += s;
    }
    return string;
}

function show_java_call_stack() {
    var Exc = Java.use("java.lang.Exception");
    var Log = Java.use("android.util.Log");
    var e = Exc.$new("");
    var log = Log.$new();
    console.log(log.getStackTraceString(e));
}

Java.perform(function () {
    var protocal = Java.use("com.tencent.mm.protocal.MMProtocalJni");
    var xlog = Java.use("com.tencent.mars.xlog.Xlog");

    //xlog.logWrite2.implementation = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8 ) {
    //    console.log("ON_LOG", arg8);
    //    return xlog.logWrite2(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8)
    //};

    Process.enumerateModules({
        onMatch: function (exp) {
            send(exp.name)
        },
        onComplete: function () {
            send("stop")
        }
    });


        Interceptor.attach(Module.findExportByName("libwechatxlog.so", "Java_com_tencent_mars_xlog_Xlog_logWrite2"), {
            onEnter: function (args) {
                console.log("ON_LOG", Java.cast(args[12], StringClass));
            },
            onLeave: function (retval) {
            }
        });

});