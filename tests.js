var console = {
    log : function(msg){
        document.write(msg + "<br />");
    }
}
function assertEqual(a, b, test){
    if(a.toString() == b.toString()){
        console.log("PASS: " + test);
    } else {
        console.log("<strong style='color:#ff0000'>FAIL:</strong> " + test);
    }
}

//****************************
//* Fraction.getNumerator() *
//****************************
f = new Fraction(1,-2);
test = "Fraction(1,-2).getNumerator()";
assertEqual(f.getNumerator(), "-1", test);

f = new Fraction(10,2);
test = "Fraction(10,2).getNumerator()";
assertEqual(f.getNumerator(), "10", test);

f = new Fraction(-3,-4);
test = "Fraction(-3,-4).getNumerator()";
assertEqual(f.getNumerator(), "3", test);

//******************************
//* Fraction.getDenominator() *
//******************************
f = new Fraction(1,-2);
test = "Fraction(1,-2).getDenominator()";
assertEqual(f.getDenominator(), "2", test);

f = new Fraction(10,2);
test = "Fraction(10,2).getDenominator()";
assertEqual(f.getDenominator(), "2", test);

f = new Fraction(-3,-4);
test = "Fraction(-3,-4).getDenominator()";
assertEqual(f.getDenominator(), "4", test);

//************************
//* Fraction.toString() *
//************************
f = new Fraction(1,-2);
test = "Fraction(1,-2).toString()";
assertEqual(f.toString(), "-1/2", test);

f = new Fraction(10,2);
test = "Fraction(10,2).toString()";
assertEqual(f.toString(), "10/2", test);

f = new Fraction(-3,-4);
test = "Fraction(-3,-4).toString()";
assertEqual(f.toString(), "3/4", test);
f = new Fraction(1,-2); 

//**************************
//* Fraction.fromString() *
//**************************
f = "1/2";
test = "Fractions.fromString('" + f + "')";
assertEqual(Fractions.fromString(f).toString(), "1/2", test);

f = "-5/2";
test = "Fractions.fromString('" + f + "')";
assertEqual(Fractions.fromString(f).toString(), "-5/2", test);

f = "5/-2";
test = "Fractions.fromString('" + f + "')";
assertEqual(Fractions.fromString(f).toString(), "-5/2", test);

f = "1 2/3";
test = "Fractions.fromString('" + f + "')";
assertEqual(Fractions.fromString(f).toString(), "5/3", test);

f = "-1 2/3";
test = "Fractions.fromString('" + f + "')";
assertEqual(Fractions.fromString(f).toString(), "-5/3", test);

f = "1 -2/3";
test = "Fractions.fromString('" + f + "')";
assertEqual(Fractions.fromString(f).toString(), "-5/3", test);

f = "1 -2/-3";
test = "Fractions.fromString('" + f + "')";
assertEqual(Fractions.fromString(f).toString(), "5/3", test);

f = "-1 -2/-3";
test = "Fractions.fromString('" + f + "')";
assertEqual(Fractions.fromString(f).toString(), "-5/3", test);

//**************************
//* Fractions.fromArray() *
//**************************
f = [3];
test = "Fractions.fromArray([3])";
assertEqual(Fractions.fromArray(f).toString(), "3/1", test);

f = [1,3];
test = "Fractions.fromArray([1,3])";
assertEqual(Fractions.fromArray(f).toString(), "1/3", test);

f = [1,2,3];
test = "Fractions.fromArray([1,2,3])";
assertEqual(Fractions.fromArray(f).toString(), "5/3", test);

