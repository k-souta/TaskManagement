document.addEventListener('DOMContentLoaded', () => {
  const toggleSidebarButton = document.getElementById('toggleSidebar');
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.querySelector('.main-content');
  const taskContent = document.getElementById('taskContent');

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

  const taskLinks = document.querySelectorAll('.task-item-box .task-link');
  taskLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const taskId = event.target.getAttribute('data-id');
      const selectedTask = tasks[taskId];
      if (selectedTask) {
        const subTasks = selectedTask.sub_tasks || [];
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

  if (Notification.permission === 'default') {
    Notification.requestPermission().then(permission => {
      console.log(`Notification permission: ${permission}`);
    });
  }

  const notificationSound = new Audio("/audio/timesind.mp3");
  let timers = {};
  let elapsedTimers = {};
  let timeData = {}; // 各タスクの残り時間や経過時間を管理するオブジェクト

  document.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('start-btn')) {
      const taskId = event.target.getAttribute('data-task-id');
      const subTaskId = event.target.getAttribute('data-subtask-id');
      if (taskId !== null && subTaskId !== null) {
        toggleTaskTimer(taskId, subTaskId, event.target);
      }
    }

    if (event.target && event.target.classList.contains('complete-btn')) {
      const taskId = event.target.getAttribute('data-task-id');
      const subTaskId = event.target.getAttribute('data-subtask-id');
      if (taskId !== null && subTaskId !== null) {
        completeTask(taskId, subTaskId);
      }
    }
  });

  function toggleTaskTimer(taskId, subTaskId, button) {
    const key = `${taskId}-${subTaskId}`;
    const subTask = tasks[taskId].sub_tasks[subTaskId];

    if (!timeData[key]) {
      // 初回のみ残り時間を設定
      timeData[key] = {
        secondsLeft: subTask.hours * 3600 + subTask.minutes * 60 + subTask.seconds,
        elapsedTime: 0
      };
    }

    if (button.textContent === "タスク開始") {
      button.textContent = "一時停止";
      startTask(taskId, subTaskId, key);
    } else {
      button.textContent = "タスク開始";
      pauseTask(key);
    }
  }

  function startTask(taskId, subTaskId, key) {
    if (timers[key]) clearInterval(timers[key]);
    if (elapsedTimers[key]) clearInterval(elapsedTimers[key]);

    timers[key] = setInterval(() => {
      if (timeData[key].secondsLeft <= 0) {
        clearInterval(timers[key]);
        timers[key] = null;

        if (Notification.permission === "granted") {
          const notification = new Notification("タイマー終了", {
            body: "タイマーが終了しました！",
            icon: "https://via.placeholder.com/128"
          });
          notificationSound.play().catch(console.error);
        } else {
          alert("タイマーが終了しました！");
          notificationSound.play().catch(console.error);
        }
      } else {
        timeData[key].secondsLeft--;
      }
    }, 1000);

    elapsedTimers[key] = setInterval(() => {
      timeData[key].elapsedTime++;
      const hours = Math.floor(timeData[key].elapsedTime / 3600);
      const minutes = Math.floor((timeData[key].elapsedTime % 3600) / 60);
      const seconds = timeData[key].elapsedTime % 60;
      document.getElementById(`elapsed-time-${taskId}-${subTaskId}`).textContent = `${hours}時間 ${minutes}分 ${seconds}秒`;
    }, 1000);
  }

  function pauseTask(key) {
    if (timers[key]) {
      clearInterval(timers[key]);
      timers[key] = null;
    }
    if (elapsedTimers[key]) {
      clearInterval(elapsedTimers[key]);
      elapsedTimers[key] = null;
    }
  }

  function completeTask(taskId, subTaskId) {
    const key = `${taskId}-${subTaskId}`;
    pauseTask(key);

    const elapsedTimeElement = document.getElementById(`elapsed-time-${taskId}-${subTaskId}`);
    if (elapsedTimeElement) {
      const elapsedTime = elapsedTimeElement.textContent;
      alert(`タスク ${taskId + 1} - 小タスク ${subTaskId + 1} が完了しました！経過時間: ${elapsedTime}`);
    }
  }
});



document.querySelectorAll('.task-link').forEach(link => {
  link.addEventListener('click', function () {
    const taskContent = document.getElementById('taskContent');
    taskContent.scrollTop = 0; // スクロール位置を最上部にリセット
  });
});

