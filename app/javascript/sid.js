document.addEventListener('DOMContentLoaded', () => {
  const toggleSidebarButton = document.getElementById('toggleSidebar');
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.querySelector('.main-content');
 // ボタンを取得　
  const addSubTaskButtons = document.querySelectorAll('.add-sub-task')
 // デバッグログで確認
  console.log('取得した addSubTaskButtons:', addSubTaskButtons)

  if (addSubTaskButtons.length ===0 ) {
    console.log('取得した addSubTaslButtons:', addSubTaskButtons)
  }




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

  

  addSubTaskButtons.forEach(button => {
    button.addEventListener('click', () => {
      const subTaskElement = button.closest('.sub-task');
      const newSubTask = subTaskElement.cloneNode(true);
      
      const subTaskContainer = document.querySelector('.task');
      subTaskContainer.appendChild(newSubTask);
  
      // デバッグ: クローン後の新しいサブタスク内容
      console.log('新しいサブタスクが追加されました:', newSubTask.innerHTML);
  
      // 入力フィールドをクリア
      const newTextArea = newSubTask.querySelector('.editable');
      if (newTextArea) {
        newTextArea.value = '';
      }
  
      // イベントリスナーを新しい要素に設定
      addRemoveButtonEvent(newSubTask);
      initializeTimerFeature(newSubTask); // ここでクローンに初期化
      initializeUrlFeature(newSubTask);
    });
  });
  
  
  
  const addRemoveButtonEvent = (subTask) => {
    const removeButton = subTask.querySelector('.remove-sub-task');
    if (removeButton) {
      removeButton.addEventListener('click', () => {
        subTask.remove();
      });
    }
  };

  const initializeTimerFeature = (subTask) => {
    const startTimerButton = subTask.querySelector('.start-timer-button');
    const timerDisplay = subTask.querySelector('.timer-display');
  
    if (startTimerButton && timerDisplay) {
      startTimerButton.addEventListener('click', () => {
        const timeInput = subTask.querySelector('.time-input');
        if (!timeInput) {
          alert('時間入力フィールドが見つかりません。');
          return;
        }
  
        const seconds = parseInt(timeInput.value, 10);
        if (isNaN(seconds) || seconds <= 0) {
          alert('正しい秒数を入力してください。');
          return;
        }
  
        let remainingTime = seconds;
        timerDisplay.textContent = `残り時間: ${remainingTime}秒`;
  
        const interval = setInterval(() => {
          remainingTime--;
          timerDisplay.textContent = `残り時間: ${remainingTime}秒`;
  
          if (remainingTime <= 0) {
            clearInterval(interval);
            const notificationSound = new Audio('/audio/timesind.mp3');
            notificationSound.play().catch((error) => {
              console.error('音声の再生に失敗しました:', error);
            });
  
            if (Notification.permission === 'granted') {
              new Notification('タイマー終了', {
                body: 'タイマーが終了しました!',
                icon: 'https://via.placeholder.com/128',
              });
            } else {
              alert('タイマーが終了しました!');
            }
          }
        }, 1000);
      });
    } else {
      console.error('タイマー要素が正しく取得できませんでした。');
    }
  };
  
  
  

  const initializeUrlFeature = (container) => {
    const addURLButton = container.querySelector('#redButton');

    if (addURLButton) {
      addURLButton.addEventListener('click', () => {
        const urlContainer = container.querySelector('#urlContainer');
        const newURLGroup = document.createElement('div');
        newURLGroup.classList.add('url-group');

        const label = document.createElement('label');
        label.textContent = 'リンクURL:';

        const input = document.createElement('input');
        input.setAttribute('type', 'url');
        input.classList.add('url-input');
        input.setAttribute('placeholder', 'https://example.com');

        const redirectButton = document.createElement('button');
        redirectButton.textContent = 'リンクへ移動';
        redirectButton.classList.add('redirect-button');
        redirectButton.addEventListener('click', () => {
          const url = input.value.trim();
          if (url) {
            window.open(url, '_blank');
          } else {
            alert('URLを入力してください。');
          }
        });

        const removeButton = document.createElement('button');
        removeButton.textContent = '-';
        removeButton.classList.add('remove-button');
        removeButton.addEventListener('click', () => newURLGroup.remove());

        newURLGroup.append(label, input, redirectButton, removeButton);
        urlContainer.appendChild(newURLGroup);
      });
    }
  };

  const existingSubTasks = document.querySelectorAll('.sub-task');
  existingSubTasks.forEach(subTask => {
    addRemoveButtonEvent(subTask);
    initializeTimerFeature(subTask);
    initializeUrlFeature(subTask);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const saveTaskButton = document.getElementById('saveTaskButton');
  console.log('保存ボタン取得:', saveTaskButton);
  if (!saveTaskButton) {
    console.error('保存ボタンが見つかりません。');
    return;
  }

  saveTaskButton.addEventListener('click', () => {
    const taskName = document.querySelector('.task h2').textContent.replace('タスク名: ', '').trim();
    if (taskName) {
      const savedTaskNameElement = document.getElementById('savedTaskName');
      const savedTaskNameContainer = document.querySelector('.saved-task-name');
      if (savedTaskNameElement && savedTaskNameContainer) {
        savedTaskNameElement.textContent = taskName;
        savedTaskNameContainer.classList.remove('hidden');
        console.log(`タスク名 "${taskName}" が保存されました。`);
      }
    } else {
      alert('タスク名を入力してください。');
    }
  });
});
