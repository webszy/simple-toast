"use strict";
const style = `#simple_toast_container{
width: 100%;
position: fixed;
bottom: 12%;
left: 0;
        pointer-events:none;
}

#simple_toast{
width: fit-content;
max-width:80%;
margin-left: auto;
margin-right: auto;
background-color: rgba(48, 52, 55,.95);
color: rgb(245, 245, 245);
font-size: 13px;
padding: 5px 10px;
border-radius: 4px;
-webkit-border-radius: 4px;
-webkit-box-shadow:  1px 2px 2px 1px rgba(34, 34, 34, 1);
box-shadow:  1px 2px 2px 1px rgba(34, 34, 34, 1);
text-align: center;
font-family: Roboto, sans-serif;
}

#simple_toast em{
color: rgb(81, 180, 210);
font-weight: bold;
font-style: normal;
}

.simple_toast_top{
top: 12%;
bottom: auto !important;
}
.simple_toast_center{
    top:50%;
    bottom: auto !important;
    transform: translateY(-50%);
}

.simple_toast_fadein{
animation: simple_toast_fadein 1s ease;
-webkit-animation: simple_toast_fadein 1s ease;
}

.simple_toast_fadeout{
animation: simple_toast_fadeout 1s ease;
-webkit-animation: simple_toast_fadeout 1s ease;
animation-fill-mode: forwards;
-webkit-animation-fill-mode: forwards;
}

@keyframes simple_toast_fadein{
from {
opacity: 0;
-webkit-opacity: 0;
}
to {
opacity: 0.95;
-webkit-opacity: 0.95;
}
}

@-webkit-keyframes simple_toast_fadein{
from {
opacity: 0;
-webkit-opacity: 0;
}
to {
opacity: 0.95;
-webkit-opacity: 0.95;
}
}

@keyframes simple_toast_fadeout{
from {
opacity: 0.95;
-webkit-opacity: 0.95;
}
to {
opacity: 0;
-webkit-opacity: 0;
}
}

@-webkit-keyframes simple_toast_fadeout{
from {
opacity: 0.95;
-webkit-opacity: 0.95;
}
to {
opacity: 0;
-webkit-opacity: 0;
}
}`
const body = document.getElementsByTagName('body')[0]
export default class SimpleToast{
    constructor(options) {
        const defaultOptions = {
            duration:4000,
            msg:'',
            position: 'bottom'
        }
        this.realOptions = {}
        if(!options){
            return false
        } else if (typeof options === 'object') {
            this.realOptions = Object.assign(defaultOptions,options)
        } else if(typeof options === 'string') {
            this.realOptions = Object.assign(defaultOptions,{msg:options})
        } else {
            return false
        }

        if (this.realOptions.position) {
            const pos = this.realOptions.position.toLowerCase()
            if (['top','bottom','center'].includes(pos)) {
                this.realOptions.position = pos
            } else {
                this.realOptions.position = 'bottom'
            }
        }
        this.realOptions.timeout_id = null
        if(document.getElementById('simple_toast_css')){
            this.show().bind(this)
        } else {
            const s = document.createElement('style')
            s.innerHTML = style
            s.id ='simple_toast_css'
            document.getElementsByTagName('head')[0].appendChild(s)
            setTimeout(this.show.bind(this),50)
        }
    }
    show() {
        if (this.realOptions.msg === '') {
            return false
        }
        clearTimeout(this.realOptions.timeout_id)
        const previous_toast = document.getElementById('simple_toast_container')
        if (previous_toast) {
            body.removeChild(previous_toast)
        }
        let classes = 'simple_toast_fadein'
        if (['top','center'].includes(this.realOptions.position)) {
            classes = `simple_toast_fadein simple_toast_${this.realOptions.position}`
        }
        const toast_container = document.createElement('div');
        toast_container.setAttribute('id', 'simple_toast_container');
        toast_container.setAttribute('class', classes);
        body.appendChild(toast_container)
        const toast = document.createElement('div')
        toast.setAttribute('id', 'simple_toast')
        toast.innerHTML = this.realOptions.msg
        toast_container.appendChild(toast)

        this.realOptions.timeout_id = setTimeout(this.hide.bind(this), this.realOptions.duration)
        return true
    }
    hide() {
        const toast_container = document.getElementById('simple_toast_container')
        if (!toast_container) {
            return false;
        }
        clearTimeout(this.realOptions.timeout_id)
        toast_container.classList.add('simple_toast_fadeout')
        function remove_toast() {
            const toast_container = document.getElementById('simple_toast_container')
            if (!toast_container) {
                return false
            }
            toast_container.parentNode.removeChild(toast_container)

        }
        toast_container.addEventListener('webkitAnimationEnd', remove_toast)
        toast_container.addEventListener('animationEnd', remove_toast)
        toast_container.addEventListener('msAnimationEnd', remove_toast)
        toast_container.addEventListener('oAnimationEnd', remove_toast)
        return true
    }
}
