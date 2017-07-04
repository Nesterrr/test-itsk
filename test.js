//1
function Write2Report(msgtext) {
    _REPORT = _REPORT + Date() + ': ' + msgtext + '\n';
    alert(msgtext);
    docReport.TopElem.report_text = _REPORT;
    docReport.TopElem.completed = false;
    docReport.Save();
}

var _agent_num = Random(0, 100000);
var _REPORT;
var docReport = OpenNewDoc('x-local://wtv/wtv_action_report.xmd');
docReport.BindToDb(DefaultDb); // устаревший метод, BindToDbObjectType('DefaultDb','<тип документа>');
docReport.TopElem.create_date = Date();
docReport.TopElem.type = "result";
docReport.TopElem.completed = false;

var _msg_report = _agent_num + " Agent_sending_appraisal_invitation started!";
Write2Report(_msg_report );

try {
    if (OBJECTS_ID_STR != '') {
        var arrStrObjectsId = OBJECTS_ID_STR.split(";");
        var length = arrStrObjectsId.length;
        for (var i = 0; i < length; i++) {
            var paDoc = OpenDoc(UrlFromDocID(Int(arrStrObjectsId[i]))); // UrlFromDocID устаревшая функция
            tools.create_notification( 'cpr_nt_startappraise_BEF', Int(paDoc.DocID), '');
        }
    }
}
catch (eprst) {
    _msg_report = _agent_num +  " Error! " + eprst;
    Write2Report(_msg_report);
}
_msg_report = _agent_num + " Agent_sending_appraisal_invitation finished!";
Write2Report(_msg_report);

//2
SELECT * FROM table1 LEFT JOIN table2 ON table1.id = table2.id

//3
var tableToExcel = (function () {
    var uri = 'data:application/vnd.ms-excel;base64,'
        , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
        , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
        , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    return function (table, name, filename) {
        if (!table.nodeType) table = document.getElementById(table)
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }

        document.querySelector('.a').href = uri + base64(format(template, ctx));
        document.querySelector('.a').download = filename;
        document.querySelector('.a').click();

    }
})();
tableToExcel(document.querySelector('.table'),'table','table');