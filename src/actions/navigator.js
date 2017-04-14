// Navigation actions
const NAVIGATOR = {
  push: { type: 'push' },
  back: { type: 'back' },
  jumpTo: { type: 'jumpTo' },
  logout: { type: 'logout' },
  bar: { type: 'bar' },
};

// Navigation action heleper
export const navigate = (type, key = null) =>
  (key ? { ...NAVIGATOR[type], key } : NAVIGATOR[type]);
