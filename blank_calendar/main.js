
function is_uruu_2gatsu( date ){
    let year = date.getYear();
    let month = date.getMonth() + 1;
    if( month == 2){
        if( year % 4 == 0 ){
            if( year % 100 == 0 ){
                if( year % 400 == 0){
                    return "u";
                }
                return "";
            }
            return "u";
        }
    }
    return "";
}


window.addEventListener( "load" ,function(){

    const day_of_week_kanji = ["日","月","火","水","木","金","土"];

    let today = new Date();
    today.setDate(1); // 月初にする
    let month = today.getMonth() + 1;
    let day_of_week = today.getDay();
    let link_this_month = document.getElementById("link_this_month");
    link_this_month.innerHTML = `<b>今月</b>(${month}月,${day_of_week_kanji[day_of_week]}曜日)`;
    link_this_month.href = `./pdf/${month}${is_uruu_2gatsu( today )}_${day_of_week}.pdf`;

    today = new Date();
    today.setMonth( today.getMonth() + 1); // 来月
    today.setDate(1); // 月初にする
    month = today.getMonth() + 1;
    day_of_week = today.getDay();
    link_this_month = document.getElementById("link_next_month");
    link_this_month.innerHTML = `<b>来月</b>(${month}月,${day_of_week_kanji[day_of_week]}曜日)`;
    link_this_month.href = `./pdf/${month}_${day_of_week}.pdf`;
    
    today = new Date();
    today.setMonth( today.getMonth() + 2); // 再来月
    today.setDate(1); // 月初にする
    month = today.getMonth() + 1;
    day_of_week = today.getDay();
    link_this_month = document.getElementById("link_next_next_month");
    link_this_month.innerHTML = `<b>再来月</b>(${month}月,${day_of_week_kanji[day_of_week]}曜日)`;
    link_this_month.href = `./pdf/${month}_${day_of_week}.pdf`;
});