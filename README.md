# justConvert

A fast unit and currency converter for iPhone and iPad. Type a number and see it in every other unit at once.

## What it converts

Currency (live European Central Bank rates), length, weight, volume, area, temperature, speed (including running pace), time, data, fuel economy, pressure and energy.

A handful of everyday units in each category are free. The one-time **Pro** purchase unlocks every unit and every currency.

## Run it

```bash
npm install
npx expo prebuild -p ios   # generates ios/ (not committed)
npx expo run:ios
```

Built on Expo SDK 55 (React Native 0.83), which needs Xcode 26.2 or newer. Moving to a newer SDK needs Xcode 26.4+.

```bash
npm test                   # conversion and number-format tests
```

## Ship it

```bash
npx expo prebuild -p ios --clean
xcodebuild -workspace ios/justconvert.xcworkspace -scheme justconvert -configuration Release \
  -destination 'generic/platform=iOS' -archivePath build/justconvert.xcarchive \
  -allowProvisioningUpdates archive
xcodebuild -exportArchive -archivePath build/justconvert.xcarchive \
  -exportOptionsPlist store/ExportOptions.plist -exportPath build/export -allowProvisioningUpdates
```

Bump `version` and `ios.buildNumber` in `app.json` first.

## Where things are

| File | What it holds |
|---|---|
| `src/units.js` | Every category and unit, and the conversion maths |
| `src/format.js` | Reading typed numbers (comma or point) and formatting results |
| `src/rates.js` | Exchange rates: fetched once, cached for offline use |
| `src/pro.js` | The Pro purchase (RevenueCat, entitlement `pro`) |
| `src/components/` | The screen's pieces: category bar, converter card, unit picker, upgrade sheet |
| `App.js` | The screen itself |

To add a unit, add one line to its category in `src/units.js`. Mark it `free: true` to make it available without Pro.
