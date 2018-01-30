export const helpers = {
    copy: function (data) {
        return JSON.parse(JSON.stringify(data))
    },
    post: function (url, data, headers) {
        const self = this;
        if (!headers) {
            headers = {
                "Content-Type": "application/json;charset=utf-8",
                "q-car-auth": localStorage.getItem('Q_Car__user_token')
            };
        }
        return fetch(`${api}${url}`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: headers,
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            if (data.sc === 401) {
                console.log('401, WTF!!!');
                return self.$router.push('/')
            }
            return data;
        });
    },
    get: function (url, headers) {
        const self = this;
        if (!headers) {
            headers = {
                "Content-Type": "application/json;charset=utf-8",
                "q-car-auth": localStorage.getItem('Q_Car__user_token')
            };
        }
        return fetch(`${api}${url}`, {
            method: 'get',
            headers: headers,
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            if (data.sc === 401) {
                console.log('401, WTF!!!');
                return self.$router.push('/')
            }
            return data;
        });
    },
    deleteBulk: function (url, data, headers) {
        const self = this;
        if (!headers) {
            headers = {
                "Content-Type": "application/json;charset=utf-8",
                "q-car-auth": localStorage.getItem('Q_Car__user_token')
            };
        }
        return fetch(`${api}${url}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: headers,
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            if (data.sc === 401) {
                console.log('401, WTF!!!');
                return self.$router.push('/')
            }
            return data;
        });
    },
    makeID: function () {
        return Math.random().toString(36).substr(2, 9);
    },


    // Filters
    userType: function (data) {
        // Admin(0),Owner(1),Driver(2),Customer(3)
        let type = 'غير محدد';
        if (data == 0) type = 'مدير نظام'
        if (data == 1) type = 'مالك'
        if (data == 2) type = 'سائق'
        if (data == 3) type = 'عميل'
        return type
    },
    formatDate: function (date, format) {
        var date = new Date(date),
            day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear(),
            hours = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds();
        if (!format) {
            format = "dd/MM/yyyy hh:mm t";
        }
        format = format.replace("MM", month.toString().replace(/^(\d)$/, '0$1'));
        if (format.indexOf("yyyy") > -1) {
            format = format.replace("yyyy", year.toString());
        } else if (format.indexOf("yy") > -1) {
            format = format.replace("yy", year.toString().substr(2, 2));
        }
        format = format.replace("dd", day.toString().replace(/^(\d)$/, '0$1'));
        if (format.indexOf("t") > -1) {
            if (hours > 11) {
                format = format.replace("t", "pm");
            } else {
                format = format.replace("t", "am");
            }
        }
        if (format.indexOf("HH") > -1) {
            format = format.replace("HH", hours.toString().replace(/^(\d)$/, '0$1'));
        }
        if (format.indexOf("hh") > -1) {
            if (hours > 12) {
                hours -= 12;
            }
            if (hours === 0) {
                hours = 12;
            }
            format = format.replace("hh", hours.toString().replace(/^(\d)$/, '0$1'));
        }
        if (format.indexOf("mm") > -1) {
            format = format.replace("mm", minutes.toString().replace(/^(\d)$/, '0$1'));
        }
        if (format.indexOf("ss") > -1) {
            format = format.replace("ss", seconds.toString().replace(/^(\d)$/, '0$1'));
        }
        return format;
    }
}
