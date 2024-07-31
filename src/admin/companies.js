function processAdminCompanyCompanyBusinessGroups() {
  const first_label = document.querySelector('label[for="id_business_groups"]');
  const first_select = document.querySelector('select[name="business_groups"]');
  const first_username = document.querySelector('input[name="name"]').value;

  const stuff = [[first_label, first_select, () => first_username]];

  for (const select of document.querySelectorAll(
    'select[name$="-business_groups"]'
  )) {
    select.insertAdjacentHTML(
      'afterend',
      `<span class="related-widget-wrapper-link add-related" id="popup-${select.id}" title="Add another Company Business Group"><img src="https://static-tarmac.s3.amazonaws.com/admin/img/icon-yes.svg" alt="Popup"></span>`
    );
    const label = document.getElementById(`popup-${select.id}`);

    stuff.push([
      label,
      select,
      () =>
        document.querySelector(
          `select[name="${
            select.name.match(/^(.*)-business_groups$/)[1]
          }-related_company"]`
        ).selectedOptions[0].innerHTML + ' (related)',
    ]);
  }

  for (const [label, select, getUsername] of stuff) {
    // eslint-disable-next-line no-inner-declarations
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
      popup.document.title = `${getUsername()} | Company Business Groups`;
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
}

export default function processAdminCompany() {
  processAdminCompanyCompanyBusinessGroups();

  console.log('[TT Userscript] Companies module loaded');
}
