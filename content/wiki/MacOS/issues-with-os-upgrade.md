I've had a few issues following a MacOS upgrade. Specifically, around the Xcode
command line toolchain. A common error I get while running `npm` or similar is:

```
gyp: No Xcode or CLT version detected!
No receipt for 'com.apple.pkg.CLTools_Executables' found at '/'.
No receipt for 'com.apple.pkg.DeveloperToolsCLILeo' found at '/'.
```

The best way I've found to solve this is to remove xcode and reinstall it.

```shell
sudo rm -rf $(xcode-select -print-path)
xcode-select --install
```

Running `/usr/sbin/pkgutil --packages | grep CL` should now return a number of results.

```
com.apple.pkg.CLTools_Executables
com.apple.pkg.CLTools_SDK_macOS1015
com.apple.pkg.CLTools_SDK_macOS1014
com.apple.pkg.CLTools_macOS_SDK
```
