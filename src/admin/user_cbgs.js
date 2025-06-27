function processAdminUserCompanyBusinessGroups() {
  const label = document.querySelector(
    'label[for="id_company_business_groups"]'
  );
  const select = document.querySelector(
    'select[name="company_business_groups"]'
  );
  const username = document.querySelector('input[name="username"]').value;

  function handleSubmit(cbgs) {
    // First of all, unselect everything
    for (const option of select.options) {
      option.selected = false;
    }

    for (let cbg of cbgs) {
      cbg = cbg
        .trim()
        .toUpperCase()
        .match(/([A-Z0-9]{2}).*([A-Z]{3})/);
      if (!cbg) continue;
      cbg = `${cbg[1]} - ${cbg[2]}`;

      const option = Array.from(select.options).find(
        option => option.label === cbg
      );
      if (option === undefined) {
        console.warn(
          `[TT Userscript] Cound not find company business group ${cbg}`
        );
      } else {
        option.selected = true;
      }
    }
  }

  label.addEventListener('click', () => {
    const cbgs = Array.from(select.options)
      .filter(option => option.selected)
      .map(option => option.label);

    const popup = window.open('', '', 'width=800, height=400');
    popup.document.title = `${username} | Company Business Groups`;
    popup.document.body.innerHTML = `<label for="cbg" style="display: block;">Company Business Groups</label><textarea type="text" name="cbg" id="cbg" style="width: 100%; height: calc(100% - 60px); margin-bottom: 15px;">${cbgs.join(
      '\n'
    )}</textarea><br><button id="submit">Submit</button>`;

    popup.document.querySelector('#submit').addEventListener('click', () => {
      handleSubmit(popup.document.querySelector('#cbg').value.split('\n'));

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

export default function processAdminUser() {
  processAdminUserCompanyBusinessGroups();

  console.log('[TT Userscript] User CBGs module loaded');
}
