// Central place for currency formatting — change this once if the currency
// ever needs to change again, instead of editing every page.
export function formatPrice(amount) {
  return '₦' + amount.toLocaleString('en-NG');
}
