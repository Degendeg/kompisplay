# Kompisplay 🐣

En enkel och trygg videoapp för barn. Den visar **svenska** videor från YouTube
med **SafeSearch strikt** aktiverat, har mörkt/ljust tema och fungerar bra på
mobil, surfplatta och dator.

## Tekniker

- React 19 + Vite + TypeScript
- Tailwind CSS v4
- React Router
- YouTube Data API v3
- Vitest + Testing Library
- Redo att deployas på Vercel

## 1. Skaffa en YouTube API-nyckel

1. Gå till [Google Cloud Console](https://console.cloud.google.com/).
2. Skapa ett nytt projekt (eller använd ett befintligt).
3. Aktivera **YouTube Data API v3** under "APIs & Services".
4. Skapa en API-nyckel under "Credentials".
5. (Rekommenderas) Begränsa nyckeln till YouTube Data API v3 och till din domän.

## 2. Installera och kör lokalt

```bash
npm install
cp .env.example .env
# öppna .env och klistra in din API-nyckel
npm run dev
```

Appen öppnas på `http://localhost:5173`.

## 3. Köra tester

```bash
npm run test
```

## 4. Bygga för produktion

```bash
npm run build
npm run preview
```

## 5. Deploya till Vercel

1. Pusha koden till ett Git-repo (GitHub/GitLab/Bitbucket).
2. Importera repot på [vercel.com](https://vercel.com/new).
3. Vercel upptäcker Vite automatiskt. Lägg till miljövariabeln
   `VITE_YOUTUBE_API_KEY` under **Project Settings → Environment Variables**.
4. Deploy! `vercel.json` ser till att alla sidor (t.ex. `/video/abc123`)
   fungerar även vid direktladdning eller uppdatering av sidan.

## Om säkerhet — viktigt för föräldrar

- Alla sökningar görs med `safeSearch=strict` och riktas mot svenskt språk
  (`relevanceLanguage=sv`) och Sverige (`regionCode=SE`).
- Videorna spelas upp via `youtube-nocookie.com` i privacy-läge, utan
  rekommenderade videor eller reklam för spårning.
- **Inget filter är 100 % perfekt.** YouTubes språk- och SafeSearch-parametrar
  är starka hjälpmedel, men inte en garanti. Vi rekommenderar att en vuxen
  finns i närheten, särskilt för yngre barn.

## Struktur

```
src/
  components/   Återanvändbara UI-komponenter
  hooks/        useTheme (mörkt/ljust läge)
  lib/          YouTube-klient och kategorier
  pages/        Home, VideoPage, NotFound
  test/         Vitest-setup
```
