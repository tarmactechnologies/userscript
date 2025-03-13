export default function processAgoa(subdomain = 'admin') {
  function addClickHandlers() {
    Array.from(
      document.querySelectorAll('[id^="TurnaroundPathAirportsHubActual"]')
    ).forEach(turnaround => {
      if (!turnaround.dataset.processed) {
        const id = turnaround.id.match(
          /TurnaroundPathAirportsHubActual([0-9]+)/
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

    Array.from(document.querySelectorAll('.station-selected-turnarounds__turnarounds-details__turnaround-details .marker')).forEach(marker => {
      if (!marker.dataset.processed) {
        const id = marker.id.match(/turnaroundDetailsMarker([0-9]+)/)[1];
        marker.addEventListener('click', () => {
          window.open(`https://metabase.tarmactechnologies.com/dashboard/7-turnaround-deepdive?turnaround_id=${id}`);
        })

        marker.style = 'cursor: pointer; user-select: none;';
        marker.dataset.processed = true;
      }
    })
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
