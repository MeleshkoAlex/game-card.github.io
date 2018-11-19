;(function(){
   var imgArr = [
   "https://kde.link/test/0.png",
   "https://kde.link/test/1.png",
   "https://kde.link/test/2.png",
   "https://kde.link/test/3.png",
   "https://kde.link/test/4.png",
   "https://kde.link/test/5.png",
   "https://kde.link/test/6.png",
   "https://kde.link/test/7.png",
   "https://kde.link/test/8.png",
   "https://kde.link/test/9.png"
   ];
   var cards = [];
   var line,row;
   var obj = null;
   var allCard;
   var field = document.querySelector('.field');
   
   (function() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            obj = JSON.parse(xmlhttp.responseText);
            console.log(obj);
            creatField();
        }
    }
    xmlhttp.open('Get', 'https://kde.link/test/get_field_size.php');
    xmlhttp.send();
})();

function creatField(){
    line = obj.width;
    row = obj.height;
    allCard = line * row;
    field.style.width = obj.width * 75 + 'px';
    field.style.height = obj.height * 75 + 'px';
    for(var i = 0; allCard > i;i++){
        var div = document.createElement('div');
        var img = document.createElement('img');
        div.setAttribute('data-card',i);
        div.className = 'cell';
        div.appendChild(img);
        field.appendChild(div);
    }
    creatCardImg();
}
function creatCardImg(){
    var ol = 0;
    for(var i = 0;allCard / 2 > i;i++){
        if(ol > 9){
            ol = 0;
        }
        for(var l = 0; l < 2;l++){
            cards.push(imgArr[ol]);
        }
        ol++;
    }
    cards.sort(function() {
      return Math.random() - 0.5
  });
}
var clickStep = 1;
var firstClick = null;
var secondClick = null;
var firstClickBlock = null;
var secondClickBlock = null;

field.addEventListener('click',clickCard);
function clickCard(event){
    var target = event.target || event;

    var targetBLock = target.closest('.cell');
    if(targetBLock == null) return;
    var targetId = +targetBLock.getAttribute('data-card');

    if(targetBLock.classList.contains('win')) return;

    console.log(targetId);

    targetBLock.querySelector('img').setAttribute('src',cards[targetId]);

    if(clickStep == 1){
        firstClick = targetId;
        firstClickBlock = targetBLock;
        clickStep++;
    }else{
        if(targetId == firstClick){
            clickStep = 1;
            return;   
        }
        secondClick = targetId;
        secondClickBlock = targetBLock;
        checkCArd();
        clickStep = 1;
    }
    checkWin();
};

function checkCArd(){
    if(cards[firstClick] == cards[secondClick]){
        firstClickBlock.classList.add('win');
        secondClickBlock.classList.add('win');
    }else{
        removeCard();
    }
}
function removeCard(){
    field.removeEventListener('click',clickCard);
    var first = firstClickBlock;
    var second =  secondClickBlock;
    setTimeout(function(){
       first.querySelector('img').removeAttribute('src');
       second.querySelector('img').removeAttribute('src');
       field.addEventListener('click',clickCard);
   },1000);
}
function checkWin(){
    var cell = document.querySelectorAll('.cell');
    var flag = false;
    for(var i = 0,len = cell.length; len > i;i++){

     if(cell[i].classList.contains('win')){
        flag = true;
    }
    else{
        return;
    }
}
if(flag){
    alert("win");
}
setTimeout(function(){
    location.reload();
},2000);
}
})();