import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "BosniaTrans - Learn Bosnian Language",
  description: "Interactive platform for learning Bosnian language with translation, quizzes, and more",
  keywords: [
    "Bosnian",
    "Language Learning",
    "Translation",
    "Education",
    "Bosnia and Herzegovina",
  ],
  authors: [{ name: "kappasutra" }],
  creator: "kappasutra",
  publisher: "kappasutra",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bosniatrans.vercel.app",
    title: "BosniaTrans - Learn Bosnian Language",
    description: "Interactive platform for learning Bosnian language with translation, quizzes, and more",
    siteName: "BosniaTrans",
  },
  twitter: {
    card: "summary_large_image",
    title: "BosniaTrans - Learn Bosnian Language",
    description: "Interactive platform for learning Bosnian language with translation, quizzes, and more",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}; 