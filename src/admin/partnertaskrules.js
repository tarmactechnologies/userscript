function processAdminPartnerTaskRulesAirlines() {
  const label = document.querySelector('label[for="id_airlines"]');
  const select = document.querySelector('select[name="airlines"]');
  const information_code = document.querySelector(
    'input[name="information_code"]'
  ).value;

  function handleSubmit(airlines) {
    // First of all, unselect everything
    for (const option of select.options) {
      option.selected = false;
    }

    for (let airline of airlines) {
      airline = airline.trim().toUpperCase();
      if (!airline) continue;

      const option = Array.from(select.options).find(
        option => option.label.substring(0, 2) === airline
      );
      if (option === undefined) {
        console.warn(`[TT Userscript] Cound not find airline ${airline}`);
      } else {
        option.selected = true;
      }
    }
  }

  label.addEventListener('click', () => {
    const airlines = Array.from(select.options)
      .filter(option => option.selected)
      .map(option => option.label.substring(0, 2));

    const popup = window.open('', '', 'width=400, height=400');
    popup.document.title = `${information_code} | Airlines`;
    popup.document.body.innerHTML = `<label for="cbg" style="display: block;">Airlines</label><textarea type="text" name="airlines" id="airlines" style="width: 100%; height: calc(100% - 60px); margin-bottom: 15px;">${airlines.join(
      '\n'
    )}</textarea><br><button id="submit">Submit</button>`;

    popup.document.querySelector('#submit').addEventListener('click', () => {
      handleSubmit(popup.document.querySelector('#airlines').value.split('\n'));

      popup.close();
    });

    // Close popup when the main window is closed
    window.addEventListener('beforeunload', () => {
      popup.close();
    });

    // Ctrl+Enter & Escape shortcuts
    popup.document.addEventListener('keydown', event => {
      if (event.ctrlKey && event.key === 'Enter') {
        popup.document.querySelector('#submit').click();
      }
      if (event.key === 'Escape') {
        popup.close();
      }
    });
  });

  label.style = 'cursor: pointer; user-select: none;';
}

function processAdminPartnerTaskRulesAirports() {
  const label = document.querySelector('label[for="id_airports"]');
  const select = document.querySelector('select[name="airports"]');
  const information_code = document.querySelector(
    'input[name="information_code"]'
  ).value;

  function handleSubmit(airports) {
    // First of all, unselect everything
    for (const option of select.options) {
      option.selected = false;
    }

    for (let airport of airports) {
      airport = airport.trim().toUpperCase();
      if (!airport) continue;

      const option = Array.from(select.options).find(
        option => option.label.substring(0, 3) === airport
      );
      if (option === undefined) {
        console.warn(`[TT Userscript] Cound not find airport ${airport}`);
      } else {
        option.selected = true;
      }
    }
  }

  label.addEventListener('click', () => {
    const airlines = Array.from(select.options)
      .filter(option => option.selected)
      .map(option => option.label.substring(0, 3));

    const popup = window.open('', '', 'width=400, height=400');
    popup.document.title = `${information_code} | Airlines`;
    popup.document.body.innerHTML = `<label for="cbg" style="display: block;">Airports</label><textarea type="text" name="airports" id="airports" style="width: 100%; height: calc(100% - 60px); margin-bottom: 15px;">${airlines.join(
      '\n'
    )}</textarea><br><button id="submit">Submit</button>`;

    popup.document.querySelector('#submit').addEventListener('click', () => {
      handleSubmit(popup.document.querySelector('#airports').value.split('\n'));

      popup.close();
    });

    // Close popup when the main window is closed
    window.addEventListener('beforeunload', () => {
      popup.close();
    });

    // Ctrl+Enter & Escape shortcuts
    popup.document.addEventListener('keydown', event => {
      if (event.ctrlKey && event.key === 'Enter') {
        popup.document.querySelector('#submit').click();
      }
      if (event.key === 'Escape') {
        popup.close();
      }
    });
  });

  label.style = 'cursor: pointer; user-select: none;';
}

export default function processAdminPartnerTaskRules() {
  processAdminPartnerTaskRulesAirlines();
  processAdminPartnerTaskRulesAirports();

  console.log('[TT Userscript] Partner Task Rules module loaded');
}
