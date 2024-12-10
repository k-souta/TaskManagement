let isRedirectListenerAdded = false;

document.addEventListener('DOMContentLoaded', () => {
  const redirectToURLButton = document.getElementById("redirectToURLButton");
  const addURLButton = document.getElementById("redButton");


  // 既にイベントリスナーが追加されていないかをチェックする
  if (redirectToURLButton && !redirectToURLButton.hasAttribute('data-listener')) {
    redirectToURLButton.addEventListener("click", handleRedirect);
    redirectToURLButton.setAttribute('data-listener', 'true'); // 既にリスナーが追加されたことを示す
  }

  // 追加ボタンのイベントリスナー
  if (addURLButton) {
    addURLButton.addEventListener("click", addNewURLInput);
  }

  // 初期のリダイレクトボタンにリスナーを追加
  initializeRedirectAndRemoveButtons();
});

// URLを新しいタブで開く関数
function handleRedirect(event) {
  // クリックされたボタンと同じ　.url-group 内の入力を取得
  const input = event.target.closest('.url-group').querySelector('.url-input')
    const url = input.value.trim(); //　入力値を取得してトリム
  if (url) {
    // URLを新しいタブで開く
    window.open(url, "_blank");
  } else {
    alert("URLを入力してください。"); // URLがからの場合の警告
  }
}

// URL入力フィールドを削除する関数
function handleRemove(event) {
  const urlGroup = event.target.closest('.url-group');
  if (urlGroup) {
    urlGroup.remove();
  }
}

// 新しいURL入力フィールドを追加する関数
function addNewURLInput() {
  const urlContainer = document.getElementById("urlContainer");
  const newURLGroup = document.createElement("div");
  newURLGroup.classList.add("url-group");

  // ラベル作成
  const label = document.createElement("label");
  label.textContent = "リンクURL:";
 
  // URL入力欄作成
  const input = document.createElement("input");
  input.setAttribute("type", "url");
  input.classList.add("url-input");
  input.setAttribute("placeholder", "https://example.com");
 
  //　[リンクへ移動]ボタンを作成
  const redirectButton = document.createElement("button");
  redirectButton.textContent = "リンクへ移動";
  redirectButton.classList.add("redirect-button");
  redirectButton.addEventListener("click", handleRedirect);
 
  // [削除]ボタン作成
  const removeButton = document.createElement("button");
  removeButton.textContent = "-"
  removeButton.classList.add("remove-button");
  removeButton.addEventListener("click", handleRemove);

  // 新しいURL入力フィールドを追加
  newURLGroup.appendChild(label);
  newURLGroup.appendChild(input);
  newURLGroup.appendChild(redirectButton);
  newURLGroup.appendChild(removeButton)

  //URLコンテナに追加
  urlContainer.appendChild(newURLGroup)
}

// すべてのリダイレクトボタンにリスナーを追加
function initializeRedirectAndRemoveButtons(){
  const redirectButtons = document.querySelectorAll(".redirect-button");
  redirectButtons.forEach(button => {
    if (!button.hasAttribute('data-listener')) {
      button.addEventListener("click", handleRedirect);
      button.setAttribute('data-listener', 'true'); // 重複リスナーを防ぐ
    }
  })

  const removeButtons = document.querySelectorAll(".remove-button");
  removeButtons.forEach(button => {
    if (!button.hasAttribute('data-listener')) {
      button.addEventListener("click", handleRemove);
      button.setAttribute('data-listener', 'true');
    }
  })
}