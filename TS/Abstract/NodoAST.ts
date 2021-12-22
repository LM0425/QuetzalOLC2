export class NodoAST{
    hijos:any[];
    valor:any;

    constructor(valor:any){
        this.hijos = [];
        this.valor = valor;
    }

    setHijos(hijos:any){
        this.hijos = hijos;
    }

    agregarHijo(valorHijo:any){
        this.hijos.push(new NodoAST(valorHijo));
    }

    agregarHijos(hijos:any){
        for(let hijo of hijos){
            this.hijos.push(hijo);
        }
    }

    agregarHijoNodo(hijo:any){
        this.hijos.push(hijo);
    }

    agregarPrimerHijo(valorHijo:any){
        this.hijos.unshift(new NodoAST(valorHijo));
    }

    agregarPrimerHijoNodo(hijo:any){
        this.hijos.unshift(hijo);
    }

    getValor(){
        return String(this.valor);
    }

    setValor(valor:any){
        this.valor = valor;
    }

    getHijos(){
        return this.hijos;
    }
}