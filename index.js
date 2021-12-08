
function analizar(entrada) {
    
    console.log("analizar");
    console.log(entrada);
    try {
        test=gramatica.parse(entrada);
        //console.log("test",test)
    } catch (error) {
        console.log(error);   
    }
}



