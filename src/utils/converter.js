const converter = {
    string2Amt : (amount)=>{
        return parseFloat(amount.substring(1,amount.length).replace(/,/g,""));  //对$ 123,321格式的金额格式化
    },
    getTime : function()
    {
        return new Date().getTime();
    },
    getFullDate : function(date)
    {
        if(typeof date === "string")
        {
            date = parseInt(date);
        }
        var date = new Date(date);//如果date为13位不需要乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y+M+D+h+m+s;
    },
    getDate : function(date)
    {
        if(typeof date === "string")
        {
            date = parseInt(date);
        }
        var date = new Date(date);//如果date为13位不需要乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        return Y+M+D;
    },
    addOneMonth : function(date)   //@date 格式为yyyy-mm-dd的日期，如：2014-01-25 
    {
            var arr = date.split('-');  
            var year = arr[0]; //获取当前日期的年份  
            var month = arr[1]; //获取当前日期的月份  
            var day = arr[2]; //获取当前日期的日  
            var days = new Date(year, month, 0);  
            days = days.getDate(); //获取当前日期中的月的天数  
            var year2 = year;  
            var month2 = parseInt(month) + 1;  
            if (month2 == 13) {  
                year2 = parseInt(year2) + 1;  
                month2 = 1;  
            }  
            var day2 = day;  
            var days2 = new Date(year2, month2, 0);  
            days2 = days2.getDate();  
            if (day2 > days2) {  
                day2 = days2;  
            }  
            if (month2 < 10) {  
                month2 = '0' + month2;  
            }  
          
            var t2 = year2 + '-' + month2 + '-' + day2;  
            return t2;  

    }
}

export default converter;