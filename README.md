# Kaltura Simple Uploader (React)

A basic library to make it easy to add support for uploading single videos to Kaltura.

## Updating Kaltura Typescript Client API

For some reason, kaltura have stopped publishing their `kaltura-typescript-client` to NPM. It seems
the recommended method is to download the latest release from
<https://github.com/kaltura/KalturaGeneratedAPIClientsTypescript> and then follow the instructions
in the [project's
README.md](https://github.com/kaltura/KalturaGeneratedAPIClientsTypescript/blob/master/README.md).

This basically involves building a local copy and dropping the resultant archive into your
repository. This is needed - rather than simply rebuilding on each install/clone - due to timestamps
in version numbers and elsewhere resulting in difficulties in aiming for [reproducible
builds](https://reproducible-builds.org/) which would pass NPM package-lock.json hash checks.

After much battling with this (and NPM's `preinstall` script which does _not_ occur _before_
`install`) the `install-kaltura-client.sh` script codifies this process should anyone want to easily
update in the future.

The script downloads and builds the client, placing the resultant distributable in the root of the
project (not the slightly ugly `tgz` file sitting there). Then it `npm install`s it resulting in
updated `package.json` and `package-lock.json`.

If you wish to update to a newer version then modify filenames and URLs in the script as needed, and
run it. After that make sure you:

- remove the old `tgz` file from git;
- add the new `tgz` file to git; and
- commit the changes to `package.json` and `package-lock.json`

## Licensing

The Kaltura libraries seem to mainly be [AGPLv3](https://choosealicense.com/licenses/agpl-3.0/)
which is at odds with the [Apereo Practices on Third-Party
Licenses](https://www.apereo.org/licensing/third-party). Hence, this module is stand-alone.
