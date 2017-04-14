import { Dimensions, Platform } from 'react-native';

const { height, width } = Dimensions.get('window');

// Empty function
export const NOOP = () => {};

// Number of classes fetched into list when end is reached
export const NUMBER_OF_FETCHED_CLASSES = 15;

// Styling constants
export const WIDTH = width;
export const HEIGHT = height;
export const FOOTER_HEIGHT = 0.2 * height;
export const CLASS_LISTING_SEARCHBAR_HEIGHT = 0.2 * height;
export const CLASS_TILE_HEIGHT = 160;
export const CLASS_IMAGE_DIMENSION = 0.6 * CLASS_TILE_HEIGHT;
export const STATUS_BAR_HEIGHT = 20;
export const TOP_NAV_BAR_HEIGHT = 50;
export const CLASS_IMAGE_HEIGHT = 180;
export const MARGIN = 15;
export const CONTENT_HEIGHT = height - TOP_NAV_BAR_HEIGHT;

// Maximum difference between signed and capacity to keep it not highlighted
export const CAPACITY_DIFFERENCE = 10;

// AWS configuration constants
export const AWS_API_URL = 'https://26e00kzo59.execute-api.us-west-2.amazonaws.com/prod';
export const AWS_OPTIONS = {
  keyPrefix: 'images/',
  bucket: 'atmosfit-images',
  region: 'us-east-1',
  accessKey: 'AKIAJSNFF3VUW2XNYKBA',
  secretKey: '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',
  successActionStatus: 201,
};

// OpenTok configuration constants
export const OPENTOK_API_KEY = '45618062';
export const OPENTOK_API_SECRET = 'edb39606f11cd02a3f1f884d73171cd4ab7f4e22';
export const OPENTOK_API_URL = `https://api.opentok.com/v2/partner/${OPENTOK_API_KEY}`;

// Digits configuration constants
export const DIGITS_OPTIONS = {
  title: 'Atmosfit',
  phoneNumber: '+1',
};

// Default app error message
export const DEFAULT_ERROR_MESSAGE = 'Error occured! Please restart app or try again later!';

// Google API credentials
export const GOOGLE_API_KEY = Platform.select({
  ios: 'AIzaSyDG8BwyIkvyIljTk76-_F6fdT6ymch8NJk',
  android: 'AIzaSyA0mbcEwpopyHXSsNI0AlcgFr8kbsnCNS4',
});
export const GOOGLE_GEOLOCATION_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
