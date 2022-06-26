import { ItemClient } from './clients/item_client.js';

class Main {
  constructor() {
    this.itemClient = new ItemClient();
  }

  init = async () => {
    const addItemButton = document.getElementById('list-item-submit');
    addItemButton.addEventListener('click', this.handleItem);
    const deleteAllButton = document.getElementById('delete-all-button');
    deleteAllButton.addEventListener('click', this.deleteAll);

    await this.renderItems();
  };

  handleItem = async () => {
    const inputEl = document.getElementById('list-item-input');
    const inputValue = inputEl.value.trim();
    const inputArray = inputValue.split(',');

    if (!inputValue) {
      // add nice error message
      alert('A task can not be empty');
    } else {
      await this.itemClient.addTasks(inputArray);
      inputEl.value = null;
    }
  };

  deleteItem = async (id) => {
    await this.itemClient.removeItem(id);
  };

  onItemClick = (item) => {
    alert(item.innerHTML);
  };

  deleteAll = async () => {
    await this.itemClient.removeAll();
  };

  renderItems = async () => {
    const list = document.getElementById('list');
    list.innerHTML = '';
    list.style.display = 'none';
    const loader = document.querySelector('.loader-container');
    loader.style.display = 'flex';

    const items = await this.itemClient.getTasks();

    items.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.id = item.Id;
      const checkboxInput = document.createElement('input');
      checkboxInput.type = 'checkbox';
      listItem.classList.add('list-item');
      listItem.innerHTML = item.ItemName;

      const listItemDeleteButton = this._createDeleteButton(item.id);
      listItem.appendChild(checkboxInput);
      listItem.appendChild(listItemDeleteButton);
      list.appendChild(listItem);
    });

    loader.style.display = 'none';
    list.style.display = 'flex';
  };

  _createDeleteButton = (id) => {
    const button = document.createElement('img');
    button.src = './images/delete_icon.svg';
    button.classList.add('list-item-delete-button');
    button.addEventListener('click', () => this.deleteItem(id));

    return button;
  };
}

const main = new Main();

document.addEventListener('DOMContentLoaded', function () {
  main.init();
});
