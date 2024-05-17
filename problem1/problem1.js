var sum_to_n_a = function(n) {
    let total = 0;
    if(n < 0){
        return total;
    }

    for(let i =0; i <= n; i++){
        total+=i;
    }

    return total;
};

var sum_to_n_b = function(n) {
    return n < 0 ? 0:  n * (n+1) /2
};

var sum_to_n_c = function(n) {
    if(n === 0 || n < 0){
        return 0;
    }

    return sum_to_n_c(n-1) + n;
};