
class Fechas{
    constructor(){}

    fecha_actual(){
        let ano = new Date().getFullYear();
        let mes: any = new Date().getMonth();
        let dia: any = new Date().getDate();
        
        if(mes < 10){
            mes = `${0}${mes+1}`;
        }else if(dia < 10){
            dia = `${0}${dia}`;
        }

        return ano+'-'+mes+'-'+dia
    }
}
 
let fechas = new Fechas();
export default fechas;