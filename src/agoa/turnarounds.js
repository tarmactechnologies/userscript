export default function processAgoa(subdomain = 'admin') {
  function addClickHandlers() {
    Array.from(
      document.querySelectorAll(
        '.turnaround-path-and-timings__path__airports__hub__actual'
      )
    ).forEach(turnaround => {
      if (!turnaround.dataset.processed) {
        const id = turnaround.id.match(
          /turnaround-path-airports-hub-actual-([0-9]+)/
        )[1];
        turnaround.addEventListener('click', () => {
          window.open(
            `https://${subdomain}.tarmactechnologies.com/tarmac/turnaround/${id}`
          );
        });

        turnaround.style = 'cursor: pointer; user-select: none;';
        turnaround.dataset.processed = true;
      }
    });

    Array.from(
      document.querySelectorAll(
        '.station-selected-turnarounds__turnarounds-details__turnaround-details .ui-badge'
      )
    ).forEach(badge => {
      if (!badge.dataset.processed) {
        const id = badge.id.match(/turnaround-details-badge-([0-9]+)/)[1];
        badge.addEventListener('click', () => {
          window.open(
            `https://metabase.tarmactechnologies.com/dashboard/7-turnaround-deepdive?turnaround_id=${id}`
          );
        });

        badge.style = 'cursor: pointer; user-select: none;';
        badge.dataset.processed = true;
      }
    });
  }

  function listenDOMChanges() {
    new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length) {
          addClickHandlers();
        }
      });
    }).observe(document.body, {childList: true, subtree: true});
  }

  addClickHandlers();
  listenDOMChanges();

  console.log('[TT Userscript] Module loaded');
}
