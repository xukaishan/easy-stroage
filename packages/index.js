class STROAGE {
    // 为对象添加属性
    constructor(stroage = localStorage, prefix = '') {
        this.prefix = prefix;
        this.stroage = stroage;
    }

    /*
     key: 'a.b.c'
     val: 'xxx' [null,json object]
     返回:true false
     保存格式:a:{"b":{"c":"xxxx"}}
     错误返回false,没值返回null
     */
    set(key, val) {
        const _key = key.split('.');
        if (!Array.isArray(_key) || val === undefined) { return false; };

        let obj = this.get(_key[0]);
        if (obj === false) { return false; };

        for (let index = 0; index < _key.length; index++) {
            if (index === 0 && index === _key.length - 1) {
                obj = val;
            } else if (index === 0) {
                (obj === null) && (obj = {});
            } else if (index === _key.length - 1) {
                obj[_key[index]] = val;
            } else if (!obj || !obj.hasOwnProperty(_key[index])) {
                obj[_key[index]] = {};
            } else {
                obj = obj[_key[index]];
            }
        }
        this.stroage.setItem(this.prefix + _key[0], JSON.stringify(obj));
        return true;
    }

    /*
     保存格式:a:{"b":{"c":"xxxx"}}
     key: 'a.b.c'
     返回: xxxx
     key: 'a'
     返回: {"b":{"c":"xxxx"}}

      错误返回false,没值返回null
     */
    get(key) {
        const _key = key.split('.');
        if (!Array.isArray(_key)) { return false; };

        let data = this.stroage.getItem(this.prefix + _key[0]);
        data = JSON.parse(data);
        if (data === null) { return null; };

        let value = data;
        for (let index = 0; index < _key.length; index++) {
            if (index === 0) {
                continue;
            } else if (!data || !data.hasOwnProperty(_key[index])) {
                value = null;
            } else if (index === _key.length - 1) {
                value = data[_key[index]];
            } else {
                data = data[_key[index]];
            }
        }

        return value;
    }

    /*
     保存格式:a:{"b":{"c":"xxxx"}}
     key: 'a.b.c'
     remove后保存格式:a:{"b":{"c":null}}
      key: 'a'
     remove后保存格式:a被删除
     */

    remove(key) {
        const _key = key.split('.');
        if (!Array.isArray(_key)) { return false; }

        const obj = this.get(_key[0]);
        if (obj) {
            if (_key.length < 2) {
                this.stroage.removeItem(this.prefix + _key[0]);
            } else {
                let dVal = obj;
                _key.slice(1).forEach((k, idx, arr) => {
                    if (idx === arr.length - 1) {
                        Array.isArray(dVal) && dVal.splice(k, 1) || delete dVal[k];
                    } else {
                        dVal = dVal[k] || {};
                    }
                });
                this.stroage.setItem(this.prefix + _key[0], JSON.stringify(obj));
            }
        }
        return true;
    }

    clear() {
        this.stroage.clear();
    }
}

export default STROAGE;
