"use strict";

const GARMIN_CONNECT_ORIGIN = "https://connect.garmin.com";
const GPX_EXPORT_PATH = "/app/proxy/course-service/course/gpx/";

const form = document.querySelector("#download-form");
const courseUrlInput = document.querySelector("#course-url");
const statusMessage = document.querySelector("#status");

function extractCourseId(rawValue) {
  const value = rawValue.trim();

  if (!value) {
    return null;
  }

  const directId = value.match(/^\d{4,20}$/);
  if (directId) {
    return directId[0];
  }

  const candidate = value.includes("://") ? value : `https://${value}`;

  let url;
  try {
    url = new URL(candidate);
  } catch {
    return null;
  }

  if (url.hostname.toLowerCase() !== "connect.garmin.com") {
    return null;
  }

  const courseMatch = url.pathname.match(/(?:^|\/)course\/(\d+)(?:\/|$)/);
  return courseMatch ? courseMatch[1] : null;
}

function buildGpxExportUrl(courseId) {
  return `${GARMIN_CONNECT_ORIGIN}${GPX_EXPORT_PATH}${encodeURIComponent(courseId)}`;
}

function setStatus(message, tone = "") {
  statusMessage.textContent = message;

  if (tone) {
    statusMessage.dataset.tone = tone;
  } else {
    delete statusMessage.dataset.tone;
  }
}

function openDownload(url) {
  const openedWindow = window.open(url, "_blank");

  if (openedWindow) {
    openedWindow.opener = null;
    return;
  }

  window.location.assign(url);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const courseId = extractCourseId(courseUrlInput.value);
  if (!courseId) {
    setStatus("Paste a Garmin Connect course link or course ID.", "error");
    courseUrlInput.focus();
    return;
  }

  setStatus(`Opening Garmin export for course ${courseId}.`, "success");
  openDownload(buildGpxExportUrl(courseId));
});

courseUrlInput.addEventListener("input", () => {
  if (statusMessage.dataset.tone === "error") {
    setStatus("");
  }
});
