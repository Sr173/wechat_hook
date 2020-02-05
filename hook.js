
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
    var PByteArray = Java.use("com.tencent.mm.pointers.PByteArray");
    var sdk = Java.use("oicq.wlogin_sdk.request.b");

    xlog.logWrite2.implementation = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8 ) {
        // show_java_call_stack();
        // console.log("ON_LOG", arg8);
        return xlog.logWrite2(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8)
    };

    protocal.pack.implementation = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11){
        show_java_call_stack();
        var tmp = Java.cast(arg1, PByteArray);
        console.log(toHexString(arg0));
        var ret = this.pack(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11);
        console.log(toHexString(tmp.value.value));
        return ret
    };

    sdk.a.implementation = function (arg0, arg1, arg2) {
        var ret = this.a(arg0, arg1, arg2);
        console.log(arg2.length, arg2);
        console.log(toHexString(ret));
        return ret;
    };
});