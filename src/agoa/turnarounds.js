export default function processAgoa(subdomain = 'admin') {
  function tick() {
    Array.from(
      document.querySelectorAll(
        '[id^="turnaroundDetailHeaderTurnaroundActualAirport"]'
      )
    ).forEach(turnaround => {
      if (!turnaround.dataset.processed) {
        const id = turnaround.id.match(
          /turnaroundDetailHeaderTurnaroundActualAirport([0-9]+)/
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
  }

  setInterval(tick, 1000);

  console.log('[TT Userscript] Module loaded');
}
