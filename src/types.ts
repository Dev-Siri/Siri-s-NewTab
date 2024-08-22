export interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    visibility: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
    timezone: number;
  };
  id: number;
  name: string;
  cod: number;
}

interface AlternativeSlugs {
  en: string;
  es: string;
  ja: string;
  fr: string;
  it: string;
  ko: string;
  de: string;
  pt: string;
}

interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
  custom: string;
}

interface Links {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

interface Social {
  instagram_username: string;
  portfolio_url: string;
  twitter_username: string;
  paypal_email: string | null;
}

interface ProfileImage {
  small: string;
  medium: string;
  large: string;
}

interface UserLinks {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
  following: string;
  followers: string;
}

interface User {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  twitter_username: string;
  portfolio_url: string;
  bio: string;
  location: string;
  links: UserLinks;
  profile_image: ProfileImage;
  instagram_username: string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  total_promoted_photos: number;
  total_illustrations: number;
  total_promoted_illustrations: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: Social;
}

interface Position {
  latitude: number;
  longitude: number;
}

interface Location {
  name: string | null;
  city: string | null;
  country: string | null;
  position: Position;
}

interface Exif {
  make: string | null;
  model: string | null;
  name: string | null;
  exposure_time: string | null;
  aperture: string | null;
  focal_length: string | null;
  iso: string | null;
}

interface SourceAncestryType {
  slug: string;
  pretty_slug: string;
}

interface SourceAncestryCategory {
  slug: string;
  pretty_slug: string;
}

interface SourceAncestrySubcategory {
  slug: string;
  pretty_slug: string;
}

interface SourceAncestry {
  type: SourceAncestryType;
  category: SourceAncestryCategory;
  subcategory: SourceAncestrySubcategory;
}

interface CoverPhotoUrls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
}

interface CoverPhotoLinks {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

interface CoverPhotoUserLinks {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
  following: string;
  followers: string;
}

interface CoverPhotoUserProfileImage {
  small: string;
  medium: string;
  large: string;
}

interface CoverPhotoUserSocial {
  instagram_username: string;
  portfolio_url: string;
  twitter_username: string;
  paypal_email: string | null;
}

interface CoverPhotoUser {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  twitter_username: string;
  portfolio_url: string | null;
  bio: string;
  location: string;
  links: CoverPhotoUserLinks;
  profile_image: CoverPhotoUserProfileImage;
  instagram_username: string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  total_promoted_photos: number;
  total_illustrations: number;
  total_promoted_illustrations: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: CoverPhotoUserSocial;
}

interface CoverPhoto {
  id: string;
  slug: string;
  alternative_slugs: AlternativeSlugs;
  created_at: string;
  updated_at: string;
  promoted_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string | null;
  alt_description: string;
  breadcrumbs: string[];
  urls: CoverPhotoUrls;
  links: CoverPhotoLinks;
  likes: number;
  liked_by_user: boolean;
  current_user_collections: string[];
  sponsorship: string | null;
  topic_submissions: {};
  asset_type: string;
  premium: boolean;
  plus: boolean;
  user: CoverPhotoUser;
}

interface Source {
  ancestry: SourceAncestry;
  title: string;
  subtitle: string;
  description: string;
  meta_title: string;
  meta_description: string;
  cover_photo: CoverPhoto;
}

interface Tag {
  type: string;
  title: string;
  source?: Source;
}

interface Meta {
  index: boolean;
}

export interface ImageData {
  id: string;
  slug: string;
  alternative_slugs: AlternativeSlugs;
  created_at: string;
  updated_at: string;
  promoted_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string | null;
  alt_description: string;
  breadcrumbs: string[];
  urls: Urls;
  links: Links;
  likes: number;
  liked_by_user: boolean;
  current_user_collections: string[];
  sponsorship: string | null;
  topic_submissions: {};
  asset_type: string;
  user: User;
  exif: Exif;
  location: Location;
  meta: Meta;
  public_domain: boolean;
  tags: Tag[];
}

export interface LocationData {
  name: string;
  local_names: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state: string;
}
