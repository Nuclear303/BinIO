const hexValues = {
    "0000": 0,
    "0001": 1,
    "0010": 2,
    "0011": 3,
    "0100": 4,
    "0101": 5,
    "0110": 6,
    "0111": 7,
    "1000": 8,
    "1001": 9,
    "1010": "A",
    "1011": "B",
    "1100": "C",
    "1101": "D",
    "1110": "E",
    "1111": "F"
}
const octValues = {
    "000": 0,
    "001": 1,
    "010": 2,
    "011": 3,
    "100": 4,
    "101": 5,
    "110": 6,
    "111": 7
}

function makeHexToDec(number){
    if(number >= 0 && number <= 9){
        return number
    }
    else{
        number = number.toLowerCase();
        switch(number){
            case "a":{return 10; break;}
            case "b":{return 11; break;}
            case "c":{return 12; break;}
            case "d":{return 13; break;}
            case "e":{return 14; break;}
            case "f":{return 15; break;}
        }
    }
}

function decToOct(number){
    let oct = "";
    while(number > 0){
        oct = `${number % 8}${oct}`;
        number = Math.floor(number / 8);
    }

    return oct;
}

function makeHex(number){
    if(number >=0 && number <= 9){
        return `${number}`;
    }
    else{
        switch(number){
            case 10:{return "a"; break;}
            case 11:{return "b"; break;}
            case 12:{return "c"; break;}
            case 13:{return "d"; break;}
            case 14:{return "e"; break;}
            case 15:{return "f"; break;}
        }
    } 
    return number;
}

function decToHex(number){
    let hex = "";
    while(number > 0){
        hex = `${makeHex(number % 16)}${hex}`;
        number = Math.floor(number / 16);
    }
    return hex;
}
function inputError(input){
    return `Insert valid ${input.toUpperCase()} number`
}

function convert(num, input, output){
    if(document.querySelector("div.output").contains(document.querySelector("#output"))){
        document.querySelector("#output").remove();
    }
    document.querySelector("div.output").appendChild(document.createElement("h2"));
    document.querySelector("div.output h2").id = "output";
    if(input == output){
        switch(input){
            case "bin":{
                if(/^[01]{8}$/.test(num)){
                    document.querySelector("#output").textContent = num;
                    break;
                }else{
                    document.querySelector("#output").textContent = inputError(input);
                    return;
                }
            }
            case "oct":{
                if(/^[0-7]*$/.test(num)){
                    document.querySelector("#output").textContent = num;
                    break;
                }else{
                    document.querySelector("#output").textContent = inputError(input);
                    return;
                }
            }case "dec":{
                if(/^[0-9]*$/.test(num)){
                    document.querySelector("#output").textContent = num;
                    break;
                }else{
                    document.querySelector("#output").textContent = inputError(input);
                    return;
                }
                break;
            }case "hex":{
                if(/^[0-9a-fA-F]*$/.test(num)){
                    document.querySelector("#output").textContent = num;
                    break;
                }else{
                    document.querySelector("#output").textContent = inputError(input);
                    return;
                }
                break;
            }
        }   
    }
    else{
        switch(input){
            case "bin":{
                if(/^[01]{8}$/.test(num) && output != "oct"){
                    switch(output){
                        case "hex":{
                            let first = num.substring(0,4);
                            let second = num.substring(4,8);
                            document.querySelector("#output").textContent =`${hexValues[first]}${hexValues[second]}`;
                            break;
                        }
                        case "dec":{
                            let result = 0;
                            for(let i = 0; i < num.length; i++){
                                result += num[i] * Math.pow(2, num.length - i - 1);
                            }
                            document.querySelector("#output").textContent =`${result}`;
                            break;
                        }
                    }
                    break;
                }
                else if(/^[01]{9}$/.test(num) && output == "oct"){
                    let first = num.substring(0,3);
                    let second = num.substring(3,6);
                    let third = num.substring(6,9);
                    document.querySelector("#output").textContent =`${octValues[first]}${octValues[second]}${octValues[third]}`;
                    break;
                }
                else{
                    document.querySelector("#output").textContent = inputError(input);
                    return;
                }

            }
            case "oct":{
                if(/^[0-7]*$/.test(num)){
                    switch(output){
                        case "dec":{
                            let result = 0;
                            for(let i = 0; i < num.length; i++){
                                result+= Number(num[i])*Math.pow(8, num.length-i-1);
                            }
                            document.querySelector("#output").textContent = result;
                            break;
                        }
                    }
                    break;
                }else{
                    document.querySelector("#output").textContent = inputError(input);
                    return;
                }
            }case "dec":{
                if(/^[0-9]*$/.test(num)){
                    switch(output){
                        case "oct":{
                            let oct = decToOct(num);
                            document.querySelector("#output").textContent = oct;
                            break;
                        }
                        case "hex":{
                            let hex = decToHex(num);
                            document.querySelector("#output").textContent = hex;
                            break;
                        }
                    }
                    break;
                }else{
                    document.querySelector("#output").textContent = inputError(input);
                    return;
                }
            }case "hex":{
                if(/^[0-9a-fA-F]*$/.test(num)){
                    switch(output){
                        case "dec":{
                            let result = 0;
                            for(let i = 0; i < num.length; i++){
                                result+= makeHexToDec(num[i])*Math.pow(16, num.length-i-1);
                            }
                            document.querySelector("#output").textContent = result;
                            break;
                        }
                    }
                    break;
                }else{
                    document.querySelector("#output").textContent = inputError(input);
                    return;
                }
            }
        }
    }
}

document.querySelector("input").addEventListener("input",function(){
    convert(document.querySelector("input").value,document.querySelector("select#in").value,document.querySelector("select#out").value);
});