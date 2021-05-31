# Playground / Example

A quick little example setup inspired by TSDX to show an almost real world intended use.

To run it make sure first you do a build in the main project, and then come here and install the
dependencies

    npm ci

and then start the Parcel web server:

    npm run start

With that all done, you should be able to go <http://localhost:1234/> and use it.

## Parcel Note

At time of creation there was a bug in Parcel JS which is nicely captured in the TSDX issues at:

https://github.com/formium/tsdx/issues/980

So for now this project has `"parcel-bundler": "1.12.5"` in `package.json` to avoid this. Works well
enough for this purpose.
