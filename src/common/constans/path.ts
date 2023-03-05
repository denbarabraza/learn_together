export const PATH = {
  LOGIN: '/login',
  REGISTER: '/register',
  RECOVERY: '/recovery',
  ACCOUNT: '/account',
  NEW_PASSWORD: '/set-new-password',
  RECOVERY_INFO: '/recovery-info',
  PACK_LIST: '/pack-list',
  CARD_LIST: '/cards-list',
  CARD_LIST_ID: '/cards-list/:id',
  CARD_LEARN: '/learn',
  CURRENT_URL: window.location.href.split('#')[0],
} as const
