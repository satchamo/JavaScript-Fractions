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

var Fractions = {};
// converts a string into a Fraction object
Fractions.fromString = function(fraction_str){
    // if the fraction is a number, that means there is just a whole part
    if(fraction_str * 1 == fraction_str){
        var fraction = new Fraction(fraction_str, 1);
    // split fraction on slash
    } else {
        var part1 = fraction_str.split(/\//);
        if(part1.length == 1){
            throw "Expected a slash '/' in the fraction string but it is not present";
        }

        // split the fraction on the space (for mixed numbers)
        var part2 = part1[0].split(/\s+/);
        // we have a whole number in the fraction
        if(part2.length == 2){
            var fraction_parts = [part2[0], part2[1], part1[1]];
        } else {
            var fraction_parts = [0, part1[0], part1[1]];
        }

        // make it improper since a Fraction object only has a denominator and numerator
        var fraction = this.toImproper(fraction_parts);
    }

    return fraction;
}

// convert an array to a Fraction object
// valid formats: array(whole), array(numerator, denominator), array(whole, numerator, denominator) 
Fractions.fromArray = function(fraction_array){
    var fraction_array_count = fraction_array.length;
    // there is just a whole part
    if(fraction_array_count == 1){
        var fraction = new Fraction(fraction_array[0], 1);
    // there is a numerator and denominator
    } else if(fraction_array_count == 2){
        var fraction = new Fraction(fraction_array[0], fraction_array[1]);
    // fraction with whole part, numerator and denominator, just run through toImproper()
    } else if(fraction_array_count == 3) {
        var fraction = this.toImproper(fraction_array);
    } else {
        throw 'Expected an array of length 1, 2 or 3 but got one of length ' . fraction_array_count;
    }

    return fraction;
}

// converts a 3 element array (where array[0] = whole, array[1] = numerator, and array[2] = denominator) into a Fraction object
// or a 2 element array (where array[0] = numerator, and array[1] = denominator)
Fractions.toImproper = function(fraction_parts){
    // if there is a whole part to the fraction, do the math
    if(fraction_parts.length == 3){
        var whole = fraction_parts[0];
        var numerator = fraction_parts[1];
        var denominator = fraction_parts[2];
        // calculate the new numerator using the math you used in middle school
        var new_numerator = Math.abs(denominator) * Math.abs(whole) + Math.abs(numerator);
        // figure out the sign of the numerator (special case if whole == 0)
        if((whole == 0 && denominator * numerator < 0) || (whole * numerator * denominator < 0)){
            var sign = -1;
        } else {
            var sign = 1;
        }
        var fraction = new Fraction(sign * new_numerator, Math.abs(denominator));
    } else { 
        var fraction = new Fraction(fraction_parts[0], fraction_parts[1]);
    }

    return fraction;
}   
