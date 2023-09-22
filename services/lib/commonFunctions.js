import Purchases from 'react-native-purchases';
export async function checkUserMembership({ onset }) {
  try {
    const purchaserInfo = await Purchases.getPurchaserInfo();
    if (typeof purchaserInfo.entitlements.active.pro !== 'undefined') {
      onset(true);
    }
  } catch (e) {
    console.log(e);
  }
}
