document.addEventListener('DOMContentLoaded', () => {
  // 通知権限をリクエスト
  if (Notification.permission === 'default') {
    Notification.requestPermission().then(permission => {
      console.log(`Notification permission: ${permission}`);
    });
  }

  const startTimerButton = document.getElementById("startTimerButton");
  const timerDisplay = document.getElementById("timerDisplay");

  // 音声ファイルを準備
  const notificationSound = new Audio("/audio/timesind.mp3");

  startTimerButton.addEventListener("click", () => {
    const timeInput = document.getElementById("time").value;
    const seconds = parseInt(timeInput, 10);

    if (isNaN(seconds) || seconds <= 0) {
      alert("正しい秒数を入力してください。");
      return;
    }

    let remainingTime = seconds;
    timerDisplay.textContent = `残り時間: ${remainingTime}秒`;

    const interval = setInterval(() => {
      remainingTime--;
      timerDisplay.textContent = `残り時間: ${remainingTime}秒`;

      if (remainingTime <= 0) {
        clearInterval(interval);

        // 通知の作成
        if (Notification.permission === "granted") {
          const notification = new Notification("タイマー終了", {
            body: "タイマーが終了しました！",
            icon: "https://via.placeholder.com/128"
          });

          // 音声再生
          notificationSound.play().catch((error) => {
            console.log("音声の再生に失敗しました:", error);
          });
        } else {
          alert("通知の権限がありません。ブラウザ設定を確認してください。");

          // 音声再生（通知権限がない場合でも音を鳴らす）
          notificationSound.play().catch((error) => {
            console.log("音声の再生に失敗しました:", error);
          });
        }
      }
    }, 1000);
  });
});
