//FUNÇAO PARA PAG1 "/"


document.addEventListener("DOMContentLoaded", function() {
  if (window.location.pathname === "/") {
     function updateServoProgress() {
       setInterval(function() {
         var xhr = new XMLHttpRequest();
         xhr.open("GET", "/servos-endpoint", true);
         xhr.onload = function () {
           if (this.status >= 200 && this.status < 300) {
             var response = JSON.parse(this.responseText);
             var progressBars = document.querySelectorAll('[role="progressbar"]');
 
             progressBars.forEach(function(bar, index) {
               var servoKey = "servo" + (index + 1);
               var servoValue = response[servoKey];
               if (servoValue !== undefined) {
                 var value = (servoValue / 180) * 100; 
                 bar.style.setProperty('--value', value);
                 bar.style.setProperty('--deg', servoValue);
               }
             });
           } else {
             console.error('Falha na requisição com status:', this.status);
           }
         };
         xhr.onerror = function () {
           console.error('Falha na requisição');
         };
         xhr.send();
       }, 200);
     }
 
     updateServoProgress();
  }
 });
 



// Função para desabilitar todos os botões
function disableAllButtons() {
  document.querySelectorAll('.moveButton').forEach(function(button) {
    button.disabled = true;
  });
}

// Função para habilitar todos os botões
function enableAllButtons() {
  document.querySelectorAll('.moveButton').forEach(function(button) {
    button.disabled = false;
  });
}

// Adiciona o evento de clique a todos os botões
document.querySelectorAll('.moveButton').forEach(function(button) {
  button.addEventListener('click', function() {
    var positionNumber = this.getAttribute('data-position-number');
    disableAllButtons(); // Desabilita todos os botões quando um é clicado

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/move_to_position", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        enableAllButtons(); // Habilita todos os botões novamente quando a requisição é concluída
        resetSliders();
      }
    };
    xhr.send("positionNumber=" + positionNumber);
  });
});



//////////////////////////////////////////////////////
//////////////////////////////////////////////////////


//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

//FUNÇAO MODO MANUAL

// Função para lidar com a ativação do modo manual
function handleManualMode(checkboxElem) {
  if (checkboxElem.checked) {

    // Faz uma requisição para obter os graus atuais dos servos
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/servos-endpoint", true);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        var response = JSON.parse(this.responseText);
        // Atualiza os sliders e os valores exibidos com os valores atuais dos servos
        for (var i = 1; i <= 5; i++) {
          var servoSlider = document.getElementById('servo' + i);
          var servoValueElement = document.getElementById('servo' + i + 'Value');
          var servoValue = response['servo' + i];
          servoSlider.value = servoValue;
          servoValueElement.innerText = servoValue; // Atualiza o texto do elemento
        }
      } else {
        console.error('Falha na requisição com status:', this.status);
      }
    };
    xhr.onerror = function () {
      console.error('Falha na requisição');
    };
    xhr.send();
  } 
}



// Função para mover o servo correspondente ao slider
function moveServo(servoId, position) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/move_servo", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("servo=" + servoId + "&position=" + position);
}

// Adiciona o evento de input a todos os sliders
document.querySelectorAll('.custom-slider').forEach(function(slider) {
  slider.addEventListener('input', function() {
    if (document.getElementById('checkbox').checked) {
      var servoId = this.id.replace('servo', ''); // Extrai o número do ID do slider
      var position = this.value;
      moveServo(servoId, position);
    }
  });
});


// Função para atualizar os sliders com os graus atuais dos servos quando o botão Reset é clicado
function resetSliders() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/servos-endpoint", true);
  xhr.onload = function () {
    if (this.status >= 200 && this.status < 300) {
      var response = JSON.parse(this.responseText);
      for (var i = 1; i <= 5; i++) {
        var servoSlider = document.getElementById('servo' + i);
        var servoValueElement = document.getElementById('servo' + i + 'Value');
        var servoValue = response['servo' + i];
        servoSlider.value = servoValue;
        servoValueElement.innerText = servoValue; // Atualiza o texto do elemento
      }
    } else {
      console.error('Falha na requisição com status:', this.status);
    }
  };
  xhr.onerror = function () {
    console.error('Falha na requisição');
  };
  xhr.send();
}






//////////////////////////////////////////////////////
//////////////////////////////////////////////////////


//////////////////////////////////////////////////////
//////////////////////////////////////////////////////





//FUNÇAO PARA MOSTRAR OS PERFIS SALVOS NO SELECT PAGE3
function loadProfiles() {
  fetch('/profiles.json')
    .then(response => response.json())
    .then(data => {
      // Busca o seletor de perfis pela classe em vez do ID
      const profileSelector = document.querySelector('.profileselect');
      const noProfilesMessage = document.getElementById('noProfilesMessage');

      // Verifica se o objeto de perfis não está vazio
      if (Object.keys(data).length === 0) {
        noProfilesMessage.style.display = 'block'; // Mostra a mensagem de "Nenhum perfil salvo"
      } else {
        noProfilesMessage.style.display = 'none'; // Oculta a mensagem
        // Adiciona cada perfil como uma opção no seletor
        for (const profileKey in data) {
          const profile = data[profileKey];
          const option = document.createElement('option');
          option.value = profileKey;
          option.textContent = profile.name; // Usa a propriedade 'name' para o texto da opção
          profileSelector.appendChild(option);
        }
      }
    })
    .catch(error => {
      console.error('Error loading profiles:', error);
      noProfilesMessage.style.display = 'block'; // Mostra a mensagem de erro
    });
}

// Chama a função loadProfiles quando a janela for carregada
window.addEventListener('load', loadProfiles);




//FUNÇAO PARA SALVAR O PERFIL CRIADO
 //--Save profile on prrofile.json by rote to/save_profile on esp32
document.getElementById('saveProfile').addEventListener('click', function() {
  const profileName = document.getElementById('profileName').value; // Pega o nome do perfil do input
  const movementsArray = [];
  const movementContainers = document.querySelectorAll('.container-c');

  movementContainers.forEach(container => {
    const motorSelector = container.querySelector('.motorSelector');
    const angleInput = container.querySelector('input.angle-input');
    const gripperSelect = container.querySelector('.gripper-action select');

    const movement = {
      motor: motorSelector.value,
      attribute: gripperSelect ? gripperSelect.value : angleInput.value
    };

    movementsArray.push(movement);
  });

  // Cria um objeto que contém o nome do perfil e os movimentos
  const profileData = {
    name: profileName,
    movements: movementsArray
  };

  // Aqui você pode fazer algo com o objeto de dados do perfil, como enviá-lo para o servidor
  console.log(profileData); // Para fins de depuração, imprime o objeto no console

  // Substitua 'URL_DO_SERVIDOR' pelo endpoint correto no seu servidor ESP32
  fetch('/save_profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(profileData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Profile saved successfully!');
      // Recarrega a página após o salvamento bem-sucedido
      location.reload();
    } else {
      alert('Failed to save profile.');
    }
  })
  .catch(error => {
    console.error('Error saving profile:', error);
    alert('Error saving profile.');
  });
});




//FUNÇAO DENTRO DO CONTAINER DE CADA OPÇAO DE PERFIL, MUDA PARA ADEQUARR AO GRIPPER
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('movementsContainer').addEventListener('change', function(event) {
    if (event.target.classList.contains('motorSelector')) {
      const container = event.target.closest('.container-c');
      const servoId = event.target.value;
      const angleInput = container.querySelector('input.angle-input');
      const gripperSelectDiv = container.querySelector('.selectdiv.gripper-action');

      // Se o Gripper for selecionado e o select de OPEN/CLOSE não existir, crie-o
      if (servoId === 'servo6' && !gripperSelectDiv) {
        const selectDiv = document.createElement('div');
        selectDiv.classList.add('selectdiv', 'gripper-action');

        const selectGripper = document.createElement('select');
        selectGripper.innerHTML = `
          <option value="60">OPEN</option>
          <option value="10">CLOSE</option>
        `;
        selectDiv.appendChild(selectGripper);

        // Substitui o input de número pelo select de OPEN/CLOSE
        if (angleInput) {
          container.replaceChild(selectDiv, angleInput);
        } else {
          container.appendChild(selectDiv);
        }
      } else if (servoId !== 'servo6' && gripperSelectDiv) {
        // Se outro motor for selecionado e o select de OPEN/CLOSE existir, remova-o e crie o input de número
        const inputNumber = document.createElement('input');
        inputNumber.type = 'number';
        inputNumber.min = '0';
        inputNumber.max = '180';
        inputNumber.placeholder = '0-180';
        inputNumber.classList.add('angle-input');

        container.replaceChild(inputNumber, gripperSelectDiv);
      }
    }
  });
}); 




//FUNÇAO QUE MOSTRA AS OPÇOES DE MOTORES NO SELECT INTERNO DE CADA OPÇÃO
// Supondo que o arquivo JSON esteja acessível em '/data/servos.json'
fetch('/options.json')
  .then(response => response.json())
  .then(data => {
    const selectElements = document.querySelectorAll('.motorSelector');
    data.servos.forEach(servo => {
      const option = document.createElement('option');
      option.value = servo.id;
      option.textContent = servo.name;
      selectElements.forEach(select => {
        select.appendChild(option.cloneNode(true));
      });
    });
  }) .catch(error => console.error('Error loading servos:', error));


document.getElementById('addMovement').addEventListener('click', function() {
  var movementsContainer = document.getElementById('movementsContainer');
  var originalMovement = movementsContainer.querySelector('.flex-container-c');
  var newMovement = originalMovement.cloneNode(true); // Clona o container de movimento
  newMovement.querySelector('.motorSelector').selectedIndex = 0; // Reseta o select para o valor padrão
  newMovement.querySelector('.angle-input').value = ''; // Limpa o input de ângulo
  newMovement.querySelector('.closeButton').style.display = 'inline-block'; // Mostra o botão de fechar
  movementsContainer.appendChild(newMovement);
  addCloseButtonFunctionality(newMovement.querySelector('.closeButton'));
});


// Adiciona funcionalidade ao botão de fechar nos containers de movimento adicionados
function addCloseButtonFunctionality(button) {
  button.addEventListener('click', function() {
    this.parentElement.parentElement.remove();
  });
}

// Oculta o botão de fechar no primeiro container de movimento
document.querySelector('.flex-container-c .closeButton').style.display = 'none';



// Função para carregar as opções do JSON e adicioná-las ao seletor
function loadOptions() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/options.json', true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      if (xhr.status == 200) {
        var data = JSON.parse(xhr.responseText);
        var selector = document.getElementById('mySelector');
        data.options.forEach(function(option) {
          var opt = document.createElement('option');
          opt.value = option.value;
          opt.textContent = option.text;
          selector.appendChild(opt);
        });
      } else {
        console.error('Erro ao carregar as opções:', xhr.status);
      }
    }
  };
  xhr.send();
}

// Chama a função loadOptions quando a janela for carregada
window.addEventListener('load', loadOptions);



//FUNÇAO PARA MANDA O NOME DO PERFIL A SER EXECUTADO
document.getElementById('playProfile').addEventListener('click', function() {
  const playButton = document.getElementById('playProfile');
  const profileSelector = document.querySelector('.profileselect');
  const selectedProfileName = profileSelector.value;

  // Desabilita o botão PLAY
  playButton.disabled = true;

  // Envia o nome do perfil diretamente como texto simples
  fetch('/play_profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain' // Muda o tipo de conteúdo para texto simples
    },
    body: selectedProfileName // Envia apenas o nome do perfil como texto
  })
  .then(response => {
    if (response.ok) {
      alert('Profile sent to the server successfully!');
    } else {
      alert('Failed to send profile to the server.');
    }
  })
  .catch(error => {
    console.error('Error sending profile:', error);
    alert('Error sending profile.');
  })
  .finally(() => {
    // Habilita o botão PLAY novamente
    playButton.disabled = false;
  });
});