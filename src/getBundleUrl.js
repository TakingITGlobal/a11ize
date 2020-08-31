function getBaseURL(url) {
  return `${`${url}`.replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1')}/`;
}

export default function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  if (process.env.PARCEL_BUILD_ENV === 'test') {
    if (typeof document !== 'undefined' && 'currentScript' in document) {
      return getBaseURL(document.currentScript.src);
    }
  }

  try {
    throw new Error();
  } catch (err) {
    const matches = `${err.stack}`.match(/(https?|file|ftp):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}
