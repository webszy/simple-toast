# simple-toast
a simple toast based on es6 class
## new class with option Object or string
```
const option = {
            duration:4000,
            msg:'hello world',
            position: 'bottom'
}
new Simple_Toast(option)
```
or 
```
new Simple_Toast('hello world')
```
## show toast again
```
const toast = new Simple_Toast('hello world')
toast.show()
```
