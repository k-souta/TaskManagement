document.addEventListener('DOMContentLoaded', () => {
  // 通知権限をリクエスト
  if (Notification.permission === 'default') {
    Notification.requestPermission().then(permission => {
      console.log(`Notification permission: ${permission}`);
    });
  }

  // 全てのタイマー開始ボタンに対してイベントリスナーを設定
  const startTimerButtons = document.querySelectorAll("[id^='startTimerButton']");
  const timerDisplays = document.querySelectorAll("[id^='timerDisplay']");

  // 音声ファイルを準備
  const notificationSound = new Audio("/audio/timesind.mp3");

  startTimerButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const hoursInput = document.getElementById(`hours_${index}`).value;
      const minutesInput = document.getElementById(`minutes_${index}`).value;
      const secondsInput = document.getElementById(`seconds_${index}`).value;

      // 入力された時間、分、秒を数値として取得
      const hours = parseInt(hoursInput, 10) || 0;
      const minutes = parseInt(minutesInput, 10) || 0;
      const seconds = parseInt(secondsInput, 10) || 0;

      // 合計秒数を計算
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;

      if (totalSeconds <= 0) {
        alert("正しい時間、分、秒を入力してください。");
        return;
      }

      let remainingTime = totalSeconds;
      timerDisplays[index].textContent = `残り時間: ${remainingTime}秒`;

      const interval = setInterval(() => {
        remainingTime--;
        timerDisplays[index].textContent = `残り時間: ${remainingTime}秒`;

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
});
