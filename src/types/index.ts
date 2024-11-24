export interface MemoizedNewsProps {
  category: string;
  country: string;
  onProgressState: (progress: number) => void;
}
export interface NavbarProps {
  countryChange: (country: string) => void;
  selectedCountry: string;
}
export interface Country {
  code: string;
  name: string;
  flag: string;
}
export interface NavItem {
  title: string;
  path: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface NewsProps {
  country: string;
  category?: string;
  pageSize?: number;
  onProgressState: (progress: number) => void;
}

export interface NewsState {
  articles: Article[];
  loading: boolean;
  page: number;
  totalResults: number;
}

export interface Article {
  title: string;
  content: string;
  urlToImage?: string;
  url: string;
  source: { name: string };
  publishedAt: string;
}

export interface NewsCardProps {
  title: string;
  description: string;
  urlToImage?: string;
  url: string;
  source: string;
  publishedAt: string;
  country: string;
}

export interface CustomToastProps {
  message: string;
  onClose: () => void;
}

export interface ApiParams {
  country: string | undefined;
  category: string | undefined;
  page: number;
  pageSize: number | undefined;
  q: string | undefined | null;
}
