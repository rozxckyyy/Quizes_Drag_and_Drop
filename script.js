// dran&drop 1
const anwserArr = ['some1', 'some2', 'some3', 'some4'];

const list = document.getElementById('list');
let storeItems = [];
let listItems = [];
let dragStartIndex;

init();

function init() {
    localStorage.getItem('data1') ? loadList() : createList()
}

function createList() {
    anwserArr.forEach((item, index) => {
        const listItem = document.createElement('li');

        listItem.setAttribute('id', index);

        listItem.innerHTML = `
    <span class="number">${index + 1}</span>
    <div class="item" draggable="true">${item}</div>
  `;
        listItems.push(listItem);
        list.appendChild(listItem);
    });

    for (i of listItems) {
        storeItems.push(i.children[1].innerText);
    }
    localStorage.setItem('data1', JSON.stringify(storeItems));

    addEventListeners();
}

function loadList() {
    fromStore()
    storeItems.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.setAttribute('id', index);
        listItem.innerHTML = `
    <span class="number">${index + 1}</span>
    <div class="item" draggable="true">${item}</div>
  `;
        listItems.push(listItem);
        list.appendChild(listItem);
    });
    addEventListeners()
}

function toStore() {
    localStorage.setItem('data1', JSON.stringify(storeItems));
}

function fromStore() {
    storeItems = JSON.parse(localStorage.getItem('data1'));
    console.log(storeItems)
}

function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('id');
}

function dragEnter() {
    this.classList.add('over');
}

function dragLeave() {
    this.classList.remove('over');
}

function dragOver(e) {
    e.preventDefault();
}

function dragDrop() {
    const dragEndIndex = +this.getAttribute('id');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
}

function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.item');
    const itemTwo = listItems[toIndex].querySelector('.item');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);

    storeItems = []
    for (i of listItems) {
        
        storeItems.push(i.children[1].innerText);
    }
    localStorage.setItem('data1', JSON.stringify(storeItems));
}

function checkAnwser() {
    listItems.forEach((item, index) => {
        const itemName = item.querySelector('.item').innerText.trim();

        if (itemName !== anwserArr[index]) {
            console.log('err');
        } else {
            console.log('done');
        }
    });
}

function addEventListeners() {
    const draggables = document.querySelectorAll('.item');
    const dragListItems = document.querySelectorAll('.list li');

    draggables.forEach((draggable) => {
        draggable.addEventListener('dragstart', dragStart);
    });

    dragListItems.forEach((item) => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });
}