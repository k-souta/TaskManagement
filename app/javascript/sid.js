document.addEventListener('DOMContentLoaded', () => {
  const toggleSidebarButton = document.getElementById('toggleSidebar');
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.querySelector('.main-content');
  const taskContent = document.getElementById('taskContent');

  // サイドバーのトグル
  if (toggleSidebarButton) {
    toggleSidebarButton.addEventListener('click', () => {
      if (sidebar.classList.contains('visible')) {
        sidebar.classList.remove('visible');
        sidebar.classList.add('hidden');
        mainContent.style.marginLeft = '0';
        toggleSidebarButton.style.left = '0';
      } else {
        sidebar.classList.remove('hidden');
        sidebar.classList.add('visible');
        mainContent.style.marginLeft = '250px';
        toggleSidebarButton.style.left = '250px';
      }
    });
  }

  // サイドバー内のタスク名リンクをクリックした際の処理
  const taskLinks = document.querySelectorAll('.task-item-box .task-link');
  taskLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault(); // ページ遷移を防止

      const taskId = event.target.getAttribute('data-id');
      const selectedTask = tasks[taskId];

      if (selectedTask) {
        // sub_tasksがundefinedの場合は空配列を代入
        const subTasks = selectedTask.sub_tasks || [];

        // タスク内容を表示
        taskContent.innerHTML = `
          <h2>${selectedTask.project_name}</h2>
          <div>
            ${subTasks.length > 0 ? subTasks.map((subTask, index) => `
              <div class="sub-task">
                <p>小タスク ${index + 1}: ${subTask.name || '未設定'}</p>
                <p>詳細: ${subTask.detail || '未設定'}</p>
                <p>タイマー: <span class="timer" id="timer-${taskId}-${index}">${subTask.hours || 0}時間 ${subTask.minutes || 0}分 ${subTask.seconds || 0}秒</span></p>
                <p>経過時間: <span class="elapsed-time" id="elapsed-time-${taskId}-${index}">0時間 0分 0秒</span></p>
                ${subTask.url ? `<p><a href="${subTask.url}" target="_blank">リンクはこちら</a></p>` : ''}
                <button class="start-btn" data-task-id="${taskId}" data-subtask-id="${index}">タスク開始</button>
                <button class="complete-btn" data-task-id="${taskId}" data-subtask-id="${index}">タスク完了</button>
              </div>
            `).join('') : '<p>小タスクはありません。</p>'}
          </div>
        `;
      } else {
        taskContent.innerHTML = '<p>タスクが見つかりませんでした。</p>';
      }
    });
  });

  // 通知権限をリクエスト
  if (Notification.permission === 'default') {
    Notification.requestPermission().then(permission => {
      console.log(`Notification permission: ${permission}`);
    });
  }

  // 音声ファイルを準備
  const notificationSound = new Audio("/audio/timesind.mp3");

  // サイドバー内のタスク開始ボタンの処理
  let timers = {};
  let elapsedTimes = {};  // 経過時間を保持するオブジェクト

  // タスク開始ボタンのクリックイベント
  document.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('start-btn')) {
      const taskId = event.target.getAttribute('data-task-id');
      const subTaskId = event.target.getAttribute('data-subtask-id');

      // taskId や subTaskId が undefined でないことを確認してから startTask を呼び出す
      if (taskId !== null && subTaskId !== null) {
        startTask(taskId, subTaskId);
      } else {
        console.error('taskId または subTaskId が取得できませんでした');
      }
    }

    // タスク完了ボタンの処理
    if (event.target && event.target.classList.contains('complete-btn')) {
      const taskId = event.target.getAttribute('data-task-id');
      const subTaskId = event.target.getAttribute('data-subtask-id');

      // 経過時間の停止
      if (taskId !== null && subTaskId !== null) {
        completeTask(taskId, subTaskId);
      }
    }
  });

  // タスク開始処理
  function startTask(taskId, subTaskId) {
    if (taskId === undefined || subTaskId === undefined) {
      console.error('taskId または subTaskId が未定義です');
      return;
    }
    
    const subTask = tasks[taskId].sub_tasks[subTaskId];
    const key = `${taskId}-${subTaskId}`;

    // もしタイマーが既に動いていれば、それを停止
    if (timers[key]) {
      clearInterval(timers[key]);
      timers[key] = null;
    } else {
      let secondsLeft = subTask.hours * 3600 + subTask.minutes * 60 + subTask.seconds;
      let elapsedTime = 0;  // 経過時間を保持

      // タイマー開始
      timers[key] = setInterval(() => {
        if (secondsLeft <= 0) {
          // タイマーが終了しても経過時間は止まらない
          clearInterval(timers[key]);
          timers[key] = null;

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
        } else {
          secondsLeft--;
        }

        // 経過時間を更新する処理を常に実行
        elapsedTime++;
        const elapsedHours = Math.floor(elapsedTime / 3600);
        const elapsedMinutes = Math.floor((elapsedTime % 3600) / 60);
        const elapsedSeconds = elapsedTime % 60;

        document.getElementById(`elapsed-time-${taskId}-${subTaskId}`).textContent = `${elapsedHours}時間 ${elapsedMinutes}分 ${elapsedSeconds}秒`;

      }, 1000);
    }
  }

  // タスク完了処理
  function completeTask(taskId, subTaskId) {
    const key = `${taskId}-${subTaskId}`;

    // タイマー停止
    if (timers[key]) {
      clearInterval(timers[key]);
      timers[key] = null;
    }

    // 経過時間の最終表示を更新
    const elapsedTimeElement = document.getElementById(`elapsed-time-${taskId}-${subTaskId}`);
    if (elapsedTimeElement) {
      const elapsedTime = elapsedTimeElement.textContent;
      alert(`タスク${taskId + 1} - 小タスク${subTaskId + 1} が完了しました！経過時間: ${elapsedTime}`);
    }
  }
})

document.querySelectorAll('.task-link').forEach(link => {
  link.addEventListener('click', function () {
    const taskContent = document.getElementById('taskContent');
    taskContent.scrollTop = 0; // スクロール位置を最上部にリセット
  });
});

