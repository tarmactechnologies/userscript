export default function processBackofficeUsers(subdomain = 'admin') {
  const observer = new MutationObserver(mutationList => {
    for (const mutation of mutationList) {
      if (mutation.type !== 'childList') continue;

      for (const user of mutation.addedNodes) {
        const id = user.querySelector('a').href.match(/\/([0-9]+)\//)[1];

        const username = user.children[1];
        username.addEventListener('click', () => {
          window.open(
            `https://${subdomain}.tarmactechnologies.com/users/customuser/${id}`
          );
        });
        username.style = 'cursor: pointer; user-select: none;';
      }
    }
  });

  observer.observe(document.querySelector('#users-list tbody'), {
    childList: true,
    subtree: true,
  });

  console.log('[TT Userscript] Users module loaded');
}
