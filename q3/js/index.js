$(document).ready(function() {
    // داده‌های جدول را تعریف می‌کنیم (می‌توانید از یک آرایه یا دیگر منابع داده استفاده کنید)
    var tableData = [
        { month: 'January', sales: 20, amount: '$1000' },
        { month: 'February', sales: 30, amount: '$2500' },
        { month: 'March', sales: 40, amount: '$3000' },
        { month: 'April', sales: 50, amount: '$8000' },
        { month: 'May', sales: 60, amount: '$7000' },

        { month: 'June', sales: 70, amount: '$8000' },

    ];

    // تابعی برای اضافه کردن داده به جدول تعریف می‌کنیم
    function populateTable() {
        var tbody = $('#striped-table tbody');

        // خالی کردن محتویات جدول
        tbody.empty();

        // اضافه کردن داده‌ها به جدول
        $.each(tableData, function(index, data) {
            var row = $('<tr>');
            row.append($('<td>').text(data.month));
            row.append($('<td>').text(data.sales));
            row.append($('<td>').text(data.amount));
            tbody.append(row);
        });

        // به جدول اعمال تغییرات رنگ بندی خطوط زوج و فرد
        $('#striped-table tbody tr:even').addClass('even');
        $('#striped-table tbody tr:odd').addClass('odd');
    }

    // اجرای تابع برای اولین بار
    populateTable();

    // این تابع را می‌توانید بر اساس نیاز خود فراخوانی کنید تا داده‌ها به روز شوند
    // به عنوان مثال، می‌توانید یک دکمه یا رویداد دیگر برای فراخوانی تابع تعیین کنید.
});

