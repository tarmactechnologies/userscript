export default function processBackofficeCriticalPath() {
  /**
   * Handler for each task of a critical path.
   *
   * @param task <tr> of a critical path task
   */
  function handleTask(above_below, task) {
    const add_info_label = document
      .evaluate(
        './/label[contains(., "Task Additional Information")]',
        task,
        null,
        XPathResult.ANY_TYPE,
        null
      )
      .iterateNext();
    if (!add_info_label) {
      console.error('[TT Userscript] Add info label not found');
      return;
    }

    /**
     * Handles textarea contents and creates matching add info items.
     *
     * @param textarea_contents CSV with columns label, custom_label, type
     */
    function handleSubmit(popup, textarea_contents) {
      // check for duplicate hard labels
      const labels = textarea_contents
        .split('\n')
        .map(elt => elt.split(',')[0]);
      if (labels.some((elt, idx) => labels.indexOf(elt) < idx)) {
        popup.alert('Duplicate hard labels not allowed!');
        return false;
      }

      // clear all current add info items
      for (const button of task.querySelectorAll(
        '.task-additional-information-tbody button.delete-task-additional-information'
      )) {
        button.click();
      }

      // add from textarea contents
      for (const [index, line] of textarea_contents.split('\n').entries()) {
        if (line.trim() === '') continue;
        const line_split = line.split(',');
        if (line_split.length < 3) {
          popup.alert('Three or four columns required!');
          return false;
        }

        // click on the plus button, except for the first item
        if (index > 0) {
          task.querySelector('.add-task-additional-information').click();
        }

        // populate label, custom label, type and required
        const [label, custom, type] = line_split;
        const last_entry = Array.from(
          task.querySelectorAll('.task-additional-information-tbody tr')
        ).at(-1);

        const label_select = last_entry.querySelector(
          `select[name="normal-${above_below}-task-additional-information-label-id"]`
        );
        const label_option = Array.from(label_select.options).find(
          option => option.label.toLowerCase() === label.toLowerCase()
        );
        if (label_option === undefined) {
          console.warn(`[TT Userscript] Could not find label ${label}`);
        } else {
          label_option.selected = true;
        }

        const custom_input = last_entry.querySelector(
          `input[name="normal-${above_below}-task-additional-information-custom-label"]`
        );
        custom_input.value = custom;

        const type_select = last_entry.querySelector(
          `select[name="normal-${above_below}-task-additional-information-type"]`
        );
        const type_option = Array.from(type_select.options).find(
          option => option.label.toLowerCase() === type.toLowerCase()
        );
        if (type_option === undefined) {
          console.warn(`[TT Userscript] Could not find type ${type}`);
        } else {
          type_option.selected = true;
        }

        if (line_split.length > 3) {
          const required = line_split[3].toLowerCase() === 'true';
          last_entry.querySelector('input[type="checkbox"]').checked = required;
        }
      }

      return true;
    }

    // Open popup when the user clicks on the add info label
    add_info_label.addEventListener('click', () => {
      const popup = window.open(
        '',
        '',
        'width=800, height=400, scrollbars=yes'
      );
      popup.document.body.innerHTML =
        '<textarea name="addinfos" id="addinfos" rows="10" style="display: block; height: calc(100% - 20px); width: 100%; padding: 5px;"></textarea><button id="submit">Submit</button>';

      // compute current add info items
      let current = '';
      for (const addinfo of task.querySelectorAll(
        '.task-additional-information-tbody tr'
      )) {
        const label_selected = addinfo.querySelector(
          `select[name="normal-${above_below}-task-additional-information-label-id"]`
        ).selectedOptions;
        const label = label_selected.length > 0 ? label_selected[0].label : '';

        const custom = addinfo.querySelector(
          `input[name="normal-${above_below}-task-additional-information-custom-label"]`
        ).value;

        const type_selected = addinfo.querySelector(
          `select[name="normal-${above_below}-task-additional-information-type"]`
        ).selectedOptions;
        const type = type_selected.length > 0 ? type_selected[0].label : '';

        const required = addinfo.querySelector('input[type="checkbox"]').checked
          ? 'true'
          : 'false';

        current += `${label},${custom},${type},${required}\n`;
      }
      if (current === ',,Checkbox,false\n') current = '';

      const textarea = popup.document.getElementById('addinfos');
      textarea.value = current;

      popup.document.getElementById('submit').addEventListener('click', () => {
        if (handleSubmit(popup, textarea.value)) {
          popup.close();
        }
      });
    });

    add_info_label.style = 'cursor: pointer; user-select: none;';
  }

  // handle all currently existing tasks
  for (const above_below of ['above', 'below']) {
    for (const task of document.querySelectorAll(
      `#normal-${above_below}-table-body tr.row-id`
    )) {
      handleTask(above_below, task);
    }
  }

  // register event to handle new tasks created by the user
  document
    .querySelector(
      'button[data-action="add"][data-target="#normal-above-table"]'
    )
    .addEventListener('click', e => {
      e.stopPropagation();
      addRow('#normal-above-table'); // eslint-disable-line no-undef

      const last_task = Array.from(
        document.querySelectorAll('#normal-above-table-body tr.row-id')
      ).at(-1);
      handleTask('above', last_task);
    });
  document
    .querySelector(
      'button[data-action="add"][data-target="#normal-below-table"]'
    )
    .addEventListener('click', e => {
      e.stopPropagation();
      addRow('#normal-below-table'); // eslint-disable-line no-undef

      const last_task = Array.from(
        document.querySelectorAll('#normal-below-table-body tr.row-id')
      ).at(-1);
      handleTask('below', last_task);
    });

  console.log('[TT Userscript] Critical path module loaded');
}
