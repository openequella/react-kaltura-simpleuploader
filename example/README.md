# Playground / Example

A quick little example setup inspired by TSDX to show an almost real world intended use.

Before running, you first must make sure you build the main project (i.e. one level up). Then come
here and install the dependencies

    npm ci

then make sure you configure your Kaltura details (generate yourself a `ks` elsewhere)

    cp config.js.sample config.js
    vim config.js

then start the Parcel web server:

    npm run start

With that all done, you should be able to go <http://localhost:1234/> and use it.

## Parcel Note

At time of creation there was a bug in Parcel JS which is nicely captured in the TSDX issues at:

https://github.com/formium/tsdx/issues/980

So for now this project has `"parcel-bundler": "1.12.5"` in `package.json` to avoid this. Works well
enough for this purpose.
