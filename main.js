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
                    document.querySelector("#output").textContent = "Podaj poprawną 8 bitową liczbę binarną";
                    return;
                }
            }
            case "oct":{
                if(/^[0-7]*$/.test(num)){
                    document.querySelector("#output").textContent = num;
                    break;
                }else{
                    return;
                }
            }case "dec":{
                if(/^[0-9]*$/.test(num)){
                    document.querySelector("#output").textContent = num;
                    break;
                }else{
                    return;
                }
            }case "hex":{
                if(/^[0-9a-f]*$/.test(num)){
                    document.querySelector("#output").textContent = num;
                    break;
                }else{
                    return;
                }
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
                    document.querySelector("#output").textContent = "Podaj poprawną 8 bitową liczbę binarną";
                    return;
                }

            }
            case "oct":{
                if(/^[0-7]*$/.test(num)){
                    document.querySelector("#output").textContent = num;
                    break;
                }else{
                    return;
                }
            }case "dec":{
                if(/^[0-9]*$/.test(num)){
                    document.querySelector("#output").textContent = num;
                    break;
                }else{
                    return;
                }
            }case "hex":{
                if(/^[0-9a-f]*$/.test(num)){
                    document.querySelector("#output").textContent = num;
                    break;
                }else{
                    return;
                }
            }
        }
    }
}

document.querySelector("input").addEventListener("input",function(){
    convert(document.querySelector("input").value,document.querySelector("select#in").value,document.querySelector("select#out").value);
});