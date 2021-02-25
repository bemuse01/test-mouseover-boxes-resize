BOX.child.build = class{
    constructor(){
        this.#init()
        this.#create()
    }

    // init
    #init(){
        this.param = new BOX.child.param()
        this.element = null
        this.key = null
        this.left = null
        this.right = null
    }

    // create
    #create(){
        this.arr = []
        
        const w = 100 / this.param.count

        for(let i = 0; i < this.param.count; i++){
            const light = i * this.param.light 

            this.arr[i] = {
                key: i,
                style: {
                    box: {
                        left: `${w * i}%`,
                        width: `${w}%`,
                        visibility: 'visible'
                    },
                    boxInner: {
                        zIndex: '1',
                        transform: 'translate(0, 0)',
                        transition: 'transform 0.5s',
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

        this.element = event.target.parentElement.querySelector('.box-inner-1')
        this.parent = event.target.parentElement.querySelector('.box-inner')
        this.key = key
        
        const {right} = this.element.getBoundingClientRect()
        const {left} = this.parent.getBoundingClientRect()

        this.left = left
        this.right = right

        const step = 75 / (this.arr.length - 1)

        this.arr.forEach(e => {
            if(e.key === key){
                e.style.boxInner.zIndex = '2'
                e.style.boxInner.transition = 'transform 0.5s'
                e.style.boxInner.transform = `translate(${e.key * -step}%, 0)`
                
                e.style.boxInner1.transform = 'translate(0, 0)'
            }else{
                e.style.boxInner.transition = 'initial'
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
        if(this.element === null) return

        const {left} = this.parent.getBoundingClientRect()
        const {right} = this.element.getBoundingClientRect()

        this.arr.forEach(e => {
            if(e.key !== this.key){
                if(e.key < this.key){
                    e.style.boxInner.transform = `translate(-${this.left - left}px, 0)`
                }else{
                    e.style.boxInner.transform = `translate(${right - this.right}px, 0)`
                }
            }
        })
    }

    // get
    getElement(){
        return this.arr
    }
}