import adminCompanies from './admin/companies';
import adminPartnerTaskRules from './admin/partnertaskrules';
import adminUsers from './admin/users';
import agoa from './agoa/turnarounds';
import backofficeCriticalPath from './backoffice/critical_path';
import backofficeUsers from './backoffice/users';

(function () {
  'use strict';

  // Depending on the current URL, call relevant handler
  const hostname = window.location.hostname;
  const pathname = window.location.pathname;

  if (/^(?:dev-)?backoffice.tarmactechnologies.com$/.test(hostname)) {
    if (
      /^\/(?:specific_)?critical_path\/(?:[0-9]+\/)?(?:edit|add|new)/.test(
        pathname
      )
    ) {
      backofficeCriticalPath();
    }

    if (/\/users/i.test(pathname)) {
      backofficeUsers(/^dev-backoffice/.test(hostname) ? 'dev-admin' : 'admin');
    }
  }

  if (/^(?:dev-)?admin.tarmactechnologies.com$/.test(hostname)) {
    if (/^\/users\/customuser\/[0-9]+\/change/.test(pathname)) {
      adminUsers();
    }

    if (/^\/tarmac\/company\/(?:[0-9]+\/change|add)/.test(pathname)) {
      adminCompanies();
    }

    if (/^\/tarmac\/partnertaskrule\/(?:add|[0-9]+\/change)/.test(pathname)) {
      console.log('hear hear');
      adminPartnerTaskRules();
    }
  }

  if (/(?:dev-)?agoa.tarmactechnologies.com/.test(hostname)) {
    if (/^\/(?:agoa)?$/.test(pathname)) {
      agoa(/^dev-agoa/.test(hostname) ? 'dev-admin' : 'admin');
    }
  }
})();