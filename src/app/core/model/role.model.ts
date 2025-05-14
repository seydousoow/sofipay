export type TRole = 'ADMIN' | 'CUSTOMER' | 'CORPORATE' | 'CORPORATE_ADMIN';

export type TUserPermissions =
  'CREATE_USER' |
  'LIST_USER' |
  'UPDATE_USER' |
  'ACTIVATE_USER' |
  'DEACTIVATE_USER' |
  'RESET_PASSWORD';

export type TCorporatePermissions =
  'CREATE_CORPORATE' |
  'LIST_CORPORATE' |
  'UPDATE_CORPORATE' |
  'ACTIVATE_CORPORATE' |
  'DEACTIVATE_CORPORATE';

export type TOfferPermissions =
  'CREATE_OFFER' |
  'LIST_OFFER' |
  'UPDATE_OFFER' |
  'CLOSE_OFFER' |
  'OFFER_APPROVAL';

export type TTackingPermissions =
  'LIST_TRACKING' |
  'CREATE_TRACKING' |
  'READ_TRACKING' |
  'DISABLE_TRACKING';

export type TPermissions = TUserPermissions | TCorporatePermissions | TOfferPermissions | TTackingPermissions;
