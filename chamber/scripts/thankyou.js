const params = new URLSearchParams(window.location.search);

// ============= Thank You Outputs ===================
const fields = [
    { param: 'firstName', id: 'out-first-name' },
    { param: 'lastName',  id: 'out-last-name'  },
    { param: 'email',     id: 'out-email'      },
    { param: 'phone',     id: 'out-phone'      },
    { param: 'orgName',   id: 'out-org-name'   },
    { param: 'timestamp', id: 'out-timestamp'  },
];


fields.forEach(({ param, id }) => {
    const el = document.getElementById(id);
    const value = params.get(param);

    if (el) {
        el.textContent = value ? value : '-';
    }
});


