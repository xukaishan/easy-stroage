# easy-stroage
> Easier to use local storage


## Installation

### CDN
```js
<script src="https://unpkg.com/@littlekai/easy-stroage@1.0.1/dist/easy-stroage.iife.js"></script>
```
### Npm
```console
npm install @littlekai/easy-stroage
```
## Usage
```js
const prefix = 'demo_' // 前缀命名空间 namespaces 
const persistent = new STROAGE(localStorage, prefix); // localStorage
const session = new STROAGE(sessionStorage, prefix); // sessionStorage

const obj = { name: 'wangyibo', age: 32, children: [{ name: 'zs' }] }
const address = { name: 'wangyibo', age: 32 }

const setPersistent = () => {
    persistent.set('user', obj) // true
    persistent.set('user.address', '成华大道二仙桥') // true
}
const getPersistent = () => {
    persistent.get('user.children') // [{ name: 'zs' }]
    persistent.get('user.tel') // null
}
```

## Demo

```console
cd demo
npm i
npm run dev
```