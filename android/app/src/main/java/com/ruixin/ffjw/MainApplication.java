package com.ruixin.ffjw;

import android.app.Application;

import com.facebook.react.ReactApplication;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.reactlibrary.RNReactNativeDocViewerPackage;
import com.rnfs.RNFSPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.ruixin.ffjw.api.CameraViewPackage;
import com.ruixin.ffjw.api.DocPickerPackage;
import com.ruixin.ffjw.api.IntentPackage;
import com.ruixin.ffjw.api.OpenHTTPFilePackage;
import com.ruixin.ffjw.location.LocationPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.rnim.rn.audio.ReactNativeAudioPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.horcrux.svg.SvgPackage;
import com.imagepicker.ImagePickerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
            new SplashScreenReactPackage(),
                    new RNReactNativeDocViewerPackage(),
                    new RNFSPackage(),
                    new ReactVideoPackage(),
                    new RNSoundPackage(),
                    new RNFetchBlobPackage(),
                    new ReactNativeAudioPackage(),
                    new VectorIconsPackage(),
                    new SvgPackage(),
                    new DocPickerPackage(),
                    new ImagePickerPackage(),
                    new LocationPackage(),
                    new IntentPackage(),
                    new CameraViewPackage(),
                    new OpenHTTPFilePackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}
