BOX.build = class{
    constructor(){
        this.#create()
    }

    // create
    #create(){
        this.#createChild()
    }
    #createChild(){
        this.child = new BOX.child.build()
    }

    // animate
    animate(){
        this.child.animate()
    }

    // resize
    resize(){
        this.child.resize()
    }
}