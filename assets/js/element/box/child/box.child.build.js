BOX.child.build = class{
    constructor(){
        this.#init()
        this.#create()
    }

    // init
    #init(){
        this.param = new BOX.child.param()
        this.key = null
        this.set = true
    }

    // create
    #create(){
        this.arr = []
        
        const w = 100 / this.param.count

        for(let i = 0; i < this.param.count; i++){
            const light = i * this.param.light 

            this.arr[i] = {
                key: i,
                param: {
                    boxInner: null,
                    boxInner1: null
                },
                style: {
                    box: {
                        left: `${w * i}%`,
                        width: `${w}%`,
                        visibility: 'visible'
                    },
                    boxInner: {
                        zIndex: '1',
                        transform: 'translate(0, 0)',
                        // transition: 'transform 0.5s',
                    },
                    boxInner1: {
                        background: `hsl(0, 0%, ${light}%)`,
                        transform: 'translate(-75%, 0)',
                        transition: 'transform 0.5s',
                    }
                }
            }
        }
    }

    // event
    onMouseenter(key, event){
        event.preventDefault()
        
        this.key = key
        
        const step = 75 / (this.arr.length - 1)

        this.arr.forEach(e => {
            if(e.key === key){
                e.style.boxInner.zIndex = '2'
                e.style.boxInner.transition = 'transform 0.5s'
                e.style.boxInner.transform = `translate(${e.key * -step}%, 0)`
                
                e.style.boxInner1.transform = 'translate(0, 0)'
            }else{
                e.style.boxInner.transition = 'unset'
            }
        })
    }
    onMouseleave(key, event){
        event.preventDefault()

        this.arr[key].style.boxInner.zIndex = '1'
        this.arr[key].style.boxInner.transform = `translate(0, 0)`
        this.arr[key].style.boxInner1.transform = 'translate(-75%, 0)'
    }

    // animate
    animate(){
        const inner = document.querySelectorAll('.box-inner')
        const inner1 = document.querySelectorAll('.box-inner-1')

        if(inner.length === 0 || inner1.length === 0 || this.key === null) return

        if(this.set === true){
            this.arr.forEach(e => {
                e.param.boxInner = inner[e.key].getBoundingClientRect()
                e.param.boxInner1 = inner1[e.key].getBoundingClientRect()
            })
            this.set = false
        }

        for(let i = 0; i < this.arr.length; i++){
            if(i === this.key) continue 

            if(i < this.key){
                const parent_rect = inner[i + 1].getBoundingClientRect()
                const parent_rect1 = this.arr[i + 1].param.boxInner

                const left = parent_rect.right <= parent_rect1.right ? parent_rect.right - parent_rect1.right : parent_rect1.right - parent_rect.right

                this.arr[i].style.boxInner.transform = `translate(${left}px, 0)`
            }else{
                const child_rect = inner1[i - 1].getBoundingClientRect()
                const child_rect1 = this.arr[i - 1].param.boxInner1

                const right = child_rect.left <= child_rect1.left ? child_rect.left - child_rect1.left : child_rect1.left - child_rect.left

                this.arr[i].style.boxInner.transform = `translate(${-right}px, 0)`
            }
        }
    }

    // get
    getElement(){
        return this.arr
    }

    // resize
    resize(){
        this.set = true
    }
}