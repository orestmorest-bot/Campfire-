# Scripture Opener

A small web app for meetings. It listens through the microphone, notices when a speaker mentions a
Bible scripture (for example “Psalm 83 verse 18” or “First Corinthians 13:4 to 8”), and opens that
scripture for you right away. You no longer have to look it up by hand.

Everything runs in your browser. Nothing is recorded or saved anywhere except the settings on your own
device.

## What you need

- A laptop (or an Android phone or tablet) with a microphone.
- **Google Chrome** or **Microsoft Edge**. These browsers have the built-in speech recognition that the
  app uses. Firefox and Safari do not work well for this.
- An internet connection during the meeting. The browser sends the audio to its speech service to turn
  it into text, so it cannot work fully offline.
- [Node.js](https://nodejs.org/) (version 20 or newer) installed on the computer, so you can start the
  app.

## Starting the app on your computer

You only have to do steps 1 and 2 once.

1. **Install Node.js.** Go to https://nodejs.org, download the version marked "LTS" and run the
   installer, clicking Next until it finishes. Node.js is the small program that runs the app.
2. **Get the app files.** Download this repository as a ZIP file from GitHub (the green "Code"
   button, then "Download ZIP"), unzip it, and open the `scripture-opener` folder inside.
3. **Start the app.** Double-click `Start on Windows.bat` (on Windows) or `Start on Mac.command`
   (on a Mac). A black window appears, the first start installs a few things (about a minute), and
   then your browser opens the app at **http://localhost:5173**. Keep the black window open while
   you use the app.

If the app opens in a browser other than Google Chrome or Microsoft Edge, copy the address
`http://localhost:5173` into Chrome or Edge.

On a Mac, the first time you double-click the `.command` file, macOS may say it cannot be opened.
Right-click the file, choose **Open**, and then click **Open** again in the message.

If you prefer the terminal, the same thing is:

```bash
npm install
npm run dev
```

## Using it at the meeting

1. Click **Start listening** and allow the microphone when the browser asks.
2. A second browser window with the Bible opens. Place it next to the app window so you can see both.
3. When a speaker says a scripture, the app shows it in big letters and the Bible window jumps to it.
4. Every scripture is also kept in the list on the left. Click any of them to open it again.
5. You can also type a scripture into the box (for example `Ps 83:18`) and press Enter.

If the browser blocks the Bible window, a yellow message appears with a button to open it. Click the
icon at the right end of the address bar and choose **Always allow pop-ups** for this page, so it can
open windows by itself from then on.

### Where scriptures open (Settings)

- **Watchtower Online Library** (default): opens the chapter on wol.jw.org in a separate window and
  jumps to the verse. This is the smoothest choice on a laptop.
- **jw.org**: opens the jw.org “finder” link. On a phone or tablet with JW Library installed, this can
  hand the scripture over to the app.
- **JW Library app on this computer**: uses a `jwlibrary://` link, which opens the JW Library app if it
  is installed. The first time, the browser asks for permission; tick “Always allow” so it stops asking.
- **Inside this page**: shows the Online Library in a panel next to the transcript. If the panel stays
  empty, the website does not allow being shown inside another page, and you should choose one of the
  other options.

### Other settings

- **Open automatically**: turn this off if you prefer to see the scripture and click it yourself.
- **Also open chapter-only mentions**: when the speaker says only “Psalm 83”, the chapter opens.
- **Fast mode**: opens a scripture as soon as the words are recognized instead of waiting for the end
  of the sentence. Turn it off if you get too many wrong openings.
- **Bible language**: pick your language so the links open the Bible in that language.
- **Speech language**: which language the speech service listens for. The app currently recognizes
  book names in **English** only (see below).

## How the app understands speech

The speech service turns audio into text such as “let us read John 3 16”. The app then looks for a
book name followed by numbers. It understands many ways of saying the same thing:

- “John 3:16”, “John 3 16”, “John three sixteen”, and even “John 316” (when the numbers get glued
  together)
- “John chapter 3 verse 16”, “verses 16 and 17”, “verses 16 to 18”
- “First Corinthians”, “1st Corinthians”, “1 Corinthians”
- Common mishearings such as “Philippines” for Philippians or “Revelations” for Revelation
- “verse 17” or “chapter 5” said on its own, which continue from the previous scripture

Each mention is checked against the real number of chapters and verses, so nonsense like “John 3 verse
999” is ignored. Book names that are also ordinary words or first names (Mark, Job, Numbers, John and
so on) only count as a chapter mention when the word “chapter” is said, to avoid opening a scripture by
mistake.

### Adding book names in another language

Open `src/lib/books.js`. Each book has a `spoken` list of words that the app treats as that book's
name. Add the names used in your language (in lowercase) to those lists and set the speech language in
the settings. For numbered books such as “1 Samuel”, the words for “first”, “second” and “third” are in
`ORDINAL_PREFIXES` in `src/lib/parser.js`.

## Running the tests

```bash
npm test
```

The tests check the Bible data (66 books, 1,189 chapters, 31,102 verses) and many spoken forms of
scripture references.

## On a phone or tablet

Phones only allow the microphone on a secure web address (one that starts with `https`), so the app
has to be online. This repository is set up to publish the app to **GitHub Pages** by itself:

1. On GitHub, open the repository **Settings**, then **Pages**. Under "Build and deployment" set
   **Source** to **GitHub Actions**. This is a one-time step.
2. Every time the `scripture-opener` folder changes on the `main` branch, the workflow in
   `.github/workflows/deploy-scripture-opener.yml` builds the app and publishes it. You can also start
   it by hand on the **Actions** tab ("Deploy Scripture Opener to GitHub Pages", then "Run workflow").
3. The app is then available at `https://<your GitHub name>.github.io/<repository name>/`.
   For this repository that is **https://orestmorest-bot.github.io/Campfire-/**.

On the phone or tablet:

1. Open that address in **Chrome** (Android) or **Safari** (iPhone or iPad).
2. In the browser menu choose **Add to Home screen**. From then on it opens like a normal app.
3. Tap **Start listening** and allow the microphone.
4. Scriptures open through jw.org, which hands them to the **JW Library** app when it is installed.
   The phone also gives a short buzz whenever a scripture is heard.

Good to know on a phone or tablet:

- Mobile browsers are strict about opening things by themselves. If the scripture does not open
  automatically, tap the big **Open** button. In Chrome on Android you can allow it permanently:
  browser menu, **Settings**, **Site settings**, **Pop-ups and redirects**, allow for this page.
- While JW Library is in front, the browser may pause listening. On a tablet (and on many phones)
  use **split screen** with the app on one side and JW Library on the other, so both stay active.
- The app keeps the screen awake while it is listening, so keep the device plugged in for a long
  meeting.

### Other ways to put it online

`npm run build` creates a `dist` folder with plain files that can be hosted on any static web host,
for example Vercel or Netlify (set the project's root folder to `scripture-opener`).

## Good to know

- Speech recognition is not perfect. Accuracy depends on the microphone, the distance to the speaker and
  background noise. A microphone close to the loudspeaker, or an audio feed from the sound system, works
  best.
- The Bible window keeps its name, so each new scripture replaces the previous one instead of opening a
  new tab every time.
- The app asks the browser to keep the screen awake while it is listening.
