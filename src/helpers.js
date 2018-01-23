export const helpers = {
    post: function(url, data, headers){
        const self = this;
        if(!headers) {
            headers = {
                "Content-Type": "application/json;charset=utf-8",
                "q-car-auth": localStorage.getItem('Q_Car__user_token')
            };
        }
        return fetch(`${api}${url}`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: headers,
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            if(data.sc === 401){
                console.log('401, WTF!!!');
                return self.$router.push('/')
            }
            return data;
        });
    },
    get: function(url, headers){
        const self = this;
        if(!headers) {
            headers = {
                "Content-Type": "application/json;charset=utf-8",
                "q-car-auth": localStorage.getItem('Q_Car__user_token')
            };
        }
        return fetch(`${api}${url}`, {
            method: 'get',
            headers: headers,
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            if(data.sc === 401){
                console.log('401, WTF!!!');
                return self.$router.push('/')
            }
            return data;
        });
    },
    deleteBulk:  function(url, data, headers){
        const self = this;
        if(!headers) {
            headers = {
                "Content-Type": "application/json;charset=utf-8",
                "q-car-auth": localStorage.getItem('Q_Car__user_token')
            };
        }
        return fetch(`${api}${url}`, {
            method: 'PUT',
            body:JSON.stringify(data),
            headers: headers,
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            if(data.sc === 401){
                console.log('401, WTF!!!');
                return self.$router.push('/')
            }
            return data;
        });
    },


    // Filters
    userType: function(data){
        // Admin(0),Owner(1),Driver(2),Customer(3)
        let type = 'غير محدد';
        if( data == 0 ) type = 'مدير نظام'
        if( data == 1 ) type = 'مالك'
        if( data == 2 ) type = 'سائق'
        if( data == 3 ) type = 'عميل'
        return type
    }
}
