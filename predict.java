public void Cocol( ){
    lookahead = in.next();
    if(lookahead.equals("COMPILER")){
        match("COMPILER");
        match("ident");
        ScannerSpecification();
        match("END");
        match("ident");
        match(".");
    }
    else{
        System.out.println("SYNTAX ERROR: \nCOMPILER expected, Found: "+lookahead);
        try {
            ArrayList<Integer> line = findLineOf(lookahead);
            System.out.println("Line: "+line);
        } catch (Exception ex) {
            Logger.getLogger(ScannerCocol.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

}

public void ScannerSpecification(){
    // 1 o mas veces “CHARACTERS” { SetDecl }
    if(lookahead.equals("CHARACTERS")){
        match("CHARACTERS");
        // 0 or More SETDecl

    }
    if (lookahead.equals("KEYWORDS")){
        //PENDING....     
    }

    if( WhiteSpaceDecl()){
          //PENDING....
    }
    boolean res=match(".");
    if(res==false){
        System.out.println("SYNTAX ERROR: \n \".\" expected, Found: "+lookahead);

        //Encontrando linea
        try {
            ArrayList<Integer> line = findLineOf(lookahead);
            System.out.println("Line: "+line);
        } catch (Exception ex) {
            Logger.getLogger(ScannerCocol.class.getName()).log(Level.SEVERE, null, ex);
        }


    }

}
public boolean match(String terminal){
    boolean result;
    if(terminal.equals("number")){
        result = automataNumber.simularAFN(lookahead, automataNumber.inicial, conjuntoSimbolos);
        return result;
    }
    else if(terminal.equals("ident")){
        result = automataident.simularAFN(lookahead,automataident.inicial,conjuntoSimbolos);
        return result;
    }
    else if(terminal.equals("string")){
       result =  automataString.simularAFN(lookahead,automataString.inicial,conjuntoSimbolos);
       return result;
    }   
    else if(terminal.equals("char")){
        result = automataChar.simularAFN(lookahead,automataChar.inicial,conjuntoSimbolos);
        return result;
    } 
    else{
        if(this.lookahead.equals(terminal)){
            lookahead= in.next();
            return true;
        }
        else{
            System.out.println("Error: Se esperaba: "+terminal);
            return false;
        }
    }
