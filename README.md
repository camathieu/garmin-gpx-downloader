# Garmin GPX Downloader

A standalone GitHub Pages site that turns a Garmin Connect course URL into Garmin's GPX export URL.

Paste a course link such as:

```text
https://connect.garmin.com/app/course/469269206
```

The page extracts the course ID and opens:

```text
https://connect.garmin.com/app/proxy/course-service/course/gpx/<course-id>
```

Garmin controls access to that endpoint. If the browser is not signed in to Garmin Connect, Garmin redirects to sign-in before the file can be downloaded.

## Publish on GitHub Pages

No build step is required. In the repository settings, enable GitHub Pages from the `main` branch and the repository root.
