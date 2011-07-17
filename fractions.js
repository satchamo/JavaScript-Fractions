function Fraction(numerator, denominator){
    denominator = denominator || 1
    // keep negative sign on the numerator
    if(denominator < 0){
        numerator *= -1;
        denominator *= -1;
    }
    // these are public because prototype methods cannot access private data
    this.numerator = numerator;
    this.denominator = denominator;
}

Fraction.prototype.getNumerator = function(){ return this.numerator; }
Fraction.prototype.getDenominator = function(){ return this.denominator; }
Fraction.prototype.toString = function(){ return this.numerator + "/" + this.denominator; }
