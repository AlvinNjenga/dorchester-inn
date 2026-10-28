# Kinsley reference captures

Homepage refreshed 27 October 2026 from https://kinsley.bslthemes.com/ using installed Chrome and Playwright Core.

- [Desktop homepage](homepage-1440.png): 1440px viewport width, 7260px full-page height.
- [Mobile homepage](homepage-390.png): 390px viewport width, 11175px full-page height.
- [Homepage metadata](homepage-capture-data.json): title, URL, dimensions, headings and pending-image results.
- [Capture script](capture-homepage.cjs): requires Playwright Core, supplied through `NODE_PATH`; no project dependency added.

Both used a 1000px viewport height and device scale factor 1. The script navigated to the homepage once, scrolled it to trigger lazy loading, then resized the same page. No links were followed or other reference pages visited. No challenge was encountered on the successful run. All image elements had completed loading with nonzero natural widths at capture time.

Visual review found blank carousel regions under the gallery invitation, best rooms and guest feedback sections at both sizes. These screenshots faithfully retain that observed rendering; styles were not altered to reveal hidden panels. They are useful for surrounding layout and spacing, but are not complete visual baselines for those carousel contents.

`homepage-capture-data.json` supersedes the historical homepage entries in `capture-data.json`, which recorded a bot-verification response. Other page captures and historical metadata are unchanged.
