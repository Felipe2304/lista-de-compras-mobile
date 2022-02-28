let listProduct = [];

const createItem = (product, price, quantity, balance, completed = false) => {
  listProduct.push({
    product: product,
    price: price,
    quantity: quantity,
    balance: balance,
    completed: completed,
  });

  return listProduct;
};

const readList = () => {
  return listProduct;
};

const deleteItem = (position) => {
  const newList = listProduct.filter((item, index) => index !== position);
  listProduct = newList;
};

const toggleCompleted = (position) => {
  const newList = listProduct.map((item, index) => {
    if (position === index) {
      return {
        product: item.product,
        price: item.price,
        quantity: item.quantity,
        completed: item.completed ? false : true,
      };
    }
    return item;
  });

  listProduct = newList;
};

const createElement = (tag, className) => {
  const $element = document.createElement(tag);
  $element.classList.add(className);

  return $element;
};

const RegisterProduct = () => {
  const $registerWrapper = createElement("div", "wrapper-register");
  const $boxDeposit = createElement("div", "box-deposit");

  const $inputDeposit = createElement("input", "input-deposit");
  $inputDeposit.setAttribute("type", "number");
  $inputDeposit.setAttribute("placeholder", "R$ Depositar");

  const $inputProduct = createElement("input", "input-product");
  $inputProduct.setAttribute("placeholder", "Digite o nome do produto");

  const $inputPrice = createElement("input", "input-price");
  $inputPrice.setAttribute("placeholder", "R$ 00.00");
  $inputPrice.setAttribute("type", "number");

  const $inputQuantity = createElement("input", "input-quantity");
  $inputQuantity.setAttribute("placeholder", "Quantidade");
  $inputQuantity.setAttribute("type", "number");

  const $button = createElement("button", "register-button");
  $button.textContent = "Adicionar item na lista ";

  const $infoText = createElement("span", "info-text");

  const getValueInputs = () => {
    if (
      checkTextFields(
        $inputProduct.value,
        $inputPrice.value,
        $inputQuantity.value,
        $inputDeposit.value
      )
    ) {
      createItem(
        $inputProduct.value,
        $inputPrice.value,
        $inputQuantity.value,
        $inputDeposit.value
      );
      showOnScreen(readList());
      $inputProduct.value = "";
      $inputPrice.value = "";
      $inputQuantity.value = "";
      $inputDeposit.value = "";
      $inputProduct.focus();
      $infoText.textContent = "Produto adicionado na lista";
      $infoText.style.color = "#39FF00";
      removeInfoText($infoText);
      printCurrentBalance();
    } else {
      $infoText.textContent = "Dados inválidos";
      $infoText.style.color = " red";
      removeInfoText($infoText);
    }
  };

  $button.addEventListener("click", getValueInputs);

  $boxDeposit.appendChild($inputDeposit);
  $registerWrapper.appendChild($boxDeposit);
  $registerWrapper.appendChild($inputPrice);
  $registerWrapper.appendChild($inputProduct);
  $registerWrapper.appendChild($inputQuantity);
  $registerWrapper.appendChild($button);
  $registerWrapper.appendChild($infoText);

  return $registerWrapper;
};

const printCurrentBalance = () => {
  const totalBalance = readList().reduce((acc, saldo) => {
    acc += saldo.balance - saldo.price * saldo.quantity;
    return acc;
  }, 0);

  $valueText.innerHTML = `Saldo atual : <strong>${totalBalance} <strong/>`;
};

const removeInfoText = ($infoText) => {
  setTimeout(() => {
    $infoText.textContent = "";
  }, 2500);
};

const checkTextFields = ($inputProduct, $inputPrice, $inputQuantity) => {
  if (
    $inputProduct.length > 0 &&
    $inputPrice.length > 0 &&
    $inputQuantity.length > 0
  ) {
    return true;
  } else {
    return false;
  }
};

const ItemProducts = (item, index) => {
  const $productItem = createElement("li", "product-item");
  const $checked = createElement("div", "checked-product");
  const $checkedChildren = createElement("div", "checked-children");

  const $productItemText = createElement("div", "product-item-text");
  $productItemText.textContent = `${item.product}`;

  const $quantityText = createElement("span", "quantity-text");
  $quantityText.textContent = ` x ${item.quantity}`;

  const $delete = createElement("img", "delete-icon");
  $delete.setAttribute("src", "./src/img/lixeira.png");

  const checkedProduct = () => {
    toggleCompleted(index);
    showOnScreen(readList());
  };

  const deleteProduct = () => {
    deleteItem(index);
    showOnScreen(readList());
    printCurrentBalance();
  };

  $checked.addEventListener("click", checkedProduct);
  $delete.addEventListener("click", deleteProduct);

  $productItem.appendChild($checked);
  $productItem.appendChild($productItemText);
  $productItemText.appendChild($quantityText);
  $productItem.appendChild($delete);

  if (item.completed) {
    $checked.appendChild($checkedChildren);
    $productItem.style.color = "red";
    $quantityText.style.color = "red";
  }

  return $productItem;
};

const FilterSearch = () => {
  const $searchWrapper = createElement("div", "search-wrapper");
  const $search = createElement("input", "filter-search");
  $search.setAttribute("placeholder", "buscar produto");
  const $iconSearch = createElement("img", "icon-search");
  $iconSearch.setAttribute("src", "./src/img/lupa.png");

  const filterItens = () => {
    const filteredItens = readList().filter((item) => {
      return item.product.includes($search.value);
    });

    showOnScreen(filteredItens);
  };

  $search.addEventListener("input", filterItens);

  $searchWrapper.appendChild($iconSearch);
  $searchWrapper.appendChild($search);

  return $searchWrapper;
};

const showOnScreen = (listProduct) => {
  $listProducts.innerHTML = "";
  listProduct.forEach((item, index) => {
    const $item = ItemProducts(item, index);
    $listProducts.appendChild($item);
  });
};

const $root = document.querySelector("#root");
const $container = createElement("section", "main-container");
const $header = createElement("header", "header");
const $valueText = createElement("span", "value-text");
$valueText.textContent = "Saldo atual : ";

const $titleRegister = createElement("h2", "title-register");
$titleRegister.textContent = "Lista de compras ";

const $registerProduct = RegisterProduct();
const $content = createElement("section", "content");
const $listProducts = createElement("ul", "list-products");
const $filterSearch = FilterSearch();
const $searchContainer = createElement("div", "search-container");
const $textList = createElement("span", "text-list");
$textList.textContent = "Produtos";

$container.appendChild($header);
$header.appendChild($valueText);
$container.appendChild($titleRegister);
$container.appendChild($registerProduct);
$content.appendChild($searchContainer);
$searchContainer.appendChild($textList);
$searchContainer.appendChild($filterSearch);
$content.appendChild($listProducts);
$container.appendChild($content);
$root.appendChild($container);
