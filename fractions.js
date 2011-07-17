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
// convert a Fraction object to a pretty string
Fractions.toString = function(fraction, mixed, lowest_terms){
    if(typeof(mixed) == "undefined") mixed = true;
    if(typeof(lowest_terms) == "undefined") lowest_terms = true;
    var whole = 0;
    var numerator = fraction.getNumerator();
    var denominator = fraction.getDenominator();

    if(mixed){
        var fraction_array = this.toMixed(fraction);
        whole = fraction_array[0];
        numerator = fraction_array[1];
        denominator = fraction_array[2];
        var fraction = new Fraction(numerator, denominator);
    }

    if(lowest_terms){
        var fraction = this.toLowestTerms(fraction);
        numerator = fraction.getNumerator();
        denominator = fraction.getDenominator();
    }

    // don't need to show leading zero
    if(whole == 0){
        whole = '';
        // append space after the whole number since we don't want the whole and numerator touching
    } else {
        whole += " ";
    }

    // don't show the numerator or denominator
    if(numerator == 0){
        numerator = '';
        denominator = '';
        // append a slash after the numerator
    } else {
        numerator += "/";
    }

    // if the fraction is just zero, just show a zero
    if(whole == 0 && numerator == 0){
        return 0;
    // need to trim off the extra space on the whole part
    } else if(numerator == 0 && denominator == 0) {
        return whole.slice(0,-1);
    } else {
        return whole + numerator + denominator;
    }
}

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
// valid formats: [whole], [numerator, denominator], [whole, numerator, denominator] 
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

// converts a Fraction object into an array representing the fraction as a mixed number (array[0] = whole, array[1] = numerator, array[2] = denominator)
Fractions.toMixed = function(fraction){
    var numerator = fraction.getNumerator();
    var whole = 0;
    // we only need to do something if the numerator is greater than the denominator 
    if(Math.abs(fraction.getNumerator()) >= fraction.getDenominator()){
        // gotta use two different functions because of the negative issue
        if(fraction.getNumerator() > 0){
            whole = Math.floor(fraction.getNumerator() / fraction.getDenominator());    
        } else { 
            whole = Math.ceil(fraction.getNumerator() / fraction.getDenominator()); 
        }

        // recalculate the numerator
        numerator = numerator - (whole * fraction.getDenominator()); 
        // the negative sign will be on the whole part, so get rid of it on the numerator
        if(fraction.getNumerator() < 0){
            numerator *= -1;
        }
    } 

    return [whole, numerator, fraction.getDenominator()];
}

// convert a Fraction object to lowest terms
Fractions.toLowestTerms = function(fraction){
    var gcf = this.gcf(fraction.getNumerator(), fraction.getDenominator());
    return new Fraction(fraction.getNumerator() / gcf, fraction.getDenominator() / gcf);
}

// return the greatest common factor of a and b
Fractions.gcf = function(a, b){
    while(b != 0){
        var tmp = a;
        a = b;
        b = tmp % b;
    }
    return a;
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
