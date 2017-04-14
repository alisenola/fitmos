package com.atmosfit;

import android.app.Application;
import android.content.Intent;

import com.digits.sdk.android.Digits;
import com.facebook.react.BuildConfig;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.proxima.RCTDigits.DigitsPackage;
import com.imagepicker.ImagePickerPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.surialabs.rn.braintree.BraintreePackage;
import com.twitter.sdk.android.core.TwitterAuthConfig;
import com.twitter.sdk.android.core.TwitterCore;
import io.callstack.react.opentok.MainPackage;
import com.airbnb.android.react.maps.MapsPackage;

import java.util.Arrays;
import java.util.List;

import io.fabric.sdk.android.Fabric;

public class MainApplication extends Application implements ReactApplication {

  private static final String TWITTER_KEY = "OdwmTCc7LkZnyD9B1E4GK3CD7";
  private static final String TWITTER_SECRET = "o5nK7FStTzsV3njqbPcuy5muRoPYzxA8hBre66Qh2ohlQxRuLx";

  @Override
  public void onCreate() {
    super.onCreate();

    TwitterAuthConfig authConfig = new TwitterAuthConfig(TWITTER_KEY, TWITTER_SECRET);
    Fabric.with(MainApplication.this, new TwitterCore(authConfig), new Digits());
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return !BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new DigitsPackage(),
          new ImagePickerPackage(),
          new ReactVideoPackage(),
          new BraintreePackage(),
          new MapsPackage(),
          new MainPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
