/* ↓ 口座番号の取り扱いのためのヒント */
let accountId = 1;

$(function() {
	// メニューを押すとそれぞれのコンテンツを表示
	$(".menuItem").on("click", function() {
		switchingShowContent(this);
	});

	$("#accountOpning").on("click", function() {
		$("#accountOpningErea").addClass("none");
		$("#accountMenu").removeClass("none");

		/*		ここからは新しくID番号を降って新規口座開設する
				開設後、残高証明などはHTMLにaccountIdを選べるinputを設けて
				選択された番号をaccountId.textContent =にして表示させれるように
				設定する。
				今回はなしにして、ID＝1のみ表示・操作するようにする

				const data = {
					"id":accountId,
					"amount":parseInt(0)
				}
				let xhr2 = new XMLHttpRequest();
				xhr2.open("POST","/bankTrading/open");
				xhr2.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

				xhr2.onload = function() {
					  if (xhr2.status === 200) {
					    console.log(xhr2.responseText);
					    console.log(xhr2.response.id);
					  } else {
					    console.error(xhr2.statusText);
					  }
					};
				// エラーが発生したときの処理
				xhr.onerror = function() {
				  console.error("An error occurred.");
				};
				 // リクエストを送信
				  xhr2.send(JSON.stringify(data));
		 */
	});
});

// メニューを選択した時の画面表示の切り替え
// 引数はクリックされたDOM自身が入ってくるのを想定しておく
function switchingShowContent(targetElement) {
	classInit();
	// id名を自身から取得して、removeClassする対象を決定する
	var idName = $(targetElement).attr("id");
	$("#" + idName + "Erea").removeClass("none");
}

// classがあるので、それを利用して一括でcss反映
function classInit() {
	$(".content").addClass("none");
}

//① 「新規口座開設を押すと残高紹介画面に移す」が動くようにする----------------------
	//GETリクエストを送信し、レスポンスを受け取る
	let xhr = new XMLHttpRequest;//①変数
	let check = document.getElementById("checkBalance");//①変数
	let inputBtn = document.getElementById("inputBtn");//②変数
	let outputBtn = document.getElementById("outputBtn");//③変数
	xhr.open("Get", "/bankTrading/" + accountId);
	xhr.responseType="json";
	xhr.onload = function() {

		 //-----jqueryだと
		//$.get(url, function(data) {
		//// レスポンスデータから現在の残高を取得
		//var zandaka = data.amount;
		//// 残高を表示する
		//zandakaElement.text(zandaka);
		//});
		let id = parseInt(xhr.response.id);
		let zandaka = parseInt(xhr.response.amount);
		console.log("id=" + accountId);
		console.log("zandaka=" + zandaka)
		let zandakaElement = document.getElementById("zandaka");
		zandakaElement.textContent = zandaka;

		check.addEventListener("click", function(){
			zandakaElement.textContent = parseInt(xhr.response.amount);
		});

//② 「残高照会」が動くようにする----------------------
		check.addEventListener("click", function(){
			let xhr2 = new XMLHttpRequest;
			xhr2.open("GET", "/bankTrading/" + accountId);
			xhr2.responseType="json";
			xhr2.onload = function() {
				let zandaka = parseInt(xhr2.response.amount);
				console.log("zandaka=" + zandaka)
				let zandakaElement = document.getElementById("zandaka");
				zandakaElement.textContent = zandaka;
			}
			xhr2.send();
		});

//③ 「預け入れ」が動くようにする---------------------
		//預け入れボタン押すとイベントリスナー
		inputBtn.addEventListener("click", function(){
			//入力された数値を受け取り
			let inputPrice = parseInt(document.getElementById("inputPrice").value);
			//zandakaに反映

			zandaka = 0;
			zandaka += inputPrice;
			if(zandaka < 0){
				zandaka = 0;
			}
			zandakaElement.textContent = zandaka;

			//ここからはpost設定し、sqlまで操作
			const data = {
					"id":accountId,
					"amount":parseInt(zandaka)
				}
			let xhr3 = new XMLHttpRequest;
			xhr3.open("POST", "/bankTrading/deposit/" + accountId);
			xhr3.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

			xhr3.onload = function() {
			 if (xhr3.status === 200) {
			    console.log(xhr3.responseText);
			  } else {
			    console.error(xhr3.statusText);
			  }
			};

			// エラーが発生したときの処理
			xhr3.onerror = function() {
			  console.error("An error occurred.");
			};
			 // リクエストを送信
			  xhr3.send(JSON.stringify(data));
		});
//④  「引き出し」が動くようにする---------------------
		outputBtn.addEventListener("click",function(){
			//入力された数値を受け取り
			let outputPrice = parseInt(document.getElementById("outputPrice").value);
			//zandakaに反映

			zandaka = 0;
			zandaka -= outputPrice;
			if(zandaka > 0){
				zandaka = 0;
			}
			zandakaElement.textContent = zandaka;

			//ここからはpost設定し、sqlまで操作
			const data = {
					"id":accountId,
					"amount":parseInt(zandaka)
				}
			let xhr4 = new XMLHttpRequest;
			xhr4.open("POST", "/bankTrading/deposit/" + accountId);
			xhr4.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

			xhr4.onload = function() {
			 if (xhr4.status === 200) {
			    console.log(xhr4.responseText);
			  } else {
			    console.error(xhr4.statusText);
			  }
			};

			// エラーが発生したときの処理
			xhr4.onerror = function() {
			  console.error("An error occurred.");
			};
			 // リクエストを送信
			  xhr4.send(JSON.stringify(data));
		});
}
xhr.send();

